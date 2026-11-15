import Link from "next/link";
import { lab } from "@/content/site";
import type { LabStage } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ReviewMark } from "@/components/ui/Review";
import { cn } from "@/lib/utils";

const STAGES: LabStage[] = ["CONCEPT", "PROTOTYPE", "IN DEVELOPMENT", "LIVE PRODUCT"];

/** Four-step stage meter so maturity reads at a glance, honestly */
function StageMeter({ stage }: { stage: LabStage }) {
  const idx = STAGES.indexOf(stage);
  return (
    <div>
      <p className="sr-only">Stage: {stage}</p>
      <ol className="grid grid-cols-4 gap-1" aria-hidden="true">
        {STAGES.map((s, i) => (
          <li key={s} className={cn("h-1 rounded-full", i <= idx ? "bg-lime" : "bg-white/15")} />
        ))}
      </ol>
      <div className="mt-2 flex justify-between font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-white/40" aria-hidden="true">
        <span>Concept</span>
        <span>Live</span>
      </div>
    </div>
  );
}

export function Lab() {
  return (
    <section id="lab" data-theme="dark" className="on-dark relative overflow-hidden bg-night py-24 text-white md:py-36" aria-label="AI and product lab">
      <div className="tech-grid-dark absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute -right-40 top-20 h-[40rem] w-[40rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgb(var(--c-cobalt) / 0.6), transparent)" }}
        aria-hidden="true"
      />
      <div className="shell relative">
        <SectionHead
          dark
          index="05"
          label="AI & product lab"
          lines={["Curious about what's next.", "Building towards it."]}
          intro="Experiments, tools and prototypes outside the day job, each labelled with its real stage."
        />

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stage legend">
          {STAGES.map((s) => (
            <li key={s} className="label rounded-full border border-white/15 px-3 py-1.5 text-white/60">{s}</li>
          ))}
        </ul>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {lab.map((p, i) => (
            <Reveal key={p.name} delay={p.featured ? 0 : i * 0.1} as="article" className={cn("glass-dark group relative flex flex-col rounded-lg p-7 transition-transform duration-slow ease-out hover:-translate-y-1", p.featured && "ring-1 ring-lime/30 md:col-span-2 md:p-10")}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className={cn("font-medium", p.featured ? "text-d-md" : "text-d-sm")}>{p.name}</h3>
                  {p.subtitle && <p className="mt-1 text-white/60">{p.subtitle}</p>}
                </div>
                <span className={cn("label shrink-0 rounded-full px-2.5 py-1.5", p.stage === "LIVE PRODUCT" ? "bg-lime text-ink" : "border border-white/25 text-white/80")}>
                  {p.stage}
                </span>
              </div>
              <div className="mt-5"><StageMeter stage={p.stage} /></div>

              <dl className={cn("mt-6 flex-1 text-[0.9375rem] leading-relaxed", p.featured ? "grid gap-x-10 gap-y-5 md:grid-cols-2" : "space-y-5")}>
                <div><dt className="label mb-1.5 text-white/45">Problem</dt><dd className="text-white/80">{p.problem}</dd></div>
                <div><dt className="label mb-1.5 text-white/45">{p.conceptLabel ?? "Concept"}</dt><dd className="text-white/80">{p.concept}</dd></div>
                <div><dt className="label mb-1.5 text-white/45">My contribution</dt><dd className="text-white/80">{p.contribution}</dd></div>
                {p.outcome && <div><dt className="label mb-1.5 text-white/45">Outcome</dt><dd className="text-white">{p.outcome}</dd></div>}
                <div className={cn(p.featured && "md:col-span-2")}>
                  <dt className="label mb-2 text-white/45">Approach</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-1.5">
                      {p.approach.map((a) => (
                        <li key={a} className="rounded-xs bg-white/[0.06] px-2 py-1 font-mono text-[0.6875rem] text-white/70">{a}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                <p className="text-sm text-white/55">{p.stageNote}</p>
                {p.links && (
                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {p.links.map((l) => (
                      <li key={l.label}>
                        {l.external ? (
                          <a href={l.href} target="_blank" rel="noopener noreferrer" className="label link-draw text-lime">
                            {l.label} ↗<span className="sr-only"> (opens in new tab)</span>
                          </a>
                        ) : (
                          <Link href={l.href} className="label link-draw text-lime">{l.label} →</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {p.href && (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="label link-draw text-lime">
                    {p.hrefLabel} ↗<span className="sr-only"> (opens in new tab)</span>
                  </a>
                )}
              </div>
              <ReviewMark check={p.check} dark className="mt-4 self-start" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
