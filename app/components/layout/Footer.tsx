"use client";

import Link from "next/link";
import { nav, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };
  return (
    <footer className="no-print on-dark bg-night text-white" data-theme="dark">
      <div className="shell grid gap-10 border-t border-white/10 py-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <p className="font-display text-sm font-semibold tracking-[0.18em]">SWATI SAHU</p>
          <p className="mt-2 text-sm text-white/55">Product leadership · Digital transformation · AI</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-4">
          <ul className="label flex flex-wrap gap-x-6 gap-y-3 text-white/70">
            {nav.map((n) => (
              <li key={n.id}>
                <Link className="link-draw hover:text-white" href={n.id === "resume" ? site.resumePdf ?? "/resume" : n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li><a className="link-draw hover:text-white" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
            <li><a className="link-draw hover:text-white" href={`mailto:${site.email}`}>Email</a></li>
          </ul>
        </nav>
        <div className="flex items-center justify-between gap-6 md:col-span-3 md:justify-end">
          <p className="label text-white/45">© {year} Swati Sahu</p>
          <button
            type="button"
            onClick={toTop}
            className="group grid h-12 w-12 place-items-center rounded-full border border-white/20 transition-colors hover:border-lime hover:bg-lime hover:text-ink"
            aria-label="Back to top"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-base group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M8 14V3M4 7l4-4 4 4" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
