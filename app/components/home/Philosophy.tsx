"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { philosophy } from "@/content/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/utils";

const R = 150;
const CX = 200, CY = 200;
const angle = (i: number) => (-90 + i * 90) * (Math.PI / 180);
const pos = (i: number) => ({ x: CX + Math.cos(angle(i)) * R, y: CY + Math.sin(angle(i)) * R });
const arc = (i: number) => {
  const a = pos(i), b = pos((i + 1) % 4);
  return `M ${a.x} ${a.y} A ${R} ${R} 0 0 1 ${b.x} ${b.y}`;
};

/**
 * Four pillars arranged as a loop. The active pillar auto-advances while the
 * section is visible; hover, focus or click takes over and pauses it.
 */
export function Philosophy() {
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || locked || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % 4), 3600);
    return () => clearInterval(id);
  }, [inView, locked, reduce]);

  const p = philosophy.pillars[active];

  return (
    <section id="philosophy" data-theme="dark" className="on-dark relative overflow-hidden bg-night py-24 text-white md:py-36" aria-label="Product leadership philosophy">
      <div className="tech-grid-dark grid-fade absolute inset-0" aria-hidden="true" />
      <div className="shell relative">
        <SectionHead dark index="03" label="Product leadership" lines={["Good products don't", "happen by accident."]} intro={philosophy.intro} />

        <div ref={ref} className="mt-16 grid items-center gap-12 lg:grid-cols-12">
          {/* Diagram */}
          <div className="px-10 sm:px-14 lg:col-span-6 lg:px-8">
          <div className="relative mx-auto w-full max-w-[30rem]">
            <svg viewBox="0 0 400 400" className="w-full" aria-hidden="true">
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.12)" />
              <circle cx={CX} cy={CY} r={R - 40} fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 6" />
              {[0, 1, 2, 3].map((i) => (
                <motion.path
                  key={i}
                  d={arc(i)}
                  fill="none"
                  stroke="rgb(200,245,58)"
                  strokeWidth={2}
                  initial={false}
                  animate={{ pathLength: i === active ? 1 : 0, opacity: i === active ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 3.4, ease: "linear" }}
                />
              ))}
              {/* spokes */}
              {[0, 1, 2, 3].map((i) => {
                const a = pos(i);
                return <line key={i} x1={CX} y1={CY} x2={a.x} y2={a.y} stroke={i === active ? "rgba(200,245,58,0.5)" : "rgba(255,255,255,0.08)"} strokeDasharray="2 4" />;
              })}
              <circle cx={CX} cy={CY} r={54} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" />
              <text x={CX} y={CY - 4} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.6" fill="rgba(255,255,255,0.5)">OUTCOME</text>
              <text x={CX} y={CY + 14} textAnchor="middle" fontSize="18" fontFamily="var(--font-display)" fill="#fff">{p.n}</text>
            </svg>
            {/* Node buttons positioned over the SVG */}
            {philosophy.pillars.map((pl, i) => {
              const a = pos(i);
              return (
                <button
                  key={pl.n}
                  type="button"
                  onClick={() => { setActive(i); setLocked(true); }}
                  onMouseEnter={() => { setActive(i); setLocked(true); }}
                  onFocus={() => { setActive(i); setLocked(true); }}
                  aria-pressed={i === active}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[0.625rem] sm:px-4 sm:py-2 sm:text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-base",
                    i === active ? "border-lime bg-lime text-ink" : "border-white/20 bg-night text-white/80 hover:border-white/60",
                  )}
                  style={{ left: `${(a.x / 400) * 100}%`, top: `${(a.y / 400) * 100}%` }}
                >
                  {pl.n} {pl.name}
                </button>
              );
            })}
          </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-5 lg:col-start-8" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={p.n} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                <p className="label text-lime">{p.n} / {p.name}</p>
                <h3 className="mt-5 text-d-md font-medium">{p.line}</h3>
                <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  {p.practice.map((item) => (
                    <li key={item} className="flex items-center gap-4 py-4 text-white/75">
                      <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex gap-2" role="group" aria-label="Choose a pillar">
              {philosophy.pillars.map((pl, i) => (
                <button key={pl.n} type="button" onClick={() => { setActive(i); setLocked(true); }} className="group py-3" aria-label={`Show ${pl.name}`}>
                  <span className={cn("block h-0.5 w-10 transition-colors", i === active ? "bg-lime" : "bg-white/20 group-hover:bg-white/50")} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
