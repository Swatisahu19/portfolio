"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; n: string; label: string };

/** Sticky section index with active tracking and a reading-progress bar */
export function CaseToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-cobalt" aria-hidden="true" />
      <nav aria-label="Case study sections" className="sticky top-28 hidden lg:block">
        <p className="label mb-5 text-mute">Contents</p>
        <ol className="space-y-0.5">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? "true" : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-sm py-1.5 text-sm transition-colors",
                  active === i.id ? "text-ink" : "text-mute hover:text-ink",
                )}
              >
                <span className={cn("h-px transition-all duration-base", active === i.id ? "w-6 bg-cobalt" : "w-3 bg-ink/25 group-hover:w-5")} aria-hidden="true" />
                <span className="font-mono text-[0.6875rem]">{i.n}</span>
                {i.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
