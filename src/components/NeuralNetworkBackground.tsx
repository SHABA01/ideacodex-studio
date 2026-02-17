import { useEffect, useRef, useState } from "react";
import "../styles/NeuralNetworkBackground.css";

interface NeuralNetworkBackgroundProps {
  nodeColor?: string;
  linkColor?: string;
  nodeCount?: number;
  withSpiral?: boolean;
  className?: string;
}

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function NeuralNetworkBackground({
  nodeColor,
  linkColor,
  nodeCount = 40,
  withSpiral = true,
  className = "",
}: NeuralNetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  /* ===============================
     React to theme changes dynamically
  =============================== */
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(
        document.documentElement.getAttribute("data-theme") || "light"
      );
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  /* ===============================
     Dynamic Colors
  =============================== */
  const isDark = theme === "dark";

  const effectiveNodeColor =
    nodeColor ||
    (isDark
      ? "rgba(255, 215, 0, 0.35)"
      : "rgba(255, 215, 0, 0.4)");

  const effectiveLinkColor =
    linkColor ||
    (isDark
      ? "rgba(255, 215, 0, 0.15)"
      : "rgba(255, 215, 0, 0.25)");

  /* ===============================
     Canvas Animation
  =============================== */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw links
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

      // Draw nodes
      nodes.forEach((n) => {
        ctx.fillStyle = effectiveNodeColor;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Move nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Delayed resize fix for refresh issues
    setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [effectiveLinkColor, effectiveNodeColor, nodeCount]);

  return (
    <div className={`neural-wrapper ${className}`}>
      {withSpiral && (
        <div className="spiral-overlay" aria-hidden="true" />
      )}
      <canvas ref={canvasRef} className="neural-bg" />
    </div>
  );
}
