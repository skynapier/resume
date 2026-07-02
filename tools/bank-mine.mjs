#!/usr/bin/env node
// Auto-mine cover letters into experience-bank. Walks
// `.cover-letter/<YYYY-MM>/*.md`, classifies each new sentence into
// evidence/<topic> | angles/<company> | phrases, and appends to
// `skills/experience-bank/bank/`. Dedupe is handled by `bank-add`.
//
// Letters are ephemeral (user deletes when stale). This script captures the
// reusable signal into the bank before that happens. Run anytime — safe and
// idempotent. Defaults to silent skip on duplicates.
//
// Usage:
//   node tools/bank-mine.mjs [--include-archive] [--source <dir>] [--dry-run] [--verbose]
//   npm run bank:mine

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { parseFrontmatter, slug } from "./_frontmatter.mjs";

const args = process.argv.slice(2);
const includeArchive = args.includes("--include-archive");
const dryRun = args.includes("--dry-run");
const verbose = args.includes("--verbose");
let sourceDir = ".cover-letter";
const srcIdx = args.indexOf("--source");
if (srcIdx !== -1 && args[srcIdx + 1]) sourceDir = args[srcIdx + 1];

const MONTH_RE = /^\d{4}-\d{2}$/;
const SENTENCE_MIN = 30;
const SENTENCE_MAX = 320;
const BANK_ROOT = resolve("skills/experience-bank/bank");

const STOPWORDS = new Set([
  "i", "we", "my", "me", "you", "your", "the", "a", "an", "and", "or", "but",
  "of", "to", "in", "on", "at", "for", "with", "by", "from", "as", "is", "am",
  "are", "was", "were", "be", "been", "being", "have", "has", "had", "do",
  "does", "did", "this", "that", "these", "those", "it", "its", "they", "them",
  "their", "there", "here", "where", "when", "while", "so", "not", "no", "yes",
  "if", "then", "than", "into", "out", "up", "down", "about", "over", "under",
  "also", "very", "really", "just", "only", "more", "most", "such", "some",
  "any", "all", "every", "each", "one", "two", "many", "much", "few", "lot",
  "lots", "currently", "recently", "outside", "work", "role", "team", "would",
  "could", "should", "can", "will", "may", "might", "what", "which", "who",
  "how", "why", "because", "since", "before", "after", "between",
]);

const SKIP_LINE_PATTERNS = [
  /^dear\s+(hiring|recruit|team)/i,
  /^sincerely/i,
  /^kind regards/i,
  /^best regards/i,
  /^regards/i,
  /^james\s*bai?\.?$/i,
  /^_?TODO/i,
  /^#/,
];

