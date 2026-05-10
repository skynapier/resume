# James Bai · Résumé

Vite + React résumé in the **Kōban** style (sans + mono, hanko red accent, code-document feel). Designed to print cleanly to A4 PDF and deploy to GitHub Pages.

---

## Files

| File | Purpose |
|---|---|
| `index.html` | Vite app shell. |
| `src/components/KobanResume.tsx` | The actual résumé component. **This is the source of truth.** |
| `src/pages/BydhPage.tsx` | BYDH case-study route. |
| `resume-content.md` | Plain-text mirror of the résumé content. Useful for pasting into Word, LinkedIn, or job-board forms. |
| `DESIGN.md` | **Read this before editing.** Design tokens, layout rules, content invariants, "do not change" list. |
| `assets/` | `tokens.css` and shared SVG dividers/icons. |

---

## Local preview

Install once:

```bash
npm install
```

Dev preview:

```bash
npm run dev
```

Open `http://127.0.0.1:5173/resume/`.

Production preview:

```bash
npm run build
npm run preview
```

Open `http://127.0.0.1:4173/resume/`.

---

## Print to PDF

Open `index.html` in Chrome/Edge → Cmd+P (Mac) / Ctrl+P (Win) → **Save as PDF**.

The page is set up with `@page A4 margin: 0` so the PDF lands as 2 clean A4 pages with no browser headers/footers. The on-screen "print / save pdf" button in the top-right does the same thing.

If your PDF has odd margins, make sure **Margins: None** and **Background graphics: ON** in the print dialog.

---

## Deploy to GitHub Pages

This site deploys via GitHub Actions.

1. Push `main` to `https://github.com/skynapier/resume.git`.
2. In GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Wait for the `Deploy Pages` workflow.
4. Site URL: `https://skynapier.github.io/resume/`.

Routes:

- `/resume/`
- `/resume/bydh`

### Option B: custom domain

After Option A is working:

1. Add a `CNAME` file at the repo root containing your domain (e.g. `resume.jamesbai.dev`).
2. In your DNS, add a `CNAME` record pointing `resume` → `skynapier.github.io` (or A records to GitHub's IPs for an apex domain).
3. **Settings → Pages → Custom domain →** enter the domain, enable HTTPS.

### Things to know

- Vite `base` is `/resume/`.
- React Router `basename` is `/resume`.
- `public/404.html` preserves clean routes on refresh.
- Fonts (Inter, JetBrains Mono, Noto Serif JP) are loaded from Google Fonts CDN.
- No env vars, no secrets, no API calls.

---

## Editing rules (for Claude Code or future me)

**Read `DESIGN.md` first.** Key invariants:

- Title is **"Engineer"**, never "Senior Engineer" or "Lead". Honest level today, hunting Senior.
- Role at Xero is **"Feature lead"**, never "Tech lead" or "Team lead".
- **No em-dashes (`—`).** Use `:`, `,`, `.`, or `·`. ATS-safer and a personal preference.
- **No prompt injection / hidden text for AI readers.** Removed; do not re-add.
- Edit `src/components/KobanResume.tsx` for the résumé.
- Edit `src/pages/BydhPage.tsx` for the BYDH case study.

### Adding a new bullet

In `src/components/KobanResume.tsx`, follow the existing pattern:

```jsx
<div style={{ display: "flex", gap: 12, marginBottom: 6 }}>
  <span style={{ ...S.monoLabel, minWidth: 100, color: RED }}>label-here</span>
  <span>Sentence with <b>key phrases bolded</b> and <b style={{color:RED}}>truly important numbers in red</b>.</span>
</div>
```

Use `color: RED` on the label for headline bullets, omit it for supporting bullets (creates a visual hierarchy when scanning).

### Changing the stack line under a job

Look for `stack: <b style={{color:"var(--ink)"}}>...</b>` under each role's H2.

---

## Stack

- Vite
- React
- TypeScript
- React Router
- GitHub Actions Pages deploy

AI/local-agent files stay out of Git via `.gitignore`: `CLAUDE.md`, `AGENTS.md`, `.local-coder/`, `.codex/`, `.cursor/`, `.windsurf/`.

---

## Contact

James Bai · jamesbaiwlg@gmail.com · +64 27 202 5777 · [github.com/skynapier](https://github.com/skynapier)
