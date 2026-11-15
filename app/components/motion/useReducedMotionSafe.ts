"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * useReducedMotion, but false on the server and on the first client render, so
 * server and client HTML match (avoids React hydration error #418 for visitors
 * with reduced motion). The preference takes effect right after mount, and
 * MotionConfig reducedMotion="user" in the layout removes transforms anyway.
 */
export function useReducedMotionSafe() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduce;
}
