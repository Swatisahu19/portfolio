import Image from "next/image";
import { about, site, toolkit } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-36" aria-label="About">
      <div className="shell">
        <SectionHead index="06" label="About" lines={["Part strategist. Part builder.", "Always curious."]} />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-paper ring-1 ring-ink/10">
                <Image src={site.aboutPortrait.src} alt={site.aboutPortrait.alt} fill sizes="(min-width: 1024px) 36vw, 90vw" className="object-cover object-[50%_30%]" />
              </div>
              {/* Technical annotation */}
              <figcaption className="glass absolute -bottom-6 left-6 right-6 flex items-center justify-between rounded-md px-5 py-4 sm:left-auto sm:w-72">
                <div>
                  <p className="label text-mute">Based in</p>
                  <p className="mt-1 font-medium">{site.location}</p>
                </div>
                <div className="text-right">
                  <p className="label text-mute">Open to</p>
                  <p className="mt-1 font-medium">India · EU · Middle East</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-[1.7] text-ink-2 md:text-xl md:leading-[1.65]">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className={i === 0 ? "text-ink" : undefined}>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 grid gap-px overflow-hidden rounded-lg bg-ink/10 sm:grid-cols-2">
              {about.principles.map((p, i) => (
                <div key={p} className="flex items-center gap-4 bg-ivory p-5">
                  <span className="label text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-lg font-medium">{p}</span>
                </div>
              ))}
            </Reveal>

            <Reveal className="mt-12">
              <p className="label mb-5 text-mute">Working toolkit</p>
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
      </div>
    </section>
  );
}
