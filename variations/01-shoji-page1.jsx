/* ==========================================================
   Variation 01 — SHOJI
   Strict grid · Helvetica · pure B/W · thin lines as shōji
   ========================================================== */

const ShojiResume = () => {
  const S = {
    page: {
      fontFamily: '"Helvetica Neue", "Inter", system-ui, sans-serif',
      padding: "56px 60px 50px",
      color: "var(--ink)",
      fontSize: "10.5px",
      lineHeight: 1.55,
      background: "#ffffff",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "180px 1fr",
      columnGap: "32px",
    },
    name: {
      fontSize: "32px",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1,
      margin: 0,
    },
    title: {
      fontSize: "11px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--ink-muted)",
      marginTop: 8,
      fontWeight: 500,
    },
    contact: {
      fontSize: "10px",
      lineHeight: 1.6,
      color: "var(--ink-soft)",
      marginTop: 14,
    },
    sectionLabel: {
      fontSize: "9px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--ink)",
      fontWeight: 700,
      paddingTop: 14,
    },
    h3: { fontSize: "12.5px", fontWeight: 700, margin: "0 0 2px" },
    meta: { fontSize: "10px", color: "var(--ink-muted)", marginBottom: 6 },
    rule: { border: 0, height: 1, background: "#1c1c1c", margin: 0 },
    softRule: { border: 0, height: 1, background: "#e0e0e0", margin: 0 },
  };

  const Section = ({ label, children }) => (
    <>
      <div style={S.sectionLabel}>{label}</div>
      <div style={{ paddingTop: 14 }}>{children}</div>
    </>
  );

  return (
    <div className="r-page" style={S.page}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={S.name}>James Bai</h1>
          <div style={S.title}>Senior Software Engineer</div>
        </div>
        <div style={{ textAlign: "right", ...S.contact, marginTop: 0 }}>
          jamesbaiwlg@gmail.com<br />
          +64 27 202 5777<br />
          github.com/skynapier · Wellington
        </div>
      </div>

      <hr style={{ ...S.rule, marginTop: 22 }} />

      {/* Profile */}
      <div style={{ ...S.grid, paddingTop: 18 }}>
        <div style={S.sectionLabel}>Profile</div>
        <div style={{ fontSize: "11px", lineHeight: 1.65, color: "var(--ink-soft)" }}>
          Senior software engineer with <b style={{ color: "var(--ink)" }}>5+ years</b> shipping production .NET and AWS systems —
          most recently on Xero's App Store billing platform. I treat LLMs as a force multiplier:
          Claude Code and Codex are part of my daily loop, and I run a <b style={{ color: "var(--ink)" }}>~250,000-line AI-powered ERP</b> as a side project.
          Pragmatic about where AI earns its place; opinionated about where it doesn't.
        </div>
      </div>

      <hr style={{ ...S.softRule, marginTop: 22 }} />

      {/* Experience */}
      <div style={{ ...S.grid, paddingTop: 14 }}>
        <Section label="Experience" />
        <div>
          {/* Xero */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <h3 style={S.h3}>Xero — Engineer</h3>
              <div style={S.meta}>App Store Billing · Wellington</div>
            </div>
            <div style={{ ...S.meta, marginBottom: 0 }}>Nov 2023 — Present</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", columnGap: 14, rowGap: 8, marginTop: 8 }}>
            <div style={{ fontSize: "9px", color: "var(--ink-muted)", letterSpacing: "0.05em", paddingTop: 1 }}>JUL 25 — NOW</div>
            <div>
              <b>Project Sentinel</b> — App Store usage-based billing (P0). Lead engineer on two features.
              Designed and shipped the API + DB schema that became the billing core.
              <b> Live ~1 month, 1 small bug found (few-line fix).</b> Also built the AWS Glue aggregation pipeline.
            </div>

            <div style={{ fontSize: "9px", color: "var(--ink-muted)", letterSpacing: "0.05em", paddingTop: 1 }}>APR 26 — NOW</div>
            <div>
              <b>Xero AI / MCP team</b> — selected to a new team owning Xero's official AI tooling surface, including the Xero MCP server.
            </div>

            <div style={{ fontSize: "9px", color: "var(--ink-muted)", letterSpacing: "0.05em", paddingTop: 1 }}>MAY — JUL 25</div>
            <div><b>Deep Embed Service</b> — seconded to a P0 FY priority; consistent on-time API delivery.</div>

            <div style={{ fontSize: "9px", color: "var(--ink-muted)", letterSpacing: "0.05em", paddingTop: 1 }}>FEB — MAY 25</div>
            <div><b>Plan Migration Service</b> — co-designed and shipped the React/Refine/MUI SPA + BFF for App Store merchant self-service.</div>

            <div style={{ fontSize: "9px", color: "var(--ink-muted)", letterSpacing: "0.05em", paddingTop: 1 }}>JAN 24 — FEB 25</div>
            <div><b>Manually Invoicing System</b> — led the feature that recovered hundreds of thousands of dollars in overdue invoices. Leadership shout-out.</div>

            <div style={{ fontSize: "9px", color: "var(--ink-muted)", letterSpacing: "0.05em", paddingTop: 1 }}>2024 prior</div>
            <div>CodeRed CI/CD review · US Tax Support FY25 · shared frontend libs · PCI vulnerability work · API latency optimisation · associate mentoring.</div>
          </div>

          <hr style={{ ...S.softRule, margin: "18px 0" }} />

          {/* Section6 */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <h3 style={S.h3}>Section6 — Software Consultant</h3>
              <div style={S.meta}>Wellington</div>
            </div>
            <div style={{ ...S.meta, marginBottom: 0 }}>Mar 2021 — Nov 2023</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", columnGap: 14, rowGap: 8, marginTop: 8 }}>
            <div style={{ fontSize: "9px", color: "var(--ink-muted)", letterSpacing: "0.05em", paddingTop: 1 }}>2023</div>
            <div><b>Virtual CFO</b> — .NET + Azure Functions APIs integrating Xero & BambooHR; React/TS/Fluent UI dashboards. APIs processed 66k+ records/year in seconds.</div>

            <div style={{ fontSize: "9px", color: "var(--ink-muted)", letterSpacing: "0.05em", paddingTop: 1 }}>2022 — 23</div>
            <div><b>BNZ Platform Migration</b> (Red Hat partnership) — Python/Bash automation migrated <b>270 of 350</b> Java apps off legacy Kubernetes within a year.</div>

            <div style={{ fontSize: "9px", color: "var(--ink-muted)", letterSpacing: "0.05em", paddingTop: 1 }}>2021 — 22</div>
            <div><b>Vodafone DX Integration</b> — built Payment, SMS, Email gateways on .NET + Azure + Kubernetes.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.ShojiResume = ShojiResume;
