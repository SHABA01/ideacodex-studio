import React from "react";
import "../../../styles/StudioLayout.css";

export default function StudioLayout({
  topbar,
  launcher,
  canvas,
  flyout,
  aiBar,
  flyoutOpen
}) {
  return (
    <div className={`studio-layout ${flyoutOpen ? "flyout-open" : ""}`}>
      {topbar && <header className="studio-topbar">{topbar}</header>}

      <div className="studio-body">
        <div className="studio-work-row">
          <main className="studio-canvas-slot">{canvas}</main>

          {flyout && (
            <aside className="studio-flyout-slot">
              {flyout}
            </aside>
          )}
        </div>
      </div>

      {aiBar && <footer className="studio-ai-slot">{aiBar}</footer>}

      {/* IMPORTANT: launcher is rendered LAST, outside layout */}
      {launcher}
    </div>
  );
}
