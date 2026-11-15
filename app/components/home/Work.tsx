import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { hrBuddy, shots } from "@/content/hr-buddy";
import type { CaseStudy } from "@/content/types";
import { Diagram } from "@/components/diagrams/Diagrams";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowGlyph } from "@/components/ui/button";

/** Two outcomes, marked so they scan as evidence rather than prose */
function Outcomes({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="space-y-2.5">
      {items.map((o) => (
        <li key={o} className={`flex gap-3 font-medium leading-snug ${dark ? "text-white" : "text-ink"}`}>
          <span className={`mt-[0.45em] h-2 w-2 shrink-0 rounded-full ${dark ? "bg-lime" : "bg-cobalt"}`} aria-hidden="true" />
          {o}
        </li>
      ))}
    </ul>
  );
}

/** One card layout for every enterprise case study: visual, context, role, two outcomes, link */
function ProjectCard({ c, i }: { c: CaseStudy; i: number }) {
  return (
    <Reveal delay={(i % 2) * 0.08} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-paper transition-shadow duration-slow hover:shadow-lift">
        <div className="relative border-b border-ink/10 bg-ivory px-6 pt-6 sm:px-8 sm:pt-8" aria-hidden="true">
          <Diagram kind={c.diagram} className="mx-auto h-44 w-full transition-transform duration-slow ease-out group-hover:scale-[1.02] sm:h-52" />
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <p className="label text-cobalt">{c.index} · {c.kicker}</p>
          <h3 className="mt-4 text-d-sm font-medium">
            <Link href={`/work/${c.slug}`} className="after:absolute after:inset-0 after:z-10 focus-visible:outline-none">
              {c.title}
            </Link>
          </h3>
          <p className="mt-3 leading-relaxed text-ink-2">{c.card.context}</p>
          <p className="mt-5 border-t border-ink/10 pt-5 text-sm leading-relaxed text-ink-2">
            <span className="label mr-2 text-mute">My role</span>
            {c.card.contribution}
          </p>
          <div className="mt-5 flex-1"><Outcomes items={c.card.outcomes} /></div>
          <span className="mt-7 inline-flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink transition-colors group-hover:text-cobalt" aria-hidden="true">
            Read case study <ArrowGlyph />
          </span>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * Project 05. Full width and dark so the AI work reads as a distinct strand,
 * with strategy, execution and hands-on building shown separately.
 */
function HrBuddyCard() {
  return (
    <Reveal className="lg:col-span-2">
      <article data-theme="dark" className="on-dark relative overflow-hidden rounded-xl bg-night text-white">
        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-12">
          <div className="lg:col-span-5">
            <p className="label text-lime">{hrBuddy.index} · {hrBuddy.cardKicker}</p>
            <h3 className="mt-4 text-d-md font-medium">
              <Link href={hrBuddy.caseHref} className="transition-colors hover:text-lime">{hrBuddy.cardTitle}</Link>
            </h3>
            <p className="mt-4 leading-relaxed text-white/70">{hrBuddy.cardContext}</p>

            <dl className="mt-6 divide-y divide-white/10 border-y border-white/10 text-sm">
              {hrBuddy.cardRoles.map((r) => (
                <div key={r.k} className="grid gap-1 py-3 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
                  <dt className="label pt-0.5 text-white/45">{r.k}</dt>
                  <dd className="leading-relaxed text-white/80">{r.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-2">
              <p className="font-display text-5xl leading-none text-lime">{hrBuddy.cardAchievement.value}</p>
              <p className="max-w-[17rem] text-sm text-white/60">{hrBuddy.cardAchievement.label}</p>
            </div>
            <div className="mt-6"><Outcomes items={hrBuddy.cardOutcomes} dark /></div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={hrBuddy.caseHref}
                className="group/btn inline-flex items-center gap-3 rounded-full bg-lime px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink transition-shadow hover:shadow-[0_8px_24px_-8px_rgb(var(--c-lime)/0.9)]"
              >
                Read case study <ArrowGlyph />
              </Link>
              <Link
                href={hrBuddy.experimentHref}
                className="group/btn inline-flex items-center gap-3 rounded-full border border-white/25 px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors hover:border-lime hover:text-lime"
              >
                Explore AI experiment <ArrowGlyph />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-lg ring-1 ring-white/10">
              <Image src={shots.confirm.src} alt={shots.confirm.alt} width={shots.confirm.w} height={shots.confirm.h} sizes="(min-width: 1024px) 55vw, 100vw" className="h-auto w-full" />
            </div>
            <p className="mt-3 text-sm text-white/50">An independent product experiment on synthetic data. Not an employer product.</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" className="relative py-24 md:py-32" aria-label="Selected work">
      <div className="shell">
        <SectionHead
          index="02"
          label="Selected work"
          lines={["Enterprise platforms,", "digital products and AI."]}
          intro="Five products across revenue systems, operations, consumer scale and applied AI. Each links to the full case study."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {caseStudies.map((c, i) => (
            <ProjectCard key={c.slug} c={c} i={i} />
          ))}
          <HrBuddyCard />
        </div>
      </div>
    </section>
  );
}
