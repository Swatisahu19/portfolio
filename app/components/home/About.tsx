import Image from "next/image";
import { about, site, toolkit } from "@/content/site";
import { LineReveal, Reveal } from "@/components/motion/Reveal";

/**
 * First half of the closing section (About & contact). Career detail lives in
 * Leadership & experience, so this keeps to the person: origin, how I work
 * with AI, what I'm looking for, and the toolkit.
 */
export function About() {
  return (
    <section id="about" className="relative border-t border-ink/10 py-24 md:py-32" aria-labelledby="about-title">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <figure>
            <div className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-xl bg-paper ring-1 ring-ink/10">
              <Image src={site.aboutPortrait.src} alt={site.aboutPortrait.alt} fill sizes="(min-width: 1024px) 28vw, 90vw" className="object-cover object-[50%_30%]" />
            </div>
            <figcaption className="mt-4 flex max-w-sm justify-between gap-4 text-sm">
              <span><span className="label block text-mute">Based in</span>{site.location}</span>
              <span className="text-right"><span className="label block text-mute">Open to</span>India · EU · Middle East</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-8">
          <Reveal><p className="eyebrow"><span className="text-ink">05</span> / About &amp; contact</p></Reveal>
          <h2 id="about-title" className="mt-6 text-d-lg font-medium"><LineReveal lines={[about.headline]} /></h2>
          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-[1.7] text-ink-2">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}><p className={i === 0 ? "text-ink" : undefined}>{p}</p></Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <p className="label mb-4 text-mute">Working toolkit</p>
            <dl className="grid gap-5 sm:grid-cols-2">
              {toolkit.map((g) => (
                <div key={g.group} className="border-t border-ink/10 pt-4">
                  <dt className="text-sm font-medium">{g.group}</dt>
                  <dd className="mt-1.5 font-mono text-xs leading-relaxed text-ink-2">{g.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
