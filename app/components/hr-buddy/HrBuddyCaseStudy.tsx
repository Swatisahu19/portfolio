import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import {
  aiCapabilities,
  boundaries,
  chatbotVsAssistant,
  hrBuddy,
  lessons,
  localRunNote,
  modules,
  nextSteps,
  opportunity,
  safeguards,
  shots,
  stack,
  timeline,
  validation,
  validationNote,
} from "@/content/hr-buddy";
import { Section } from "@/components/case-study/CaseStudyView";
import { CaseToc, type TocItem } from "@/components/case-study/CaseToc";
import { CountUp } from "@/components/motion/CountUp";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { ArrowGlyph, Button } from "@/components/ui/button";
import { AiFlow } from "./AiFlow";
import { Architecture } from "./Architecture";
import { ExperienceTabs } from "./ExperienceTabs";
import { Shot } from "./Shot";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "opportunity", label: "The opportunity" },
  { id: "product", label: "The product" },
  { id: "ai", label: "HR Buddy AI" },
  { id: "responsible-ai", label: "Responsible AI" },
  { id: "technology", label: "Technology" },
  { id: "validation", label: "Validation" },
  { id: "timeline", label: "Execution timeline" },
  { id: "lessons", label: "Lessons & next steps" },
];
const toc: TocItem[] = SECTIONS.map((s, i) => ({ ...s, n: String(i + 1).padStart(2, "0") }));
const n = (id: string) => toc.find((t) => t.id === id)!.n;