const SKIP_CONTENT_PATTERNS = [
  /^i (?:am|'m) writing to apply\b/i,
  /^i would (?:welcome|be excited|be glad)/i,
  /^i am applying\b/i,
  /^i am looking for a role\b/i,
  /^that is the kind of work/i,
  /^my background also maps well/i,
  /^i am currently based\b/i,
  /\bspouse visa\b/i,
  /\bpartner visa\b/i,
  /\bwellington\b/i,
  /\bnew zealand\b/i,
  /\brelocate\b/i,
];

// Evidence-topic keyword maps. First match wins — order from most specific to
// most generic so "Before Xero, I worked as a consultant across banking" lands
// in section6 (consultant + banking) rather than xero.
const EVIDENCE_TOPICS = [
  {
    topic: "section6",
    re: /\b(section6|bnz|vodafone|consultant|consulting|banking,? telco)\b/i,
  },
  {
    topic: "bydh",
    re: /\b(bydh|custom erp|construction business|250,000|450,000|mcp pattern|business owner|owner communication|small business workflow)\b/i,
  },
  {
    topic: "xero",
    re: /\b(xero|app store|usage based billing|production incidents|us tax|us sales tax|sdk|connection surfaces|invoice recovery|invoicing flow)\b/i,
  },
];

const root = resolve(sourceDir);
if (!existsSync(root)) {
  console.error(`Source dir not found: ${root}`);
  process.exit(1);
}

const sources = collectSources(root);
const summary = {
  scanned: 0,
  appended: 0,
  duplicates: 0,
  skipped: 0,
  byBucket: {},
};

for (const src of sources) {
  const text = readFileSync(src, "utf8");
  const { data, body } = parseFrontmatter(text);
  const company = data.company || guessCompanyFromPath(src);
  const companySlug = company ? slug(company).toLowerCase() : null;

  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length < 2) continue;

  const start = paragraphs.findIndex((p) => /^dear\s+/i.test(p));
  const end = paragraphs.findIndex((p, i) => i > 0 && /^sincerely|^kind regards|^best regards/i.test(p));
  const sliceStart = start >= 0 ? start + 1 : 0;
  const sliceEnd = end > 0 ? end : paragraphs.length;
  const middle = paragraphs.slice(sliceStart, sliceEnd);

  for (const paragraph of middle) {
    const flat = paragraph.replace(/\s+/g, " ").trim();
    if (skipLine(flat)) continue;
    for (const sentence of splitSentences(flat)) {
      const cleaned = sentence.trim().replace(/\s+/g, " ");
      summary.scanned++;
      if (!keepSentence(cleaned)) {
        summary.skipped++;
        continue;
      }
      const target = classify(cleaned, company, companySlug);
      if (!target) {
        summary.skipped++;
        continue;
      }
      const result = appendToBank(target, cleaned);
      summary.byBucket[target.bucketKey] = (summary.byBucket[target.bucketKey] || 0) + 1;
      if (result === "appended") summary.appended++;
      else if (result === "duplicate") summary.duplicates++;
      if (verbose) console.log(`[${result}] ${target.bucketKey}: ${cleaned}`);
    }
  }
}

console.log(
  `Scanned ${sources.length} letter(s), ${summary.scanned} sentence(s). ` +
    `Appended ${summary.appended}, duplicates ${summary.duplicates}, skipped ${summary.skipped}.`,
);
const buckets = Object.entries(summary.byBucket).sort(([a], [b]) => a.localeCompare(b));
for (const [bucket, count] of buckets) {
  console.log(`  ${bucket}: ${count}`);
}
if (dryRun) console.log(`(dry-run — no files modified)`);

// --- helpers ------------------------------------------------------------

function collectSources(rootDir) {
  const out = [];
  for (const name of readdirSync(rootDir)) {
    const full = join(rootDir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (MONTH_RE.test(name)) walkMonth(full, out);
      else if (includeArchive && name === ".archive") walkArchive(full, out);
    }
  }
  return out.sort();
}

function walkMonth(dir, out) {
  for (const name of readdirSync(dir)) {
    if (!name.toLowerCase().endsWith(".md")) continue;
    const full = join(dir, name);
    try {
      if (statSync(full).isFile()) out.push(full);
    } catch {}
  }
}

function walkArchive(dir, out) {
  const draftsDir = join(dir, "drafts");
  if (!existsSync(draftsDir)) return;
  for (const name of readdirSync(draftsDir)) {
    if (!name.toLowerCase().endsWith(".md")) continue;
    const full = join(draftsDir, name);
    try {
      if (statSync(full).isFile()) out.push(full);
    } catch {}
  }
}

function keepSentence(s) {
  if (s.length < SENTENCE_MIN || s.length > SENTENCE_MAX) return false;
  if (skipLine(s)) return false;
  if (SKIP_CONTENT_PATTERNS.some((re) => re.test(s))) return false;
  return true;
}

function classify(sentence, company, companySlug) {
  // 1. Angle: contains target company name (case-insensitive). Use letter's
  //    own company. Don't filter by opener — "This role fits unusually well
  //    with Stripe..." is a valid angle.
  if (company && companySlug) {
    const companyRe = new RegExp(`\\b${escapeRe(company)}\\b`, "i");
    if (companyRe.test(sentence)) {
      return { bucket: "angles", target: companySlug, bucketKey: `angles/${companySlug}` };
    }
  }
  // 2. Evidence: keyword maps.
  for (const { topic, re } of EVIDENCE_TOPICS) {
    if (re.test(sentence)) return { bucket: "evidence", target: topic, bucketKey: `evidence/${topic}` };
  }
  // 3. Phrase: voice-bearing wording. Heuristic: starts with "I " or contains
  //    soft markers ("enjoy", "comfortable", "value", "judgement", "ownership").
  if (
    /^i (?:enjoy|am comfortable|treat|value|prefer|describe|approach|have not|have led|have built)\b/i.test(sentence) ||
    /\b(judgement|ownership|mentor|architecture|edge case|production support|engineering judgement)\b/i.test(sentence)
  ) {
    return { bucket: "phrases", target: null, bucketKey: "phrases" };
  }
  // 4. No clear bucket → skip.
  return null;
}

