import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/global.css";
import "./styles/theme.css";

/**
 * Root bootstrap
 * Entry point for IdeaCodex Studio
 */

const root = document.getElementById("root") as HTMLElement;

if (!root) {
  throw new Error("Failed to find the root element.");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
