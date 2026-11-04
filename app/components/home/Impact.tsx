"use client";

import { motion, useReducedMotion } from "framer-motion";
import { impact } from "@/content/site";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { ReviewMark } from "@/components/ui/Review";

export function Impact() {
  const reduce = useReducedMotion();
  return (
    <section id="impact" className="relative border-y border-ink/10 bg-paper py-24 md:py-32" aria-labelledby="impact-title">
      <div className="shell">
        <Reveal className="mb-14">
          <p className="eyebrow"><span className="text-ink">01</span> / Impact at a glance</p>
          <h2 id="impact-title" className="mt-5 max-w-xl text-d-md font-medium">Outcomes, with the receipts attached.</h2>
        </Reveal>

        <div className="relative">
          {/* Connecting line with nodes */}
          <svg className="pointer-events-none absolute left-0 right-0 top-0 hidden h-3 w-full lg:block" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden="true">
            <motion.line
              x1="0" y1="1" x2="100" y2="1"
              stroke="rgb(20 20 19 / 0.25)" strokeWidth="0.5" vectorEffect="non-scaling-stroke"
              initial={{ pathLength: reduce ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
            />
          </svg>
          <ul className="grid gap-px overflow-hidden rounded-lg bg-ink/10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:overflow-visible lg:rounded-none lg:bg-transparent">
            {impact.map((m, i) => (
              <Reveal as="li" key={m.label} delay={i * 0.1} className="relative bg-paper p-6 lg:bg-transparent lg:px-0 lg:pr-8 lg:pt-12">
                <span className="absolute -top-[3px] left-0 hidden h-2 w-2 rounded-full bg-ink ring-4 ring-paper lg:block" aria-hidden="true" />
                <p className="label text-mute">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-4 font-display text-[clamp(3rem,6vw,5.5rem)] font-medium leading-none tracking-[-0.015em]">
                  <CountUp to={m.countTo} prefix={m.prefix} suffix={m.suffix} fallback={m.value} />
                </p>
                <p className="mt-4 max-w-[16rem] text-base font-medium leading-snug">{m.label}</p>
                {m.detail && <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-mute">{m.detail}</p>}
                <ReviewMark check={m.check} className="mt-4" />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
