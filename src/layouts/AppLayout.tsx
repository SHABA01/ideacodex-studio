// src/layouts/AppLayout.tsx

import { useEffect, useState } from "react";
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
  const [currentMode, setCurrentMode] = useState("reality-lens");

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 830) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className={`app-layout ${collapsed ? "sidebar-collapsed" : ""}`}>
      
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        currentMode={currentMode}
        onModeChange={setCurrentMode}
      />

      <div className="main-col">

        {/* Single persistent header will live inside Studio */}
        
        <main className="app-content">
          <NeuralNetworkBackground />
          <Studio
            onOpenMobile={() => setMobileOpen(true)}
            mobileOpen={mobileOpen}
          />
        </main>

      </div>
    </div>
  );
}
