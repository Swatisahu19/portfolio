"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = { to?: number; prefix?: string; suffix?: string; fallback: string; duration?: number; className?: string };

/** Counts up when visible. Server-renders the final value, so no layout shift and no empty state without JS. */
export function CountUp({ to, prefix = "", suffix = "", fallback, duration = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [text, setText] = useState(fallback);
  const decimals = to !== undefined && !Number.isInteger(to) ? 1 : 0;

  useEffect(() => {
    if (to === undefined || reduce || !inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setText(`${prefix}${v.toFixed(decimals)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, duration, reduce, decimals]);

  return (
    <span ref={ref} className={className} aria-label={fallback}>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
