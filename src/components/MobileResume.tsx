import type { ReactNode } from "react";

type MobileItem = {
  label: string;
  body: string;
  red?: boolean;
};

const xeroAiItems: MobileItem[] = [
  {
    label: "mcp/v2",
    red: true,
    body:
      "Shaped architecture decisions for Xero's production MCP v1-to-v2 migration, including Python dependency injection, a cross-platform reverse proxy, and canary smoke-test design. Ported existing tools to v2.",
  },
  {
    label: "mcp/tools",
    red: true,
    body:
      "Implemented and shipped new MCP tools that enable AI assistants to access structured accounting data and workflows for Xero business customers.",
  },
  {
    label: "mcp/traffic",
    red: true,
    body:
      "Built reusable analysis skills and tools that compared sampled edge telemetry, full request logs, and AI platform analytics. Analysed timing, recurring patterns, and client signals to identify likely automated migration traffic. Evidence informed tenant-level rate-limit and data-access decisions.",
  },
  {
    label: "mcp/research",
    red: true,
    body:
      "Owned Microsoft Office add-in feasibility and a prototype for structured Xero data. Tracked intermittent MCP timeouts to their root cause across services.",
  },
];

const xeroFinanceItems: MobileItem[] = [
  {
    label: "billing-core",
    body:
      "Feature lead on major parts of the App Store usage-based billing rewrite. Shipped .NET / C# APIs, Postgres schema, billing core, and AWS Glue aggregation pipeline. Went live with one minor post-launch bug.",
  },
  {
    label: "merchant-spa",
    body: "Co-designed and shipped React / Refine / MUI SPA backed by a .NET BFF for App Store merchant self-service.",
  },
  {
    label: "invoice-recovery",
    body: "Feature lead on the manual-invoicing flow that recovered hundreds of thousands of dollars in overdue invoices.",
  },
  {
    label: "us-tax-support",
    body: "On-call owner for US Sales Tax service: incidents, schema fixes, and customer-facing data corrections.",
  },
];

const section6Items: MobileItem[] = [
  {
    label: "virtual-cfo",
    body: ".NET / C# APIs on Azure Functions integrating Xero & BambooHR, with React / TypeScript / Fluent UI dashboards. APIs processed 66k+ records/year in seconds.",
  },
  {
    label: "bnz-migration",
    body: "Python/Bash automation migrated 270 of 350 Java apps off legacy Kubernetes within a year.",
  },
  {
    label: "vodafone-dx",
    body: "Owned Payment, SMS, and Email gateways on .NET / C# · Azure · Kubernetes.",
  },
];

const projectItems: MobileItem[] = [
  {
    label: "bill-parser",
    red: true,
    body: "Gemini parses inbound bills, classifies them, and drafts payable or receivable records. Review screens validate source rows before save; settlement auto-creates the payment entry.",
  },
  {
    label: "ai-quoting",
    red: true,
    body: "MCP lets ChatGPT drive quoting via tool calls, structured context, pricing lookup, preview, and controlled save flow.",
  },
  {
    label: "mobile",
    red: true,
    body: "Native iOS app in Swift for field use, sharing auth and AWS Cognito with the web app.",
  },
];

function Hanko() {
  return (
    <div className="m-hanko">
      <div>JB</div>
      <span>2026</span>
    </div>
  );
}

function MobileSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="m-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function MobileList({ items }: { items: MobileItem[] }) {
  return (
    <div className="m-list">
      {items.map((item) => (
        <div className="m-item" key={item.label}>
          <div className={item.red ? "m-label m-label-red" : "m-label"}>{item.label}</div>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export function MobileResume() {
  return (
    <article className="mobile-resume-sheet">
      <header className="m-header">
        <div>
          <div className="m-kicker">// curriculum-vitae.md</div>
          <h1>James Bai</h1>
          <p className="m-tagline">
            Software Engineer | AI Platforms, MCP & <strong>LLM Integrations</strong>
          </p>
        </div>
        <Hanko />
      </header>

      <div className="m-contact">
        <a href="mailto:jamesbaiwlg@gmail.com">jamesbaiwlg@gmail.com</a> ·{" "}
        <a href="tel:+64272025777">+64 27 202 5777</a> ·{" "}
        <a href="https://skynapier.github.io/resume/">skynapier.github.io/resume</a> · Wellington NZ
      </div>

      <MobileSection title="## profile">
        <p>
          Software engineer with 5+ years shipping production .NET and AWS systems, currently at Xero on AI/MCP work.
          Comfortable owning features end to end: design, delivery, and post launch quality.
        </p>
        <p>
          I write technical proposals, lead team design discussions, turn decisions into implementation tickets, and
          review AI-generated code. My previous Xero work covered App Store billing, merchant self-service, invoice
          recovery, and tax support. Seeking senior AI engineering roles in Australia.
        </p>
      </MobileSection>

      <MobileSection title="## xero">
        <div className="m-role">
          <strong>Engineer</strong>
          <span>2023.11 — present</span>
        </div>
        <div className="m-stack">
          C# / .NET 8/10 · Node.js · Python · AWS Lambda · SQS · SNS · DynamoDB · AWS Glue · React / TypeScript ·
          Postgres · MCP
        </div>
        <h3>Current: AI / MCP / RAG</h3>
        <MobileList items={xeroAiItems} />
        <h3>Previous: billing / finance systems</h3>
        <MobileList items={xeroFinanceItems} />
      </MobileSection>

      <MobileSection title="## section6">
        <div className="m-role">
          <strong>Software Consultant</strong>
          <span>2021.03 — 2023.11</span>
        </div>
        <div className="m-stack">C# / .NET · Azure · React / TypeScript · Python · Kubernetes</div>
        <MobileList items={section6Items} />
      </MobileSection>

      <MobileSection title="## side-projects">
        <h3>BYDH ERP · Construction operations and finance</h3>
        <p className="m-stack">10+ daily users · 3 years as sole engineer</p>
        <p>
          A production ERP for a construction business. I built and operate it solo. It serves the business owner,
          field workers, and administrators, and covers quoting and invoicing, accounts payable and receivable, financial
          reporting, and field operations.{" "}
          <a
            href="https://bydh.co.nz/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            bydh.co.nz
          </a>
        </p>
        <MobileList items={projectItems} />
        <h3>Live web products</h3>
        <p className="m-stack">React · Tailwind · C# · AWS</p>
        <h3>Success Health</h3>
        <p>
          Built and operate clinic booking and customer-facing flows for a Wellington physio. successhealth.co.nz.
        </p>
        <h3>AHU Handyman</h3>
        <p>
          Public site for an Australian handyman business, focused on service discovery, lead capture, and simple
          production deployment.{" "}
          <a
            href="https://ahuhandyman.com.au"
            target="_blank"
            rel="noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            ahuhandyman.com.au
          </a>
          .
        </p>
      </MobileSection>

      <MobileSection title="## education + skills">
        <div className="m-edu">
          <p>
            <strong>PGDipSci (Merit), Computer Science</strong>
            <span>University of Auckland · 2020 — 2024</span>
          </p>
          <p>
            <strong>BSc, CS & Statistics (AI specialisation)</strong>
            <span>Victoria Univ. of Wellington · 2015 — 2018</span>
          </p>
          <p>
            <strong>AWS Certified Developer Associate</strong>
            <span>Amazon Web Services · 2026</span>
          </p>
        </div>
        <div className="m-skills">
          <p>
            <span>lang</span>C# / .NET · TypeScript · Python
          </p>
          <p>
            <span>data</span>Postgres · MySQL · DynamoDB · Dapper · EF · Flyway
          </p>
          <p>
            <span>msg</span>SQS · SNS
          </p>
          <p>
            <span>cloud</span>AWS Lambda · SQS · SNS · DynamoDB · Glue · ECS · S3 · RDS · Cognito · CloudFront · Azure
          </p>
          <p>
            <span>ai</span>Claude Code · Codex · Gemini · MCP · LLM tool use · agents · RAG/context · evals
          </p>
        </div>
      </MobileSection>
    </article>
  );
}
