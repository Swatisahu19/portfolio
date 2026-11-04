import Link from "next/link";
import type { Block, CaseStudy } from "@/content/types";
import { caseStudies } from "@/content/case-studies";
import { SHOW_REVIEW_MARKERS } from "@/content/site";
import { Diagram } from "@/components/diagrams/Diagrams";
import { CountUp } from "@/components/motion/CountUp";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { DraftedTag, ReviewMark, TodoBox } from "@/components/ui/Review";
import { ArrowGlyph } from "@/components/ui/button";
import { CaseToc, type TocItem } from "./CaseToc";
import { cn } from "@/lib/utils";

const ALL_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Business context" },
  { id: "problem", label: "Problem" },
  { id: "discovery", label: "Discovery" },
  { id: "strategy", label: "Strategy & vision" },
  { id: "solution", label: "Solution" },
  { id: "decisions", label: "Key decisions" },
  { id: "execution", label: "Execution" },
  { id: "impact", label: "Impact" },
  { id: "challenges", label: "Trade-offs" },
  { id: "learnings", label: "Learnings" },
  { id: "capabilities", label: "Capabilities" },
] as const;
type SectionId = (typeof ALL_SECTIONS)[number]["id"];

/** A value still waiting on Swati's input */
const isTodo = (s?: string) => !s || /to confirm/i.test(s);
/** With review markers off, unconfirmed values are simply not shown */
const showValue = (v?: string) => !!v && (SHOW_REVIEW_MARKERS || !isTodo(v));
const hasBody = (b: Block & { milestones?: unknown[] }) => !!(b.paragraphs?.length || b.bullets?.length || b.milestones?.length);

