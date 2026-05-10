import { Link } from "react-router-dom";

export function BydhPage() {
  return (
    <>
      <div className="toolbar">
        <Link to="/">resume</Link>
        <button onClick={() => window.print()}>print / save pdf</button>
      </div>
      <main className="case-page">
        <section className="case-shell">
          <div className="case-kicker">// case-study.md</div>
          <h1>BYDH ERP</h1>
          <p className="case-lede">
            AI powered ERP for construction operations. Built and operated solo:
            web, mobile, quoting, ledger automation, dashboards, and AWS
            infrastructure.
          </p>
          <div className="case-grid">
            <div>
              <h2>scope</h2>
              <p>
                Custom workflow platform replacing manual admin work across
                quoting, payable and receivable records, settlement, project
                insight, and field operations.
              </p>
            </div>
            <div>
              <h2>stack</h2>
              <p>
                React · TypeScript · .NET · AWS · PostgreSQL · React Native ·
                Expo · Cognito · MCP · Gemini
              </p>
            </div>
            <div>
              <h2>ai surface</h2>
              <p>
                Gemini parses inbound bills into ledger records. MCP enables
                quoting workflows from ChatGPT.
              </p>
            </div>
            <div>
              <h2>status</h2>
              <p>Operating system. ~250,000 LOC. One maintainer.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
