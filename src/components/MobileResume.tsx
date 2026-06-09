import type { ReactNode } from "react";

type MobileItem = {
  label: string;
  body: string;
  red?: boolean;
};

const xeroItems: MobileItem[] = [
  {
    label: "sentinel/p0",
    red: true,
    body:
      "Feature lead on two App Store usage-based billing rewrite features. Shipped .NET / C# APIs, Postgres schema, billing core, and AWS Glue aggregation pipeline. Live ~1 month, only one minor bug found.",
  },
  {
    label: "ai/mcp-team",
    red: true,
    body: "Selected to Xero's AI/MCP team owning the official AI surface, including the Xero MCP server. Building applied AI infrastructure across LLM tool use, agent workflows, retrieval/context design, eval checks, observability, privacy, and safety guardrails.",
  },
  {
    label: "plan-migration",
    body: "Co-designed and shipped React / Refine / MUI SPA backed by a .NET BFF for App Store merchant self-service.",
  },
  {
    label: "manual-invoicing",
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
    label: "email-ledger",
    red: true,
    body: "Gemini parses inbound bills, classifies them, and creates payable or receivable records. Review screens validate source rows before save; settlement auto-creates the payment entry.",
  },
  {
    label: "ai-quoting",
    red: true,
    body: "MCP lets ChatGPT drive quoting via tool calls, structured context, pricing lookup, preview, and controlled save flow.",
  },
  {
    label: "mobile",
    red: true,
    body: "React Native + Expo app for on site field use, sharing auth and AWS Cognito with the web app.",
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
            Engineer @ Xero · 5+ yrs · .NET · AWS · React · <strong>LLM firefighter</strong>
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
          Software engineer with 5+ years shipping production .NET and AWS systems, currently at Xero on the App Store
          billing platform. Comfortable owning features end to end: design, delivery, and post launch quality.
        </p>
        <p>
          AI native and pragmatic. My current Xero team owns AI/MCP product infrastructure. Claude Code and Codex are
          part of my daily workflow. My side project is a ~450,000 line AI powered ERP I built and operate alone.
        </p>
      </MobileSection>

      <MobileSection title="## xero">
        <div className="m-role">
          <strong>Engineer</strong>
          <span>2023.11 — present</span>
        </div>
        <div className="m-stack">
          C# / .NET 8/10 · AWS Lambda · SQS · SNS · DynamoDB · AWS Glue · React / TypeScript · Postgres
        </div>
        <MobileList items={xeroItems} />
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
        <h3>BYDH ERP · AI powered, solo build</h3>
        <p className="m-stack">~450,000 LOC · operating · 1 maintainer</p>
        <p>
          Custom ERP for a construction business. Designed, built, and operated end to end as an AI native system. Web +
          native mobile.
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
