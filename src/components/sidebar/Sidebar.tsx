// src/components/sidebar/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import "../../styles/Sidebar.css";
import logo from "../../assets/IdeaCodex_icon_yellow.png";
import sidebarConfig from "./sidebarConfig";
import { resolveSidebarItemState } from "./sidebarRules"; // ✅ NEW (minimal addition)

const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen: controlledMobileOpen,
  onCloseMobile
}) => {
  const navigate = useNavigate();
  const { tier } = useAppAccess();
  const tierLabel = tier?.toUpperCase() || "demo";

  const [showExpand, setShowExpand] = useState(false);
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const mobileOpen =
    typeof controlledMobileOpen === "boolean"
      ? controlledMobileOpen
      : internalMobileOpen;

  const setMobileOpen = (v) => {
    if (typeof controlledMobileOpen === "boolean") {
      if (!v && onCloseMobile) onCloseMobile();
    } else {
      setInternalMobileOpen(v);
    }
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [mobileOpen]);

  /* =========================
     ACCESS LOGIC (MORPHING)
     (MINIMAL CHANGE)
  ========================= */

  const handleLockedClick = (e) => {
    e.preventDefault();
    alert("Upgrade your plan to unlock this feature.");
  };

  const toggleSection = (key) =>
  setOpenSections((p) => ({ ...p, [key]: !p[key] }));

  const renderBadge = (state) => {
    // 1️⃣ Locked ALWAYS wins
    if (state.locked) {
      return (
        <span className="badge badge-locked" title="Upgrade required">
          <i className="fa-solid fa-lock lock-icon" />
        </span>
      );
    }

    // 2️⃣ Tier-based badge (LIMITED, BASIC, etc.)
    if (state.badge) {
      return (
        <span
          className={`badge badge-${state.badge.toLowerCase()}`}
          title={state.badge}
        >
          {state.badge}
        </span>
      );
    }

   // 3️⃣ Nothing to show
   return null;
  };

  const renderNavItem = (item, closeMobile = false) => {
    const state = resolveSidebarItemState(item, tier);

    if (!state.visible) return null;

    return (
      <NavLink
        key={item.id}
        to={state.locked ? "#" : item.path}
        className={({ isActive }) =>
          `nav-item ${isActive ? "active" : ""} ${
            state.locked ? "locked" : ""
          }`
        }
        onClick={(e) => {
          if (state.locked) return handleLockedClick(e);
          if (closeMobile) setMobileOpen(false);
        }}
        aria-disabled={state.locked}
      >
        <i className={item.icon} aria-hidden />
        {!collapsed && <span>{item.label}</span>}

        {!collapsed && renderBadge(state)}
      </NavLink>
    );
  };

  /* =========================
     DESKTOP SIDEBAR
  ========================= */

  return (
    <>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div
          className="sidebar-header"
          onMouseEnter={() => collapsed && setShowExpand(true)}
          onMouseLeave={() => collapsed && setShowExpand(false)}
        >
          <div className="header-toggle-area">
            {(!collapsed || !showExpand) && (
              <div className="brand" onClick={() => navigate("/")}>
                <img src={logo} alt="IdeaCodex Logo" className="brand-logo" />
              </div>
            )}

            {/* ✅ EXPAND BUTTON — PRESERVED EXACTLY */}
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

          {!collapsed && <div className="sidebar-mode">{tierLabel}</div>}

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

        <nav className="sidebar-nav" aria-label="Primary">
          {sidebarConfig
            .filter((i) => !i.section)
            .map((item) => renderNavItem(item))}

          {sidebarConfig
            .filter((i) => i.section)
            .map((section) => {
              const sectionState = resolveSidebarItemState(section, tier);
              if (!sectionState.visible) return null;
            
              const visibleChildren = section.children.filter(
                (child) =>
                  resolveSidebarItemState(child, tier).visible
              );

              if (!visibleChildren.length) return null;
            
              const isOpen = openSections[section.section];
            
              return (
                <div key={section.section} className="sidebar-section">
                  {!collapsed && (
                    <button
                      className="nav-section-title section-toggle"
                      onClick={() => toggleSection(section.section)}
                      aria-expanded={!!isOpen}
                    >
                      <span>{section.title}</span>
                      <i
                        className={`fa-solid fa-chevron-${
                          isOpen ? "down" : "right"
                        }`}
                     />
                    </button>
                 )}

                  {/* ✅ THIS replaces the “return null” idea */}
                  {isOpen &&
                    visibleChildren.map((child) =>
                      renderNavItem(child)
                    )}
                </div>
              );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item sidebar-theme-toggle">
            <ThemeToggle sidebarMode collapsed={collapsed} />
          </div>

          <NavLink to="/auth/logout" className="nav-item logout">
            <i className="fa-solid fa-right-from-bracket" />
            {!collapsed && <span>Log Out</span>}
          </NavLink>
        </div>
      </aside>

      {/* =========================
          MOBILE DRAWER
      ========================= */}

      {mobileOpen && (
        <div className="mobile-drawer open">
          <div
            className="mobile-backdrop"
            role="button"
            tabIndex={0}
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) =>
              e.key === "Escape" && setMobileOpen(false)
            }
          />

          <div className="mobile-inner" role="dialog" aria-modal="true">
            <div className="mobile-inner-header">
              <div
                className="brand"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/");
                }}
              >
                <img src={logo} alt="IdeaCodex Logo" className="brand-logo" />
              </div>

              <div className="mobile-drawer-mode">{tierLabel}</div>

              <button
                className="btn-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="mobile-nav" aria-label="Mobile primary">
              {sidebarConfig
                .filter((i) => !i.section)
                .map((item) => renderNavItem(item, true))}

              {sidebarConfig
                .filter((i) => i.section)
                .map((section) => {
                  const sectionState = resolveSidebarItemState(section, tier);
                  if (!sectionState.visible) return null;
                
                  const visibleChildren = section.children.filter(
                    (child) =>
                      resolveSidebarItemState(child, tier).visible
                  );
                
                  if (!visibleChildren.length) return null;
                
                  const isOpen = openSections[section.section];
                
                  return (
                    <div key={section.section} className="sidebar-section">
                      {!collapsed && (
                        <button
                          className="nav-section-title section-toggle"
                          onClick={() => toggleSection(section.section)}
                          aria-expanded={!!isOpen}
                        >
                          <span>{section.title}</span>
                          <i
                            className={`fa-solid fa-chevron-${
                              isOpen ? "down" : "right"
                            }`}
                         />
                        </button>
                     )}
    
                      {/* ✅ THIS replaces the “return null” idea */}
                      {isOpen &&
                        visibleChildren.map((child) =>
                          renderNavItem(child)
                        )}
                    </div>
                  );
              })}
            </nav>

            <div className="mobile-footer">
              <div className="nav-item sidebar-theme-toggle">
                <ThemeToggle sidebarMode />
              </div>

              <NavLink
                to="/auth/logout"
                className="nav-item logout"
                onClick={() => setMobileOpen(false)}
              >
                <i className="fa-solid fa-right-from-bracket" />
                <span>Log Out</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
