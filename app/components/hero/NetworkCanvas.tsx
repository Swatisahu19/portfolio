"use client";

import { useEffect, useRef } from "react";

/**
 * NetworkCanvas
 * A single 2D canvas that renders:
 *   1. a drifting node network with distance-faded links
 *   2. data pulses travelling along links
 *   3. rotating wireframe polyhedra with perspective projection
 * all reacting to the pointer. No WebGL and no dependencies, roughly 4 KB.
 *
 * Performance: DPR capped at 2, node count scales with area, the loop pauses
 * when offscreen or the tab is hidden, and it draws one static frame under
 * prefers-reduced-motion.
 */

type Theme = "light" | "dark";
type Geo = { kind: "ico" | "octa"; x: number; y: number; r: number; speed: number; orbit?: number };

type Props = {
  theme?: Theme;
  /** Polyhedra anchored in fractions of the canvas (0..1) */
  geometry?: Geo[];
  density?: number;
  className?: string;
  /** Radius around the pointer that pulls links toward it */
  pointerRadius?: number;
};

const PALETTE = {
  light: { node: "20,20,19", link: "20,20,19", pulse: "46,76,255", geo: "20,20,19", accent: "46,76,255" },
  dark: { node: "255,255,255", link: "255,255,255", pulse: "200,245,58", geo: "255,255,255", accent: "200,245,58" },
};

// Unit icosahedron
const PHI = (1 + Math.sqrt(5)) / 2;
const ICO_V: [number, number, number][] = (
  [
    [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
    [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
    [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
  ] as [number, number, number][]
).map(([x, y, z]) => {
  const l = Math.hypot(x, y, z);
  return [x / l, y / l, z / l];
});
const ICO_E = edgesByDistance(ICO_V);
const OCTA_V: [number, number, number][] = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
const OCTA_E = edgesByDistance(OCTA_V);

function edgesByDistance(v: [number, number, number][]) {
  let min = Infinity;
  for (let i = 0; i < v.length; i++)
    for (let j = i + 1; j < v.length; j++) min = Math.min(min, dist3(v[i], v[j]));
  const e: [number, number][] = [];
  for (let i = 0; i < v.length; i++)
    for (let j = i + 1; j < v.length; j++) if (dist3(v[i], v[j]) < min * 1.01) e.push([i, j]);
  return e;
}
function dist3(a: number[], b: number[]) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

export function NetworkCanvas({ theme = "light", geometry = [], density = 1, className = "", pointerRadius = 170 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const C = PALETTE[theme];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let w = 0, h = 0, dpr = 1, LINK = 130;
    let raf = 0;
    let running = false;
    let visible = true;
    const pointer = { x: -9999, y: -9999, tx: 0, ty: 0, sx: 0, sy: 0 };

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];
    let links: [number, number][] = [];
    const pulses: { a: number; b: number; t: number; v: number }[] = [];

    const seed = () => {
      const area = w * h;
      const count = Math.round(Math.min(coarse ? 34 : 90, Math.max(18, (area / 16000) * density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() < 0.12 ? 2.2 : 1.2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      LINK = Math.min(150, Math.max(100, w / 10));
      seed();
      if (!running) frame(performance.now());
    };


    const drawPolyhedron = (g: Geo, t: number) => {
      const verts = g.kind === "ico" ? ICO_V : OCTA_V;
      const edges = g.kind === "ico" ? ICO_E : OCTA_E;
      let cx = g.x * w, cy = g.y * h;
      if (g.orbit) {
        cx += Math.cos(t * 0.00025 * g.speed) * g.orbit * w;
        cy += Math.sin(t * 0.00025 * g.speed) * g.orbit * h * 0.6;
      }
      const R = g.r * Math.min(w, h);
      const ay = t * 0.00012 * g.speed + pointer.sx * 0.6;
      const ax = t * 0.00007 * g.speed + pointer.sy * 0.4;
      const cosY = Math.cos(ay), sinY = Math.sin(ay), cosX = Math.cos(ax), sinX = Math.sin(ax);
      const P = verts.map(([x, y, z]) => {
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const persp = 2.6 / (2.6 + z2);
        return { x: cx + x1 * R * persp, y: cy + y1 * R * persp, z: z2 };
      });
      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const depth = (P[a].z + P[b].z) / 2; // -1 (front) .. 1 (back)
        const alpha = 0.1 + (1 - (depth + 1) / 2) * 0.32;
        ctx.strokeStyle = `rgba(${C.geo},${alpha})`;
        ctx.beginPath();
        ctx.moveTo(P[a].x, P[a].y);
        ctx.lineTo(P[b].x, P[b].y);
        ctx.stroke();
      }
      for (const p of P) {
        const front = p.z < 0;
        ctx.fillStyle = front ? `rgba(${C.accent},0.9)` : `rgba(${C.geo},0.3)`;
        const s = front ? 3 : 2;
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      }
    };

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Smooth pointer for parallax tilt (-0.5..0.5)
      pointer.sx += (pointer.tx - pointer.sx) * 0.05;
      pointer.sy += (pointer.ty - pointer.sy) * 0.05;

      // Move nodes
      if (!reduce) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
          const dx = n.x - pointer.x, dy = n.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 6400) {
            const d = Math.sqrt(d2) || 1;
            n.x += (dx / d) * 0.6;
            n.y += (dy / d) * 0.6;
          }
        }
      }

      // Links
      links = [];
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            links.push([i, j]);
            ctx.strokeStyle = `rgba(${C.link},${(1 - d / LINK) * (theme === "dark" ? 0.16 : 0.12)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // Pointer links
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (pd < pointerRadius) {
          ctx.strokeStyle = `rgba(${C.accent},${(1 - pd / pointerRadius) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${C.node},${n.r > 2 ? 0.55 : 0.3})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulses travel along links
      if (!reduce && links.length && pulses.length < (coarse ? 3 : 7) && Math.random() < 0.04) {
        const [a, b] = links[Math.floor(Math.random() * links.length)];
        pulses.push({ a, b, t: 0, v: 0.008 + Math.random() * 0.012 });
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.v;
        const A = nodes[p.a], B = nodes[p.b];
        if (p.t >= 1 || !A || !B) { pulses.splice(i, 1); continue; }
        const x = A.x + (B.x - A.x) * p.t, y = A.y + (B.y - A.y) * p.t;
        ctx.fillStyle = `rgba(${C.pulse},0.95)`;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${C.pulse},0.18)`;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const g of geometry) drawPolyhedron(g, reduce ? 4000 : t);

      if (running) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduce || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.tx = pointer.x / rect.width - 0.5;
      pointer.ty = pointer.y / rect.height - 0.5;
    };
    const onLeave = () => { pointer.x = pointer.y = -9999; pointer.tx = pointer.ty = 0; };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    const host: EventTarget = canvas.closest("section, [data-canvas-host]") ?? window;
    host.addEventListener("pointermove", onMove as EventListener, { passive: true });
    host.addEventListener("pointerleave", onLeave as EventListener);

    resize();
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove as EventListener);
      host.removeEventListener("pointerleave", onLeave as EventListener);
    };
    // geometry is static per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, density, pointerRadius]);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
