import React from "react";
import "../../../styles/StudioTopbar.css";

/**
 * StudioTopbar
 *
 * Displays project metadata and high-level actions.
 * NO navigation, NO breadcrumbs.
 */
export default function StudioTopbar({
  projectName,
  status,
  lastSaved,
  onOpenTools
}) {
  return (
    <div className="studio-project-meta">
      <div className="meta-left">
        <h2>{projectName || "Untitled Project"}</h2>
        <span className="project-status">{status || "Draft"}</span>
        <span className="last-saved">
          {lastSaved ? `Saved ${lastSaved}` : "Not saved yet"}
        </span>
      </div>

      <div className="meta-right">
        
        {/* More later features */}
        {/*<span className="last-saved">
          {lastSaved ? `Saved ${lastSaved}` : "Not saved yet"}
        </span>*/}

        <button
          className="open-launcher-btn"
          onClick={onOpenTools}
        >
          Tools
        </button>
      </div>
    </div>
  );
}