/** External link with the site's new-tab convention */
function Ext({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}

export function HrBuddyCaseStudy() {
  const prev = caseStudies[caseStudies.length - 1];
  const next = caseStudies[0];

  return (
    <article>
      {/* ---------------- Hero ---------------- */}
      <header data-theme="dark" className="on-dark relative overflow-hidden bg-night pt-[calc(var(--nav-h)+3rem)] text-white">
        <div className="tech-grid-dark grid-fade absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgb(var(--c-lime) / 0.5), transparent)" }}
          aria-hidden="true"
        />
        <div className="shell relative pb-16 md:pb-24">
          <Reveal>
            <nav aria-label="Breadcrumb" className="label flex items-center gap-3 text-white/50">
              <Link href="/#work" className="link-draw hover:text-current">Work</Link>
              <span aria-hidden="true">/</span>
              <span className="text-lime">Case study {hrBuddy.index}</span>
            </nav>
          </Reveal>
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Reveal><p className="label mb-6 text-lime">{hrBuddy.kicker}</p></Reveal>
              <h1 className="text-d-xl font-medium">
                <LineReveal immediate lines={hrBuddy.titleLines} />
              </h1>
              <Reveal delay={0.3}><p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/70">{hrBuddy.statement}</p></Reveal>
              <Reveal delay={0.4} className="mt-10 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="lime">
                  <Ext href={hrBuddy.liveUrl}>Explore the live product <ArrowGlyph /></Ext>
                </Button>
                <Button asChild size="lg" variant="outline-dark">
                  <Link href={hrBuddy.accessHref}>{hrBuddy.accessLabel}</Link>
                </Button>
              </Reveal>
            </div>
            <Reveal delay={0.4} className="lg:col-span-4">
              <div className="glass-dark rounded-lg p-6">
                <p className="label text-white/50">Timeline</p>
                <p className="mt-3 font-display text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-[-0.015em] text-lime">
                  <CountUp to={hrBuddy.achievement.countTo} suffix={hrBuddy.achievement.suffix} fallback={hrBuddy.achievement.value} />
                </p>
                <p className="mt-3 text-sm text-white/65">{hrBuddy.achievement.label}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mt-14">
            <dl className="grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Product type", hrBuddy.productType],
                ["Role", hrBuddy.role],
                ["Context", hrBuddy.context],
                ["Live application", <Ext key="l" href={hrBuddy.liveUrl} className="link-draw text-lime">{hrBuddy.liveUrlDisplay} ↗</Ext>],
              ].map(([k, v]) => (
                <div key={k as string} className="bg-night p-5">
                  <dt className="label text-white/45">{k}</dt>
                  <dd className="mt-2 font-medium leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-white/50">{hrBuddy.accessNote} {hrBuddy.accessNote2}</p>
          </Reveal>

          <Reveal delay={0.25} className="mt-14 grid gap-6 lg:grid-cols-12 lg:items-start">
            <Shot shot={shots.dashboard} dark priority className="lg:col-span-8" sizes="(min-width: 1024px) 60vw, 100vw" />
            <Shot shot={shots.confirm} dark className="lg:col-span-4 lg:mt-24" sizes="(min-width: 1024px) 30vw, 100vw" />
          </Reveal>
        </div>
      </header>

      {/* ---------------- Body ---------------- */}
      <div className="shell grid gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-3"><div className="h-full pt-16"><CaseToc items={toc} /></div></aside>

        <div className="min-w-0 lg:col-span-9 lg:pl-6">
          {/* 01 Opportunity */}
          <Section n={n("opportunity")} id="opportunity" title="The opportunity">
            <Reveal className="prose-case max-w-prose">
              <p>{opportunity.hypothesis}</p>
            </Reveal>
            <Reveal className="mt-8">
              <p className="max-w-2xl border-l-2 border-lime pl-5 font-display text-2xl leading-snug sm:text-3xl">{opportunity.question}</p>
            </Reveal>
            <div className="mt-10 grid gap-px overflow-hidden rounded-lg bg-ink/10 sm:grid-cols-2">
              {opportunity.pillars.map((p, i) => (
                <Reveal key={p.who} delay={i * 0.05} className="bg-paper p-6">
                  <p className="label text-cobalt">{p.who}</p>
                  <p className="mt-3 leading-relaxed text-ink-2">{p.what}</p>
                </Reveal>
              ))}
            </div>
            <p className="mt-4 text-sm text-mute">{opportunity.note}</p>
          </Section>

          {/* 02 Product */}
          <Section n={n("product")} id="product" title="The product">
            <Reveal className="prose-case max-w-prose">
              <p>
                HR Buddy covers the employee journey from onboarding to exit, across three experiences. It has <strong className="text-ink">16 modules</strong>, each
                with working screens, APIs and tests.
              </p>
            </Reveal>
            <Reveal className="mt-10"><ExperienceTabs /></Reveal>

            <Reveal className="mt-14">
              <p className="label mb-4 text-mute">All 16 modules</p>
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {modules.map((m, i) => (
                <Reveal as="li" key={m.name} delay={(i % 3) * 0.05} className="group relative rounded-md border border-ink/10 bg-paper p-5 transition-shadow hover:shadow-card">
                  <div className="flex items-center justify-between gap-3">
                    <span className="label text-mute">{String(i + 1).padStart(2, "0")}</span>
                    {m.phase === "Added in Phase 2" && <span className="label rounded-full bg-cobalt-soft px-2 py-0.5 text-cobalt">Phase 2</span>}
                  </div>
                  <p className="mt-3 font-display text-xl">{m.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{m.detail}</p>
                </Reveal>
              ))}
            </ul>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Reveal><Shot shot={shots.leave} sizes="(min-width: 768px) 40vw, 100vw" /></Reveal>
              <Reveal delay={0.08}><Shot shot={shots.attendance} sizes="(min-width: 768px) 40vw, 100vw" /></Reveal>
              <Reveal className="md:col-span-2"><Shot shot={shots.goals} sizes="(min-width: 1024px) 70vw, 100vw" /></Reveal>
            </div>
          </Section>

          {/* 03 AI */}
          <Section n={n("ai")} id="ai" title="HR Buddy AI">
            <Reveal className="prose-case max-w-prose">
              <p>
                HR Buddy AI answers HR questions in chat and can prepare a leave request, a work-from-home request or a helpdesk ticket. It runs on Google Gemini
                Flash-Lite in production. Only the employee&apos;s own Confirm click submits anything.
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <div className="grid overflow-hidden rounded-lg border border-ink/10 md:grid-cols-2">
                <div className="bg-paper p-6">
                  <p className="label text-mute">A traditional HR chatbot</p>
                  <ul className="mt-4 space-y-3">
                    {chatbotVsAssistant.chatbot.map((x) => (
                      <li key={x} className="flex gap-3 text-ink-2"><span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full border border-ink/40" aria-hidden="true" />{x}</li>
                    ))}
                  </ul>
                </div>
                <div className="on-dark bg-night p-6 text-white">
                  <p className="label text-lime">HR Buddy AI</p>
                  <ul className="mt-4 space-y-3">
                    {chatbotVsAssistant.assistant.map((x) => (
                      <li key={x} className="flex gap-3"><span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <ul className="mt-10 grid gap-px overflow-hidden rounded-lg bg-ink/10 sm:grid-cols-2 xl:grid-cols-3">
              {aiCapabilities.map((c, i) => (
                <Reveal as="li" key={c.label} delay={(i % 3) * 0.05} className="bg-paper p-6">
                  <p className="font-display text-4xl leading-none tracking-[-0.015em]">{c.k}</p>
                  <p className="mt-4 font-medium">{c.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{c.detail}</p>
                </Reveal>
              ))}
            </ul>

            <Reveal className="mt-14">
              <p className="label mb-2 text-cobalt">How a request flows</p>
              <h3 className="mb-6 text-d-sm font-medium">The assistant prepares. The employee decides.</h3>
              <AiFlow />
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Reveal><Shot shot={shots.chat} sizes="(min-width: 768px) 40vw, 100vw" /></Reveal>
              <Reveal delay={0.08}><Shot shot={shots.confirm} sizes="(min-width: 768px) 40vw, 100vw" /></Reveal>
            </div>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-mute">{localRunNote}</p>
          </Section>

          {/* 04 Responsible AI */}
          <Section n={n("responsible-ai")} id="responsible-ai" title="Responsible AI & enterprise architecture">
            <Reveal>
              <blockquote data-theme="dark" className="on-dark relative overflow-hidden rounded-xl bg-night p-8 text-white md:p-12">
                <div className="tech-grid-dark absolute inset-0 opacity-50" aria-hidden="true" />
                <p className="relative max-w-3xl font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.12]">
                  &ldquo;An AI assistant should never have more authority than the person using it.&rdquo;
                </p>
                <p className="label relative mt-6 text-lime">The design principle behind HR Buddy AI</p>
              </blockquote>
            </Reveal>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {safeguards.map((s, i) => (
                <Reveal as="li" key={s.title} delay={(i % 2) * 0.05} className="rounded-md border border-ink/10 bg-paper p-5">
                  <div className="flex items-start gap-3">
                    <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-cobalt" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M10 2l6 2.5v5c0 4-2.7 6.7-6 8.5-3.3-1.8-6-4.5-6-8.5v-5L10 2z" /><path d="M7 10l2 2 4-4" />
                    </svg>
                    <div>
                      <p className="font-medium">{s.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Section>

          {/* 05 Technology */}
          <Section n={n("technology")} id="technology" title="Technology">
            <Reveal className="prose-case max-w-prose">
              <p>
                One TypeScript codebase: a React single-page app and a Hono API that runs as one Vercel function in Singapore, next to a Neon Postgres database. The
                schema is plain Postgres, so it can move to another managed Postgres unchanged.
              </p>
            </Reveal>
            <Reveal className="mt-10"><Architecture /></Reveal>
            <div className="mt-10 grid gap-px overflow-hidden rounded-lg bg-ink/10 sm:grid-cols-2 xl:grid-cols-3">
              {stack.map((g, i) => (
                <Reveal key={g.layer} delay={(i % 3) * 0.05} className="bg-paper p-6">
                  <p className="label text-mute">{g.layer}</p>
                  <ul className="mt-4 space-y-2.5">
                    {g.items.map((it) => (
                      <li key={it.name} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="font-medium">{it.name}</span>
                        {it.status === "live" && <span className="label rounded-full bg-lime px-1.5 py-0.5 text-ink">Live</span>}
                        {it.status === "ready" && <span className="label rounded-full border border-ink/25 px-1.5 py-0.5 text-ink-2">Not connected</span>}
                        {it.note && <span className="w-full text-sm text-mute">{it.note}</span>}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* 06 Validation */}
          <Section n={n("validation")} id="validation" title="Validation">
            <div className="grid gap-4 md:grid-cols-2">
              {validation.map((v, i) => (
                <Reveal key={v.label} delay={(i % 2) * 0.05} className={cn("rounded-lg p-6 md:p-8", i === 0 ? "on-dark bg-night text-white md:col-span-2" : "border border-ink/10 bg-paper")}>
                  <p className={cn("font-display font-medium leading-none tracking-[-0.015em]", i === 0 ? "text-[clamp(3.5rem,8vw,7rem)] text-lime" : "text-6xl")}>{v.k}</p>
                  <p className={cn("mt-3 text-lg font-medium", i === 0 && "text-white")}>{v.label}</p>
                  <p className={cn("mt-1 max-w-xl text-sm leading-relaxed", i === 0 ? "text-white/60" : "text-mute")}>{v.detail}</p>
                </Reveal>
              ))}
            </div>
            <p className="mt-4 text-sm text-mute">{validationNote}</p>
          </Section>

          {/* 07 Timeline */}
          <Section n={n("timeline")} id="timeline" title="Execution timeline">
            <ol className="relative space-y-8 border-l border-ink/15 pl-8">
              {timeline.map((t, i) => (
                <Reveal as="li" key={t.title} delay={i * 0.05} className="relative">
                  <span className={cn("absolute -left-[37px] top-1.5 h-3 w-3 rounded-full ring-4 ring-ivory", i === timeline.length - 1 ? "bg-lime" : "bg-ink")} aria-hidden="true" />
                  <p className="label text-cobalt">{t.date} 2026</p>
                  <p className="mt-1 font-display text-2xl">{t.title}</p>
                  <p className="mt-1.5 max-w-prose leading-relaxed text-ink-2">{t.body}</p>
                </Reveal>
              ))}
            </ol>
          </Section>

          {/* 08 Lessons */}
          <Section n={n("lessons")} id="lessons" title="Lessons & next steps">
            <div className="grid gap-px overflow-hidden rounded-lg bg-ink/10 sm:grid-cols-2">
              {lessons.map((l, i) => (
                <Reveal key={l.title} delay={(i % 2) * 0.05} className="bg-paper p-6">
                  <p className="font-display text-xl">{l.title}</p>
                  <p className="mt-2 leading-relaxed text-ink-2">{l.body}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Reveal className="rounded-lg border border-dashed border-ink/25 p-6">
                <p className="label text-mute">Future work · not built yet</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {nextSteps.map((x) => <li key={x} className="rounded-full border border-ink/15 px-3 py-1.5 text-sm text-ink-2">{x}</li>)}
                </ul>
              </Reveal>
              <Reveal delay={0.08} className="rounded-lg bg-paper p-6 ring-1 ring-ink/10">
                <p className="label text-mute">What this is, and isn&apos;t</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-2">
                  {boundaries.map((b) => <li key={b} className="flex gap-3"><span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-ink/50" aria-hidden="true" />{b}</li>)}
                </ul>
              </Reveal>
            </div>

            <Reveal className="mt-10">
              <Link
                href={hrBuddy.experimentHref}
                className="group/btn group flex flex-col gap-4 rounded-xl bg-ink p-6 text-ivory transition-colors hover:bg-ink/90 sm:flex-row sm:items-center sm:justify-between md:p-8"
              >
                <span>
                  <span className="label text-lime">From the AI & product lab</span>
                  <span className="mt-2 block font-display text-2xl sm:text-3xl">How I built it: an 11-day experiment with AI</span>
                </span>
                <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em]">Read the experiment <ArrowGlyph /></span>
              </Link>
            </Reveal>
          </Section>
        </div>
      </div>

      {/* ---------------- Next / prev ---------------- */}
      <nav aria-label="More case studies" data-theme="dark" className="on-dark mt-12 bg-night text-white">
        <div className="shell grid md:grid-cols-2">
          {[{ c: prev, dir: "Previous" }, { c: next, dir: "Next" }].map(({ c: x, dir }, i) => (
            <Link
              key={dir}
              href={`/work/${x.slug}`}
              className={cn("group/btn group relative py-14 transition-colors md:py-20", i === 1 && "border-t border-white/10 md:border-l md:border-t-0 md:pl-12 md:text-right")}
            >
              <p className="label text-white/50">{dir} case study · {x.index}</p>
              <p className="mt-4 text-d-md font-medium transition-colors group-hover:text-lime">{x.title}</p>
              <span className={cn("mt-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-white/70", i === 1 && "md:flex-row-reverse")}>
                {dir === "Previous" ? <span className="rotate-180"><ArrowGlyph /></span> : <ArrowGlyph />}
                Read
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </article>
  );
}
