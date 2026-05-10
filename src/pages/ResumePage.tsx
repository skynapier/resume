import { Link } from "react-router-dom";
import { KobanResume } from "../components/KobanResume";

export function ResumePage() {
  return (
    <>
      <div className="toolbar">
        <button onClick={() => window.print()}>print / save pdf</button>
        <a href="/resume/Resume.html">explore directions</a>
      </div>
      <main className="stage">
        <KobanResume page={1} />
        <KobanResume page={2} />
        <Link className="case-study-link" to="/bydh">
          BYDH case study
        </Link>
      </main>
    </>
  );
}