function appendToBank(target, sentence) {
  const filePath = resolveFile(target);
  ensureFile(filePath, target);
  const existing = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  if (alreadyPresent(existing, sentence)) return "duplicate";
  if (dryRun) return "appended";
  const trimmed = existing.replace(/\n+$/, "");
  writeFileSync(filePath, `${trimmed}\n- ${sentence}\n`, "utf8");
  return "appended";
}

function resolveFile(target) {
  if (target.bucket === "phrases") return join(BANK_ROOT, "phrases.md");
  const subdir = target.bucket === "evidence" ? "evidence" : "angles";
  return join(BANK_ROOT, subdir, `${target.target}.md`);
}

function ensureFile(path, target) {
  const dir = dirname(path);
  if (!existsSync(dir)) {
    if (dryRun) return;
    mkdirSync(dir, { recursive: true });
  }
  if (existsSync(path)) return;
  if (dryRun) return;
  let header;
  if (target.bucket === "phrases")
    header = "# Phrases\n\nReusable wordings James has retained or accepted.\n";
  else if (target.bucket === "evidence") header = `# Evidence: ${prettyTitle(target.target)}\n`;
  else header = `# Angles: ${prettyTitle(target.target)}\n`;
  writeFileSync(path, header, "utf8");
}

function alreadyPresent(existing, sentence) {
  const norm = normalize(sentence);
  const candidateTokens = tokenSet(sentence);
  for (const line of existing.split(/\r?\n/)) {
    if (!line.trim().startsWith("- ")) continue;
    const bulletText = line.replace(/^-\s*/, "");
    if (normalize(bulletText) === norm) return true;
    // Token-overlap dedup: if 80% of the shorter side's content tokens are
    // shared with the other, treat as a near-duplicate variant.
    const bulletTokens = tokenSet(bulletText);
    if (candidateTokens.size < 4 || bulletTokens.size < 4) continue;
    let shared = 0;
    for (const t of candidateTokens) if (bulletTokens.has(t)) shared++;
    const min = Math.min(candidateTokens.size, bulletTokens.size);
    if (shared / min >= 0.8) return true;
  }
  return false;
}

function normalize(s) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function tokenSet(s) {
  const out = new Set();
  for (const raw of String(s).toLowerCase().split(/[^a-z0-9.]+/)) {
    const t = raw.replace(/[^a-z0-9]/g, "");
    if (!t) continue;
    if (t.length < 3) continue;
    if (STOPWORDS.has(t)) continue;
    out.add(t);
  }
  return out;
}

function splitSentences(paragraph) {
  const abbrev = /\b(e\.g|i\.e|vs|etc|inc|ltd|co|corp|mr|ms|dr|jr|sr|st|no|fig|approx)\.$/i;
  const parts = [];
  let buf = "";
  for (let i = 0; i < paragraph.length; i++) {
    buf += paragraph[i];
    const next = paragraph[i + 1];
    if (".!?".includes(paragraph[i]) && (next === undefined || /\s/.test(next))) {
      const trimmed = buf.trim();
      if (abbrev.test(trimmed)) continue;
      parts.push(trimmed);
      buf = "";
    }
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts;
}

function skipLine(line) {
  return SKIP_LINE_PATTERNS.some((re) => re.test(line.trim()));
}

function prettyTitle(raw) {
  return String(raw)
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => (w === w.toUpperCase() && w.length <= 4 ? w : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}

function guessCompanyFromPath(path) {
  const m = path.match(/[\\/]([^\\/]+?)-[^\\/]+\.md$/);
  return m ? m[1] : null;
}

function escapeRe(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
