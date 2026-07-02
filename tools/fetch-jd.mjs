#!/usr/bin/env node
// Fetch a LinkedIn job posting and write it as structured markdown to
//   .jd/<YYYY-MM>/<Company>-<Role>.md
// where YYYY-MM is the fetched month.
//
// Usage:
//   node tools/fetch-jd.mjs <linkedin-job-url-or-id> [--force] [--out <dir>] [--no-source]
//
// Examples:
//   node tools/fetch-jd.mjs https://www.linkedin.com/jobs/view/4413492609/
//   node tools/fetch-jd.mjs 4413492609 --force
//
// Output format: see skills/linkedin-jd-import/SKILL.md.

import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36";

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error(
      "Usage: node tools/fetch-jd.mjs <linkedin-job-url-or-id> [--force] [--out <dir>] [--no-source]",
    );
    process.exit(1);
  }

  const force = args.includes("--force");
  const noSource = args.includes("--no-source");
  let outDir = ".jd";
  const outIdx = args.indexOf("--out");
  if (outIdx !== -1 && args[outIdx + 1]) outDir = args[outIdx + 1];

  const positional = args.filter(
    (a, i) => !a.startsWith("--") && args[i - 1] !== "--out",
  );
  const input = positional[0];

  const result = await fetchJd(input, { outDir, force, noSource });
  console.log(result.path);
}

export async function fetchJd(input, { outDir = ".jd", force = false, noSource = false } = {}) {
  const jobId = extractJobId(input);
  if (!jobId) throw new Error(`Cannot extract LinkedIn job id from: ${input}`);

  const viewUrl = `https://www.linkedin.com/jobs/view/${jobId}/`;
  const guestUrl = `https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/${jobId}`;

  const [topHtml, bodyHtml] = await Promise.all([
    fetchText(viewUrl),
    fetchText(guestUrl),
  ]);

  const company = pickFirst(
    matchAll(topHtml, /<a[^>]+topcard-org-name[^>]*>\s*([^<]+?)\s*<\/a>/i),
    matchAll(bodyHtml, /<a[^>]+topcard__org-name-link[^>]*>\s*([^<]+?)\s*<\/a>/i),
    matchAll(topHtml, /"hiringOrganization"\s*:\s*{[^}]*"name"\s*:\s*"([^"]+)"/i),
    matchAll(bodyHtml, /"hiringOrganization"\s*:\s*{[^}]*"name"\s*:\s*"([^"]+)"/i),
  );

  const role = pickFirst(
    matchAll(topHtml, /<h1[^>]*>\s*([^<]+?)\s*<\/h1>/i),
    matchAll(bodyHtml, /<h2[^>]*top-card-layout__title[^>]*>\s*([^<]+?)\s*<\/h2>/i),
    matchAll(topHtml, /<title>([^<|]+?)\s+(?:in|\|)/i),
  );

  if (!company || !role) {
    const err = new Error(`Could not extract company/role from page (jobId=${jobId})`);
    err.code = "EEXTRACT";
    err.company = company;
    err.role = role;
    throw err;
  }

  const fetched = new Date();
  const fetchedYmd = fetched.toISOString().slice(0, 10);
  const fetchedMonth = fetched.toISOString().slice(0, 7);

  const meta = extractMeta(topHtml, bodyHtml, fetched);
  meta.jobId = jobId;
  meta.url = viewUrl;
  meta.fetched = fetchedYmd;

  const sourceText = htmlToText(extractDescription(bodyHtml) || bodyHtml);
  const sections = extractSections(sourceText);

  const monthDir = join(resolve(outDir), fetchedMonth);
  const filename = `${slug(company)}-${slug(role)}.md`;
  const outPath = join(monthDir, filename);

  if (!existsSync(monthDir)) mkdirSync(monthDir, { recursive: true });
  if (existsSync(outPath) && !force) {
    const err = new Error(`File exists: ${outPath}. Pass force to overwrite.`);
    err.code = "EEXISTS";
    err.path = outPath;
    throw err;
  }

  const content = formatMarkdown({
    company: company.trim(),
    role: role.trim(),
    meta,
    sections,
    sourceText: noSource ? null : sourceText,
  });

  writeFileSync(outPath, content, "utf8");
  return { path: outPath, jobId, company: company.trim(), role: role.trim(), meta };
}

// --- input helpers ------------------------------------------------------

function extractJobId(s) {
  if (!s) return null;
  const m = String(s).match(/(\d{8,})/);
  return m ? m[1] : null;
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-AU,en;q=0.9",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Fetch ${url} -> HTTP ${res.status}`);
  return await res.text();
}

