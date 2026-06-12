'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import HeroChessVideo from './HeroChessVideo';
import HeroIntro from './HeroIntro';
import HeroKnightEasterEgg from './HeroKnightEasterEgg';
import HeroScrollScrub from './HeroScrollScrub';

export default function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Default to the static hero (also the SSR / mobile / reduced-motion render).
  // Upgrade to the pinned scroll-scrub only on roomy, motion-tolerant viewports.
  const [scrub, setScrub] = useState(false);

  useEffect(() => {
    const widthQuery = window.matchMedia('(min-width: 1024px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setScrub(widthQuery.matches && !motionQuery.matches);
    update();
    widthQuery.addEventListener('change', update);
    motionQuery.addEventListener('change', update);
    return () => {
      widthQuery.removeEventListener('change', update);
      motionQuery.removeEventListener('change', update);
    };
  }, []);

  // 0 → hero pinned at top of viewport, 1 → hero fully scrolled past.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const knightOpacity = useTransform(scrollYProgress, [0, 0.75, 0.95], [1, 1, 0]);
  const knightScale = useTransform(scrollYProgress, [0, 0.75, 0.95], [1, 1, 0.88]);
  const knightPointerEvents = useTransform(scrollYProgress, (p) => (p > 0.9 ? 'none' : 'auto'));
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  if (scrub) return <HeroScrollScrub />;

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-name"
      className="relative flex min-h-[calc(100svh-56px)] flex-col overflow-hidden"
    >
      <div className="cine-grid absolute inset-0" aria-hidden="true" />

      <motion.div className="absolute inset-0" style={{ opacity: mediaOpacity }}>
        <HeroChessVideo />
      </motion.div>

      <motion.div
        className="relative z-[1] mx-auto flex w-full flex-1 flex-col items-center justify-center px-6 py-16"
        style={{ opacity: introOpacity }}
      >
        <HeroIntro />
      </motion.div>

      <motion.div
        className="absolute bottom-6 right-6 z-[3]"
        style={{ opacity: knightOpacity, scale: knightScale, pointerEvents: knightPointerEvents }}
      >
        <HeroKnightEasterEgg />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-4 left-1/2 z-[1] -translate-x-1/2"
        style={{ opacity: cueOpacity }}
        aria-hidden="true"
      >
        <div
          className="flex flex-col items-center gap-2 text-[10.5px] uppercase tracking-[0.24em]"
          style={{ color: 'rgba(255,255,255,0.38)' }}
        >
          Scroll
          <span className="cine-scroll-line" />
        </div>
      </motion.div>
    </section>
  );
}
