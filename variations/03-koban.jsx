/* ==========================================================
   Variation 03 — KŌBAN (交番) · revised
   Sans + Mono mixed, hanko red accent, code-document feel
   Title: Engineer (real) · Objective: Senior IC, AU
   ========================================================== */

const KobanResume = ({ page = 1 }) => {
  const RED = "oklch(0.55 0.16 25)";
  const S = {
    page: {
      fontFamily: '"Inter", "Helvetica Neue", sans-serif',
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
              <b style={{color:"var(--ink)"}}>Engineer @ Xero</b> · 5+ yrs · .NET · AWS · React · <b style={{color:RED}}>LLM firefighter</b>
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
              jamesbaiwlg@gmail.com<br />
              +64 27 202 5777<br />
              github.com/skynapier<br />
              Wellington · NZ
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--ink)", marginTop: 22 }} />

        {/* Summary as code-comment */}
        <div style={{ ...S.mono, marginTop: 14, fontSize: 11.5, lineHeight: 1.55, color: "var(--ink-soft)", whiteSpace: "pre-wrap" }}>
{`/**
 * Software engineer with 5+ years shipping production .NET and AWS systems,
 * currently at Xero on the App Store billing platform. Comfortable owning
 * features end to end: design, delivery, and post launch quality.
 *
 * Self styled "LLM firefighter": pragmatic, AI native, and the person
 * who shows up when an LLM touched system is on fire. Claude Code and
 * Codex are part of my daily workflow. My side project is a ~250,000
 * line AI powered ERP (web + mobile) I built and operate alone, the
 * artifact of how I work in 2026.
 *
 * @objective  Seeking senior software engineering roles
 * @location   Wellington, NZ. Open to relocation within Australasia.
 */`}
        </div>

        <div style={{ ...S.sec, marginTop: 16 }}>## experience</div>

        <div style={{ borderTop: "1px solid var(--rule)" }}>
          {/* Xero */}
          <div style={{ paddingTop: 14, paddingBottom: 14, borderBottom: "1px solid var(--rule)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={S.h2}>Xero <span style={{ fontWeight: 400, color: "var(--ink-muted)" }}>· Engineer</span></h2>
              <div style={{ ...S.mono, fontSize: 11, color: "var(--ink-muted)" }}>2023.11 — present</div>
            </div>
            <div style={{ ...S.mono, marginTop: 4, fontSize: 11, color: "var(--ink-soft)" }}>stack: <b style={{color:"var(--ink)"}}>C# / .NET 6+ · AWS · React / TypeScript · Postgres · Kafka</b></div>

            <div style={{ marginTop: 10, fontSize: 11.5, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 6 }}>
                <span style={{ ...S.monoLabel, minWidth: 100, color: RED }}>sentinel/p0</span>
                <span><b>Feature lead</b> on two features for the global <b>App Store usage-based billing</b> rewrite. Designed and shipped the <b>.NET / C#</b> APIs and Postgres schema that became the <b>billing core</b>. <b style={{color:RED}}>Live ~1 month, only one minor bug found.</b> Also built the <b>AWS Glue</b> aggregation pipeline.</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 6 }}>
                <span style={{ ...S.monoLabel, minWidth: 100, color: RED }}>ai/mcp-team</span>
                <span>Selected to a new team owning Xero's official <b>AI tooling surface</b>, including the <b>Xero MCP server</b> (.NET, Apr 2026 to present).</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 6 }}>
                <span style={{ ...S.monoLabel, minWidth: 100 }}>plan-migration</span>
                <span>Co-designed and shipped <b>React / Refine / MUI</b> SPA backed by a <b>.NET BFF</b> for App Store merchant self-service.</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 6 }}>
                <span style={{ ...S.monoLabel, minWidth: 100 }}>manual-invoicing</span>
                <span><b>Feature lead</b> on the manual-invoicing flow that <b>recovered hundreds of thousands of dollars</b> in overdue invoices. Leadership shout-out.</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 6 }}>
                <span style={{ ...S.monoLabel, minWidth: 100 }}>us-tax-support</span>
                <span>On-call owner for the <b>US Sales Tax</b> service supporting Xero's US merchants: production incidents, schema fixes, customer-facing data corrections.</span>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ ...S.monoLabel, minWidth: 100 }}>also</span>
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

      {/* Side projects */}
      <div style={{ ...S.sec, marginTop: 20 }}>## side-projects</div>

      <div style={{ display: "grid", gridTemplateColumns: "1.45fr 1fr", columnGap: 22 }}>
        <div>
          <h2 style={{ ...S.h2, fontSize: 16 }}>BYDH ERP · AI powered, solo build</h2>
          <div style={{ ...S.mono, fontSize: 12, fontWeight: 700, color: RED, marginTop: 4 }}>~250,000 LOC · operating · 1 maintainer</div>
          <div style={{ marginTop: 10, fontSize: 11.5, lineHeight: 1.65 }}>
            A custom ERP for a construction business. <b>Designed, built, and operated end to end</b> as an AI native system. Web + native mobile.
          </div>
          <div style={{ marginTop: 10, fontSize: 10.5, lineHeight: 1.65 }}>
            <div style={{ marginBottom: 5 }}><span style={{ ...S.monoLabel, color: RED }}>email→ledger</span> &nbsp; <b>Gemini</b> parses inbound bills, classifies, and creates payable/receivable records. Settlement <b>auto-creates the payment entry</b>, replacing manual admin work.</div>
            <div style={{ marginBottom: 5 }}><span style={{ ...S.monoLabel, color: RED }}>ai-quoting</span> &nbsp; Wired the system to <b>MCP</b> so quoting can be driven from <b>ChatGPT</b>, replacing the team's Xero + Monday usage.</div>
            <div style={{ marginBottom: 5 }}><span style={{ ...S.monoLabel, color: RED }}>insights</span> &nbsp; Cashflow, P&L, project profitability dashboards.</div>
            <div><span style={{ ...S.monoLabel, color: RED }}>mobile</span> &nbsp; <b>React Native + Expo</b> app for on site field use; shares auth + <b>AWS Cognito</b> with the web app.</div>
          </div>
        </div>

        <div>
          <a href="bydh.html" style={{
            display: "block",
            border: `1px solid ${RED}`, textDecoration: "none",
            background: "repeating-linear-gradient(135deg, #fbf1ee, #fbf1ee 6px, #fafaf7 6px, #fafaf7 12px)",
            height: 110,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "ui-monospace, monospace", fontSize: 10, color: RED,
          }}>
            ▢ &nbsp; bydh-erp · screenshot
          </a>
          <div style={{ ...S.mono, fontSize: 9, color: "var(--ink-muted)", marginTop: 6 }}>
            stack: react · ts · .net · aws (cloudfront, rds, lambda) · postgres
          </div>
          <div style={{ ...S.mono, fontSize: 9, color: RED, marginTop: 4 }}>
            → case study at /bydh
          </div>
        </div>
      </div>

      {/* successhealth */}
      <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--rule)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h2 style={{ ...S.h2, fontSize: 15 }}>Success Health · booking platform</h2>
          <div style={{ ...S.mono, fontSize: 11, color: "var(--ink-muted)" }}>successhealth.co.nz · live</div>
        </div>
        <div style={{ marginTop: 6, fontSize: 11.5, lineHeight: 1.6, color: "var(--ink-soft)" }}>
          <b>Built and operate</b> the website and online booking system for a Wellington physio. <b>React, Tailwind, C#, AWS</b> (CloudFront, RDS, Lambda). Live and serving real clients in production.
        </div>
      </div>

      <div style={{ ...S.sec, marginTop: 22 }}>## skills</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 22, fontSize: 11.5, lineHeight: 1.7 }}>
        <div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>lang</span> C# / .NET · TypeScript · Python</div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>web</span> React · Redux · Next · MUI · Fluent · Next UI</div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>mobile</span> React Native · Expo</div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>data</span> Postgres · MySQL · DynamoDB · Dapper · EF · Flyway</div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>msg</span> SNS · SQS · Kafka</div>
        </div>
        <div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>cloud</span> AWS (ECS, S3, RDS, Lambda, Glue, <b>Cognito</b>, <b>DynamoDB</b>, CloudFront) · Azure</div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>platform</span> K8s · Docker · Terraform · CloudFormation</div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>ci/cd</span> GitHub Actions · TeamCity · Jenkins</div>
          <div><span style={{ ...S.monoLabel, color: RED, minWidth: 80, display: "inline-block" }}>ai</span> Claude Code · Codex · Gemini · MCP (author + user)</div>
        </div>
      </div>

      <div style={{ ...S.sec, marginTop: 20 }}>## education + cert</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 22, rowGap: 8, fontSize: 11.5 }}>
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
};

window.KobanResume = KobanResume;