function matchAll(html, re) {
  const m = html && html.match(re);
  return m ? decode(m[1]).trim() : null;
}

function pickFirst(...vals) {
  return vals.find((v) => v && v.length > 0) || null;
}

// --- metadata extraction ------------------------------------------------

function extractMeta(topHtml, bodyHtml, fetchedDate) {
  return {
    location: extractLocation(topHtml, bodyHtml),
    posted: extractPosted(topHtml, bodyHtml, fetchedDate),
    seniority: extractListLabel(bodyHtml, "Seniority level"),
    employment: extractListLabel(bodyHtml, "Employment type"),
    comp: extractComp(bodyHtml),
    office: extractOffice(bodyHtml),
  };
}

function extractLocation(topHtml, bodyHtml) {
  return pickFirst(
    matchAll(
      bodyHtml,
      /<span[^>]+topcard__flavor--bullet[^>]*>\s*([^<]+?)\s*<\/span>/i,
    ),
    matchAll(
      topHtml,
      /"jobLocation"\s*:\s*{[^}]*"address"\s*:\s*{[^}]*"addressLocality"\s*:\s*"([^"]+)"/i,
    ),
    matchAll(
      bodyHtml,
      /"jobLocation"\s*:\s*{[^}]*"address"\s*:\s*{[^}]*"addressLocality"\s*:\s*"([^"]+)"/i,
    ),
    matchAll(topHtml, /<title>[^<|]+\s+in\s+([^<|]+?)\s*\|/i),
  );
}

