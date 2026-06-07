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
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

