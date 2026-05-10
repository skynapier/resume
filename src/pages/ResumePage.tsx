import { Link } from "react-router-dom";
import { KobanResume } from "../components/KobanResume";
import { MobileResume } from "../components/MobileResume";

const pdfHref = `${import.meta.env.BASE_URL}James-Bai-CV.pdf`;

export function ResumePage() {
  return (
    <>
      <div className="toolbar">
        <button className="desktop-print-action" onClick={() => window.print()}>
          print / save pdf
        </button>
        <a className="mobile-download-action" href={pdfHref} download>
          download pdf
        </a>
      </div>
      <main className="stage desktop-resume">
        {[1, 2].map((page) => (
          <div className="sheet" key={page}>
            <KobanResume page={page as 1 | 2} />
          </div>
        ))}
        <Link className="case-study-link" to="/bydh">
          BYDH case study
        </Link>
      </main>
      <main className="mobile-resume">
        <MobileResume />
        <Link className="case-study-link" to="/bydh">
          BYDH case study
        </Link>
      </main>
    </>
  );
}
