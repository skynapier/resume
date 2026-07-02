#!/usr/bin/env node
// One-shot migrator: convert legacy flat-format .cover-letter/drafts/*.md into
// .cover-letter/<YYYY-MM>/<Company>-<Role>.md with frontmatter. Originals are
// moved to .cover-letter/.archive/drafts/.
//
// Non-interactive: every migrated file gets status: drafting. Edit frontmatter
// manually after if a draft was already sent/applied.
//
// Usage:
//   node tools/migrate-cover-letters.mjs [--dry-run]

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { formatFrontmatter, slug } from "./_frontmatter.mjs";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");

const root = resolve(".cover-letter");
const draftsDir = join(root, "drafts");

if (!existsSync(draftsDir)) {
  console.log(`Nothing to migrate: ${draftsDir} not found.`);
  process.exit(0);
}

const entries = readdirSync(draftsDir).filter((name) => {
  if (!name.toLowerCase().endsWith(".md")) return false;
  try {
    return statSync(join(draftsDir, name)).isFile();
  } catch {
    return false;
  }
});

if (entries.length === 0) {
  console.log("No drafts to migrate.");
  process.exit(0);
}

const archiveDir = join(root, ".archive", "drafts");
if (!dryRun && !existsSync(archiveDir)) mkdirSync(archiveDir, { recursive: true });

const today = new Date();
const drafted = today.toISOString().slice(0, 10);
const month = today.toISOString().slice(0, 7);
const monthDir = join(root, month);
if (!dryRun && !existsSync(monthDir)) mkdirSync(monthDir, { recursive: true });

const summary = { migrated: [], skipped: [] };

for (const name of entries) {
  const srcPath = join(draftsDir, name);
  const text = readFileSync(srcPath, "utf8");
  const { company, role } = inferCompanyRole(text, name);

  if (!company || !role) {
    summary.skipped.push({ name, reason: "could not infer company/role" });
    continue;
  }

  const slugCompany = slug(company);
  const slugRole = slug(role);
  const targetName = `${slugCompany}-${slugRole}.md`;
  const targetPath = join(monthDir, targetName);

  if (dryRun) {
    summary.migrated.push({ name, target: targetPath, dry: true });
    continue;
  }

  const fm = formatFrontmatter({
    company,
    role,
    jd: null,
    status: "drafting",
    drafted,
    applied: null,
    channel: null,
    notes: "migrated from .cover-letter/drafts/",
  });

  const body = text.trimStart();
  writeFileSync(targetPath, fm + "\n\n" + body, "utf8");
  renameSync(srcPath, join(archiveDir, name));
  summary.migrated.push({ name, target: targetPath });
}

console.log(`\nMigration summary:`);
console.log(`  Migrated: ${summary.migrated.length}`);
for (const m of summary.migrated) {
  console.log(`    ${m.name}${m.target ? `  ->  ${m.target}` : ""}${m.dry ? " (dry-run)" : ""}`);
}
if (summary.skipped.length) {
  console.log(`  Skipped: ${summary.skipped.length}`);
  for (const s of summary.skipped) console.log(`    ${s.name}: ${s.reason}`);
}

function inferCompanyRole(text, filename) {
  const heading = (text.match(/^##\s+(.+)$/m) || [])[1];
  if (heading) {
    const parts = heading.trim().split(/\s+/);
    if (parts.length >= 2) {
      const company = parts[0];
      const role = parts.slice(1).join(" ");
      return { company, role };
    }
  }
  const stem = filename.replace(/\.md$/i, "");
  const idx = stem.indexOf("-");
  if (idx > 0) {
    return {
      company: stem.slice(0, idx),
      role: stem.slice(idx + 1).replace(/-/g, " "),
    };
  }
  return { company: null, role: null };
}