function Section({ id, title, children, className, n }: { id: string; title: string; children: React.ReactNode; className?: string; n: string }) {
  const s = { n };
  return (
    <section id={id} className={cn("scroll-mt-28 border-t border-ink/10 py-16 md:py-20", className)} aria-labelledby={`${id}-h`}>
      <Reveal>
        <p className="label mb-4 text-cobalt">{s.n}</p>
        <h2 id={`${id}-h`} className="text-d-md font-medium">{title}</h2>
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function BlockBody({ b }: { b: Block }) {
  const empty = !b.paragraphs?.length && !b.bullets?.length;
  return (
    <Reveal className="prose-case max-w-prose">
      {b.drafted && !empty && <DraftedTag />}
      {b.paragraphs?.map((p) => <p key={p}>{p}</p>)}
      {b.bullets && <ul>{b.bullets.map((x) => <li key={x}>{x}</li>)}</ul>}
      {empty && SHOW_REVIEW_MARKERS && <p className="italic text-mute">To be written after the discovery interview.</p>}
      <TodoBox items={b.todo} />
    </Reveal>
  );
}

function Pending({ children }: { children: React.ReactNode }) {
  return <span className="text-mute">{children}</span>;
}

export function CaseStudyView({ c }: { c: CaseStudy }) {
  const dark = c.theme === "dark";
  const markers = SHOW_REVIEW_MARKERS;

  // Content that survives review filtering
  const decisions = c.decisions.filter((d) => markers || (!d.todo && ![d.context, d.choice, d.why].some(isTodo)));
  const challenges = c.challenges.filter((ch) => markers || (!ch.todo && !isTodo(ch.title)));
  const quadrants = ([["What worked", c.learnings.worked], ["What didn't", c.learnings.didnt], ["What I learned", c.learnings.learned], ["What I'd do differently", c.learnings.differently]] as const).filter(
    ([, v]) => markers || v.length > 0,
  );
  const teams = c.overview.teams.filter((t) => markers || !isTodo(t));

  const visible: Record<SectionId, boolean> = {
    overview: true,
    context: markers || hasBody(c.context),
    problem: markers || hasBody(c.problemDetail),
    discovery: markers || hasBody(c.discovery),
    strategy: markers || hasBody(c.strategy),
    solution: true,
    decisions: decisions.length > 0,
    execution: markers || hasBody(c.execution),
    impact: true,
    challenges: markers || challenges.length > 0,
    learnings: markers || quadrants.length > 0,
    capabilities: true,
  };
  const toc: TocItem[] = ALL_SECTIONS.filter((x) => visible[x.id]).map((x, i) => ({ ...x, n: String(i + 1).padStart(2, "0") }));
  const num = (id: SectionId) => toc.find((t) => t.id === id)?.n ?? "";
  const idx = caseStudies.findIndex((x) => x.slug === c.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];

  return (
    <article>
      {/* ---------------- Hero ---------------- */}
      <header data-theme={c.theme} className={cn("relative overflow-hidden pt-[calc(var(--nav-h)+3rem)]", dark ? "on-dark bg-night text-white" : "bg-paper")}>
        <div className={cn("grid-fade absolute inset-0", dark ? "tech-grid-dark" : "tech-grid")} aria-hidden="true" />
        <div className="shell relative pb-16 md:pb-24">
          <Reveal>
            <nav aria-label="Breadcrumb" className={cn("label flex items-center gap-3", dark ? "text-white/50" : "text-mute")}>
              <Link href="/#work" className="link-draw hover:text-current">Work</Link>
              <span aria-hidden="true">/</span>
              <span className={dark ? "text-lime" : "text-cobalt"}>Case study {c.index}</span>
            </nav>
          </Reveal>
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal><p className={cn("label mb-6", dark ? "text-lime" : "text-cobalt")}>{c.kicker}</p></Reveal>
              <h1 className="text-d-xl font-medium">
                <LineReveal immediate lines={c.title.split(" & ").length > 1 ? [c.title.split(" & ")[0] + " &", c.title.split(" & ")[1]] : [c.title]} />
              </h1>
              <Reveal delay={0.3}><p className={cn("mt-8 max-w-xl text-xl leading-relaxed", dark ? "text-white/70" : "text-ink-2")}>{c.summary}</p></Reveal>
            </div>
            <Reveal delay={0.4} className="lg:col-span-4 lg:col-start-9">
              <div className={cn("rounded-lg p-6", dark ? "glass-dark" : "glass")}>
                <p className={cn("label", dark ? "text-white/50" : "text-mute")}>Headline outcome</p>
                <p className={cn("mt-3 font-display text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-[-0.015em]", dark && "text-lime")}>
                  <CountUp to={c.heroMetric.countTo} prefix={c.heroMetric.prefix} suffix={c.heroMetric.suffix} fallback={c.heroMetric.value} />
                </p>
                <p className={cn("mt-3 text-sm", dark ? "text-white/65" : "text-ink-2")}>{c.heroMetric.label}</p>
                <ReviewMark check={c.heroMetric.check} dark={dark} className="mt-4" />
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2} className={cn("mt-16 overflow-hidden rounded-xl", dark ? "bg-white/[0.03] ring-1 ring-white/10" : "bg-ivory ring-1 ring-ink/10")}>
            <Diagram kind={c.diagram} dark={dark} className="mx-auto h-auto w-full max-w-5xl" />
          </Reveal>
        </div>
      </header>

      {/* ---------------- Body ---------------- */}
      <div className="shell grid gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-3"><div className="h-full pt-16"><CaseToc items={toc} /></div></aside>

        <div className="lg:col-span-9 lg:pl-6">
          {SHOW_REVIEW_MARKERS && (
            <div className="mt-12 rounded-md border border-dashed border-cobalt/40 bg-cobalt-soft/40 p-5 text-sm text-ink-2" role="note">
              <span className="label mr-2 text-cobalt">Draft</span>
              Numbers and scope come from your Oct 2026 resume. Sections tagged “Drafted” are written from your experience and need your approval. Dashed boxes are questions only you can answer.
            </div>
          )}

          <Section n={num("overview")} id="overview" title="Project overview">
            <Reveal><p className="max-w-prose text-xl leading-relaxed text-ink-2">{c.overview.intro}</p></Reveal>
            <Reveal className="mt-10">
              <dl className="grid gap-px overflow-hidden rounded-lg bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Organisation", c.overview.organisation],
                  ["Industry", c.overview.industry],
                  ["Timeline", c.overview.timeline],
                  ["Role", c.overview.role],
                  ["Ownership", c.overview.ownership],
                  ["Teams", teams.join(", ")],
                ].filter(([, v]) => showValue(v)).map(([k, v], i, all) => (
                  <div
                    key={k}
                    className={cn(
                      "bg-paper p-5",
                      // stretch the last tile so the grid never shows an empty cell
                      i === all.length - 1 && all.length % 2 === 1 && "sm:col-span-2 lg:col-span-1",
                      i === all.length - 1 && all.length % 3 === 2 && "lg:col-span-2",
                      i === all.length - 1 && all.length % 3 === 1 && "lg:col-span-3",
                    )}
                  >
                    <dt className="label text-mute">{k}</dt>
                    <dd className="mt-2 font-medium leading-snug">{isTodo(v) ? <Pending>{v}</Pending> : v}</dd>
                  </div>
                ))}
              </dl>
              <ReviewMark check={c.overview.check} className="mt-4" />
            </Reveal>
          </Section>

          {visible.context && <Section n={num("context")} id="context" title={c.context.heading}><BlockBody b={c.context} /></Section>}
          {visible.problem && <Section n={num("problem")} id="problem" title={c.problemDetail.heading}><BlockBody b={c.problemDetail} /></Section>}
          {visible.discovery && <Section n={num("discovery")} id="discovery" title={c.discovery.heading}><BlockBody b={c.discovery} /></Section>}
          {visible.strategy && <Section n={num("strategy")} id="strategy" title={c.strategy.heading}><BlockBody b={c.strategy} /></Section>}

          <Section n={num("solution")} id="solution" title={c.solution.heading}>
            {(c.solution.paragraphs || c.solution.bullets) && <BlockBody b={{ ...c.solution, todo: undefined }} />}
            {c.solution.modules && (
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {c.solution.modules.map((m, i) => (
                  <Reveal as="li" key={m.name} delay={i * 0.06} className="group relative overflow-hidden rounded-md border border-ink/10 bg-paper p-6 transition-shadow hover:shadow-card">
                    <span className="label text-mute">M{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-3 font-display text-xl font-medium">{m.name}</p>
                    {showValue(m.description) && <p className="mt-2 text-sm leading-relaxed text-ink-2">{m.description}</p>}
                    <span className="absolute right-5 top-5 h-2 w-2 rounded-full bg-ink/20 transition-colors group-hover:bg-lime" aria-hidden="true" />
                  </Reveal>
                ))}
              </ul>
            )}
            <TodoBox items={c.solution.todo} />
            {c.beforeAfter && (
              <Reveal className="mt-10">
                <div className="grid overflow-hidden rounded-lg border border-ink/10 md:grid-cols-[1fr_auto_1fr]">
                  <div className="bg-paper p-6">
                    <p className="label text-mute">Before</p>
                    <ul className="mt-4 space-y-3">
                      {c.beforeAfter.before.map((x) => (
                        <li key={x} className="flex gap-3 text-ink-2"><span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full border border-ink/40" aria-hidden="true" />{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="hidden place-items-center bg-ink px-4 text-lime md:grid" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h15M14 6l6 6-6 6" /></svg>
                  </div>
                  <div className="on-dark bg-night p-6 text-white">
                    <p className="label text-lime">After</p>
                    <ul className="mt-4 space-y-3">
                      {c.beforeAfter.after.map((x) => (
                        <li key={x} className="flex gap-3"><span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            )}
          </Section>

          {visible.decisions && <Section n={num("decisions")} id="decisions" title="My role & key product decisions">
            <div className="grid gap-4">
              {decisions.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.06}>
                  <div className={cn("grid gap-6 rounded-lg p-6 md:grid-cols-[auto_1fr] md:p-8", d.todo ? "border border-dashed border-cobalt/40" : "bg-night text-white")}>
                    <span className={cn("font-display text-4xl font-medium", d.todo ? "text-cobalt" : "text-lime")}>D{i + 1}</span>
                    <div>
                      {d.drafted && SHOW_REVIEW_MARKERS && <p className="label mb-3 text-white/55">Drafted · review</p>}
                      <h3 className="text-d-sm font-medium">{d.title}</h3>
                      <dl className="mt-5 grid gap-5 md:grid-cols-3">
                        {[["Situation", d.context], ["Decision", d.choice], ["Why", d.why]].map(([k, v]) => (
                          <div key={k}>
                            <dt className={cn("label mb-2", d.todo ? "text-mute" : "text-white/50")}>{k}</dt>
                            <dd className={cn("text-sm leading-relaxed", d.todo ? "text-ink-2" : "text-white/80")}>{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>}

          {visible.execution && <Section n={num("execution")} id="execution" title={c.execution.heading}>
            <BlockBody b={c.execution} />
            {c.execution.milestones && (
              <ol className="mt-8 space-y-4 border-l border-ink/15 pl-6">
                {c.execution.milestones.map((m) => (
                  <li key={m.label}><p className="label text-cobalt">{m.label}</p><p className="mt-1">{m.detail}</p></li>
                ))}
              </ol>
            )}
          </Section>}

          <Section n={num("impact")} id="impact" title="Business & product impact">
            <div className="grid gap-4 md:grid-cols-2">
              {c.impact.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.06} className={cn("rounded-lg p-6 md:p-8", i === 0 ? "on-dark bg-night text-white md:col-span-2" : "border border-ink/10 bg-paper")}>
                  <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                      <p className={cn("font-display font-medium leading-none tracking-[-0.015em]", i === 0 ? "text-[clamp(3.5rem,8vw,7rem)] text-lime" : "text-6xl")}>
                        <CountUp to={m.countTo} prefix={m.prefix} suffix={m.suffix} fallback={m.value} />
                      </p>
                      <p className={cn("mt-3 text-lg font-medium", i === 0 && "text-white")}>{m.label}</p>
                      {m.detail && <p className={cn("mt-1 text-sm", i === 0 ? "text-white/60" : "text-mute")}>{m.detail}</p>}
                    </div>
                    <ReviewMark check={m.check} dark={i === 0} />
                  </div>
                  {(m.baseline || m.result || m.period || m.definition || m.contribution) && (
                    <dl className={cn("mt-8 grid gap-4 border-t pt-6 text-sm sm:grid-cols-2", i === 0 ? "border-white/10 lg:grid-cols-5" : "border-ink/10")}>
                      {[["Baseline", m.baseline], ["Result", m.result], ["Period", m.period], ["Definition", m.definition], ["My contribution", m.contribution]]
                        .filter(([, v]) => showValue(v))
                        .map(([k, v]) => (
                          <div key={k}>
                            <dt className={cn("label mb-1.5", i === 0 ? "text-white/45" : "text-mute")}>{k}</dt>
                            <dd className={cn("leading-snug", isTodo(v) && (i === 0 ? "text-white/50" : "text-mute"))}>{v}</dd>
                          </div>
                        ))}
                    </dl>
                  )}
                </Reveal>
              ))}
            </div>
          </Section>

          {visible.challenges && <Section n={num("challenges")} id="challenges" title="Challenges & trade-offs">
            {challenges.length === 0 && (
              <TodoBox items={["Which challenge from this project would you want a CPO to hear about? What happened, what options did you have, and what did you choose?"]} />
            )}
            {challenges.map((ch) => (
              <Reveal key={ch.title + ch.what} className={cn("rounded-lg p-6 md:p-8", ch.todo ? "border border-dashed border-cobalt/40" : "border border-ink/10 bg-paper")}>
                {ch.drafted && <DraftedTag />}
                <h3 className="text-d-sm font-medium">{ch.title}</h3>
                <p className="mt-3 text-ink-2">{ch.what}</p>
                {ch.options.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">{ch.options.map((o) => <li key={o} className="label rounded-full border border-ink/15 px-3 py-1.5">{o}</li>)}</ul>
                )}
                <dl className="mt-6 grid gap-5 border-t border-ink/10 pt-5 sm:grid-cols-2">
                  {showValue(ch.decision) && <div><dt className="label mb-1.5 text-mute">Decision</dt><dd className="text-sm">{ch.decision}</dd></div>}
                  {showValue(ch.result) && <div><dt className="label mb-1.5 text-mute">Result</dt><dd className="text-sm">{ch.result}</dd></div>}
                </dl>
              </Reveal>
            ))}
          </Section>}

          {visible.learnings && <Section n={num("learnings")} id="learnings" title="Learnings & reflection">
            {c.learnings.drafted && <DraftedTag />}
            <div className={cn("grid gap-px overflow-hidden rounded-lg bg-ink/10", quadrants.length > 1 && "sm:grid-cols-2")}>
              {quadrants.map(([k, v]) => (
                <Reveal key={k} className="bg-paper p-6">
                  <p className="label text-mute">{k}</p>
                  {v.length ? (
                    <ul className="mt-4 space-y-2 text-ink-2">{v.map((x) => <li key={x}>{x}</li>)}</ul>
                  ) : (
                    <p className="mt-4 text-mute">To be written after the interview.</p>
                  )}
                </Reveal>
              ))}
            </div>
            <TodoBox items={c.learnings.todo} />
          </Section>}

          <Section n={num("capabilities")} id="capabilities" title="Capabilities demonstrated">
            <Reveal>
              <ul className="flex flex-wrap gap-2">
                {c.capabilities.map((cap) => (
                  <li key={cap} className="rounded-full border border-ink/15 bg-paper px-5 py-3 font-display text-lg">{cap}</li>
                ))}
              </ul>
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
