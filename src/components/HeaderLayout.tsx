// src/components/HeaderLayout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import AvatarDisplay from "./AvatarDisplay";
import "../styles/HeaderLayout.css";

const HeaderLayout = ({ onOpenMobile = () => {}, mobileOpen = false }) => {
  const navigate = useNavigate();

  const initials = (() => {
    const name = (user?.displayName || user?.fullName || "IdeaCodex").trim();
    return name ? name.charAt(0).toUpperCase() : "I";
  })();

  return (
    <header className="app-header">
      <div className="app-header-left">
        {/* Mobile menu button */}
        <button
          className={`mobile-open ${mobileOpen ? "open" : ""}`}
          onClick={onOpenMobile}
          aria-label="Open menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Breadcrumb Component */}
        <Breadcrumbs />
      </div>

      <div className="app-header-right">
        {/* Avatar (UNIVERSAL) */}
        <AvatarDisplay
          avatar={user?.avatar || ""}
          name={user?.displayName || user?.fullName || "IdeaCodex"}
          variant="header"
          placeholderMode="choiceModal"
          onClickLive={() => {
            if (!isDemo) navigate("/profile");
          }}
        />
      </div>
    </header>
  );
};

export default HeaderLayout;
