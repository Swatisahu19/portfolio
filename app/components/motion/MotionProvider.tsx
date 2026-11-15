"use client";

import { MotionConfig } from "framer-motion";

/** Honour the visitor's reduced-motion setting across every framer-motion animation */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
