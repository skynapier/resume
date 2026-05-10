/* ==========================================================
   Variation 02 — SUMI (墨)
   Editorial serif, generous whitespace, single enso accent
   ========================================================== */

const SumiResume = ({ page = 1 }) => {
  const S = {
    page: {
      fontFamily: '"Source Serif 4", "Source Serif Pro", Georgia, serif',
      padding: "64px 70px 56px",
      color: "var(--ink)",
      fontSize: "11px",
      lineHeight: 1.6,
      background: "var(--paper)",
    },
    sansLabel: {
      fontFamily: '"Inter", "Helvetica Neue", sans-serif',
      fontSize: "9px",
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: "var(--ink-muted)",
      fontWeight: 600,
    },
    h1: { fontSize: "44px", fontWeight: 400, letterSpacing: "-0.015em", margin: 0, lineHeight: 1, fontStyle: "italic" },
    h2: { fontSize: "16px", fontWeight: 600, margin: "0 0 2px", letterSpacing: "-0.005em" },
    meta: { fontFamily: '"Inter", sans-serif', fontSize: "9.5px", color: "var(--ink-muted)", letterSpacing: "0.04em" },
    rule: { border: 0, height: 1, background: "var(--rule)", margin: 0 },
    sectionGap: { marginTop: 26 },
  };

  if (page === 1) {
    return (
      <div className="r-page" style={S.page}>
        {/* Top: enso + name */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={S.sansLabel}>Curriculum Vitæ</div>
            <h1 style={{ ...S.h1, marginTop: 14 }}>James Bai</h1>
            <div style={{ ...S.sansLabel, marginTop: 14, color: "var(--ink)" }}>Senior Software Engineer</div>
          </div>
          <svg width="78" height="78" viewBox="0 0 60 60" style={{ marginTop: 4 }}>
            <path d="M 30 6 A 23 23 0 1 1 16 11.5"
                  stroke="#1a1a1a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ ...S.meta, marginTop: 18, display: "flex", gap: 18 }}>
          <span>Wellington, NZ</span><span>·</span>
          <span>jamesbaiwlg@gmail.com</span><span>·</span>
          <span>+64 27 202 5777</span><span>·</span>
          <span>github.com/skynapier</span>
        </div>

        <hr style={{ ...S.rule, marginTop: 22 }} />

        {/* Profile — pull quote */}
        <div style={S.sectionGap}>
          <p style={{ fontSize: "15px", lineHeight: 1.55, fontStyle: "italic", color: "var(--ink)", margin: 0, maxWidth: "78%" }}>
            "Five years of solid .NET and cloud engineering — and an AI-native operator's instinct.
            Claude Code and Codex are part of my daily loop. My side project is a 250,000-line ERP, built and operated alone."
          </p>
        </div>

        <hr style={{ ...S.rule, marginTop: 28 }} />

        {/* Experience */}
        <div style={S.sectionGap}>
          <div style={S.sansLabel}>Experience</div>

          <div style={{ marginTop: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={S.h2}>Xero <span style={{ fontWeight: 400, color: "var(--ink-muted)" }}>· Engineer</span></h2>
              <div style={S.meta}>NOV 2023 — PRESENT</div>
            </div>
            <div style={{ ...S.meta, marginBottom: 8 }}>App Store Billing · Wellington</div>

            <ul style={{ margin: 0, paddingLeft: 16, fontSize: "11px", lineHeight: 1.65 }}>
              <li><b>Project Sentinel</b> (P0) — lead engineer on two features for App Store usage-based billing. Designed and shipped the API + DB schema that became the billing core. <i>Live ~1 month, 1 small bug found, few-line fix.</i> Built the AWS Glue aggregation pipeline.</li>
              <li><b>Xero AI / MCP team</b> — selected to a new team owning Xero's official AI surface, including the Xero MCP server.</li>
              <li><b>Plan Migration Service</b> — co-designed and shipped the React/Refine/MUI SPA + BFF for App Store merchant self-service.</li>
              <li><b>Manually Invoicing System</b> — led the feature that recovered hundreds of thousands of dollars in overdue invoices. Leadership shout-out.</li>
              <li><b>US Tax Support · CodeRed CI/CD · Deep Embed Service</b> — multiple P0 deliveries; financial reporting generator that exceeded product spec.</li>
            </ul>
          </div>

          <div style={{ marginTop: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={S.h2}>Section6 <span style={{ fontWeight: 400, color: "var(--ink-muted)" }}>· Software Consultant</span></h2>
              <div style={S.meta}>MAR 2021 — NOV 2023</div>
            </div>
            <ul style={{ margin: "8px 0 0", paddingLeft: 16, fontSize: "11px", lineHeight: 1.65 }}>
              <li><b>Virtual CFO</b> — .NET + Azure Functions APIs integrating Xero & BambooHR; React/TS/Fluent UI dashboards. APIs processed 66k+ records/year in seconds.</li>
              <li><b>BNZ Platform Migration</b> (Red Hat) — Python/Bash automation migrated <b>270 of 350</b> Java apps off legacy Kubernetes within a year.</li>
              <li><b>Vodafone DX Integration</b> — Payment, SMS, Email gateways on .NET + Azure + Kubernetes.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Page 2
  return (
    <div className="r-page" style={S.page}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontStyle: "italic", fontSize: 13 }}>James Bai</div>
        <div style={S.meta}>II / II</div>
      </div>
      <hr style={{ ...S.rule, marginTop: 12 }} />

      {/* Side project hero */}
      <div style={S.sectionGap}>
        <div style={S.sansLabel}>Selected Side Project</div>
        <h2 style={{ ...S.h2, marginTop: 12, fontSize: "22px", fontWeight: 400, fontStyle: "italic" }}>
          BYDH ERP — an AI-powered system, built alone.
        </h2>
        <div style={{ ...S.meta, marginTop: 4 }}>~250,000 lines of code · still operating · React · TS · .NET · AWS</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 26, rowGap: 14, marginTop: 18, fontSize: "11px", lineHeight: 1.6 }}>
          <div>
            <div style={S.sansLabel}>Email → Ledger</div>
            <p style={{ margin: "4px 0 0" }}>Inbound bills are parsed by Gemini, classified, and turned into payable / receivable entries. Settlement auto-creates the payment record. Killed manual admin.</p>
          </div>
          <div>
            <div style={S.sansLabel}>MCP Quoting</div>
            <p style={{ margin: "4px 0 0" }}>Wired the system to MCP — quoting can be driven from ChatGPT. Replaced the team's Xero + Monday usage for that workflow.</p>
          </div>
          <div>
            <div style={S.sansLabel}>Finance Insights</div>
            <p style={{ margin: "4px 0 0" }}>Cashflow, P&L, project profitability dashboards. Same data, much faster.</p>
          </div>
          <div>
            <div style={S.sansLabel}>Operations</div>
            <p style={{ margin: "4px 0 0" }}>Also operate <i>successhealth.co.nz</i> — booking system on the same stack.</p>
          </div>
        </div>

        <div style={{
          marginTop: 18,
          border: "1px solid var(--rule)",
          background: "repeating-linear-gradient(135deg, #f3f1ea, #f3f1ea 6px, #fafaf7 6px, #fafaf7 12px)",
          height: 92,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "ui-monospace, monospace", fontSize: 10, color: "var(--ink-muted)",
        }}>
          ▢ &nbsp; bydh erp · drop screenshot here
        </div>
      </div>

      <hr style={{ ...S.rule, marginTop: 26 }} />

      {/* Skills */}
      <div style={S.sectionGap}>
        <div style={S.sansLabel}>Skills</div>
        <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", rowGap: 6, columnGap: 18, marginTop: 12, fontSize: "11px" }}>
          <div style={{ ...S.meta, paddingTop: 2 }}>Languages</div>
          <div>C# / .NET · TypeScript · Python · Rust</div>
          <div style={{ ...S.meta, paddingTop: 2 }}>Web</div>
          <div>React, Redux, Next.js · MUI, Fluent UI, Next UI</div>
          <div style={{ ...S.meta, paddingTop: 2 }}>Data</div>
          <div>PostgreSQL · MySQL · Dapper, EF, Flyway · DynamoDB</div>
          <div style={{ ...S.meta, paddingTop: 2 }}>Cloud</div>
          <div>AWS (EC2/ECS, S3, RDS, Lambda, CloudFront, Glue) · Azure</div>
          <div style={{ ...S.meta, paddingTop: 2 }}>Platform</div>
          <div>Kubernetes · Docker · Terraform · CloudFormation · CI/CD (GHA, TeamCity, Jenkins)</div>
          <div style={{ ...S.meta, paddingTop: 2 }}>AI tooling</div>
          <div>Claude Code · Codex · Gemini API · MCP (author + integrator)</div>
        </div>
      </div>

      <hr style={{ ...S.rule, marginTop: 26 }} />

      {/* Education */}
      <div style={S.sectionGap}>
        <div style={S.sansLabel}>Education & Certification</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 26, rowGap: 10, marginTop: 12, fontSize: "11px" }}>
          <div>
            <div style={{ fontWeight: 600 }}>PGDipSci (Merit), Computer Science</div>
            <div style={S.meta}>University of Auckland · 2020 — 2024</div>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>BSc, CS & Statistics (AI specialisation)</div>
            <div style={S.meta}>Victoria University of Wellington · 2015 — 2018</div>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>Red Hat Certified System Administrator</div>
            <div style={S.meta}>2022 — present</div>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>Azure Developer Associate</div>
            <div style={S.meta}>2020 — 2022</div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: 70, right: 70, display: "flex", justifyContent: "space-between", ...S.meta }}>
        <span style={{ fontStyle: "italic" }}>References on request.</span>
        <span>2026</span>
      </div>
    </div>
  );
};

window.SumiResume = SumiResume;
