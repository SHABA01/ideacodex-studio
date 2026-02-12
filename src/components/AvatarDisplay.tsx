// src/components/AvatarDisplay.jsx
import React, { useEffect, useState } from "react";
import "../styles/AvatarDisplay.css";

/**
 * AvatarDisplay
 *
 * NEW:
 * - Supports variant="header" — applies HeaderLayout avatar styles
 *
 * Props:
 * - avatar
 * - name
 * - size (default ignored when variant="header")
 * - className
 * - variant ("default" | "header")
 * - placeholderMode ("profileModal" | "choiceModal")
 * - onClickLive
 */

const AvatarDisplay = ({
  avatar,
  name = "",
  size = 43,
  className = "",
  variant = "default",   // ← NEW
  placeholderMode = "choiceModal",
  onClickLive = () => {},
}) => {
  const { isDemo } = useAppAccess();
  const [src, setSrc] = useState("");
  const [isBlob, setIsBlob] = useState(false);

  const isHeader = variant === "header";

  /* ----------------------------
     IMAGE NORMALIZATION LOGIC
  ---------------------------- */
  useEffect(() => {
    let active = true;
    let objectUrl = null;

    const setDirect = (v, blobFlag = false) => {
      if (!active) return;
      setSrc(v || "");
      setIsBlob(blobFlag);
    };

    if (!avatar || typeof avatar !== "string" || avatar.trim() === "") {
      setDirect("", false);
      return () => { active = false };
    }

    if (avatar.startsWith("blob:")) {
      setDirect(avatar, true);
      return () => { active = false };
    }

    if (avatar.startsWith("data:")) {
      (async () => {
        try {
          const res = await fetch(avatar);
          const blob = await res.blob();
          objectUrl = URL.createObjectURL(blob);
          setDirect(objectUrl, true);
        } catch {
          setDirect(avatar, false);
        }
      })();

      return () => {
        active = false;
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }

    setDirect(avatar, false);
    return () => { active = false };
  }, [avatar]);

  /* ----------------------------
     CLEANUP BLOB URL ON UNMOUNT
  ---------------------------- */
  useEffect(() => {
    return () => {
      if (isBlob && src && src.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(src);
        } catch {}
      }
    };
  }, [isBlob, src]);

  const firstChar = (name || "").trim().charAt(0).toUpperCase();

  /* ----------------------------
      TOOLTIP & CLICK BEHAVIOR
  ---------------------------- */
  const tooltip = isDemo
    ? "Demo user (profile editing disabled)"
    : name || "Profile";

  const handleClick = () => {
    if (!isDemo) onClickLive();
  };

  const cursorStyle = !isDemo ? "pointer" : "default";


  /* ----------------------------
      1. IMAGE MODE
  ---------------------------- */
  if (src) {
    return (
      <img
        src={src}
        alt={name ? `${name} avatar` : "Avatar"}
        className={
          isHeader
            ? "header-avatar-img"
            : className
        }
        title={tooltip}
        onClick={handleClick}
        style={
          isHeader
            ? {} // header size is controlled by CSS, not inline styles
            : { width: size, height: size, cursor: cursorStyle }
        }
        onError={(e) => {
          e.currentTarget.onerror = null;
          setSrc("");
        }}
      />
    );
  }

  /* ----------------------------
      2. PROFILE MODAL: "No Image"
  ---------------------------- */
  if (placeholderMode === "profileModal") {
    return (
      <div
        className={isHeader ? "header-avatar" : "avatar-placeholder"}
        style={!isHeader ? { width: size, height: size } : {}}
      >
        No Image
      </div>
    );
  }

  /* ----------------------------
      3. INITIALS (choiceModal)
  ---------------------------- */
  return (
    <div
      className={
        isHeader
          ? "header-avatar"
          : `avatar-display-initials ${className}`
      }
      style={
        isHeader
          ? {} // header avatar uses header CSS ONLY
          : {
              width: size,
              height: size,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }
      }
      title={tooltip}
      onClick={handleClick}
    >
      {isHeader ? (
        <span className="avatar-initials">{firstChar || "I"}</span>
      ) : (
        firstChar || "I"
      )}
    </div>
  );
};

export default AvatarDisplay;
