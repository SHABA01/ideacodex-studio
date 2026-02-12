// src/components/Breadcrumbs.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateBreadcrumb } from "../utils/breadcrumbs";
import "../styles/Breadcrumbs.css";

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const crumbs = generateBreadcrumb(location.pathname);

  return (
    <nav className="ic-breadcrumbs" aria-label="Breadcrumb">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <span key={crumb.path} className="ic-crumb-wrap">
            <span
              className={`ic-crumb ${isLast ? "active" : ""}`}
              onClick={() => !isLast && navigate(crumb.path)}
            >
              {crumb.label}
            </span>

            {!isLast && <span className="ic-separator">›</span>}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
