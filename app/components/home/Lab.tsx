import Link from "next/link";
import { lab } from "@/content/site";
import type { LabProject } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/utils";

function StageBadge({ stage }: { stage: LabProject["stage"] }) {
  return (
    <span className={cn("label shrink-0 rounded-full px-2.5 py-1.5", stage === "LIVE PRODUCT" ? "bg-lime text-ink" : "border border-white/25 text-white/80")}>
      {stage === "LIVE PRODUCT" ? "Live" : stage.charAt(0) + stage.slice(1).toLowerCase()}
    </span>
  );
}

function Links({ p }: { p: LabProject }) {
  const links = p.links ?? (p.href ? [{ label: p.hrefLabel ?? "Open", href: p.href, external: true }] : []);
  if (!links.length) return null;
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {links.map((l) => (
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
  );
}

/** Featured row for the flagship experiment */
function Featured({ p }: { p: LabProject }) {
  return (
    <Reveal as="article" className="glass-dark rounded-lg p-6 ring-1 ring-lime/25 sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-d-sm font-medium">{p.name}</h3>
            <StageBadge stage={p.stage} />
          </div>
          <p className="mt-1 text-white/55">{p.subtitle}</p>
          <p className="mt-6 font-display text-2xl leading-snug">{p.concept}</p>
        </div>
        <dl className="grid gap-5 text-[0.9375rem] leading-relaxed sm:grid-cols-2 lg:col-span-7">
          <div><dt className="label mb-1.5 text-white/45">Problem</dt><dd className="text-white/80">{p.problem}</dd></div>
          <div><dt className="label mb-1.5 text-white/45">Outcome</dt><dd className="text-white">{p.outcome}</dd></div>
          <div><dt className="label mb-1.5 text-white/45">My contribution</dt><dd className="text-white/80">{p.contribution}</dd></div>
          <div>
            <dt className="label mb-2 text-white/45">Approach</dt>
            <dd className="text-white/70">{p.approach.join(" · ")}</dd>
          </div>
        </dl>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
        <p className="text-sm text-white/55">{p.stageNote}</p>
        <Links p={p} />
      </div>
    </Reveal>
  );
}

export function Lab() {
  const [featured, ...rest] = lab;
  return (
    <section id="lab" data-theme="dark" className="on-dark relative overflow-hidden bg-night py-24 text-white md:py-32" aria-label="AI and product lab">
      <div className="tech-grid-dark absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="shell relative">
        <SectionHead
          dark
          index="04"
          label="AI & product lab"
          lines={["Curious about what's next.", "Building towards it."]}
          intro="Experiments, tools and prototypes, each labelled with its real stage, from concept to live."
        />

        <div className="mt-14 space-y-6">
          <Featured p={featured} />
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.name} delay={(i % 2) * 0.08} as="article" className="glass-dark flex flex-col rounded-lg p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl leading-tight">{p.name}</h3>
                    {p.subtitle && <p className="mt-1 text-sm text-white/55">{p.subtitle}</p>}
                  </div>
                  <StageBadge stage={p.stage} />
                </div>
                <p className="mt-5 flex-1 leading-relaxed text-white/80">{p.concept}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/60"><span className="label mr-2 text-white/40">My role</span>{p.contribution}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <p className="text-sm text-white/50">{p.stageNote}</p>
                  <Links p={p} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
