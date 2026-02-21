// src/layouts/AppLayout.tsx

import { useEffect, useState } from "react";
import { ModeProvider } from "../context/ModeContext";
import Sidebar from "../components/sidebar/Sidebar";
import Studio from "../pages/Studio";
import NeuralNetworkBackground from "../components/NeuralNetworkBackground";
import "../styles/AppLayout.css";

/**
 * AppLayout
 * Studio-first architecture.
 * No routing outlet.
 * Sidebar = mode switcher.
 * Header is embedded inside Studio.
 */

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 830) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <ModeProvider>
      <div className={`app-layout ${collapsed ? "sidebar-collapsed" : ""}`}>

        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        <div className="main-col">
          <main className="app-content">
            <NeuralNetworkBackground />
            <Studio
              onOpenMobile={() => setMobileOpen(true)}
              mobileOpen={mobileOpen}
            />
          </main>
        </div>

      </div>
    </ModeProvider>
  );
}

