import Link from "next/link";
import { experiment, hrBuddy, localRunNote, shots } from "@/content/hr-buddy";
import { Section } from "@/components/case-study/CaseStudyView";
import { CaseToc, type TocItem } from "@/components/case-study/CaseToc";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { ArrowGlyph, Button } from "@/components/ui/button";
import { Shot } from "./Shot";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "layers", label: "Two layers of AI" },
  { id: "lifecycle", label: "The lifecycle" },
  { id: "worked", label: "What worked" },
  { id: "judgment", label: "Human judgment" },
  { id: "tradeoffs", label: "Trade-offs" },
  { id: "lessons", label: "Lessons" },
];
const toc: TocItem[] = SECTIONS.map((s, i) => ({ ...s, n: String(i + 1).padStart(2, "0") }));
const n = (id: string) => toc.find((t) => t.id === id)!.n;

export function ExperimentView() {
  const e = experiment;
  return (
    <article>
      {/* ---------------- Hero ---------------- */}
      <header className="relative overflow-hidden bg-paper pt-[calc(var(--nav-h)+3rem)]">
        <div className="tech-grid grid-fade absolute inset-0" aria-hidden="true" />
        <div className="shell relative pb-16 md:pb-24">
          <Reveal>
            <nav aria-label="Breadcrumb" className="label flex items-center gap-3 text-mute">
              <Link href="/#lab" className="link-draw hover:text-current">AI &amp; product lab</Link>
              <span aria-hidden="true">/</span>
              <span className="text-cobalt">HR Buddy experiment</span>
            </nav>
          </Reveal>
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Reveal><p className="label mb-6 text-cobalt">{e.subtitle}</p></Reveal>
              <h1 className="text-d-xl font-medium">
                <LineReveal immediate lines={e.titleLines} />
              </h1>
              <Reveal delay={0.3}><p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-2">{e.intro}</p></Reveal>
            </div>
            <Reveal delay={0.4} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Button asChild size="lg">
                <Link href={hrBuddy.caseHref}>Read the case study <ArrowGlyph /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={hrBuddy.accessHref}>{hrBuddy.accessLabel}</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </header>

      <div className="shell grid gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-3"><div className="h-full pt-16"><CaseToc items={toc} /></div></aside>

        <div className="min-w-0 lg:col-span-9 lg:pl-6">
          {/* Two layers */}
          <Section n={n("layers")} id="layers" title="Two layers of AI, with different jobs">
            <div className="grid gap-4 md:grid-cols-2">
              {e.layers.map((l, i) => (
                <Reveal key={l.kicker} delay={i * 0.08} className={cn("flex flex-col rounded-xl p-6 md:p-8", i === 0 ? "bg-paper ring-1 ring-ink/10" : "on-dark bg-night text-white")}>
                  <p className={cn("label", i === 0 ? "text-cobalt" : "text-lime")}>{l.kicker}</p>
                  <p className="mt-5 font-display text-4xl leading-none">{l.name}</p>
                  <p className={cn("mt-2 font-mono text-xs uppercase tracking-[0.12em]", i === 0 ? "text-mute" : "text-white/50")}>{l.model}</p>
                  <p className={cn("mt-6 flex-1 leading-relaxed", i === 0 ? "text-ink-2" : "text-white/70")}>{l.body}</p>
                  <p className={cn("mt-6 border-t pt-4 text-sm font-medium", i === 0 ? "border-ink/10" : "border-white/10 text-lime")}>{l.fact}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-4">
              <p className="text-sm leading-relaxed text-mute">
                The two are deliberately separate. Claude built the product; it is not what answers employees. HR Buddy also has an Anthropic adapter, built and tested
                but not connected.
              </p>
            </Reveal>
          </Section>

          {/* Lifecycle */}
          <Section n={n("lifecycle")} id="lifecycle" title="From vision to production">
            <ol className="grid gap-px overflow-hidden rounded-lg bg-ink/10 sm:grid-cols-2 xl:grid-cols-4">
              {e.lifecycle.map((s, i) => (
                <Reveal as="li" key={s.stage} delay={(i % 4) * 0.05} className="relative bg-paper p-6">
                  <div className="flex items-center gap-3">
                    <span className={cn("grid h-7 w-7 place-items-center rounded-full font-mono text-[0.6875rem]", i === e.lifecycle.length - 1 ? "bg-lime text-ink" : "bg-ink text-ivory")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < e.lifecycle.length - 1 && <span className="h-px flex-1 bg-ink/15" aria-hidden="true" />}
                  </div>
                  <p className="mt-4 font-display text-xl">{s.stage}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.body}</p>
                </Reveal>
              ))}
              <Reveal as="li" className="flex flex-col justify-end bg-night p-6 text-white">
                <p className="font-display text-5xl leading-none text-lime">11 days</p>
                <p className="mt-2 text-sm text-white/60">1–11 November 2026</p>
              </Reveal>
            </ol>
          </Section>

          {/* What worked */}
          <Section n={n("worked")} id="worked" title="What worked">
            <Reveal className="prose-case max-w-prose">
              <ul>{e.worked.map((x) => <li key={x}>{x}</li>)}</ul>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Reveal><Shot shot={shots.admin} sizes="(min-width: 768px) 40vw, 100vw" /></Reveal>
              <Reveal delay={0.08}><Shot shot={shots.confirm} sizes="(min-width: 768px) 40vw, 100vw" /></Reveal>
            </div>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-mute">{localRunNote}</p>
          </Section>

          {/* Human judgment */}
          <Section n={n("judgment")} id="judgment" title="What required human judgment">
            <div className="grid gap-4">
              {e.judgment.map((j, i) => (
                <Reveal key={j.title} delay={i * 0.05}>
                  <div className="grid gap-4 rounded-lg bg-night p-6 text-white md:grid-cols-[auto_1fr] md:gap-8 md:p-8">
                    <span className="font-display text-4xl text-lime">J{i + 1}</span>
                    <div>
                      <h3 className="text-d-sm font-medium">{j.title}</h3>
                      <p className="mt-3 max-w-prose leading-relaxed text-white/75">{j.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* Trade-offs */}
          <Section n={n("tradeoffs")} id="tradeoffs" title="Trade-offs">
            <div className="grid gap-px overflow-hidden rounded-lg bg-ink/10 sm:grid-cols-2">
              {e.tradeoffs.map((t, i) => (
                <Reveal key={t.title} delay={(i % 2) * 0.05} className="bg-paper p-6">
                  <p className="font-display text-xl">{t.title}</p>
                  <p className="mt-2 leading-relaxed text-ink-2">{t.body}</p>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* Lessons */}
          <Section n={n("lessons")} id="lessons" title="Lessons">
            <ol className="space-y-4">
              {e.lessons.map((l, i) => (
                <Reveal as="li" key={l} delay={i * 0.05} className="flex gap-5 border-b border-ink/10 pb-4">
                  <span className="font-mono text-xs text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-display text-xl leading-snug sm:text-2xl">{l}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-10 rounded-lg border border-dashed border-ink/25 p-6">
              <p className="label text-mute">Scope of this claim</p>
              <p className="mt-3 max-w-prose leading-relaxed text-ink-2">{e.disclaimer}</p>
            </Reveal>
            <Reveal className="mt-10">
              <Link
                href={hrBuddy.caseHref}
                className="group/btn group flex flex-col gap-4 rounded-xl bg-ink p-6 text-ivory transition-colors hover:bg-ink/90 sm:flex-row sm:items-center sm:justify-between md:p-8"
              >
                <span>
                  <span className="label text-lime">Case study 05</span>
                  <span className="mt-2 block font-display text-2xl sm:text-3xl">{hrBuddy.title}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-3 font-mono text-xs uppercase tracking-[0.12em]">Read the case study <ArrowGlyph /></span>
              </Link>
            </Reveal>
          </Section>
        </div>
      </div>
      <div className="h-16" aria-hidden="true" />
    </article>
  );
}
