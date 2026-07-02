#!/usr/bin/env node
// Scaffold an empty cover-letter draft for a JD file. Pre-fills frontmatter
// from the JD's own frontmatter so the assistant only writes the body.
//
// Usage:
//   node tools/init-cover-letter.mjs <jd-path-or-glob> [--force] [--out <dir>]
//
// Examples:
//   node tools/init-cover-letter.mjs .jd/2026-05/Stripe-Integration-Engineer-AUNZ.md
//   npm run cover:init -- .jd/2026-05/Airwallex-Senior-Software-Engineer-Yield.md

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { formatFrontmatter, parseFrontmatter, slug } from "./_frontmatter.mjs";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    "Usage: node tools/init-cover-letter.mjs <jd-path> [--force] [--out <dir>]",
  );
  process.exit(1);
}

const force = args.includes("--force");
let outDir = ".cover-letter";
const outIdx = args.indexOf("--out");
if (outIdx !== -1 && args[outIdx + 1]) outDir = args[outIdx + 1];

const positional = args.filter(
  (a, i) => !a.startsWith("--") && args[i - 1] !== "--out",
);
const jdPath = positional[0];

if (!existsSync(jdPath)) {
  console.error(`JD file not found: ${jdPath}`);
  process.exit(1);
}

const jdRaw = readFileSync(jdPath, "utf8");
const { data: jd } = parseFrontmatter(jdRaw);

if (!jd.company || !jd.role) {
  console.error(`JD missing company/role frontmatter: ${jdPath}`);
  process.exit(2);
}

const draftedDate = new Date();
const drafted = draftedDate.toISOString().slice(0, 10);
const draftedMonth = draftedDate.toISOString().slice(0, 7);

const slugCompany = slug(jd.company);
const slugRole = slug(jd.role);
const filename = `${slugCompany}-${slugRole}.md`;

const monthDir = join(resolve(outDir), draftedMonth);
const outPath = join(monthDir, filename);

if (!existsSync(monthDir)) mkdirSync(monthDir, { recursive: true });
if (existsSync(outPath) && !force) {
  console.error(`File exists: ${outPath}. Pass --force to overwrite.`);
  process.exit(3);
}

const fm = formatFrontmatter({
  company: jd.company,
  role: jd.role,
  jd: relPath(jdPath),
  status: "drafting",
  drafted,
  applied: null,
  channel: null,
  notes: null,
});

const body = [
  "",
  "# James Bai",
  "",
  `## ${jd.company} ${jd.role}`,
  "",
  "_TODO: write cover letter body here._",
  "",
];

writeFileSync(outPath, fm + "\n" + body.join("\n"), "utf8");
console.log(outPath);

function relPath(p) {
  const abs = resolve(p);
  const cwd = resolve(".");
  if (abs.startsWith(cwd)) {
    return abs.slice(cwd.length).replace(/^[\\/]+/, "").replace(/\\/g, "/");
  }
  return p;
}
