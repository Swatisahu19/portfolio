"use client";

import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { experiences } from "@/content/hr-buddy";
import { Shot } from "./Shot";
import { cn } from "@/lib/utils";

/** The three HR Buddy experiences as accessible tabs, each with a real screen */
export function ExperienceTabs() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotionSafe();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const e = experiences[active];

  const onKey = (ev: React.KeyboardEvent, i: number) => {
    const n = experiences.length;
    const to = ev.key === "ArrowRight" ? (i + 1) % n : ev.key === "ArrowLeft" ? (i - 1 + n) % n : ev.key === "Home" ? 0 : ev.key === "End" ? n - 1 : null;
    if (to === null) return;
    ev.preventDefault();
    setActive(to);
    tabs.current[to]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="HR Buddy experiences" className="inline-flex flex-wrap gap-1 rounded-full border border-ink/10 bg-paper p-1">
        {experiences.map((x, i) => (
          <button
            key={x.id}
            ref={(el) => { tabs.current[i] = el; }}
            role="tab"
            id={`tab-${x.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${x.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(ev) => onKey(ev, i)}
            className={cn("relative rounded-full px-4 py-2 text-sm transition-colors", i === active ? "text-ivory" : "text-ink-2 hover:text-ink")}
          >
            {i === active && <motion.span layoutId="exp-pill" className="absolute inset-0 -z-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className="relative">{x.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={e.id}
          id={`panel-${e.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${e.id}`}
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-8 grid gap-8 xl:grid-cols-[16rem_minmax(0,1fr)]"
        >
          <ul className="grid content-start gap-x-6 gap-y-2.5 sm:grid-cols-2 xl:grid-cols-1">
            {e.items.map((it) => (
              <li key={it} className="flex items-center gap-3 text-ink-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt" aria-hidden="true" />
                {it}
              </li>
            ))}
          </ul>
          <Shot shot={e.shot} sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 70vw, 100vw" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
