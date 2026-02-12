import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="#" aria-label="X (Twitter)"><i className="fa-brands fa-x-twitter"></i></a>
        <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
        <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
        <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
        <a href="#" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a>
        <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
        <a href="#" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
        <a href="mailto:hello@ideacodex.com" aria-label="Email"><i className="fa-solid fa-envelope"></i></a>
      </div>
      <p>© 2026 IdeaCodex. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
