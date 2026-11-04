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
            <Reveal key={p.name} delay={i * 0.1} as="article" className="glass-dark group relative flex flex-col rounded-lg p-7 transition-transform duration-slow ease-out hover:-translate-y-1">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-d-sm font-medium">{p.name}</h3>
                <span className={cn("label shrink-0 rounded-full px-2.5 py-1.5", p.stage === "LIVE PRODUCT" ? "bg-lime text-ink" : "border border-white/25 text-white/80")}>
                  {p.stage}
                </span>
              </div>
              <div className="mt-5"><StageMeter stage={p.stage} /></div>

              <dl className="mt-6 flex-1 space-y-5 text-[0.9375rem] leading-relaxed">
                <div><dt className="label mb-1.5 text-white/45">Problem</dt><dd className="text-white/80">{p.problem}</dd></div>
                <div><dt className="label mb-1.5 text-white/45">Concept</dt><dd className="text-white/80">{p.concept}</dd></div>
                <div><dt className="label mb-1.5 text-white/45">My contribution</dt><dd className="text-white/80">{p.contribution}</dd></div>
                <div>
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
