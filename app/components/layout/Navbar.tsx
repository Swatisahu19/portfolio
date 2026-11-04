"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/content/site";
import { ArrowGlyph } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Section ids observed for the active state on the homepage */
const SECTION_IDS = ["work", "philosophy", "experience", "lab", "about", "contact"];
const NAV_FOR_SECTION: Record<string, string> = { work: "work", philosophy: "work", experience: "experience", lab: "lab", about: "about" };

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [onDark, setOnDark] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Is the nav currently over a dark section?
      const probe = document.elementsFromPoint(window.innerWidth / 2, 36).find((el) => el.closest("[data-theme]"));
      setOnDark(probe?.closest("[data-theme]")?.getAttribute("data-theme") === "dark");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Active section tracking on the homepage
  useEffect(() => {
    if (!onHome) {
      setActive(pathname.startsWith("/work") ? "work" : pathname.startsWith("/resume") ? "resume" : null);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(NAV_FOR_SECTION[e.target.id] ?? null);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const top = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", top, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", top); };
  }, [onHome, pathname]);

  // Mobile menu: lock scroll, close on Escape, restore focus
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      menuBtn.current?.focus();
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const dark = onDark && !open;
  const resumeHref = site.resumePdf ?? "/resume";

  return (
    <>
      <a href="#main" className="label fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-ink px-4 py-3 text-ivory focus:translate-y-0">
        Skip to content
      </a>
      <header
        className={cn(
          "no-print fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-base",
          scrolled && !open && (dark ? "bg-night/70 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-xl" : "bg-ivory/75 shadow-[0_1px_0_rgb(20_20_19/0.08)] backdrop-blur-xl"),
          dark ? "text-white" : "text-ink",
        )}
      >
        <nav className="shell flex h-[var(--nav-h)] items-center justify-between" aria-label="Primary">
          <Link href="/" className="group flex items-center gap-3 font-display text-[0.95rem] font-semibold tracking-[0.18em]" aria-label="Swati Sahu, home">
            <span className={cn("grid h-7 w-7 place-items-center rounded-full text-[0.625rem] tracking-normal transition-colors", dark ? "bg-lime text-ink" : "bg-ink text-lime")} aria-hidden="true">
              SS
            </span>
            SWATI SAHU
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive = active === item.id;
              const href = item.id === "resume" ? resumeHref : item.href;
              return (
                <li key={item.id}>
                  <Link
                    href={href}
                    className={cn("relative rounded-full px-4 py-2 text-sm transition-colors", dark ? "hover:text-lime" : "hover:bg-ink/5")}
                    aria-current={isActive ? (item.id === "resume" ? "page" : "true") : undefined}
                  >
                    {isActive && (
                      <motion.span layoutId="nav-pill" className={cn("absolute inset-0 -z-10 rounded-full", dark ? "bg-white/10" : "bg-ink/[0.07]")} transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="ml-3">
              <Link
                href="/#contact"
                className={cn(
                  "group/btn inline-flex h-10 items-center gap-2.5 rounded-full px-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-shadow",
                  "bg-lime text-ink hover:shadow-[0_8px_24px_-8px_rgb(var(--c-lime)/0.9)]",
                )}
              >
                Let&apos;s connect <ArrowGlyph />
              </Link>
            </li>
          </ul>

          <button
            ref={menuBtn}
            type="button"
            className="relative z-[60] grid h-11 w-11 place-items-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span className={cn("absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-base", open && "translate-y-1.5 rotate-45")} />
              <span className={cn("absolute bottom-0 left-0 h-px w-6 bg-current transition-transform duration-base", open && "-translate-y-1.5 -rotate-45")} />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-ivory pt-[var(--nav-h)] lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="tech-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
            <ul className="shell mt-8 flex flex-1 flex-col">
              {[...nav, { label: "Let's connect", href: "/#contact", id: "contact" }].map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-ink/10"
                >
                  <Link
                    href={item.id === "resume" ? resumeHref : item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5 font-display text-4xl font-medium tracking-[-0.01em]"
                  >
                    {item.label}
                    <span className="label text-mute">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="shell flex gap-6 pb-10 pt-6 label text-ink-2">
              <a href={`mailto:${site.email}`} className="link-draw">Email</a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-draw">LinkedIn ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
