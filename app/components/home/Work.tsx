"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { alsoShipped, caseStudies } from "@/content/case-studies";
import type { CaseStudy } from "@/content/types";
import { Diagram } from "@/components/diagrams/Diagrams";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ReviewMark } from "@/components/ui/Review";
import { ArrowGlyph } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Pointer-driven 3D tilt for the visual half of a card. Listens on the parent
 * <article> because the card's link overlay sits above the visual.
 */
function Tilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });
  useEffect(() => {
    const host = ref.current?.closest("article");
    if (!host || reduce) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = ref.current!.getBoundingClientRect();
      x.set(Math.max(-0.5, Math.min(0.5, (e.clientX - r.left) / r.width - 0.5)));
      y.set(Math.max(-0.5, Math.min(0.5, (e.clientY - r.top) / r.height - 0.5)));
    };
    const leave = () => { x.set(0); y.set(0); };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => { host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave); };
  }, [reduce, x, y]);
  return (
    <div ref={ref} className={cn("[perspective:1200px]", className)}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="h-full">
        {children}
      </motion.div>
    </div>
  );
}

/* Layouts differ per card on purpose: no two cards share a composition */
const LAYOUT = [
  { wrap: "lg:col-span-12", grid: "lg:grid-cols-12", copy: "lg:col-span-5", visual: "lg:col-span-7" },
  { wrap: "lg:col-span-7", grid: "", copy: "", visual: "" },
  { wrap: "lg:col-span-5 lg:mt-24", grid: "", copy: "", visual: "" },
  { wrap: "lg:col-span-12", grid: "lg:grid-cols-12", copy: "lg:col-span-5 lg:order-2", visual: "lg:col-span-7 lg:order-1" },
];

function ProjectCard({ c, i }: { c: CaseStudy; i: number }) {
  const dark = c.theme === "dark";
  const L = LAYOUT[i];
  const wide = L.grid !== "";
  return (
    <Reveal className={L.wrap} delay={wide ? 0 : i * 0.08}>
      <article
        data-theme={c.theme}
        className={cn(
          "group relative h-full overflow-hidden rounded-xl transition-shadow duration-slow",
          dark ? "on-dark bg-night text-white" : "border border-ink/10 bg-paper text-ink hover:shadow-lift",
        )}
      >
        {dark && <div className="tech-grid-dark absolute inset-0 opacity-60" aria-hidden="true" />}
        <div className={cn("relative grid h-full gap-8 p-6 sm:p-10", wide && L.grid, wide && "lg:items-center lg:gap-12 lg:p-14")}>
          <div className={cn("flex flex-col", L.copy)}>
            <div className="flex items-center justify-between gap-4">
              <p className={cn("label", dark ? "text-lime" : "text-cobalt")}>{c.index} · {c.kicker}</p>
              <p className={cn("label", dark ? "text-white/50" : "text-mute")}>{c.overview.industry}</p>
            </div>
            <h3 className={cn("mt-6 font-medium", wide ? "text-d-md" : "text-d-sm")}>
              <Link href={`/work/${c.slug}`} className="after:absolute after:inset-0 after:z-10 focus-visible:outline-none">
                {c.title}
              </Link>
            </h3>
            <p className={cn("mt-4 leading-relaxed", dark ? "text-white/70" : "text-ink-2")}>{c.problem}</p>

            <dl className={cn("mt-8 grid grid-cols-2 gap-6 border-t pt-6 text-sm", dark ? "border-white/10" : "border-ink/10")}>
              <div>
                <dt className={cn("label mb-2", dark ? "text-white/45" : "text-mute")}>Context</dt>
                <dd>{c.overview.organisation.startsWith("To confirm") ? "To confirm" : c.overview.organisation}</dd>
              </div>
              <div>
                <dt className={cn("label mb-2", dark ? "text-white/45" : "text-mute")}>My role</dt>
                <dd>{c.overview.role}</dd>
              </div>
            </dl>

            <div className={cn("mt-8 flex flex-wrap items-end justify-between gap-6 border-t pt-6", dark ? "border-white/10" : "border-ink/10")}>
              <div>
                <p className={cn("font-display text-5xl font-medium tracking-[-0.015em]", dark ? "text-lime" : "text-ink")}>{c.heroMetric.value}</p>
                <p className={cn("mt-2 max-w-[18rem] text-sm", dark ? "text-white/60" : "text-mute")}>{c.heroMetric.label}</p>
                <div className="relative z-20"><ReviewMark check={c.heroMetric.check} dark={dark} className="mt-3" /></div>
              </div>
              <span
                className={cn(
                  "group/btn inline-flex items-center gap-3 rounded-full px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors duration-base",
                  dark ? "bg-white/10 group-hover:bg-lime group-hover:text-ink" : "bg-ink text-ivory group-hover:bg-cobalt",
                )}
                aria-hidden="true"
              >
                Read case study <ArrowGlyph />
              </span>
            </div>
          </div>

          <Tilt className={cn("relative", L.visual)}>
            <div
              className={cn(
                "relative overflow-hidden rounded-lg transition-transform duration-slow ease-out group-hover:scale-[1.015]",
                dark ? "bg-white/[0.03] ring-1 ring-white/10" : "bg-ivory ring-1 ring-ink/10",
              )}
            >
              <Diagram kind={c.diagram} dark={dark} />
            </div>
          </Tilt>
        </div>
      </article>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" className="relative py-24 md:py-36" aria-label="Selected work">
      <div className="shell">
        <SectionHead
          index="02"
          label="Selected work"
          lines={["Turning complex problems", "into meaningful products."]}
          intro="A selection of products, platforms, and transformations I've helped bring to life."
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {caseStudies.map((c, i) => (
            <ProjectCard key={c.slug} c={c} i={i} />
          ))}
        </div>

        {alsoShipped.length > 0 && <Reveal className="mt-10">
          <div className="flex flex-col gap-4 rounded-lg border border-dashed border-ink/15 p-6 md:flex-row md:items-center md:gap-10">
            <p className="label shrink-0 text-mute">Also shipped</p>
            <ul className="grid flex-1 gap-4 md:grid-cols-2">
              {alsoShipped.map((p) => (
                <li key={p.title} className="text-sm leading-relaxed">
                  <span className="font-medium">{p.title}.</span> <span className="text-ink-2">{p.line}</span> <ReviewMark check={p.check} />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>}
      </div>
    </section>
  );
}
