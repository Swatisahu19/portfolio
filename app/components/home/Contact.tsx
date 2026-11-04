"use client";

import { useState } from "react";
import { contact, site } from "@/content/site";
import { NetworkCanvas } from "@/components/hero/NetworkCanvas";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { ArrowGlyph, Button } from "@/components/ui/button";

const TOPICS = ["Leadership role", "Advisory / consulting", "Speaking or writing", "Just saying hello"];

/**
 * There is no backend, so the form composes an email in the visitor's own
 * mail app. It is honest about this, and offers copy-to-clipboard as a
 * fallback. To switch to a hosted form service later, replace `onSubmit`.
 */
export function Contact() {
  const [state, setState] = useState<"idle" | "opened">("idle");
  const [copied, setCopied] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const org = String(f.get("org") || "").trim();
    const topic = String(f.get("topic") || "");
    const message = String(f.get("message") || "").trim();
    const subject = `${topic}${org ? ` · ${org}` : ""} · from ${name}`;
    const body = `${message}\n\n${name}${org ? `\n${org}` : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setState("opened");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy email address", site.email);
    }
  };

  const field = "w-full rounded-sm border border-white/15 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/35 transition-colors focus:border-lime focus:outline-none focus-visible:outline-none";

  return (
    <section id="contact" data-theme="dark" className="on-dark relative isolate overflow-hidden bg-night py-24 text-white md:py-36" aria-label="Contact">
      <div className="tech-grid-dark grid-fade absolute inset-0 -z-20" aria-hidden="true" />
      <div className="absolute inset-0 -z-10">
        <NetworkCanvas theme="dark" density={0.7} geometry={[{ kind: "ico", x: 0.84, y: 0.3, r: 0.22, speed: 0.7 }]} />
      </div>
      <div
        className="absolute -left-40 bottom-[-10rem] -z-10 h-[36rem] w-[36rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgb(var(--c-lime) / 0.7), transparent)" }}
        aria-hidden="true"
      />

      <div className="shell grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal><p className="eyebrow text-white/60"><span className="text-lime">07</span> / Contact</p></Reveal>
          <h2 className="mt-6 text-d-lg font-medium">
            <LineReveal lines={["Have an interesting", "problem to solve?"]} />
          </h2>
          <Reveal delay={0.15}><p className="mt-8 max-w-md text-lg leading-relaxed text-white/65">{contact.copy}</p></Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild variant="lime" size="lg">
              <a href={`mailto:${site.email}?subject=${encodeURIComponent("Let's talk")}`}>Let&apos;s talk <ArrowGlyph /></a>
            </Button>
            <Button variant="outline-dark" size="lg" type="button" onClick={copy} aria-live="polite">
              {copied ? "Copied ✓" : "Copy email"}
            </Button>
          </Reveal>

          <Reveal delay={0.25}>
            <ul className="mt-14 divide-y divide-white/10 border-y border-white/10">
              {[
                { k: "Email", v: site.email, href: `mailto:${site.email}` },
                { k: "LinkedIn", v: "in/swatisahu0190", href: site.linkedin, ext: true },
                { k: "Resume", v: site.resumePdf ? "Download PDF" : "View & download", href: site.resumePdf ?? "/resume" },
                { k: "GitHub", v: "Swatisahu19", href: site.github, ext: true },
              ].map((l) => (
                <li key={l.k}>
                  <a
                    href={l.href}
                    {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-6 py-4 transition-colors hover:text-lime"
                  >
                    <span className="label text-white/45 group-hover:text-lime">{l.k}</span>
                    <span className="flex items-center gap-3 text-right">
                      {l.v}
                      <span aria-hidden="true" className="transition-transform duration-base group-hover:translate-x-1">{l.ext ? "↗" : "→"}</span>
                      {l.ext && <span className="sr-only">(opens in new tab)</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <div className="glass-dark rounded-lg p-6 sm:p-8">
            {state === "opened" ? (
              <div className="py-10 text-center" role="status">
                <p className="label text-lime">Draft ready</p>
                <p className="mt-4 text-d-sm font-medium">Your email app should have opened.</p>
                <p className="mt-3 text-white/60">
                  If it didn&apos;t, write to <a href={`mailto:${site.email}`} className="text-lime underline underline-offset-4">{site.email}</a>.
                </p>
                <button type="button" onClick={() => setState("idle")} className="label link-draw mt-8 text-white/70">Write another</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" aria-describedby="form-note">
                <p className="label text-white/50">Start a conversation</p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="mb-2 block text-sm text-white/70">Name</label>
                    <input id="c-name" name="name" required autoComplete="name" className={field} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="c-org" className="mb-2 block text-sm text-white/70">Company <span className="text-white/35">(optional)</span></label>
                    <input id="c-org" name="org" autoComplete="organization" className={field} placeholder="Where you work" />
                  </div>
                </div>
                <fieldset>
                  <legend className="mb-2 text-sm text-white/70">Topic</legend>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((t, i) => (
                      <label key={t} className="cursor-pointer">
                        <input type="radio" name="topic" value={t} defaultChecked={i === 0} className="peer sr-only" />
                        <span className="label inline-block rounded-full border border-white/15 px-3 py-2 text-white/70 transition-colors peer-checked:border-lime peer-checked:bg-lime peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-lime">
                          {t}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="c-msg" className="mb-2 block text-sm text-white/70">Message</label>
                  <textarea id="c-msg" name="message" required rows={5} className={`${field} resize-none`} placeholder="What are you working on?" />
                </div>
                <Button type="submit" variant="lime" size="lg" className="w-full">
                  Compose email <ArrowGlyph />
                </Button>
                <p id="form-note" className="text-center text-xs text-white/40">Opens your email app with this message filled in. Nothing is stored.</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
