"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { education, experience, site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ReviewMark } from "@/components/ui/Review";

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="relative py-24 md:py-36" aria-label="Professional experience">
      <div className="shell">
        <SectionHead
          index="04"
          label="Experience"
          lines={["From reading markets", "to running platforms."]}
          intro="Eleven years, four organisations, one throughline: turning messy commercial problems into products people use."
        />

        <ol ref={ref} className="relative mt-20">
          {/* Track and progress */}
          <span className="absolute bottom-0 left-[7px] top-0 w-px bg-ink/10 md:left-[calc(25%+7px)]" aria-hidden="true" />
          <motion.span style={{ scaleY: progress }} className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-ink md:left-[calc(25%+7px)]" aria-hidden="true" />

          {experience.map((role, i) => (
            <li key={role.company} className="relative grid gap-4 pb-20 pl-10 last:pb-0 md:grid-cols-4 md:gap-0 md:pl-0">
              {/* Year column */}
              <div className="md:sticky md:top-28 md:self-start md:pr-12 md:text-right">
                <Reveal>
                  <p className="font-display text-5xl font-medium tracking-[-0.015em] text-ink/90 md:text-7xl">{role.start}</p>
                  <p className="label mt-3 text-mute">{role.period}</p>
                </Reveal>
              </div>
              {/* Node */}
              <span
                className={`absolute left-0 top-3 h-[15px] w-[15px] rounded-full border-2 border-ink md:left-[25%] ${i === 0 ? "bg-lime" : "bg-ivory"}`}
                aria-hidden="true"
              />
              {/* Content */}
              <Reveal className="md:col-span-3 md:pl-14" delay={0.05}>
                <p className="label text-cobalt">{role.company}</p>
                <h3 className="mt-3 text-d-sm font-medium">{role.title}</h3>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">{role.summary}</p>

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                  <div>
                    <p className="label mb-4 text-mute">Scope & leadership</p>
                    <ul className="space-y-3 text-[0.9375rem] leading-relaxed text-ink-2">
                      {role.scope.map((s) => (
                        <li key={s} className="flex gap-3"><span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink/40" aria-hidden="true" />{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="label mb-4 text-mute">Outcomes reported</p>
                    <ul className="space-y-2.5">
                      {role.outcomes.map((o) => (
                        <li key={o} className="rounded-sm border border-ink/10 bg-paper px-4 py-3 text-[0.9375rem] leading-snug">{o}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {role.tags.map((t) => (
                    <li key={t} className="label rounded-full border border-ink/15 px-3 py-1.5 text-ink-2">{t}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Education & certifications */}
        <Reveal className="mt-24 grid gap-6 border-t border-ink/10 pt-10 md:grid-cols-3">
          <p className="label text-mute">Education & certification</p>
          <ul className="space-y-4 md:col-span-2 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
            {education.map((e) => (
              <li key={e.name}>
                <p className="font-medium">{e.name}</p>
                <p className="text-sm text-mute">{e.org} · {e.period}</p>
                <ReviewMark check={e.check} className="mt-2" />
              </li>
            ))}
            {site.certifications.map((c) => (
              <li key={c}><p className="font-medium">{c}</p></li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
