import { Link } from "react-router-dom";

const imageBase = `${import.meta.env.BASE_URL}BYDH/`;

const caseSections = [
  {
    label: "quote",
    title: "AI assisted quoting",
    body: "Quote-1 captures a GPT assisted quote workflow. Quote-2 is the system generated PDF output.",
    images: [
      { src: "Quote-1.png", alt: "GPT assisted quote workflow screen" },
      { src: "Quote-2.png", alt: "Generated quote PDF screen" },
    ],
  },
  {
    label: "invoice",
    title: "Quote to invoice",
    body: "Invoice-1 shows the invoice converted from the quote. Invoice-2 is the matching generated PDF output.",
    images: [
      { src: "Invoice-1.png", alt: "Invoice converted from quote screen" },
      { src: "Invoice-2.png", alt: "Generated invoice PDF screen" },
    ],
  },
  {
    label: "orders",
    title: "Order operations",
    body: "Order-1 is the management list. Order-2 is the detail page for splitting work across people, schedule management, and variations.",
    images: [
      { src: "Order-1.png", alt: "Order management list screen" },
      { src: "Order-2.png", alt: "Order detail scheduling and assignment screen" },
    ],
  },
  {
    label: "insight",
    title: "Insight dashboard",
    body: "Operational reporting for project and business visibility.",
    images: [{ src: "Insight-1.png", alt: "BYDH insight dashboard screen" }],
  },
];

export function BydhPage() {
  return (
    <>
      <div className="toolbar">
        <Link to="/">resume</Link>
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
                GPT assists quoting. Gemini parses inbound bills into ledger
                records. MCP enables quoting workflows from ChatGPT.
              </p>
            </div>
            <div>
              <h2>status</h2>
              <p>Operating system. ~250,000 LOC. One maintainer.</p>
            </div>
          </div>
        </section>
        <section className="case-shell case-gallery">
          <div className="case-kicker">// product-screens</div>
          {caseSections.map((section) => (
            <article className="case-feature" key={section.label}>
              <div className="case-feature-copy">
                <div className="case-feature-label">{section.label}</div>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </div>
              <div className="case-shot-grid">
                {section.images.map((image) => (
                  <figure className="case-shot" key={image.src}>
                    <img src={`${imageBase}${image.src}`} alt={image.alt} />
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
