#!/usr/bin/env node
// One-shot migrator: convert legacy flat-format .jd/*.md files into the new
// structured format under .jd/<YYYY-MM>/<Company>-<Role>.md. Originals are
// moved to .jd/.archive/ so nothing is lost if a re-fetch fails.
//
// Usage:
//   node tools/migrate-jd.mjs [--dry-run] [--dir <path>]

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  statSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { fetchJd } from "./fetch-jd.mjs";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
let baseDir = ".jd";
const dirIdx = args.indexOf("--dir");
if (dirIdx !== -1 && args[dirIdx + 1]) baseDir = args[dirIdx + 1];

const root = resolve(baseDir);
if (!existsSync(root)) {
  console.error(`No directory at ${root}`);
  process.exit(1);
}

const entries = readdirSync(root).filter((name) => {
  if (!name.toLowerCase().endsWith(".md")) return false;
  const full = join(root, name);
  try {
    return statSync(full).isFile();
  } catch {
    return false;
  }
});

if (entries.length === 0) {
  console.log("No root-level .md files to migrate.");
  process.exit(0);
}

const archiveDir = join(root, ".archive");
if (!dryRun && !existsSync(archiveDir)) mkdirSync(archiveDir, { recursive: true });

const summary = { migrated: [], skipped: [], failed: [] };

for (const name of entries) {
  const src = join(root, name);
  const text = readFileSync(src, "utf8");
  const url = extractUrl(text);

  if (!url) {
    summary.skipped.push({ name, reason: "no URL on line 3" });
    continue;
  }

  if (dryRun) {
    summary.migrated.push({ name, url, dry: true });
    continue;
  }

  try {
    const result = await fetchJd(url, { outDir: baseDir, force: true });
    renameSync(src, join(archiveDir, name));
    summary.migrated.push({ name, newPath: result.path });
  } catch (err) {
    summary.failed.push({ name, url, error: err.message });
  }
}

console.log(`\nMigration summary:`);
console.log(`  Migrated: ${summary.migrated.length}`);
for (const m of summary.migrated) {
  console.log(`    ${m.name}${m.newPath ? `  ->  ${m.newPath}` : " (dry-run)"}`);
}
if (summary.skipped.length) {
  console.log(`  Skipped: ${summary.skipped.length}`);
  for (const s of summary.skipped) console.log(`    ${s.name}: ${s.reason}`);
}
if (summary.failed.length) {
  console.log(`  Failed: ${summary.failed.length}`);
  for (const f of summary.failed) console.log(`    ${f.name}: ${f.error}`);
  process.exit(2);
}

function extractUrl(text) {
  const lines = text.split(/\r?\n/);
  for (const line of lines.slice(0, 12)) {
    const m = line.match(/https?:\/\/[^\s)]+linkedin\.com[^\s)]*/i);
    if (m) return m[0].replace(/[),.]+$/, "");
  }
  return null;
}
