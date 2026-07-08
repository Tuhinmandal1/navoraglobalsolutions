import { useEffect, useRef } from "react";

/**
 * Signature hero visual: constellation of dots converging on a glowing core.
 * Navy/cyan palette, drifts gently, parallax with cursor.
 */
export function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: 0, y: 0, active: false };

    type Star = { x: number; y: number; vx: number; vy: number; r: number; base: number };
    let stars: Star[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(120, Math.floor((width * height) / 12000));
      stars = new Array(count).fill(0).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * Math.max(width, height) * 0.55;
        return {
          x: width / 2 + Math.cos(angle) * dist,
          y: height / 2 + Math.sin(angle) * dist * 0.7,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          r: Math.random() * 1.4 + 0.4,
          base: Math.random() * 0.6 + 0.3,
        };
      });
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", () => (mouse.active = false));

    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 0.008;
      const cx = width / 2 + (mouse.active ? (mouse.x - width / 2) * 0.04 : Math.sin(t) * 12);
      const cy =
        height / 2 + (mouse.active ? (mouse.y - height / 2) * 0.04 : Math.cos(t * 0.8) * 8);

      ctx.clearRect(0, 0, width, height);

      // Glowing core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 220);
      coreGrad.addColorStop(0, "rgba(0, 194, 255, 0.55)");
      coreGrad.addColorStop(0.35, "rgba(37, 99, 235, 0.18)");
      coreGrad.addColorStop(1, "rgba(11, 31, 58, 0)");
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, width, height);

      // Inner core
      const inner = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      inner.addColorStop(0, "rgba(255,255,255,0.9)");
      inner.addColorStop(0.4, "rgba(0,194,255,0.7)");
      inner.addColorStop(1, "rgba(0,194,255,0)");
      ctx.fillStyle = inner;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fill();

      // Update stars
      for (const s of stars) {
        // pull toward core slightly
        const dx = cx - s.x;
        const dy = cy - s.y;
        const dist = Math.hypot(dx, dy) || 1;
        s.vx += (dx / dist) * 0.002;
        s.vy += (dy / dist) * 0.002;
        // drift
        s.x += s.vx;
        s.y += s.vy;
        // dampen
        s.vx *= 0.985;
        s.vy *= 0.985;
        // reset if reaches core
        if (dist < 30) {
          const angle = Math.random() * Math.PI * 2;
          const d = Math.max(width, height) * 0.6;
          s.x = cx + Math.cos(angle) * d;
          s.y = cy + Math.sin(angle) * d * 0.7;
          s.vx = (Math.random() - 0.5) * 0.15;
          s.vy = (Math.random() - 0.5) * 0.15;
        }
      }

      // Lines between close stars
      ctx.lineWidth = 1;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 110 * 110) {
            const alpha = (1 - Math.sqrt(d2) / 110) * 0.18;
            ctx.strokeStyle = `rgba(0, 194, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Stars
      for (const s of stars) {
        ctx.fillStyle = `rgba(180, 230, 255, ${s.base})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
