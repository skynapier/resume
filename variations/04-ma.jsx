/* ==========================================================
   Variation 04 — MA (間)
   Extreme whitespace · tiny type · vertical timeline rail
   ========================================================== */

const MaResume = ({ page = 1 }) => {
  const S = {
    page: {
      fontFamily: '"Inter", "Helvetica Neue", sans-serif',
      padding: "80px 84px 72px",
      color: "var(--ink)",
      fontSize: "9.5px",
      lineHeight: 1.7,
      background: "#fafaf7",
      letterSpacing: "0.005em",
    },
    label: {
      fontSize: "8px",
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      color: "var(--ink-muted)",
      fontWeight: 500,
    },
    name: {
      fontFamily: '"Source Serif 4", "Source Serif Pro", Georgia, serif',
      fontSize: "26px",
      fontWeight: 400,
      letterSpacing: "-0.005em",
      margin: 0,
      lineHeight: 1.1,
    },
    h: { fontSize: "11px", fontWeight: 600, margin: 0, letterSpacing: "-0.005em" },
    meta: { fontSize: "8.5px", color: "var(--ink-muted)", letterSpacing: "0.04em" },
  };

  const TimelineItem = ({ year, title, meta, children }) => (
    <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", columnGap: 28, paddingTop: 18, paddingBottom: 18, borderTop: "1px solid var(--rule-soft)" }}>
      <div style={{ ...S.meta, fontVariantNumeric: "tabular-nums", paddingTop: 2 }}>{year}</div>
      <div>
        <div style={{ ...S.h }}>{title}</div>
        {meta && <div style={{ ...S.meta, marginTop: 3 }}>{meta}</div>}
        <div style={{ marginTop: 8, fontSize: 10, lineHeight: 1.65, color: "var(--ink-soft)", maxWidth: "92%" }}>{children}</div>
      </div>
    </div>
  );

  if (page === 1) {
    return (
      <div className="r-page" style={S.page}>
        {/* Header — extreme negative space */}
        <div style={{ marginBottom: 64 }}>
          <div style={S.label}>Curriculum Vitæ · 2026</div>
          <h1 style={{ ...S.name, marginTop: 18 }}>James Bai</h1>
          <div style={{ ...S.label, marginTop: 18, color: "var(--ink)" }}>Senior Software Engineer</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", columnGap: 28, fontSize: 10, lineHeight: 1.7 }}>
          <div style={S.label}>Contact</div>
          <div style={{ color: "var(--ink-soft)" }}>
            jamesbaiwlg@gmail.com<br />
            +64&nbsp;27&nbsp;202&nbsp;5777<br />
            github.com/skynapier · Wellington
          </div>
        </div>

        <div style={{ marginTop: 36 }}>
          <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", columnGap: 28 }}>
            <div style={S.label}>Profile</div>
            <p style={{ margin: 0, fontSize: 11, lineHeight: 1.7, color: "var(--ink-soft)", maxWidth: "92%" }}>
              5+ years shipping production .NET and AWS systems — most recently on Xero's App Store billing platform.
              Claude Code and Codex are part of my daily loop. My side project is a 250,000-line AI-powered ERP, built and operated alone.
              Pragmatic about where AI earns its place; opinionated about where it doesn't.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <div style={{ ...S.label, marginBottom: 4 }}>Experience</div>

          <TimelineItem year="2025—" title="Project Sentinel · Xero" meta="App Store usage-based billing · P0">
            Lead engineer on two features. Designed and shipped the API + database schema that became the billing core.
            <b style={{ color: "var(--ink)" }}> Live ~1 month, 1 minor bug found, few-line fix.</b> Also built the AWS Glue aggregation pipeline.
          </TimelineItem>

          <TimelineItem year="2026—" title="Xero AI / MCP team" meta="New team · Xero MCP server">
            Selected to a new team owning Xero's official AI tooling surface, including the Xero MCP server.
          </TimelineItem>

          <TimelineItem year="2024—25" title="Plan Migration · Manual Invoicing · CodeRed · US Tax · Deep Embed" meta="Multiple P0 deliveries · Xero">
            Co-designed merchant self-service SPA + BFF (React/Refine/MUI). Recovered hundreds of thousands of dollars in overdue invoices (leadership shout-out).
            Reviewed and refactored CI/CD across the team. Built a financial reporting generator that exceeded product spec.
          </TimelineItem>

          <TimelineItem year="2021—23" title="Section6 · Software Consultant" meta="BNZ · Vodafone · Virtual CFO">
            BNZ Java migration: <b style={{ color: "var(--ink)" }}>270 of 350</b> apps off legacy Kubernetes within a year. Virtual CFO APIs processing 66k+ records/year in seconds. Vodafone Payment / SMS / Email gateways.
          </TimelineItem>
        </div>
      </div>
    );
  }

  return (
    <div className="r-page" style={S.page}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ ...S.label }}>James Bai</div>
        <div style={{ ...S.label }}>02 / 02</div>
      </div>

      <div style={{ marginTop: 48 }}>
        <div style={S.label}>Side Project</div>
        <h2 style={{ ...S.name, fontSize: 22, marginTop: 14 }}>BYDH ERP</h2>
        <div style={{ ...S.label, marginTop: 6, color: "var(--ink-muted)" }}>Solo build · ~250,000 lines · still operating</div>

        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "60px 1fr", columnGap: 28 }}>
          <div style={S.label}>What</div>
          <p style={{ margin: 0, fontSize: 10.5, lineHeight: 1.7, color: "var(--ink-soft)" }}>
            A custom AI-powered ERP for a construction business. Email-to-ledger, finance insights, MCP-driven quoting — all built and operated alone.
          </p>
        </div>

        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", columnGap: 24, fontSize: 10, lineHeight: 1.6 }}>
          <div>
            <div style={{ ...S.label, marginBottom: 6 }}>Email → Ledger</div>
            Gemini parses inbound bills, classifies, uploads, creates payable / receivable. Settlement auto-creates the payment record.
          </div>
          <div>
            <div style={{ ...S.label, marginBottom: 6 }}>MCP Quoting</div>
            Wired to MCP — quoting drives from ChatGPT. Replaced the team's Xero + Monday usage for that workflow.
          </div>
          <div>
            <div style={{ ...S.label, marginBottom: 6 }}>Insights</div>
            Cashflow, P&L, project profitability dashboards. Same data, much faster.
          </div>
        </div>

        <div style={{
          marginTop: 28, border: "1px solid var(--rule)",
          background: "repeating-linear-gradient(135deg, #f3f1ea, #f3f1ea 6px, #fafaf7 6px, #fafaf7 12px)",
          height: 80,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "ui-monospace, monospace", fontSize: 10, color: "var(--ink-muted)", letterSpacing: "0.05em",
        }}>
          ▢ &nbsp; bydh erp · screenshot
        </div>
      </div>

      <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "60px 1fr", columnGap: 28 }}>
        <div style={S.label}>Skills</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 28, rowGap: 4, fontSize: 10, lineHeight: 1.7 }}>
          <div><span style={{ ...S.label, marginRight: 8 }}>Lang</span>C# / .NET · TS · Python · Rust</div>
          <div><span style={{ ...S.label, marginRight: 8 }}>Cloud</span>AWS · Azure · K8s · Terraform</div>
          <div><span style={{ ...S.label, marginRight: 8 }}>Web</span>React · Redux · MUI · Fluent UI</div>
          <div><span style={{ ...S.label, marginRight: 8 }}>Data</span>Postgres · MySQL · Dynamo · EF</div>
          <div><span style={{ ...S.label, marginRight: 8 }}>CI/CD</span>GitHub Actions · TeamCity · Jenkins</div>
          <div><span style={{ ...S.label, marginRight: 8 }}>AI</span>Claude Code · Codex · Gemini · MCP</div>
        </div>
      </div>

      <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "60px 1fr", columnGap: 28 }}>
        <div style={S.label}>Education</div>
        <div style={{ fontSize: 10, lineHeight: 1.7 }}>
          <div><b>PGDipSci (Merit), Computer Science</b> · University of Auckland · 2020 — 2024</div>
          <div><b>BSc, CS & Statistics (AI)</b> · Victoria University of Wellington · 2015 — 2018</div>
          <div style={{ ...S.meta, marginTop: 6 }}>Red Hat Certified System Administrator (2022—) · Azure Developer Associate (2020—22)</div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 36, left: 84, right: 84, display: "flex", justifyContent: "space-between", ...S.label }}>
        <span>References on request</span>
        <span>2026</span>
      </div>
    </div>
  );
};

window.MaResume = MaResume;
