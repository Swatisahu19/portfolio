import { education, experience, philosophy, site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

/** How many outcomes show before the expandable detail */
const VISIBLE = 3;

/**
 * Leadership & experience, consolidated. The leadership pillars sit on top as a
 * compact strip; each role shows scope in one line and its headline outcomes,
 * with the full scope and every outcome in an expandable panel, so nothing is
 * removed, only moved out of the scan path.
 */
export function Experience() {
  return (
    <section id="experience" className="relative border-t border-ink/10 py-24 md:py-32" aria-label="Leadership and experience">
      <div className="shell">
        <SectionHead
          index="03"
          label="Leadership & experience"
          lines={["From reading markets", "to running platforms."]}
          intro="Eleven years across four organisations, with one throughline: turning complex commercial problems into products people use."
        />

        {/* How I lead */}
        <Reveal className="mt-14">
          <ul className="grid gap-px overflow-hidden rounded-lg bg-ink/10 sm:grid-cols-2 lg:grid-cols-4" aria-label="How I lead">
            {philosophy.pillars.map((p) => (
              <li key={p.n} className="bg-paper p-5">
                <p className="label text-cobalt">{p.n} · {p.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.line}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Roles */}
        <ol className="mt-14 border-t border-ink/10">
          {experience.map((role, i) => {
            const shown = role.outcomes.slice(0, VISIBLE);
            const more = role.outcomes.slice(VISIBLE);
            return (
              <Reveal as="li" key={role.company} className="grid gap-5 border-b border-ink/10 py-10 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                  <p className="label text-mute">{role.period}</p>
                  <p className="mt-3 font-display text-2xl leading-tight">{role.company}</p>
                  {i === 0 && <span className="label mt-3 inline-block rounded-full bg-lime px-2 py-1 text-ink">Current</span>}
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-xl font-medium leading-snug md:text-2xl">{role.title}</h3>
                  <p className="mt-3 max-w-3xl leading-relaxed text-ink-2">{role.summary}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {shown.map((o) => (
                      <li key={o} className="rounded-sm border border-ink/10 bg-paper px-4 py-3 text-[0.9375rem] font-medium leading-snug">{o}</li>
                    ))}
                  </ul>
                  <details className="group mt-4">
                    <summary className="label inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-ink/15 px-3 py-2 text-ink-2 transition-colors hover:border-ink hover:text-ink [&::-webkit-details-marker]:hidden">
                      <span className="transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                      Scope{more.length ? " and all outcomes" : " and leadership"}
                    </summary>
                    <div className="mt-5 grid gap-8 lg:grid-cols-2">
                      <div>
                        <p className="label mb-3 text-mute">Scope & leadership</p>
                        <ul className="space-y-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                          {role.scope.map((s) => (
                            <li key={s} className="flex gap-3"><span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink/40" aria-hidden="true" />{s}</li>
                          ))}
                        </ul>
                      </div>
                      {more.length > 0 && (
                        <div>
                          <p className="label mb-3 text-mute">More outcomes</p>
                          <ul className="space-y-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                            {more.map((o) => (
                              <li key={o} className="flex gap-3"><span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink/40" aria-hidden="true" />{o}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {role.tags.map((t) => (
                        <li key={t} className="label rounded-full border border-ink/15 px-3 py-1.5 text-ink-2">{t}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              </Reveal>
            );
          })}
        </ol>

        {/* Education & certifications */}
        <Reveal className="mt-10 grid gap-4 md:grid-cols-12 md:gap-8">
          <p className="label text-mute md:col-span-3">Education & certification</p>
          <ul className="grid gap-4 sm:grid-cols-2 md:col-span-9">
            {education.map((e) => (
              <li key={e.name}>
                <p className="font-medium">{e.name}</p>
                <p className="text-sm text-mute">{e.org} · {e.period}</p>
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
