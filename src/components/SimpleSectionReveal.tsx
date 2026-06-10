'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SimpleSectionRevealProps {
  children: ReactNode;
  className?: string;
}

export default function SimpleSectionReveal({
  children,
  className,
}: SimpleSectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className ? `cine-js-reveal ${className}` : 'cine-js-reveal'}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      // Trigger 240px before the section enters and settle fast: content must be
      // readable the moment it's on screen, even at recruiter skim-scroll speed.
      viewport={{ once: true, margin: '0px 0px 240px 0px' }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

