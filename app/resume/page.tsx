import type { Metadata } from "next";
import Link from "next/link";
import { education, experience, site, toolkit } from "@/content/site";
import { caseStudies } from "@/content/case-studies";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}: ${site.role}. Product strategy, subscriptions, payments, enterprise platforms and applied AI.`,
  alternates: { canonical: "/resume" },
};

/**
 * Printable resume generated from the same content files as the site, so the
 * two can never disagree. "Save as PDF" uses the browser's print dialog.
 * Phone number intentionally omitted from the public web version.
 */
export default function ResumePage() {
  return (
    <div className="bg-ivory pt-[calc(var(--nav-h)+2rem)] print:pt-0">
      <div className="shell max-w-4xl pb-24 print:max-w-none print:px-0 print:pb-0">
        <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-ink/10 bg-paper p-5">
          <p className="text-sm text-ink-2">Generated from the same content as the site. Use “Save as PDF” in the print dialog.</p>
          <div className="flex gap-3">
            {site.resumePdf && (
              <a href={site.resumePdf} download className="label link-draw self-center">Download original PDF</a>
            )}
            <PrintButton />
          </div>
        </div>

        <article className="rounded-xl bg-white p-8 shadow-card ring-1 ring-ink/5 sm:p-12 print:rounded-none print:p-0 print:shadow-none print:ring-0">
          <header className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/15 pb-8">
            <div>
              <h1 className="font-display text-4xl font-medium tracking-[-0.01em] sm:text-5xl">{site.name}</h1>
              <p className="mt-2 text-lg text-ink-2">{site.role}</p>
              <p className="label mt-3 text-mute">{site.certifications.map((c) => c.match(/\((.+)\)/)?.[1]).join(" · ")}</p>
            </div>
            <ul className="space-y-1 text-sm text-ink-2 sm:text-right">
              <li>{site.location}</li>
              <li><a href={`mailto:${site.email}`} className="link-draw">{site.email}</a></li>
              <li><a href={site.linkedin} className="link-draw">linkedin.com/in/swatisahu0190</a></li>
              <li><a href={site.url} className="link-draw">swati-sahu.com</a></li>
            </ul>
          </header>

          <section className="mt-8" aria-labelledby="r-summary">
            <h2 id="r-summary" className="label text-cobalt">Summary</h2>
            <p className="mt-3 leading-relaxed text-ink-2">
              Product leader with 11 years of experience, seven of them owning enterprise and customer-facing portfolios. At HT Media I run the product vertical across Print, Digital, Jobs and Radio and the enterprise estate (Salesforce, SAP, Zoho), leading a 20-person product and engineering organisation and reporting to the CIO. Strongest where revenue meets systems: Salesforce-native sales and order-to-cash, 0→1 operational platforms, and applied AI across products serving 50M+ users.
            </p>
          </section>

          <section className="mt-10" aria-labelledby="r-exp">
            <h2 id="r-exp" className="label text-cobalt">Experience</h2>
            <ol className="mt-4 space-y-8">
              {experience.map((r) => (
                <li key={r.company} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-medium">{r.title} <span className="text-ink-2">· {r.company}</span></h3>
                    <p className="label text-mute">{r.period}</p>
                  </div>
                  <p className="mt-2 text-ink-2">{r.summary}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-ink-2">
                    {[...r.scope, ...r.outcomes].map((x) => (
                      <li key={x} className="flex gap-3"><span className="mt-[0.6em] h-px w-3 shrink-0 bg-ink/40" aria-hidden="true" />{x}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10 break-inside-avoid" aria-labelledby="r-cases">
            <h2 id="r-cases" className="label text-cobalt">Selected case studies</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {caseStudies.map((c) => (
                <li key={c.slug} className="text-sm">
                  <Link href={`/work/${c.slug}`} className="font-medium link-draw">{c.title}</Link>
                  <p className="text-ink-2">{c.summary}</p>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10 grid gap-10 sm:grid-cols-2 break-inside-avoid">
            <section aria-labelledby="r-edu">
              <h2 id="r-edu" className="label text-cobalt">Education & certification</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {education.map((e) => (
                  <li key={e.name}><p className="font-medium">{e.name}</p><p className="text-mute">{e.org} · {e.period}</p></li>
                ))}
                {site.certifications.map((c) => <li key={c} className="font-medium">{c}</li>)}
              </ul>
            </section>
            <section aria-labelledby="r-tools">
              <h2 id="r-tools" className="label text-cobalt">Toolkit</h2>
              <dl className="mt-4 space-y-2 text-sm">
                {toolkit.map((g) => (
                  <div key={g.group}><dt className="inline font-medium">{g.group}: </dt><dd className="inline text-ink-2">{g.items.join(", ")}</dd></div>
                ))}
              </dl>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
