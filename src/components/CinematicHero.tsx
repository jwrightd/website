'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRef } from 'react';

import { HERO_CTAS, HERO_PROOF, RECRUITER_PATH } from '@/data/highlights';
import { PROFILE } from '@/data/profile';

const SpinningKnight = dynamic(() => import('./SpinningKnight'), {
  ssr: false,
  loading: () => null,
});

const cardStyle = {
  borderColor: 'rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
} as const;

export default function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // 0 → hero pinned at top of viewport, 1 → hero fully scrolled past.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const knightScale = useTransform(scrollYProgress, [0, 1], [1, 0.84]);
  const knightY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const knightOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-name"
      className="relative flex min-h-[calc(100svh-56px)] flex-col overflow-hidden"
    >
      <div className="cine-grid absolute inset-0" aria-hidden="true" />

      <motion.div
        className="relative z-[1] mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center px-6 pt-10 pb-20 text-center sm:pt-12"
        style={prefersReducedMotion ? undefined : { opacity: introOpacity }}
      >
        {/* Hero copy fades in via CSS (cine-hero-in) rather than framer-motion so it
            paints with the initial HTML instead of waiting on hydration / the knight chunk. */}
        <p
          className="cine-hero-in text-[12.5px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: 'var(--os-accent)' }}
        >
          {RECRUITER_PATH}
        </p>

        <h1
          id="hero-name"
          className="cine-hero-in mt-3 text-[clamp(42px,8vw,86px)] font-semibold leading-[1.02] tracking-[-0.03em]"
          style={{ color: 'rgba(255,255,255,0.95)' }}
        >
          James Wright
        </h1>

        <div className="relative my-2 flex w-full min-h-0 flex-1 items-center justify-center">
          <motion.div
            className="relative aspect-square h-[min(46vh,480px)] max-w-full"
            style={prefersReducedMotion ? undefined : { scale: knightScale, y: knightY, opacity: knightOpacity }}
          >
            <div className="cine-knight-glow absolute inset-[-10%] rounded-full" aria-hidden="true" />
            <SpinningKnight />
          </motion.div>
        </div>

        <p
          className="cine-hero-in max-w-[680px] text-[13.5px] leading-[1.6]"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          {HERO_PROOF}
        </p>

        <div className="cine-hero-in mt-5 flex flex-wrap justify-center gap-2.5">
          {HERO_CTAS.map((cta) => {
            const isPrimary = cta.tone === 'primary';
            const href = cta.href ?? (cta.id === 'resume' ? PROFILE.resumeHref : (cta.anchor ?? '#'));
            const external = Boolean(cta.href) || cta.id === 'resume';
            return (
              <a
                key={cta.id}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="rounded-lg border px-4 py-2 text-[13.5px] font-medium transition-colors"
                style={
                  isPrimary
                    ? { background: 'var(--os-accent)', borderColor: 'var(--os-accent)', color: '#08101f' }
                    : { ...cardStyle, color: 'rgba(255,255,255,0.82)' }
                }
              >
                {cta.label}
              </a>
            );
          })}
        </div>

        <div className="cine-hero-in mt-6 flex flex-wrap items-center justify-center gap-3">
          <span
            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border"
            style={cardStyle}
          >
            <Image
              src={PROFILE.profilePhotoSrc}
              alt={PROFILE.profilePhotoAlt}
              fill
              priority
              sizes="40px"
              className="object-cover"
            />
          </span>
          <p
            className="flex max-w-[620px] flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12.5px]"
            style={{ color: 'rgba(255,255,255,0.42)' }}
          >
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} aria-hidden="true" />
              {PROFILE.location}
            </span>
            <span aria-hidden="true">·</span>
            <span>{PROFILE.availability}</span>
          </p>
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-4 left-1/2 z-[1] -translate-x-1/2"
        style={prefersReducedMotion ? undefined : { opacity: cueOpacity }}
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
