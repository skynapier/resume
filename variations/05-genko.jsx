/* ==========================================================
   Variation 05 — GENKŌ (原稿)
   Manuscript-grid feel, tabular numerics, engineer-document
   Sans + Mono, restrained document blue accent
   ========================================================== */

const GenkoResume = ({ page = 1 }) => {
  const BLUE = "oklch(0.42 0.08 250)";
  const S = {
    page: {
      fontFamily: '"Inter", "Helvetica Neue", sans-serif',
      padding: "44px 52px 44px",
      color: "var(--ink)",
      fontSize: "10.5px",
      lineHeight: 1.55,
      background: "#fafaf7",
    },
    mono: { fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontVariantNumeric: "tabular-nums" },
    label: { fontSize: "8.5px", letterSpacing: "0.22em", textTransform: "uppercase", color: BLUE, fontWeight: 700 },
    h2: { fontSize: "12px", fontWeight: 700, margin: 0 },
    meta: { fontSize: "9.5px", color: "var(--ink-muted)" },
  };

  // Document meta header (like a technical report)
  const DocHeader = ({ title, doc, rev }) => (
    <div style={{ borderBottom: `2px solid ${BLUE}`, paddingBottom: 8, marginBottom: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", columnGap: 20, fontSize: 9, ...S.mono, color: "var(--ink-muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
        <div>Document</div>
        <div>Doc.&nbsp;ID</div>
        <div>Revision</div>
        <div style={{ textAlign: "right" }}>Issued</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", columnGap: 20, fontSize: 11, fontWeight: 600, marginTop: 4 }}>
        <div>{title}</div>
        <div style={S.mono}>{doc}</div>
        <div style={S.mono}>{rev}</div>
        <div style={{ ...S.mono, textAlign: "right" }}>2026-05</div>
      </div>
    </div>
  );

  if (page === 1) {
    return (
      <div className="r-page" style={S.page}>
        <DocHeader title="Curriculum Vitæ — James Bai" doc="JB-CV-001" rev="2026.05" />

        {/* identity block */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "flex-end", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1 }}>James Bai</div>
            <div style={{ ...S.label, marginTop: 8, color: BLUE }}>Senior Software Engineer · 5+ yrs</div>
          </div>
          <div style={{ ...S.mono, fontSize: 9.5, color: "var(--ink-soft)", textAlign: "right", lineHeight: 1.7 }}>
            jamesbaiwlg@gmail.com<br />
            +64 27 202 5777<br />
            github.com/skynapier<br />
            Wellington · NZ
          </div>
        </div>

        {/* Summary in field-style */}
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", borderTop: "1px solid var(--rule)", paddingTop: 14, paddingBottom: 14, borderBottom: "1px solid var(--rule)" }}>
          <div style={S.label}>1.0 &nbsp; Profile</div>
          <div style={{ fontSize: 11, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            Senior software engineer shipping production .NET + AWS systems for 5+ years, currently on Xero's App Store billing platform.
            Claude Code and Codex run in my daily loop. Side project: a <b style={{ color: "var(--ink)" }}>~250,000-line AI-powered ERP</b> I built and operate alone.
            Pragmatic about where LLMs help; skeptical where they don't.
          </div>
        </div>

        {/* Highlights — three numbered metric cards */}
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", borderBottom: "1px solid var(--rule)", paddingTop: 16, paddingBottom: 16 }}>
          <div style={S.label}>2.0 &nbsp; Highlights</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", columnGap: 16 }}>
            {[
              { n: "01", k: "250,000", v: "lines of code", d: "Solo-built, AI-powered ERP — BYDH" },
              { n: "02", k: "5+ yrs", v: "production", d: ".NET, AWS, React — multi-team" },
              { n: "03", k: "1 bug", v: "1 month live", d: "Project Sentinel billing core, few-line fix" },
            ].map(x => (
              <div key={x.n} style={{ borderLeft: `2px solid ${BLUE}`, paddingLeft: 10 }}>
                <div style={{ ...S.mono, fontSize: 8.5, color: BLUE, letterSpacing: "0.1em" }}>{x.n}</div>
                <div style={{ ...S.mono, fontSize: 22, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", marginTop: 4 }}>{x.k}</div>
                <div style={{ ...S.meta, marginTop: 2 }}>{x.v}</div>
                <div style={{ fontSize: 9.5, marginTop: 6, color: "var(--ink-soft)", lineHeight: 1.5 }}>{x.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", paddingTop: 16 }}>
          <div style={S.label}>3.0 &nbsp; Experience</div>
          <div>
            {/* 3.1 Xero */}
            <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--rule-soft)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <div style={{ ...S.mono, fontSize: 9, color: BLUE, letterSpacing: "0.08em" }}>3.1</div>
                  <h2 style={{ ...S.h2, marginTop: 2 }}>Xero — Engineer</h2>
                  <div style={S.meta}>App Store Billing · Wellington</div>
                </div>
                <div style={{ ...S.mono, ...S.meta }}>2023.11 → present</div>
              </div>

              <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "100px 1fr", columnGap: 14, rowGap: 6, fontSize: 10.5 }}>
                <div style={{ ...S.mono, ...S.meta }}>2025.07–</div>
                <div><b>Project Sentinel</b> (P0). Lead on two features for App Store usage-based billing. Designed + shipped the API and DB schema that became the billing core. <b>Live 1 month, 1 minor bug, few-line fix.</b> Built the AWS Glue aggregation pipeline.</div>

                <div style={{ ...S.mono, ...S.meta }}>2026.04–</div>
                <div><b>Xero AI / MCP team</b>. Selected to a new team owning Xero's official AI surface, including the Xero MCP server.</div>

                <div style={{ ...S.mono, ...S.meta }}>2025.02–05</div>
                <div><b>Plan Migration Service</b>. Co-designed and shipped React/Refine/MUI SPA + BFF for App Store merchant self-service.</div>

                <div style={{ ...S.mono, ...S.meta }}>2024.01–25.02</div>
                <div><b>Manually Invoicing</b>. Led the feature that recovered hundreds of thousands of dollars in overdue invoices. Leadership shout-out.</div>

                <div style={{ ...S.mono, ...S.meta }}>2024–25</div>
                <div>US Tax Support · CodeRed CI/CD · Deep Embed Service · shared frontend libs · PCI · associate mentoring.</div>
              </div>
            </div>

            {/* 3.2 Section6 */}
            <div style={{ paddingTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <div style={{ ...S.mono, fontSize: 9, color: BLUE, letterSpacing: "0.08em" }}>3.2</div>
                  <h2 style={{ ...S.h2, marginTop: 2 }}>Section6 — Software Consultant</h2>
                  <div style={S.meta}>Wellington</div>
                </div>
                <div style={{ ...S.mono, ...S.meta }}>2021.03 → 2023.11</div>
              </div>

              <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "100px 1fr", columnGap: 14, rowGap: 6, fontSize: 10.5 }}>
                <div style={{ ...S.mono, ...S.meta }}>2023</div>
                <div><b>Virtual CFO</b>. .NET + Azure Functions APIs integrating Xero & BambooHR; React/TS/Fluent UI dashboards. APIs processed 66k+ records/year in seconds.</div>

                <div style={{ ...S.mono, ...S.meta }}>2022–23</div>
                <div><b>BNZ Migration</b> (Red Hat). Python/Bash automation migrated <b>270/350</b> Java apps off legacy Kubernetes within a year.</div>

                <div style={{ ...S.mono, ...S.meta }}>2021–22</div>
                <div><b>Vodafone DX</b>. Payment, SMS, Email gateways on .NET + Azure + Kubernetes.</div>
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
      <DocHeader title="Curriculum Vitæ — James Bai (cont.)" doc="JB-CV-001" rev="2026.05" />

      {/* Side project full-bleed */}
      <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", paddingBottom: 16, borderBottom: "1px solid var(--rule)" }}>
        <div style={S.label}>4.0 &nbsp; Side Project</div>
        <div>
          <h2 style={{ ...S.h2, fontSize: 18 }}>BYDH ERP — AI-Powered Construction ERP</h2>
          <div style={{ ...S.mono, ...S.meta, marginTop: 4, color: BLUE }}>~250,000 LOC · solo build · still operating</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 22, rowGap: 12, marginTop: 14, fontSize: 10.5, lineHeight: 1.6 }}>
            <div>
              <div style={{ ...S.label, color: BLUE }}>4.1 Email → Ledger</div>
              <p style={{ margin: "4px 0 0" }}>Inbound bills are parsed by Gemini, classified, uploaded, and turned into payable / receivable entries. Settlement auto-creates the payment record. Killed manual admin.</p>
            </div>
            <div>
              <div style={{ ...S.label, color: BLUE }}>4.2 MCP Quoting</div>
              <p style={{ margin: "4px 0 0" }}>Wired the system to MCP — quoting drives from ChatGPT. Replaced the team's Xero + Monday usage for that workflow.</p>
            </div>
            <div>
              <div style={{ ...S.label, color: BLUE }}>4.3 Finance Insights</div>
              <p style={{ margin: "4px 0 0" }}>Cashflow, P&L, project profitability dashboards.</p>
            </div>
            <div>
              <div style={{ ...S.label, color: BLUE }}>4.4 Stack</div>
              <p style={{ ...S.mono, fontSize: 10, margin: "4px 0 0" }}>react · ts · .net · aws (cloudfront, rds, lambda) · postgres</p>
            </div>
          </div>

          <div style={{
            marginTop: 14, border: `1px dashed ${BLUE}`,
            background: "repeating-linear-gradient(135deg, #eef0f5, #eef0f5 6px, #fafaf7 6px, #fafaf7 12px)",
            height: 90,
            display: "flex", alignItems: "center", justifyContent: "center",
            ...S.mono, fontSize: 10, color: BLUE,
          }}>
            FIG. 1 &nbsp; bydh-erp dashboard · screenshot placeholder
          </div>
        </div>
      </div>

      {/* Skills */}
      <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", paddingTop: 14, paddingBottom: 14, borderBottom: "1px solid var(--rule)" }}>
        <div style={S.label}>5.0 &nbsp; Skills</div>
        <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", rowGap: 5, columnGap: 14, fontSize: 10.5 }}>
          <div style={{ ...S.mono, ...S.meta }}>5.1 Lang</div><div>C# / .NET · TypeScript · Python · Rust</div>
          <div style={{ ...S.mono, ...S.meta }}>5.2 Web</div><div>React · Redux · Next · MUI · Fluent UI · Next UI</div>
          <div style={{ ...S.mono, ...S.meta }}>5.3 Data</div><div>PostgreSQL · MySQL · Dapper · EF · Flyway · DynamoDB</div>
          <div style={{ ...S.mono, ...S.meta }}>5.4 Cloud</div><div>AWS (ECS, S3, RDS, Lambda, CloudFront, Glue) · Azure</div>
          <div style={{ ...S.mono, ...S.meta }}>5.5 Platform</div><div>Kubernetes · Docker · Terraform · CloudFormation</div>
          <div style={{ ...S.mono, ...S.meta }}>5.6 CI/CD</div><div>GitHub Actions · TeamCity · Jenkins</div>
          <div style={{ ...S.mono, ...S.meta }}>5.7 AI</div><div>Claude Code · Codex · Gemini API · MCP (author + integrator)</div>
        </div>
      </div>

      {/* Education */}
      <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", paddingTop: 14, paddingBottom: 14, borderBottom: "1px solid var(--rule)" }}>
        <div style={S.label}>6.0 &nbsp; Education</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 22, rowGap: 8, fontSize: 10.5 }}>
          <div>
            <div style={{ fontWeight: 600 }}>PGDipSci (Merit), Computer Science</div>
            <div style={S.meta}>University of Auckland · 2020 — 2024</div>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>BSc, CS & Statistics (AI specialisation)</div>
            <div style={S.meta}>Victoria Univ. of Wellington · 2015 — 2018</div>
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

      <div style={{ ...S.mono, fontSize: 9, color: "var(--ink-muted)", letterSpacing: "0.05em", display: "flex", justifyContent: "space-between", marginTop: 14 }}>
        <span>END OF DOCUMENT — JB-CV-001 — REV 2026.05</span>
        <span>Page 02 / 02</span>
      </div>
    </div>
  );
};

window.GenkoResume = GenkoResume;
