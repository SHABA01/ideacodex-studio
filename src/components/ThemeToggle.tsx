// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";
import "../styles/ThemeToggle.css";

const ThemeToggle = ({ sidebarMode = false, collapsed = false }) => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(localStorage.getItem("theme") || (prefersDark ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // 🟡 SIDEBAR MODE (styled like nav-item)
  if (sidebarMode) {
    return (
      <div className="sidebar-theme-wrapper" onClick={toggleTheme}>
        <i className={`fa-solid ${theme === "light" ? "fa-moon" : "fa-sun"}`} />
        {!collapsed && <span>Theme</span>}
      </div>
    );
  }

  // 🟢 DEFAULT MODE (outside sidebar)
  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "light" ? (
        <i className="fa-solid fa-moon"></i>
      ) : (
        <i className="fa-solid fa-sun"></i>
      )}
    </button>
  );
};

export default ThemeToggle;
