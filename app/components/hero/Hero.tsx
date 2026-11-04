"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { hero, site } from "@/content/site";
import { NetworkCanvas } from "./NetworkCanvas";
import { LineReveal } from "@/components/motion/Reveal";
import { ArrowGlyph, Button } from "@/components/ui/button";


/** Layer that shifts with the pointer by `depth` px at the edge of the hero */
function Depth({ x, y, depth, className, children }: { x: MotionValue<number>; y: MotionValue<number>; depth: number; className?: string; children: ReactNode }) {
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth);
  return (
    <motion.div style={{ x: tx, y: ty }} className={className}>
      {children}
    </motion.div>
  );
}

/** CSS entrance: runs before hydration and is neutralised by prefers-reduced-motion */
function Enter({ delay, children, className = "" }: { delay: number; children: ReactNode; className?: string }) {
  return (
    <div className={`anim-fade-up ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/* Label positions: kept to the composition side so they never sit on the headline */
const LABEL_POS = [
  "left-[8%] top-[0%]",
  "right-[-8%] top-[9%]",
  "left-[-16%] top-[44%]",
  "right-[-6%] top-[40%]",
  "left-[-4%] bottom-[3%]",
  "right-[4%] bottom-[-4%]",
];

export function Hero() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });
  const reduce = useReducedMotion();

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      onPointerMove={onMove}
      onPointerLeave={() => { px.set(0); py.set(0); }}
      className="relative isolate overflow-hidden pt-[calc(var(--nav-h)+2rem)] lg:min-h-[100svh]"
      aria-labelledby="hero-title"
    >
      {/* Layer 0: grid + soft gradient field */}
      <div className="tech-grid grid-fade absolute inset-0 -z-20" aria-hidden="true" />
      <div
        className="absolute -z-20 right-[-10%] top-[-10%] h-[70vh] w-[60vw] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgb(var(--c-lime) / 0.35), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -z-20 left-[30%] bottom-[-20%] h-[50vh] w-[40vw] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgb(var(--c-cobalt) / 0.14), transparent)" }}
        aria-hidden="true"
      />

      {/* Layer 1: live network */}
      <div className="absolute inset-0 -z-10">
        <NetworkCanvas
          theme="light"
          geometry={[
            { kind: "ico", x: 0.77, y: 0.5, r: 0.3, speed: 1 },
            { kind: "octa", x: 0.56, y: 0.2, r: 0.05, speed: 2.2, orbit: 0.03 },
          ]}
        />
      </div>

      <div className="shell relative grid items-center gap-12 pb-10 lg:grid-cols-12 lg:gap-6 lg:pb-0 lg:min-h-[calc(100svh-var(--nav-h)-9rem)]">
        {/* Copy */}
        <div className="relative z-10 lg:col-span-7">
          <Enter delay={0.1}>
            <p className="label mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-2">
              <span className="inline-block h-2 w-2 animate-blink rounded-full bg-lime ring-4 ring-lime/25" aria-hidden="true" />
              {hero.eyebrow}
            </p>
          </Enter>
          <h1 id="hero-title" className="text-d-xl font-medium text-ink max-lg:text-[clamp(2.6rem,8.4vw,4.5rem)]">
            <LineReveal
              immediate
              delay={0.2}
              lineClassName="lg:whitespace-nowrap"
              lines={[
                ...hero.headline.slice(0, -1),
                <span key="last">
                  {hero.headline[hero.headline.length - 1]}{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 italic">{hero.headlineAccent}</span>
                    <span className="anim-draw-x absolute inset-x-[-0.06em] bottom-[0.1em] h-[0.3em] bg-lime" style={{ animationDelay: "1.1s" }} aria-hidden="true" />
                  </span>
                  .
                </span>,
              ]}
            />
          </h1>
          <Enter delay={0.75}>
            <p className="mt-8 max-w-[36rem] text-lg leading-relaxed text-ink-2 md:text-xl">{hero.statement}</p>
          </Enter>
          <Enter delay={0.9} className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#work">
                Explore my work <ArrowGlyph />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">Let&apos;s connect</a>
            </Button>
          </Enter>
        </div>

        {/* Composition */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[22rem] sm:max-w-[26rem] lg:col-span-5 lg:max-w-none" aria-hidden="false">
          {/* Orbit rings */}
          <Depth x={sx} y={sy} depth={-14} className="pointer-events-none absolute inset-[-14%] -z-10" >
            <svg viewBox="0 0 400 500" className="h-full w-full" aria-hidden="true">
              <g className="origin-center animate-spin-slow motion-reduce:animate-none" style={{ transformOrigin: "200px 250px" }}>
                <ellipse cx="200" cy="250" rx="190" ry="230" fill="none" stroke="rgb(20 20 19 / 0.14)" strokeDasharray="2 6" />
                <circle cx="200" cy="20" r="4" fill="rgb(var(--c-cobalt))" />
                <circle cx="10" cy="250" r="3" fill="rgb(20 20 19 / 0.5)" />
              </g>
              <g className="animate-spin-slow motion-reduce:animate-none [animation-direction:reverse] [animation-duration:90s]" style={{ transformOrigin: "200px 250px" }}>
                <ellipse cx="200" cy="250" rx="160" ry="205" fill="none" stroke="rgb(20 20 19 / 0.1)" />
                <rect x="356" y="246" width="8" height="8" fill="rgb(var(--c-lime))" stroke="rgb(20 20 19 / 0.6)" />
              </g>
            </svg>
          </Depth>

          {/* Portrait */}
          <Enter delay={0.35} className="absolute inset-[6%_10%_8%_10%]">
            <Depth x={sx} y={sy} depth={8} className="relative h-full w-full">
              <div className="relative h-full w-full overflow-hidden rounded-[999px_999px_var(--r-xl)_var(--r-xl)] bg-paper shadow-lift ring-1 ring-ink/10">
                <Image
                  src={site.portrait.src}
                  alt={site.portrait.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 32vw, 80vw"
                  className="object-cover object-[50%_28%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-ivory sm:p-5">
                  <div>
                    <p className="font-display text-lg font-medium leading-tight">Swati Sahu</p>
                    <p className="label mt-1 whitespace-nowrap opacity-80">Product Leader · India</p>
                  </div>
                  <span className="label whitespace-nowrap rounded-full bg-lime px-2.5 py-1.5 text-ink">Open to roles</span>
                </div>
              </div>
              {/* Corner ticks: viewfinder detail */}
              {["left-[-10px] top-[30%]", "right-[-10px] top-[30%]"].map((p) => (
                <span key={p} className={`absolute ${p} h-px w-5 bg-ink/40`} aria-hidden="true" />
              ))}
            </Depth>
          </Enter>

          {/* Floating panels: facts from resume */}
          <Depth x={sx} y={sy} depth={26} className="absolute -left-[14%] top-[16%] hidden sm:block">
            <Enter delay={1.05}>
              <div className="glass w-52 animate-drift rounded-md p-4 [animation-delay:-2s]">
                <p className="label text-mute">Platform reach</p>
                <p className="mt-2 font-display text-3xl font-medium tracking-[-0.01em]">50M+</p>
                <p className="mt-1 text-xs text-ink-2">users on the digital platform, across web, app & API</p>
                <svg viewBox="0 0 160 30" className="mt-3 h-6 w-full" aria-hidden="true">
                  <polyline points="0,26 20,22 40,24 60,16 80,18 100,10 120,12 140,5 160,3" fill="none" stroke="rgb(var(--c-cobalt))" strokeWidth="1.5" />
                </svg>
              </div>
            </Enter>
          </Depth>

          <Depth x={sx} y={sy} depth={36} className="absolute -right-[10%] bottom-[18%] hidden sm:block">
            <Enter delay={1.2}>
              <div className="glass w-56 animate-drift rounded-md p-4">
                <p className="label flex items-center justify-between text-mute">
                  Enterprise estate <span className="text-ink">05</span>
                </p>
                <ul className="mt-3 space-y-1.5 font-mono text-[0.6875rem] text-ink-2">
                  {["Salesforce", "SAP ERP", "Zoho", "CMS", "Payments"].map((s, i) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-lime ring-2 ring-ink/30" : "bg-ink/50"}`} />
                      {s}
                      <span className="ml-auto h-px flex-1 bg-ink/15" />
                      <span className="text-[0.625rem] text-mute">OK</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Enter>
          </Depth>

          {/* Floating labels */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            {hero.floatingLabels.map((l, i) => (
              <Depth key={l} x={sx} y={sy} depth={12 + (i % 3) * 10} className={`absolute ${LABEL_POS[i]}`}>
                <Enter delay={1.3 + i * 0.08}>
                  <span
                    className="label inline-flex animate-drift items-center gap-2 rounded-full border border-ink/10 bg-ivory/80 px-3 py-1.5 text-ink-2 backdrop-blur-sm"
                    style={{ animationDelay: `${-i * 1.3}s`, animationDuration: `${7 + i}s` }}
                  >
                    <span className="h-1 w-1 rounded-full bg-cobalt" />
                    {l}
                  </span>
                </Enter>
              </Depth>
            ))}
          </div>
        </div>
      </div>

      {/* Credibility strip */}
      <Enter delay={1.1} className="shell relative mt-6 lg:mt-0">
        <ul className="grid grid-cols-2 border-t border-ink/10 md:grid-cols-4">
          {hero.credibility.map((c, i) => (
            <li
              key={c}
              className={`label flex items-center gap-3 py-5 text-ink-2 ${i % 2 === 1 ? "pl-4 border-l border-ink/10" : ""} ${i >= 2 ? "border-t border-ink/10 md:border-t-0" : ""} ${i > 0 ? "md:border-l md:pl-6" : ""}`}
            >
              <span className="font-mono text-ink">{String(i + 1).padStart(2, "0")}</span>
              {c}
            </li>
          ))}
        </ul>
      </Enter>
    </section>
  );
}
