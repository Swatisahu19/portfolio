"use client";

import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { aiFlow } from "@/content/hr-buddy";
import { cn } from "@/lib/utils";

/**
 * Interactive walk-through of how HR Buddy AI handles a request. Steps advance
 * on their own while in view (unless reduced motion), and can be picked by hand.
 * The last step lets the visitor choose Confirm or Cancel, because that choice
 * is the employee's, never the assistant's.
 */
export function AiFlow() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const [outcome, setOutcome] = useState<"confirm" | "cancel" | null>(null);
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const last = aiFlow.length - 1;

  useEffect(() => {
    if (!auto || reduce || !inView || step >= last) return;
    const t = setTimeout(() => setStep((s) => Math.min(s + 1, last)), 2200);
    return () => clearTimeout(t);
  }, [auto, reduce, inView, step, last]);

  const pick = (i: number) => {
    setAuto(false);
    setStep(i);
    setOutcome(null);
  };
  const replay = () => {
    setOutcome(null);
    setStep(0);
    setAuto(true);
  };

  return (
    <div ref={ref} data-theme="dark" className="on-dark relative overflow-hidden rounded-xl bg-night p-5 text-white sm:p-8 lg:p-10">
      <div className="tech-grid-dark absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        {/* Steps */}
        <ol className="relative space-y-1" aria-label="How HR Buddy AI handles a request">
          <span className="absolute bottom-4 left-[15px] top-4 w-px bg-white/10" aria-hidden="true" />
          <motion.span
            className="absolute left-[15px] top-4 w-px origin-top bg-lime"
            style={{ height: "calc(100% - 2rem)" }}
            animate={{ scaleY: step / last }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
          {aiFlow.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => pick(i)}
                aria-current={i === step ? "step" : undefined}
                className={cn("group relative flex w-full items-center gap-4 rounded-md py-2 pr-3 text-left transition-colors", i === step ? "text-white" : "text-white/50 hover:text-white/80")}
              >
                <span
                  className={cn(
                    "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[0.6875rem] transition-colors duration-base",
                    i < step ? "bg-lime text-ink" : i === step ? "bg-lime text-ink ring-4 ring-lime/25" : "bg-night ring-1 ring-white/20",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9375rem] font-medium">{s.title}</span>
                {i === last && <span className="label ml-auto hidden rounded-full border border-lime/40 px-2 py-1 text-lime sm:inline">Human</span>}
              </button>
            </li>
          ))}
        </ol>

        {/* Detail */}
        <div className="flex flex-col">
          <div className="glass-dark relative flex min-h-[18rem] flex-1 flex-col rounded-lg p-6" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-1 flex-col"
              >
                <p className="label text-lime">{aiFlow[step].tag}</p>
                <p className="mt-4 font-display text-2xl leading-snug sm:text-3xl">{aiFlow[step].title}</p>
                <p className="mt-3 leading-relaxed text-white/70">{aiFlow[step].body}</p>

                {step >= 4 && (
                  <div className="mt-6 rounded-md bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium">Leave application</p>
                      <span
                        className={cn(
                          "label rounded-full px-2 py-1",
                          outcome === "confirm" ? "bg-lime text-ink" : outcome === "cancel" ? "bg-white/10 text-white/60" : "bg-white/10 text-white/80",
                        )}
                      >
                        {outcome === "confirm" ? "Submitted" : outcome === "cancel" ? "Cancelled" : "Waiting for you"}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1 text-sm text-white/65">
                      <li>Casual leave · 1 working day</li>
                      <li>Balance after approval shown before you decide</li>
                      <li>Expires in 10 minutes</li>
                    </ul>
                    {step === last && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setOutcome("confirm")}
                          disabled={outcome !== null}
                          className="label rounded-full bg-lime px-4 py-2 text-ink transition-opacity disabled:opacity-40"
                        >
                          Confirm and submit
                        </button>
                        <button
                          type="button"
                          onClick={() => setOutcome("cancel")}
                          disabled={outcome !== null}
                          className="label rounded-full border border-white/25 px-4 py-2 text-white transition-opacity disabled:opacity-40"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {outcome && (
                      <p className="mt-3 text-sm text-white/60">
                        {outcome === "confirm"
                          ? "Submitted by the employee, then routed to the approver as usual. The audit log marks it as made through the assistant."
                          : "Nothing was sent. The card is closed and no HR record changed."}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-sm text-white/55">The assistant cannot submit a request on its own.</p>
            <button type="button" onClick={replay} className="label link-draw shrink-0 text-white/70 hover:text-lime">
              Replay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
