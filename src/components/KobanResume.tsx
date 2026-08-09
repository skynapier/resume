/* ==========================================================
   Variation 03 — KŌBAN (交番) · revised
   Sans + Mono mixed, hanko red accent, code-document feel
   Title: Engineer (real) · Objective: Senior IC, AU
   ========================================================== */

import { useState } from "react";

type KobanResumeProps = {
  page?: 1 | 2;
};

export function KobanResume({ page = 1 }: KobanResumeProps) {
  const [isClaudeOpen, setIsClaudeOpen] = useState(false);
  const RED = "oklch(0.55 0.16 25)";
  const S = {
    page: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      padding: "36px 56px 56px",
      color: "var(--ink)",
      fontSize: "11.5px",
      lineHeight: 1.55,
      background: "#fafaf7",
    },
    mono: { fontFamily: '"JetBrains Mono", ui-monospace, monospace' },
    h1: { fontSize: "38px", fontWeight: 800, letterSpacing: "-0.03em", margin: 0, lineHeight: 1 },
    sec: { fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: "12px", fontWeight: 700, color: RED, letterSpacing: "0.08em", marginBottom: 10 },
    h2: { fontSize: "17px", fontWeight: 800, margin: 0 },
    meta: { fontSize: "10.5px", color: "var(--ink-muted)" },
    monoLabel: { fontFamily: '"JetBrains Mono", monospace', fontSize: "10.5px", fontWeight: 700, color: "var(--ink)", letterSpacing: "0.04em" },
    claudeTerm: {
      appearance: "none" as const,
      border: 0,
      padding: 0,
      background: "transparent",
      color: RED,
      cursor: "pointer",
      font: "inherit",
      fontWeight: 700,
      textDecoration: "underline",
      textDecorationThickness: 1,
      textUnderlineOffset: 2,
    },
  };

  if (page === 1) {
    return (
      <div className="r-page" style={S.page}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ ...S.mono, fontSize: 11, color: RED, letterSpacing: "0.04em" }}>// curriculum-vitae.md</div>
            <h1 style={{ ...S.h1, marginTop: 12 }}>James Bai</h1>
            <div style={{ ...S.mono, marginTop: 14, fontSize: 14, color: "var(--ink)", fontWeight: 600 }}>
              <b style={{color:"var(--ink)"}}>Engineer @ Xero</b> · 5+ yrs · .NET · AWS · React ·{" "}
              <button
                type="button"
                className="claude-term"
                style={S.claudeTerm}
                onClick={() => setIsClaudeOpen(true)}
                aria-label="Open Claude easter egg"
              >
                LLM firefighter
              </button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
            {/* hanko stamp */}
            <div style={{
              width: 44, height: 44, background: RED, color: "#fafaf7",
              fontFamily: '"Noto Serif JP", serif', fontWeight: 700,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              transform: "rotate(-2deg)", borderRadius: 2,
            }}>
              <div style={{ fontSize: 13, lineHeight: 1 }}>JB</div>
              <div style={{ fontSize: 7, lineHeight: 1, marginTop: 2, letterSpacing: 1 }}>2026</div>
            </div>
            <div style={{ ...S.mono, fontSize: 10.5, color: "var(--ink-soft)", textAlign: "right", lineHeight: 1.6 }}>
              <a href="mailto:jamesbaiwlg@gmail.com" style={{ textDecoration: "none" }}>jamesbaiwlg@gmail.com</a><br />
              <a href="tel:+64272025777" style={{ textDecoration: "none" }}>+64 27 202 5777</a><br />
              <a href="https://skynapier.github.io/resume/" style={{ textDecoration: "none" }}>skynapier.github.io/resume</a><br />
              Wellington · NZ
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--ink)", marginTop: 22 }} />

        {/* Summary as code-comment */}
        <div style={{ ...S.mono, marginTop: 10, fontSize: 10.8, lineHeight: 1.35, color: "var(--ink-soft)", whiteSpace: "pre" }}>
{`/**
 * Software engineer with 5+ years shipping .NET and AWS systems at Xero, now owning zero-to-one
 * MCP research and Microsoft Office integration work after App Store billing systems.
 *
 * I use AI heavily, but my value is knowing where to point it, how to verify the result, and how
 * to repair the system when it gets things wrong. Claude Code and Codex are daily tools.
 * My side project is a ~457,000 line AI powered ERP I built and operate alone, with ~10 daily users.
 *
 * @objective  Senior software engineering roles
 */`}
        </div>

        <div style={{ ...S.sec, marginTop: 12 }}>## experience</div>

        <div style={{ borderTop: "1px solid var(--rule)" }}>
          {/* Xero */}
          <div style={{ paddingTop: 12, paddingBottom: 10, borderBottom: "1px solid var(--rule)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={S.h2}>Xero <span style={{ fontWeight: 400, color: "var(--ink-muted)" }}>· Engineer</span></h2>
              <div style={{ ...S.mono, fontSize: 11, color: "var(--ink-muted)" }}>2023.11 — present</div>
            </div>
            <div style={{ ...S.mono, marginTop: 4, fontSize: 11, color: "var(--ink-soft)" }}>stack: <b style={{color:"var(--ink)"}}>C# / .NET 8/10 · Node.js · Python · AWS Lambda · SQS · SNS · DynamoDB · AWS Glue · React / TypeScript · Postgres · MCP</b></div>

            <div style={{ marginTop: 10, fontSize: 11.35, lineHeight: 1.54 }}>
              <div style={{ ...S.monoLabel, display: "flex", alignItems: "center", gap: 8, color: RED, marginBottom: 7 }}>
                <span>CURRENT</span>
                <span style={{ flex: 1, height: 1, background: "var(--rule)" }} />
                <span style={{ color: "var(--ink-soft)" }}>AI / MCP / RAG</span>
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                <span style={{ ...S.monoLabel, minWidth: 90, color: RED }}>mcp/0-to-1</span>
                <span>Selected to Xero's official <b>AI/MCP team</b>. Owned zero-to-one research for <b>Microsoft Office add-in support</b>: mapped architecture-wide impact, produced the feasibility plan, and built a working prototype for structured Xero data in Word, Excel, and PowerPoint.</span>
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <span style={{ ...S.monoLabel, minWidth: 90, color: RED }}>mcp/debug</span>
                <span>Investigated intermittent <b>MCP timeouts</b> with no known cause, traced behaviour across service boundaries, reconstructed the end-to-end request path, and identified the underlying failure mechanism.</span>
              </div>

              <div style={{ ...S.monoLabel, display: "flex", alignItems: "center", gap: 8, marginTop: 8, marginBottom: 7 }}>
                <span>PREVIOUS</span>
                <span style={{ flex: 1, height: 1, background: "var(--rule)" }} />
                <span style={{ color: "var(--ink-soft)" }}>billing / finance systems</span>
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                <span style={{ ...S.monoLabel, minWidth: 90 }}>billing-core</span>
                <span><b>Feature lead</b> on major parts of the global <b>App Store usage-based billing</b> rewrite. Designed and shipped the <b>.NET / C#</b> APIs and Postgres schema that became the <b>billing core</b>. Also built the <b>AWS Glue</b> aggregation pipeline. <b style={{color:RED}}>Went live with one minor post-launch bug.</b></span>
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                <span style={{ ...S.monoLabel, minWidth: 90 }}>merchant-spa</span>
                <span>Co-designed and shipped <b>React / Refine / MUI</b> SPA backed by a <b>.NET BFF</b> for App Store merchant self-service.</span>
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                <span style={{ ...S.monoLabel, minWidth: 90 }}>invoice-recovery</span>
                <span><b>Feature lead</b> on the manual-invoicing flow that <b>recovered hundreds of thousands of dollars</b> in overdue invoices. Leadership shout-out.</span>
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                <span style={{ ...S.monoLabel, minWidth: 90 }}>us-tax-support</span>
                <span>On-call owner for the <b>US Sales Tax</b> service supporting Xero's US merchants: production incidents, schema fixes, customer-facing data corrections.</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ ...S.monoLabel, minWidth: 90 }}>also</span>
                <span>Deep Embed Service · CodeRed CI/CD · shared frontend libs · PCI compliance · API latency · associate mentoring.</span>
              </div>
            </div>
          </div>

          {/* Section6 */}
          <div style={{ paddingTop: 12, paddingBottom: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={S.h2}>Section6 <span style={{ fontWeight: 400, color: "var(--ink-muted)" }}>· Software Consultant</span></h2>
              <div style={{ ...S.mono, fontSize: 11, color: "var(--ink-muted)" }}>2021.03 — 2023.11</div>
            </div>
            <div style={{ ...S.mono, marginTop: 4, fontSize: 11, color: "var(--ink-soft)" }}>stack: <b style={{color:"var(--ink)"}}>C# / .NET · Azure · React / TypeScript · Python · Kubernetes</b></div>

            <div style={{ marginTop: 10, fontSize: 11.5, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 6 }}>
                <span style={{ ...S.monoLabel, minWidth: 100 }}>virtual-cfo</span>
                <span>Built <b>.NET / C# APIs</b> on <b>Azure Functions</b> integrating Xero & BambooHR, paired with <b>React / TypeScript / Fluent UI</b> dashboards for finance teams. APIs processed <b>66k+ records/year</b> in seconds.</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 6 }}>
                <span style={{ ...S.monoLabel, minWidth: 100 }}>bnz-migration</span>
                <span>Red Hat partnership. Python/Bash automation migrated <b style={{color:RED}}>270 of 350</b> Java apps off legacy Kubernetes within a year.</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 6 }}>
                <span style={{ ...S.monoLabel, minWidth: 100 }}>vodafone-dx</span>
                <span>Owned <b>Payment, SMS, and Email gateways</b> on <b>.NET / C# · Azure · Kubernetes</b>, serving Vodafone NZ's digital experience platform.</span>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ ...S.monoLabel, minWidth: 100 }}>also</span>
                <span>Multi-client consulting across banking, telco, and SaaS · CI/CD on TeamCity & GitHub Actions · code review and junior mentoring.</span>
              </div>
            </div>
          </div>
        </div>

        {isClaudeOpen ? (
          <div
            className="claude-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Claude easter egg"
            onClick={() => setIsClaudeOpen(false)}
          >
            <button
              type="button"
              className="claude-lightbox-close"
              aria-label="Close Claude easter egg"
              onClick={() => setIsClaudeOpen(false)}
            >
              x
            </button>
            <img
              src={`${import.meta.env.BASE_URL}BYDH/claude.png`}
              alt="Claude easter egg"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        ) : null}
      </div>
    );
  }

  // page 2
  return (
    <div className="r-page" style={S.page}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ ...S.mono, fontSize: 11, color: RED }}>// curriculum-vitae.md</div>
        <div style={{ ...S.mono, fontSize: 11, color: "var(--ink-muted)" }}>page 2/2</div>
      </div>
      <div style={{ height: 1, background: "var(--ink)", marginTop: 12 }} />

      <div style={{ ...S.sec, marginTop: 16 }}>## side-projects</div>

      <section style={{ borderTop: "1px solid var(--rule)", padding: "12px 0 6px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
          <div>
            <h2 style={{ ...S.h2, fontSize: 16 }}>BYDH ERP · AI powered, solo build</h2>
            <div style={{ ...S.mono, fontSize: 12, fontWeight: 700, color: RED, marginTop: 4 }}>~457,000 LOC · ~10 daily users · 1 maintainer</div>
          </div>
          <div style={{ ...S.mono, fontSize: 9.2, color: "var(--ink-muted)", textAlign: "right", lineHeight: 1.45 }}>
            react · ts · .net · aws · postgres<br />
            <span style={{ color: RED }}>case study at /bydh</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", columnGap: 18, marginTop: 10, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 11.4, lineHeight: 1.55 }}>
              A custom ERP for a construction business. <b>Designed, built, and operated end to end</b> as an AI native system across web and native mobile.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "112px 1fr", columnGap: 10, rowGap: 5, marginTop: 10, fontSize: 10.8, lineHeight: 1.45 }}>
              <span style={{ ...S.monoLabel, color: RED }}>bill-parser</span>
              <span><b>Gemini</b> parses inbound bills, classifies them, and drafts payable/receivable records with review before save.</span>
              <span style={{ ...S.monoLabel, color: RED }}>ai-quoting</span>
              <span><b>MCP</b> lets <b>ChatGPT</b> drive quoting via tool calls, context, pricing lookup, preview, and controlled save.</span>
              <span style={{ ...S.monoLabel, color: RED }}>insights</span>
              <span>Cashflow, P&L, and project profitability dashboards.</span>
              <span style={{ ...S.monoLabel, color: RED }}>mobile</span>
              <span><b>React Native + Expo</b> for site use, sharing auth and <b>AWS Cognito</b> with web.</span>
            </div>
          </div>
          <a href="/resume/bydh" style={{ border: `1px solid ${RED}`, textDecoration: "none", background: "#fafaf7", height: 128, display: "block", overflow: "hidden" }}>
            <img
              src={`${import.meta.env.BASE_URL}BYDH/index.png`}
              alt="BYDH ERP dashboard overview"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
            />
          </a>
        </div>
      </section>

      <div style={{ ...S.sec, marginTop: 14 }}>## live-products</div>
      <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 10, display: "grid", gridTemplateColumns: "145px 1fr", columnGap: 16, rowGap: 8, fontSize: 11.2, lineHeight: 1.5, color: "var(--ink-soft)" }}>
        <div>
          <div style={{ ...S.monoLabel, color: RED }}>Success Health</div>
          <div style={{ ...S.mono, fontSize: 9.5, color: "var(--ink-muted)", marginTop: 1 }}>successhealth.co.nz</div>
        </div>
        <div><b>Built and operate</b> clinic booking and customer-facing flows for a Wellington physio.</div>
        <div>
          <div style={{ ...S.monoLabel, color: RED }}>AHU Handyman</div>
          <a href="https://ahuhandyman.com.au" target="_blank" rel="noreferrer" style={{ ...S.mono, fontSize: 9.5, color: "var(--ink-muted)", marginTop: 1, display: "block", textDecoration: "none" }}>
            ahuhandyman.com.au
          </a>
        </div>
        <div>Public site for an Australian handyman business, focused on service discovery, lead capture, and simple production deployment.</div>
      </div>

      <div style={{ ...S.sec, marginTop: 14 }}>## ml-vision</div>
      <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 10, display: "grid", gridTemplateColumns: "160px 1fr", columnGap: 16, rowGap: 7, fontSize: 11.2, lineHeight: 1.5 }}>
        <a href="https://github.com/skynapier/pixel-style-transfer" target="_blank" rel="noreferrer" style={{ ...S.monoLabel, color: RED, textDecoration: "none" }}>pixel-style-transfer</a>
        <div>Neural style transfer in <b>PyTorch</b>: Gatys + AdaIN + Johnson, VGG-19 features, pixel-art grid-preservation loss, ControlNet baseline.</div>
        <a href="https://github.com/skynapier/cv-self-training-counter" target="_blank" rel="noreferrer" style={{ ...S.monoLabel, color: RED, textDecoration: "none" }}>cv-self-training-counter</a>
        <div>CV auto-label (Dual-Otsu + SimpleBlobDetector) → Label Studio → <b>YOLOv8s</b> self-training loop → CoreML export.</div>
        <a href="https://github.com/skynapier/receipt-ocr" target="_blank" rel="noreferrer" style={{ ...S.monoLabel, color: RED, textDecoration: "none" }}>receipt-ocr</a>
        <div><b>Florence-2</b> VLM + <b>PaddleOCR</b> with line-grouping algorithm and AWS Lambda container deploy plan.</div>
      </div>

      <div style={{ ...S.sec, marginTop: 16 }}>## skills</div>
      <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 22, fontSize: 11.5, lineHeight: 1.7 }}>
        <div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>lang</span> C# / .NET · TypeScript · Python</div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>web</span> React · Redux · Next · MUI · Fluent · Next UI</div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>mobile</span> React Native · Expo</div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>data</span> Postgres · MySQL · DynamoDB · Dapper · EF · Flyway</div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>msg</span> SQS · SNS</div>
        </div>
        <div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>cloud</span> AWS (Lambda, SQS, SNS, DynamoDB, Glue, ECS, S3, RDS, <b>Cognito</b>, CloudFront) · Azure</div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>platform</span> K8s · Docker · Terraform · CloudFormation</div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>ci/cd</span> GitHub Actions · TeamCity · Jenkins</div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>ai</span> Claude Code · Codex · Gemini · MCP · LLM tool use · agents · RAG/context · evals</div>
        </div>
      </div>

      <div style={{ ...S.sec, marginTop: 16 }}>## education + cert</div>
      <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 22, rowGap: 8, fontSize: 11.5 }}>
        <div>
          <div style={{ fontWeight: 600 }}>PGDipSci (Merit), Computer Science</div>
          <div style={S.meta}>University of Auckland · 2020 — 2024</div>
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>BSc, CS & Statistics (AI specialisation)</div>
          <div style={S.meta}>Victoria Univ. of Wellington · 2015 — 2018</div>
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>AWS Certified Developer Associate</div>
          <div style={S.meta}>Amazon Web Services · 2026</div>
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>RHCSA · Red Hat</div>
          <div style={S.meta}>2022 — present</div>
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>Azure Developer Associate · Microsoft</div>
          <div style={S.meta}>2020 — 2022</div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 18, left: 56, right: 56, ...S.mono, fontSize: 10.5, color: "var(--ink-muted)", display: "flex", justifyContent: "space-between" }}>
        <span>// james bai · cv · 2026</span>
        <span>jamesbaiwlg@gmail.com</span>
      </div>
    </div>
  );
}
