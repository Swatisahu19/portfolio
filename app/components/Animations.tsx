'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
}

export function FadeIn({ children, delay = 0 }: FadeInProps) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: 'easeOut'
      }
    });
  }, [controls, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}

interface SlideInProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
}

export function SlideIn({ children, direction = 'left', delay = 0 }: SlideInProps) {
  const controls = useAnimation();
  const xOffset = direction === 'left' ? -50 : 50;

  useEffect(() => {
    controls.start({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: 'easeOut'
      }
    });
  }, [controls, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
}

export function ScaleIn({ children, delay = 0 }: ScaleInProps) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: 'easeOut'
      }
    });
  }, [controls, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
} 