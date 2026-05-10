import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "../assets/tokens.css";
import "./styles.css";
import App from "./App";

const redirectPath = sessionStorage.getItem("resume.redirect");
if (redirectPath) {
  sessionStorage.removeItem("resume.redirect");
  window.history.replaceState(null, "", redirectPath);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/resume">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
