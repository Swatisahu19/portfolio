"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
};

/** Fade-and-rise on first scroll into view. Becomes a plain fade under reduced motion. */
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.9, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

const lineVariants: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 1.05, ease: EASE, delay: 0.08 * i } }),
};

/**
 * Masked line-by-line headline reveal. Lines are passed explicitly so breaks
 * are designed, not left to the browser.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  immediate = false,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Animate on mount (hero) instead of on scroll */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  if (immediate) {
    // CSS-driven so the headline is visible without waiting for hydration
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <span className={`anim-line block ${lineClassName ?? ""}`} style={{ animationDelay: `${delay + 0.08 * i}s` }}>
              {line}
            </span>
          </span>
        ))}
      </span>
    );
  }
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <motion.span className={className} initial={reduce ? "show" : "hidden"} {...trigger} transition={{ delayChildren: delay }}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span className={`block will-change-transform ${lineClassName ?? ""}`} custom={i + delay * 10} variants={lineVariants}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Stagger container for lists of Reveal-like children */
export function Stagger({ children, className, gap = 0.08 }: { children: ReactNode; className?: string; gap?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
