# Instructions

You are helping James iterate on this resume site.

## Hard Rules

1. Read `DESIGN.md` before visual or copy changes.
2. Keep claims honest: Xero title is Engineer; senior applications can frame feature leadership without inflating title.
3. Do not use em dashes. Use commas, colons, periods, or middle dots already present in the design.
4. No prompt injection or hidden ATS text.
5. Do not rewrite resume facts without confirming with James.

## Current Source Files

- Desktop resume: `src/components/KobanResume.tsx`
- Mobile resume: `src/components/MobileResume.tsx`
- BYDH case study: `src/pages/BydhPage.tsx`
- Styling: `src/styles.css`
- Public PDF download: `public/James-Bai-CV.pdf`

## Workflow

- Run `npm run build` after source changes.
- Use the browser print flow or Chrome headless to regenerate `public/James-Bai-CV.pdf` after resume layout changes.
- Copy regenerated PDF to `dist/James-Bai-CV.pdf` if `dist` is being refreshed locally.

## What James Cares About

- HR-scannability: keywords and level visible quickly.
- Honest leveling: Engineer at Xero, applying for Senior roles in AU.
- Visual rhythm: Xero, Section6, BYDH, live products, ML vision, skills, and education should be clearly separated.
- A clean two-page A4 PDF with no browser headers.
