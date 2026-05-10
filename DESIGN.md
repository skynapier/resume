# Resume - Design System

Single source of truth for the Kōban résumé. Read this before changing anything.

---

## Identity

- **Direction name.** Kōban (交番): sans + mono, hanko-red accent, code-document feel.
- **Subject.** James Bai · Engineer @ Xero · Wellington, NZ.
- **Goal.** Apply for senior software engineering roles, open to relocation within Australasia.
- **Tone.** Restrained Japanese-document influence. Engineer-document, not magazine.

## Inviolables (do NOT change without explicit ask)

1. **Title says "Engineer".** James is currently an Engineer at Xero, not "Senior". Header / job titles must reflect reality. The aspiration belongs in `@objective`.
2. **"Feature lead", not "Lead engineer".** Lead Engineer is a job grade. Use "Feature lead" when describing scope of ownership on a feature.
3. **No em-dashes in body copy.** Year ranges only. Everywhere else use `:`, `,`, `.`, or `·`. Em-dashes are an AI-writing tell.
4. **No prompt-injection / hidden text.** Honesty is the policy.
5. **2 desktop pages, A4 (794 × 1123 px @ 96dpi).** Mobile uses a separate single-column reading component.
6. **Quantified claims must be true.** ~250,000 LOC · 270 of 350 apps · 66k records/year · 1 minor bug in 1 month live · hundreds of thousands of dollars recovered. Don't round these up.
7. **Hanko stamp** is the only decorative element. Keep it small (44px), top-right, rotated -2°.

## Tokens

Defined in `assets/tokens.css`. Do not invent new colors / sizes locally.

```
--paper        #fafaf7   warm off-white
--ink          #181818   primary text
--ink-soft     #3a3a3a   body
--ink-muted    #6e6e68   meta / labels
--rule         #d8d6cf   hairline
RED            oklch(0.55 0.16 25)   hanko vermillion (one accent only)
```

Type: Inter (sans, body), JetBrains Mono (mono, labels + headers), Noto Serif JP (hanko stamp only).
Desktop body 11.5px / 1.55. Mobile body 16px / 1.62. Desktop mono labels 10.5px.

## Page structure

### Page 1
1. Header (name + tagline + hanko + contact)
2. Black 1px rule
3. Summary block (mono, formatted as a JSDoc comment with `@objective` + `@location`)
4. `## experience` section
   - Xero (current): `sentinel/p0`, `ai/mcp-team`, `plan-migration`, `manual-invoicing`, `us-tax-support`, `also`.
   - Section6: `virtual-cfo`, `bnz-migration`, `vodafone-dx`, `also`.

### Page 2
- `## side-projects`
- **BYDH ERP** as the hero: RED-tagged bullets (`email→ledger`, `ai-quoting`, `insights`, `mobile`).
- Screenshot links to `/bydh`.
- **Success Health** as a smaller second project below.
- `## skills`: two-column mono-labeled layout.
- `## education + cert`: PGDipSci, BSc, AWS Dev Assoc (2026), RHCSA, Azure Dev Assoc.

### Mobile
- `MobileResume` is a separate single-column reading component.
- Do not scale the A4 pages on mobile.
- Mobile download links to `public/James-Bai-CV.pdf`.

## Skills - canonical list

Edit here, then mirror into the resume.

- **lang.** C# / .NET, TypeScript, Python
- **web.** React, Redux, Next.js, MUI, Fluent UI, Next UI
- **mobile.** React Native, Expo
- **data.** PostgreSQL, MySQL, DynamoDB, Dapper, EF, Flyway
- **msg.** SQS, SNS
- **cloud.** AWS (Lambda, SQS, SNS, DynamoDB, Glue, ECS, S3, RDS, Cognito, CloudFront), Azure
- **platform.** Kubernetes, Docker, Terraform, CloudFormation
- **ci/cd.** GitHub Actions, TeamCity, Jenkins
- **ai.** Claude Code, Codex, Gemini, MCP (author + user)

Removed: Rust (no longer used).

## Print

- A4 portrait. Margins handled by page padding (48 / 56 / 44).
- `@page { size: A4; margin: 0; }` on print.
- Hanko + RED accent should print correctly (no `print-color-adjust: economy`).
- Page breaks are forced between all five desktop sheets.
- Mobile component is hidden in print.

## When making changes

1. **Read this file first.** If a change conflicts with an Inviolable, push back instead of making it.
2. Edit the React component (`src/components/KobanResume.tsx`).
3. Verify no em-dashes leaked in. Only allow them inside year ranges.
4. Verify the page still fits in 1123px height. If it overflows, tighten copy first, font sizes second, padding last.
5. Update this DESIGN.md if the change is structural.

## Files

```
resume/
├── DESIGN.md                    # this file
├── index.html                   # Vite shell
├── public/404.html              # GitHub Pages clean-route fallback
├── resume-content.md            # plain-text mirror for Word workflows
├── src/
│   ├── main.tsx                 # Vite entry
│   ├── App.tsx                  # React Router routes
│   ├── components/
│   │   └── KobanResume.tsx      # chosen résumé component
│   └── pages/
│       ├── ResumePage.tsx
│       └── BydhPage.tsx
└── assets/
│   ├── tokens.css
│   ├── icons.svg.html
│   └── bydh/                    # screenshots go here (TODO)
```

## Vite migration checklist

- [x] Add Vite + React + TypeScript
- [x] Move Kōban résumé into `src/components/KobanResume.tsx`
- [x] Import `assets/tokens.css` in `src/main.tsx`
- [x] Add `/bydh` route
- [x] Configure GH Pages: `vite.config.ts` `base: '/resume/'`, GH Action on push to `main`

---
Last updated: 2026-05-06
