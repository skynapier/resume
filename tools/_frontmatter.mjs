// Minimal YAML-frontmatter helpers shared by fetch-jd, init-cover-letter,
// bank-add and build-cover-letters. Intentionally not a full YAML parser —
// only handles the flat scalar / array layout this repo uses.

export function formatFrontmatter(fields) {
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

export function yamlScalar(v) {
  const s = String(v);
  if (/^[\w\-./@:]+$/.test(s) && !/^(true|false|null|yes|no)$/i.test(s) && !/^\d+$/.test(s)) {
    return s;
  }
  if (/^\d+$/.test(s)) return s;
  return `"${s.replace(/"/g, '\\"')}"`;
}

// Parse the leading YAML frontmatter block from a markdown string. Returns
// { data, body } where data is an object of flat scalars/arrays and body is
// the remainder. If no frontmatter, data is {} and body is the original.
export function parseFrontmatter(markdown) {
  const text = markdown.replace(/^﻿/, "");
  if (!text.startsWith("---")) return { data: {}, body: markdown };

  const lines = text.split(/\r?\n/);
  let endIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      endIdx = i;
      break;
    }
  }
  if (endIdx === -1) return { data: {}, body: markdown };

  const data = {};
  for (let i = 1; i < endIdx; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const m = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let raw = m[2].trim();
    // strip trailing inline comment
    raw = raw.replace(/\s+#.*$/, "").trim();
    data[key] = parseScalar(raw);
  }

  const body = lines.slice(endIdx + 1).join("\n").replace(/^\n+/, "");
  return { data, body };
}

function parseScalar(raw) {
  if (raw === "" || raw.toLowerCase() === "null" || raw === "~") return null;
  if (raw.toLowerCase() === "true") return true;
  if (raw.toLowerCase() === "false") return false;

  if (raw.startsWith("[") && raw.endsWith("]")) {
    const inner = raw.slice(1, -1).trim();
    if (!inner) return [];
    return inner
      .split(",")
      .map((s) => s.trim())
      .map((s) => unquote(s));
  }

  return unquote(raw);
}

function unquote(s) {
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1).replace(/\\"/g, '"');
  }
  return s;
}

export function slug(s) {
  return String(s)
    .replace(/[<>:"/\\|?*]/g, " ")
    .replace(/[^\p{L}\p{Nd}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}
