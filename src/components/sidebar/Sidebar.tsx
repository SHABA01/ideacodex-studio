// src/components/sidebar/Sidebar.tsx

import { useState, useEffect } from "react";
import "../../styles/Sidebar.css";
import logo from "../../assets/IdeaCodex_icon_yellow.png";
import { modes } from "../../modes/modeConfig";
import { useMode } from "../../context/ModeContext";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
};

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen: controlledMobileOpen,
  onCloseMobile
}: SidebarProps) {

  const { currentMode, setMode } = useMode();
  const [showExpand, setShowExpand] = useState(false);
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);

  const mobileOpen =
    typeof controlledMobileOpen === "boolean"
      ? controlledMobileOpen
      : internalMobileOpen;

  const setMobileOpen = (v: boolean) => {
    if (typeof controlledMobileOpen === "boolean") {
      if (!v && onCloseMobile) onCloseMobile();
    } else {
      setInternalMobileOpen(v);
    }
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  return (
    <>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

        {/* ===== HEADER (PRESERVED STRUCTURE) ===== */}
        <div
          className="sidebar-header"
          onMouseEnter={() => collapsed && setShowExpand(true)}
          onMouseLeave={() => collapsed && setShowExpand(false)}
        >
          <div className="header-toggle-area">
            {(!collapsed || !showExpand) && (
              <div className="brand">
                <img src={logo} alt="IdeaCodex Logo" className="brand-logo" />
              </div>
            )}

            {collapsed && showExpand && (
              <button
                className="collapse-btn expand-btn"
                onClick={() => setCollapsed(false)}
                title="Expand sidebar"
              >
                <i className="fa-solid fa-angles-right" />
              </button>
            )}
          </div>

          {!collapsed && (
            <div className="sidebar-mode">
              IdeaCodex
            </div>
          )}

          {!collapsed && (
            <button
              className="collapse-btn"
              onClick={() => setCollapsed(true)}
              title="Collapse sidebar"
            >
              ✕
            </button>
          )}
        </div>

        {/* ===== MODE MENU ===== */}
        <nav className="sidebar-nav">
          {modes.map((mode) => (
            <button
              key={mode.id}
              className={`nav-item ${currentMode === mode.id ? "active" : ""}`}
              onClick={() => {
                setMode(mode.id);
                setMobileOpen(false);
              }}
            >
              <i className={mode.icon} />
              {!collapsed && <span>{mode.label}</span>}
            </button>
          ))}
        </nav>

      </aside>

      {mobileOpen && (
        <div className="mobile-drawer open">
         <div
            className="mobile-backdrop"
            onClick={() => setMobileOpen(false)}
          />

          <div className="mobile-inner">

            <div className="mobile-inner-header">
              <div className="brand">
                <img
                  src={logo}
                  alt="IdeaCodex Logo"
                  className="brand-logo"
                />
              </div>

              <div className="mobile-drawer-mode">
                IdeaCodex
              </div>

              <button
                className="btn-close"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>
            </div>

            <nav className="mobile-nav">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  className={`nav-item ${
                    currentMode === mode.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setMode(mode.id);
                    setMobileOpen(false);
                  }}
                >
                  <i className={mode.icon} />
                  <span>{mode.label}</span>
                </button>
              ))}
            </nav>

          </div>
        </div>
      )}
    </>
  );
}
