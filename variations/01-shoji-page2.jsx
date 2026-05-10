/* Shoji page 2 — side project + skills + AI + education */

const ShojiResumePage2 = () => {
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
    sectionLabel: {
      fontSize: "9px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--ink)",
      fontWeight: 700,
    },
    softRule: { border: 0, height: 1, background: "#e0e0e0", margin: 0 },
    rule: { border: 0, height: 1, background: "#1c1c1c", margin: 0 },
    h3: { fontSize: "12.5px", fontWeight: 700, margin: "0 0 4px" },
    chip: {
      display: "inline-block",
      border: "1px solid #d0d0d0",
      padding: "2px 8px",
      fontSize: "9.5px",
      marginRight: 6,
      marginBottom: 6,
      borderRadius: 0,
      color: "var(--ink-soft)",
    },
    chipStrong: {
      display: "inline-block",
      background: "#181818",
      color: "#fff",
      padding: "2px 8px",
      fontSize: "9.5px",
      marginRight: 6,
      marginBottom: 6,
    },
  };

  return (
    <div className="r-page" style={S.page}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em" }}>James Bai · Senior Software Engineer</div>
        <div style={{ fontSize: "9px", color: "var(--ink-muted)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Page 2 / 2</div>
      </div>
      <hr style={{ ...S.rule, marginTop: 12 }} />

      {/* Side project */}
      <div style={{ ...S.grid, paddingTop: 18 }}>
        <div>
          <div style={S.sectionLabel}>Side Project</div>
          <div style={{ fontSize: "9.5px", color: "var(--ink-muted)", marginTop: 8, lineHeight: 1.5 }}>
            Solo build · still operating · the artifact of how I work in 2026.
          </div>
        </div>
        <div>
          <h3 style={S.h3}>BYDH ERP — AI-Powered Construction ERP</h3>
          <div style={{ fontSize: "10px", color: "var(--ink-muted)", marginBottom: 10 }}>
            Solo design + build + ops · ~250,000 lines of code
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 22, rowGap: 10 }}>
            <div>
              <div style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 4 }}>Email → Ledger</div>
              Inbound bills are parsed by Gemini, classified, uploaded, and turned into payable / receivable records. Settlement auto-creates the payment entry. Killed manual admin.
            </div>
            <div>
              <div style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 4 }}>MCP Quoting</div>
              Wired the system to MCP — quoting can be driven from ChatGPT. Replaced the team's Xero + Monday usage for that workflow.
            </div>
            <div>
              <div style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 4 }}>Finance Insights</div>
              Cashflow, P&L, project profitability dashboards.
            </div>
            <div>
              <div style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 4 }}>Stack</div>
              React · TS · .NET · AWS (CloudFront, RDS, Lambda) · Postgres
            </div>
          </div>

          {/* placeholder screenshot */}
          <div style={{
            marginTop: 14,
            border: "1px solid #d8d6cf",
            background: "repeating-linear-gradient(135deg, #f5f5f0, #f5f5f0 6px, #fafaf7 6px, #fafaf7 12px)",
            height: 88,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "ui-monospace, monospace",
            fontSize: 10,
            color: "var(--ink-muted)",
            letterSpacing: "0.05em",
          }}>
            ▢ &nbsp; bydh erp dashboard · drop screenshot here
          </div>
        </div>
      </div>

      <hr style={{ ...S.softRule, marginTop: 20 }} />

      {/* Skills */}
      <div style={{ ...S.grid, paddingTop: 14 }}>
        <div style={S.sectionLabel}>Skills</div>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", rowGap: 6, columnGap: 16, fontSize: "10px" }}>
            <div style={{ color: "var(--ink-muted)" }}>Languages</div>
            <div>C# / .NET · TypeScript · Python · Rust</div>
            <div style={{ color: "var(--ink-muted)" }}>Web</div>
            <div>React, Redux, Next.js · MUI, Fluent UI, Next UI</div>
            <div style={{ color: "var(--ink-muted)" }}>Data</div>
            <div>PostgreSQL · MySQL · Dapper, EF, Flyway · DynamoDB</div>
            <div style={{ color: "var(--ink-muted)" }}>Cloud</div>
            <div>AWS (EC2/ECS, S3, RDS, Lambda, CloudFront, Glue) · Azure</div>
            <div style={{ color: "var(--ink-muted)" }}>Platform</div>
            <div>Kubernetes · Docker · Terraform · CloudFormation</div>
            <div style={{ color: "var(--ink-muted)" }}>CI/CD</div>
            <div>GitHub Actions · TeamCity · Jenkins</div>
            <div style={{ color: "var(--ink-muted)" }}>Messaging</div>
            <div>SNS · SQS · Kafka</div>
            <div style={{ color: "var(--ink-muted)" }}>AI</div>
            <div>Claude Code · Codex · Gemini API · MCP (author + integrator)</div>
          </div>
        </div>
      </div>

      <hr style={{ ...S.softRule, marginTop: 18 }} />

      {/* AI manifesto */}
      <div style={{ ...S.grid, paddingTop: 14 }}>
        <div style={S.sectionLabel}>On AI</div>
        <div style={{ fontSize: "10.5px", lineHeight: 1.6, color: "var(--ink-soft)" }}>
          Claude Code and Codex are part of my daily loop — not autocomplete, but a reasoning partner for design, refactor, and review.
          Pragmatic about where LLMs help (parsing, scaffolding, codemod, docs, ops); skeptical where they don't (judgement calls, system boundaries, anything safety-critical).
          BYDH ERP is the artifact of this approach at scale.
        </div>
      </div>

      <hr style={{ ...S.softRule, marginTop: 18 }} />

      {/* Education */}
      <div style={{ ...S.grid, paddingTop: 14 }}>
        <div style={S.sectionLabel}>Education<br />/ Cert.</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 22, rowGap: 8, fontSize: "10px" }}>
          <div>
            <div style={{ fontWeight: 600 }}>PGDipSci (Merit), Computer Science</div>
            <div style={{ color: "var(--ink-muted)" }}>University of Auckland · 2020 — 2024</div>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>BSc, CS & Statistics (AI)</div>
            <div style={{ color: "var(--ink-muted)" }}>Victoria Univ. of Wellington · 2015 — 2018</div>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>Red Hat Certified System Administrator</div>
            <div style={{ color: "var(--ink-muted)" }}>2022 — present</div>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>Azure Developer Associate</div>
            <div style={{ color: "var(--ink-muted)" }}>2020 — 2022</div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 28, left: 60, right: 60, display: "flex", justifyContent: "space-between", fontSize: "9px", color: "var(--ink-muted)", letterSpacing: "0.1em" }}>
        <span>References on request.</span>
        <span>JAMES BAI · 2026</span>
      </div>
    </div>
  );
};

window.ShojiResumePage2 = ShojiResumePage2;