function extractPosted(topHtml, bodyHtml, fetchedDate) {
  const iso =
    matchAll(topHtml, /"datePosted"\s*:\s*"(\d{4}-\d{2}-\d{2})/i) ||
    matchAll(bodyHtml, /"datePosted"\s*:\s*"(\d{4}-\d{2}-\d{2})/i);
  if (iso) return iso;

  const openDate = matchAll(
    bodyHtml,
    /Open Date[^A-Za-z0-9]+(\d{1,2}\s+\w+\s+\d{4})/i,
  );
  if (openDate) {
    const d = new Date(openDate);
    if (!isNaN(d)) return d.toISOString().slice(0, 10);
  }

  const rel = (topHtml + " " + bodyHtml).match(
    /(\d+)\s+(day|days|week|weeks|month|months|hour|hours)\s+ago/i,
  );
  if (rel) {
    const n = parseInt(rel[1], 10);
    const unit = rel[2].toLowerCase();
    const d = new Date(fetchedDate);
    if (unit.startsWith("hour")) d.setHours(d.getHours() - n);
    else if (unit.startsWith("day")) d.setDate(d.getDate() - n);
    else if (unit.startsWith("week")) d.setDate(d.getDate() - n * 7);
    else if (unit.startsWith("month")) d.setMonth(d.getMonth() - n);
    return d.toISOString().slice(0, 10);
  }

  return null;
}

function extractListLabel(html, label) {
  const re = new RegExp(
    `<h3[^>]*>\\s*${label}\\s*<\\/h3>\\s*<span[^>]*>\\s*([^<]+?)\\s*<\\/span>`,
    "i",
  );
  const m = html.match(re);
  if (m) return decode(m[1]).trim();
  const re2 = new RegExp(
    `${label}[\\s\\S]{0,80}?<span[^>]*>\\s*([^<]+?)\\s*<\\/span>`,
    "i",
  );
  const m2 = html.match(re2);
  return m2 ? decode(m2[1]).trim() : null;
}

function extractComp(html) {
  const text = htmlToText(html);
  const re = /(A?\$[\d,]+(?:\.\d+)?(?:k|K)?\s*[-–to]+\s*A?\$[\d,]+(?:\.\d+)?(?:k|K)?)(?:\s*(?:per|\/)?\s*(year|annum|annually))?/;
  const m = text.match(re);
  if (m) return m[1].replace(/\s+/g, " ").trim();
  return null;
}

function extractOffice(html) {
  const text = htmlToText(html).toLowerCase();
  if (/\bfully remote\b|\b100%\s+remote\b/.test(text)) return "remote";
  if (
    /\bhybrid\b|\bin-?office\b|\boffice-?assigned\b|\b\d+%\s+(?:of\s+the\s+)?time\s+in/i.test(
      text,
    )
  ) {
    const pct = text.match(/(\d{2,3})\s*%[^.]*office/);
    if (pct) return `hybrid (~${pct[1]}% in-office)`;
    return "hybrid";
  }
  if (/\bonsite\b|\bon-site\b/.test(text)) return "onsite";
  return null;
}

// --- description body + section extraction ------------------------------

function extractDescription(html) {
  const m = html.match(
    /<div[^>]+(?:show-more-less-html__markup|description__text)[^>]*>([\s\S]*?)<\/div>\s*<\/section>/i,
  );
  if (m) return m[1];
  const m2 = html.match(/<section[^>]+description[^>]*>([\s\S]*?)<\/section>/i);
  return m2 ? m2[1] : null;
}

function htmlToText(html) {
  let s = html;
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<\/p>/gi, "\n\n");
  s = s.replace(/<\/li>/gi, "\n");
  s = s.replace(/<li[^>]*>/gi, "- ");
  s = s.replace(/<\/h[1-6]>/gi, "\n\n");
  s = s.replace(/<h[1-6][^>]*>/gi, "\n");
  s = s.replace(/<\/?(strong|b|em|i)>/gi, "");
  s = s.replace(/<[^>]+>/g, "");
  s = decode(s);
  s = s.replace(/\r\n?/g, "\n");

  const cutMarkers = [
    /\n\s*Show more\b[\s\S]*$/i,
    /\n\s*Seniority level\b[\s\S]*$/i,
  ];
  for (const re of cutMarkers) s = s.replace(re, "");

  s = s.replace(/[ \t]+\n/g, "\n");
  s = s.replace(/\n{3,}/g, "\n\n");
  return s.trim();
}

const HEADING_GROUPS = {
  responsibilities: [
    /^responsibilities\b/i,
    /^what (?:you['‘’]ll|you will) do\b/i,
    /^your role\b/i,
    /^about the role\b/i,
    /^the role\b/i,
    /^key responsibilities\b/i,
    /^in this role\b/i,
    /^day(?:-|\s)to(?:-|\s)day\b/i,
    /^what are.*tasks?.*complete/i,
    /^what.+(?:you|the candidate|the person).+(?:do|deliver)\b/i,
  ],
  mustHave: [
    /^minimum requirements\b/i,
    /^requirements\b/i,
    /^required\b/i,
    /^what (?:you['‘’]ll|you will) bring\b/i,
    /^who you are\b/i,
    /^about you\b/i,
    /^must have\b/i,
    /^basic qualifications\b/i,
    /^qualifications\b/i,
    /^what we['‘’]re looking for\b/i,
    /^what (?:technical\s+)?(?:skills|experience).+required\b/i,
    /^skills (?:you['‘’]ll|you will) bring\b/i,
    /^you['‘’]ll thrive\b/i,
    /^you['‘’]ll have\b/i,
    /^you (?:will\s+)?have\b/i,
  ],
  niceToHave: [
    /^preferred(?:\s+(?:requirements|qualifications|skills))?\b/i,
    /^nice to have\b/i,
    /^bonus\b/i,
    /^great to have\b/i,
  ],
  whyRole: [
    /^about the team\b/i,
    /^about us\b/i,
    /^who we are\b/i,
    /^this is us\b/i,
    /^about\b.+(?:team|company)/i,
  ],
  notes: [
    /^position details\b/i,
    /^in-?office\b/i,
    /^pay and benefits\b/i,
    /^compensation\b/i,
    /^benefits\b/i,
    /^location\b/i,
  ],
  ignore: [
    /^about (?:stripe|the company)\b/i,
  ],
};

function classifyHeading(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length > 120) return null;
  if (trimmed.startsWith("- ")) return null;

  // Bilingual headings (e.g. "Mō te Tūranga | About the Role" or "Maori / English")
  // also test the English segment alone.
  const candidates = [trimmed];
  const splitMatch = trimmed.split(/\s*[|/]\s*/);
  if (splitMatch.length > 1) candidates.push(...splitMatch.map((s) => s.trim()));

  for (const [key, patterns] of Object.entries(HEADING_GROUPS)) {
    if (patterns.some((re) => candidates.some((c) => re.test(c)))) return key;
  }
  return null;
}

function extractSections(bodyText) {
  const lines = bodyText.split("\n");
  const buckets = {
    whyRole: [],
    responsibilities: [],
    mustHave: [],
    niceToHave: [],
    notes: [],
  };
  let current = null;

  for (const raw of lines) {
    const line = raw.trimEnd();
    const headingKey = classifyHeading(line);
    if (headingKey) {
      current = headingKey === "ignore" ? null : headingKey;
      continue;
    }
    if (!current) continue;
    if (!buckets[current]) continue;
    buckets[current].push(line);
  }

  return {
    whyRole: cleanWhyRole(buckets.whyRole),
    responsibilities: cleanBullets(buckets.responsibilities),
    mustHave: cleanBullets(buckets.mustHave),
    niceToHave: cleanBullets(buckets.niceToHave),
    notes: cleanNotes(buckets.notes),
  };
}

function cleanBullets(lines) {
  const out = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith("- ")) out.push(t);
  }
  return dedupe(out);
}

function cleanWhyRole(lines) {
  const paragraphs = collapseParagraphs(lines);
  for (const p of paragraphs) {
    if (p.length < 30) continue;
    return p.trim();
  }
  return null;
}

function cleanNotes(lines) {
  const out = [];
  const paragraphs = collapseParagraphs(lines);
  for (const p of paragraphs) {
    const trimmed = p.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("- ")) {
      out.push(trimmed);
    } else {
      const condensed =
        trimmed.length > 400 ? trimmed.slice(0, 397).trimEnd() + "..." : trimmed;
      out.push(`- ${condensed}`);
    }
  }
  return dedupe(out);
}

function collapseParagraphs(lines) {
  const paragraphs = [];
  let current = [];
  for (const line of lines) {
    if (!line.trim()) {
      if (current.length) {
        paragraphs.push(current.join(" ").replace(/\s+/g, " ").trim());
        current = [];
      }
    } else {
      current.push(line);
    }
  }
  if (current.length) paragraphs.push(current.join(" ").replace(/\s+/g, " ").trim());
  return paragraphs;
}

function dedupe(arr) {
  const seen = new Set();
  const out = [];
  for (const item of arr) {
    const key = item.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

// --- formatting ---------------------------------------------------------

function formatMarkdown({ company, role, meta, sections, sourceText }) {
  const fm = formatFrontmatter({
    company,
    role,
    location: meta.location,
    url: meta.url,
    job_id: meta.jobId,
    posted: meta.posted,
    fetched: meta.fetched,
    seniority: meta.seniority,
    employment: meta.employment,
    comp: meta.comp,
    office: meta.office,
    visa: "not stated",
    status: "new",
    tags: [],
  });

  const title = `# ${company} — ${role}`;
  const parts = [fm, "", title, ""];

  parts.push("## Why role (team / mission)");
  parts.push(sections.whyRole ? sections.whyRole : "_Not extracted._");
  parts.push("");

  parts.push("## Responsibilities");
  parts.push(sections.responsibilities.length ? sections.responsibilities.join("\n") : "_Not extracted._");
  parts.push("");

  parts.push("## Must have");
  parts.push(sections.mustHave.length ? sections.mustHave.join("\n") : "_Not extracted._");
  parts.push("");

  parts.push("## Nice to have");
  parts.push(sections.niceToHave.length ? sections.niceToHave.join("\n") : "_Not extracted._");
  parts.push("");

  parts.push("## Notes");
  parts.push(sections.notes.length ? sections.notes.join("\n") : "_None._");
  parts.push("");

  if (sourceText) {
    parts.push("---");
    parts.push("");
    parts.push("## Source");
    parts.push("");
    parts.push(sourceText);
    parts.push("");
  }

  return parts.join("\n");
}

function formatFrontmatter(fields) {
  const lines = ["---"];
  for (const [k, v] of Object.entries(fields)) {
    if (Array.isArray(v)) {
      lines.push(`${k}: [${v.map((x) => yamlScalar(x)).join(", ")}]`);
    } else if (v === null || v === undefined || v === "") {
      lines.push(`${k}: null`);
    } else {
      lines.push(`${k}: ${yamlScalar(v)}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

function yamlScalar(v) {
  const s = String(v);
  if (/^[\w\-./@:]+$/.test(s) && !/^(true|false|null|yes|no)$/i.test(s) && !/^\d+$/.test(s)) {
    return s;
  }
  if (/^\d+$/.test(s)) return s;
  return `"${s.replace(/"/g, '\\"')}"`;
}

// --- shared helpers -----------------------------------------------------

function decode(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&hellip;/g, "...")
    .replace(/&mdash;/g, "-")
    .replace(/&ndash;/g, "-")
    .replace(/&([a-zA-Z]+);/g, " ");
}

function slug(s) {
  return s
    .replace(/[<>:"/\\|?*]/g, " ")
    .replace(/[^\p{L}\p{Nd}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  await main();
}
