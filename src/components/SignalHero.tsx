"use client";

import { useEffect, useRef } from "react";
import { DOMAIN_COLORS } from "@/data/domainColors";

const STREAM_COLORS = [
  DOMAIN_COLORS.biomedical,
  DOMAIN_COLORS.civic,
  DOMAIN_COLORS.data,
  DOMAIN_COLORS.ml,
];

const STREAM_MID_FRACS = [0.25, 0.4, 0.6, 0.75];
const STREAM_LABELS = ["BIOMEDICAL", "CIVIC AI", "DATA INFRA", "APPLIED ML"];

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

function ampMultiplier(nx: number): number {
  if (nx < 0.45) return 1;
  if (nx <= 0.6) {
    const t = (nx - 0.45) / 0.15;
    return 0.2 + (0.8 * (1 + Math.cos(Math.PI * t))) / 2;
  }
  if (nx <= 0.78) {
    const t = (nx - 0.6) / 0.18;
    return 0.2 + (0.8 * (1 - Math.cos(Math.PI * t))) / 2;
  }
  return 1;
}

function opacityAt(nx: number): number {
  if (nx < 0.62) return 1;
  return 1 - smoothstep((nx - 0.62) / 0.38);
}

function hexWithAlpha(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function SignalHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    const start = performance.now();
    const STEPS = 140;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w < 1 || h < 1) return;
      mouseRef.current = {
        x: (e.clientX - rect.left) / w,
        y: (e.clientY - rect.top) / h,
      };
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);

    const drawFrame = (now: number) => {
      const rect = parent.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      if (W >= 1 && H >= 1) {
        ctx.clearRect(0, 0, W, H);

        const t = (now - start) * 0.0012;
        const my = mouseRef.current.y;

        for (let s = 0; s < STREAM_COLORS.length; s++) {
          const midFrac = STREAM_MID_FRACS[s];
          const color = STREAM_COLORS[s];
          const midY = midFrac * H;

          const bend =
            Math.abs(my - midFrac) < 0.4 ? (my - midFrac) * H * 0.3 : 0;

          const pts: { x: number; y: number; nx: number }[] = [];
          for (let i = 0; i <= STEPS; i++) {
            const nx = i / STEPS;
            const x = nx * W;
            const ampMult = ampMultiplier(nx);
            const wave =
              Math.sin(t * 1.8 + nx * 14 + s * 1.7) * 0.035 * H * ampMult;
            pts.push({ x, y: midY + wave + bend, nx });
          }

          for (let i = 0; i < STEPS; i++) {
            const nx = (pts[i].nx + pts[i + 1].nx) / 2;
            const alpha = opacityAt(nx) * 0.55;
            ctx.strokeStyle = hexWithAlpha(color, alpha);
            ctx.lineWidth = 1.2;
            ctx.lineCap = "butt";
            ctx.lineJoin = "miter";
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[i + 1].x, pts[i + 1].y);
            ctx.stroke();
          }
        }

        ctx.font = '600 9px "Inter", system-ui, sans-serif';
        ctx.textBaseline = "middle";
        for (let s = 0; s < STREAM_LABELS.length; s++) {
          const midFrac = STREAM_MID_FRACS[s];
          const color = STREAM_COLORS[s];
          ctx.fillStyle = hexWithAlpha(color, 0.35);
          ctx.fillText(STREAM_LABELS[s], 10, midFrac * H - 12);
        }
      }

      rafId = requestAnimationFrame(drawFrame);
    };

    rafId = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
