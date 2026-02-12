// src/components/NeuralNetworkBackground.jsx
import React, { useEffect, useRef, useState } from "react";
import "../styles/NeuralNetworkBackground.css";

const NeuralNetworkBackground = ({
  nodeColor,
  linkColor,
  nodeCount = 40,
  withSpiral = true,
  className = "",
}) => {
  const canvasRef = useRef();
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  // 🔄 React to theme changes dynamically
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // 🎨 Dynamic colors based on theme
  const isDark = theme === "dark";
  const effectiveNodeColor =
    nodeColor || (isDark ? "rgba(255, 215, 0, 0.35)" : "rgba(255, 215, 0, 0.4)");
  const effectiveLinkColor =
    linkColor || (isDark ? "rgba(255, 215, 0, 0.15)" : "rgba(255, 215, 0, 0.25)");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // 🧩 Create nodes
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    // 🧠 Draw function
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Links
      nodes.forEach((a) => {
        nodes.forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = effectiveLinkColor;
            ctx.lineWidth = 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      // Nodes
      nodes.forEach((n) => {
        ctx.fillStyle = effectiveNodeColor;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Movement
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      });

      requestAnimationFrame(draw);
    };

    draw();

    // ✅ Add this resize fix block HERE:
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // ✅ Fix: Trigger a delayed resize after mount to ensure proper sizing on refresh
    setTimeout(handleResize, 100);

    // 🧹 Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [effectiveLinkColor, effectiveNodeColor, nodeCount]);

  return (
    <div className={`neural-wrapper ${className}`}>
      {withSpiral && (
        <div className="spiral-overlay" aria-hidden="true"></div>
      )}
      <canvas ref={canvasRef} className="neural-bg" />
    </div>
  );
};

export default NeuralNetworkBackground;
