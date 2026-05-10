import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import App from "./App";

const configuredBase = import.meta.env.BASE_URL.replace(/\/$/, "");
const routerBase =
  configuredBase && window.location.pathname.startsWith(`${configuredBase}/`)
    ? configuredBase
    : "/";

const redirectPath = sessionStorage.getItem("resume.redirect");
if (redirectPath) {
  sessionStorage.removeItem("resume.redirect");
  window.history.replaceState(null, "", redirectPath);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBase}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
