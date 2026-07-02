#!/usr/bin/env node
// Append-only writer for skills/experience-bank/bank/.
//
// Usage:
//   node tools/bank-add.mjs evidence <topic>   "<bullet text>"
//   node tools/bank-add.mjs angles   <company> "<bullet text>"
//   node tools/bank-add.mjs phrases             "<wording>"

import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { slug } from "./_frontmatter.mjs";

const BANK_ROOT = resolve("skills/experience-bank/bank");

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node tools/bank-add.mjs <evidence|angles|phrases> [topic|company] "<text>"');
  process.exit(1);
}

const kind = args[0];
let target = null;
let text = null;

if (kind === "phrases") {
  text = args.slice(1).join(" ");
} else if (kind === "evidence" || kind === "angles") {
  target = args[1];
  text = args.slice(2).join(" ");
} else {
  console.error(`Unknown kind: ${kind}. Expected evidence|angles|phrases.`);
  process.exit(1);
}

text = (text || "").trim();
if (!text) {
  console.error("Missing text to append.");
  process.exit(1);
}

const filePath = resolveFile(kind, target);
ensureFile(filePath, kind, target);

const existing = readFileSync(filePath, "utf8");
if (alreadyPresent(existing, text)) {
  console.log(`(duplicate) ${filePath}`);
  process.exit(0);
}

const trimmed = existing.replace(/\n+$/, "");
const next = `${trimmed}\n- ${text}\n`;
writeFileSync(filePath, next, "utf8");
console.log(filePath);

function resolveFile(kind, target) {
  if (kind === "phrases") return join(BANK_ROOT, "phrases.md");
  const subdir = kind === "evidence" ? "evidence" : "angles";
  if (!target) {
    console.error(`Missing ${kind === "evidence" ? "topic" : "company"} argument.`);
    process.exit(1);
  }
  const filename = `${slug(target).toLowerCase()}.md`;
  return join(BANK_ROOT, subdir, filename);
}

function ensureFile(path, kind, target) {
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (existsSync(path)) return;

  let header;
  if (kind === "phrases") header = "# Phrases\n\nReusable wordings James has retained or accepted.\n";
  else if (kind === "evidence") header = `# Evidence: ${prettyTitle(target)}\n`;
  else header = `# Angles: ${prettyTitle(target)}\n`;

  writeFileSync(path, header, "utf8");
}

function prettyTitle(raw) {
  return String(raw)
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => (w === w.toUpperCase() && w.length <= 4 ? w : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}

function alreadyPresent(existing, text) {
  const norm = normalize(text);
  for (const line of existing.split(/\r?\n/)) {
    if (!line.trim().startsWith("- ")) continue;
    if (normalize(line.replace(/^-\s*/, "")) === norm) return true;
  }
  return false;
}

function normalize(s) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}
