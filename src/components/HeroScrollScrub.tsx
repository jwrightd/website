'use client';

import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';

import { RECRUITER_PATH } from '@/data/highlights';

import HeroIntro from './HeroIntro';
import HeroKnightEasterEgg from './HeroKnightEasterEgg';

const SCRUB_SRC = '/videos/chess-hero-scrub.mp4';
const POSTER_SRC = '/videos/chess-hero-poster.jpg';

/**
 * A scroll-milestone card standing "in" the scene: perspective-tilted toward
 * the center like a billboard, fading / lifting in over its `appear` window
 * and back out over `vanish`, driven by the tour progress (0 → 1).
 */
interface CardConfig {
  id: string;
  side: 'left' | 'right';
  top: string;
  eyebrow: string;
  title: string;
  detail: string;
  appear: [number, number];
  vanish: [number, number];
}

const CARDS: CardConfig[] = [
  {
    id: 'chess',
    side: 'left',
    top: '28%',
    eyebrow: 'Chess',
    title: 'Candidate Master',
    detail: 'Peak top-100 Lichess rapid worldwide · 2538',
    appear: [0.16, 0.28],
    vanish: [0.52, 0.62],
  },
  {
    id: 'research',
    side: 'right',
    top: '38%',
    eyebrow: 'Research',
    title: 'bioRxiv co-author',
    detail: 'MINGL spatial proteomics · Neural-CDE forecasting',
    appear: [0.4, 0.52],
    vanish: [0.7, 0.8],
  },
  {
    id: 'shipped',
    side: 'left',
    top: '58%',
    eyebrow: 'Shipped',
    title: '2× hackathon winner',
    detail: 'ElevenLabs @ HackPrinceton · Solana @ HackDuke',
    appear: [0.58, 0.68],
    // Clear the stage before the exit ramp so the landing reads calm.
    vanish: [0.8, 0.88],
  },
];

function MilestoneCard({
  card,
  progress,
}: {
  card: CardConfig;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    [card.appear[0], card.appear[1], card.vanish[0], card.vanish[1]],
    [0, 1, 1, 0],
  );
  // Rise + settle, with a slight drift upward as it exits — feels like the
  // camera is moving past the card rather than the card just blinking out.
  const y = useTransform(
    progress,
    [card.appear[0], card.appear[1], card.vanish[0], card.vanish[1]],
    [36, 0, 0, -28],
  );
  const tilt = card.side === 'left' ? 14 : -14;

  return (
    <motion.div
      style={{ opacity, y, top: card.top, perspective: 900 }}
      className={`pointer-events-none absolute z-[2] w-[250px] ${
        card.side === 'left' ? 'left-6 lg:left-12' : 'right-6 lg:right-12'
      }`}
      aria-hidden="true"
    >
      <div
        className="rounded-2xl border px-4 py-3.5 backdrop-blur-md"
        style={{
          transform: `rotateY(${tilt}deg)`,
          borderColor: 'rgba(255,255,255,0.1)',
          background: 'rgba(10,14,22,0.55)',
          boxShadow: '0 18px 50px -24px rgba(0,0,0,0.8)',
        }}
      >
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: 'var(--os-accent)' }}
        >
          {card.eyebrow}
        </p>
        <p className="mt-1.5 text-[15px] font-semibold leading-tight" style={{ color: 'rgba(255,255,255,0.94)' }}>
          {card.title}
        </p>
        <p className="mt-1 text-[12px] leading-snug" style={{ color: 'rgba(255,255,255,0.58)' }}>
          {card.detail}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * Pinned, scroll-driven hero tour (desktop, motion-tolerant viewports only —
 * the gate lives in CinematicHero). Scroll position scrubs the Knight's-Tour
 * video Razorpay-style: the video is encoded all-intra (every frame a
 * keyframe) so currentTime seeks resolve instantly, and the scrub position
 * eases toward the scroll target each animation frame so wheel steps feel
 * fluid instead of stepped. Milestone cards stand in the scene with
 * perspective tilt, and a subtle push-in scale sells forward camera motion.
 *
 * Progress is computed directly from window scroll + section geometry rather
 * than framer's useScroll({ target }), whose offset measurement is unreliable
 * for sticky targets (and breaks under browser scroll-restoration).
 */
export default function HeroScrollScrub() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef(0);
  const smoothedRef = useRef(0);
  const rafRef = useRef(0);

  const progress = useMotionValue(0);

  // ── Exit ramp (≈0.78 → 1): the tour lands instead of hard-cutting into the
  // page. Full intro crossfades into a compact name bar, the video dissolves,
  // and a flat overlay normalizes the color grade toward the site background.
  const introOpacity = useTransform(progress, [0.78, 0.9], [1, 0]);
  const introScale = useTransform(progress, [0.78, 0.92], [1, 0.95]);
  const compactOpacity = useTransform(progress, [0.86, 0.93], [0, 1]);
  const compactY = useTransform(progress, [0.86, 0.94], [14, 0]);
  const knightOpacity = useTransform(progress, [0.86, 0.98], [1, 0]);
  const knightScale = useTransform(progress, [0.86, 1], [1, 0.85]);
  const knightY = useTransform(progress, [0.86, 1], [0, 12]);
  const knightPointerEvents = useTransform(progress, (p) => (p > 0.92 ? 'none' : 'auto'));
  const pillOpacity = useTransform(progress, [0.02, 0.12], [1, 0]);
  const skipOpacity = useTransform(progress, [0.3, 0.45], [1, 0]);
  const skipPointerEvents = useTransform(progress, (p) => (p > 0.42 ? 'none' : 'auto'));
  // Push in as the tour advances, then settle back as the camera "lands".
  const mediaScale = useTransform(progress, [0, 0.8, 1], [1, 1.09, 1.01]);
  const mediaOpacity = useTransform(progress, [0.86, 0.98], [1, 0]);
  const gradeOpacity = useTransform(progress, [0.8, 1], [0, 0.72]);

  const skipToEnd = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + el.offsetHeight - window.innerHeight + 2, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const readScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const range = el.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      targetRef.current = Math.min(1, Math.max(0, (window.scrollY - top) / range));
    };

    const tick = () => {
      // Ease the scrub toward the scroll target; snap when nearly there so the
      // loop idles instead of seeking forever.
      const target = targetRef.current;
      const current = smoothedRef.current;
      const next = Math.abs(target - current) < 0.0004 ? target : current + (target - current) * 0.11;
      if (next !== current) {
        smoothedRef.current = next;
        progress.set(next);
      }
      // Seek independently of progress updates: seeks issued while the video
      // is busy get skipped, so keep re-issuing until it catches up.
      const video = videoRef.current;
      if (video && video.duration && !video.seeking) {
        const want = next * (video.duration - 0.05);
        if (Math.abs(video.currentTime - want) > 0.02) video.currentTime = want;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    readScroll();
    smoothedRef.current = targetRef.current;
    progress.set(targetRef.current);
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', readScroll);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', readScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} id="top" aria-labelledby="hero-name" className="relative h-[210vh]">
      <div className="sticky top-14 flex h-[calc(100svh-56px)] items-center justify-center overflow-hidden px-6">
        <div className="cine-grid absolute inset-0" aria-hidden="true" />

        <motion.div
          className="absolute inset-0"
          style={{ scale: mediaScale, opacity: mediaOpacity }}
          aria-hidden="true"
        >
          {/* Poster paints under the video until it's seekable. */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${POSTER_SRC})` }}
          />
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster={POSTER_SRC}
            src={SCRUB_SRC}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>

        {/* Readability scrim + vignette (mirrors HeroChessVideo). */}
        <div className="absolute inset-0" style={{ background: 'rgba(8,9,12,0.42)' }} aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,9,12,0.8) 0%, rgba(8,9,12,0.14) 30%, rgba(8,9,12,0.1) 62%, rgba(8,9,12,0.85) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Exit-ramp color grade: dissolves the cinematic frame into the flat
            editorial site background so the handoff never hard-cuts. */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: gradeOpacity, background: 'var(--os-bg)' }}
          aria-hidden="true"
        />

        <motion.div
          className="relative z-[1] flex w-full justify-center"
          style={{ opacity: introOpacity, scale: introScale }}
        >
          <HeroIntro />
        </motion.div>

        {/* Compact identity bar: the intro re-stages into this instead of
            leaving the final stretch of the tour anchorless. */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[42%] z-[1] flex flex-col items-center text-center"
          style={{ opacity: compactOpacity, y: compactY }}
          aria-hidden="true"
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: 'var(--os-accent)' }}
          >
            {RECRUITER_PATH}
          </p>
          <p
            className="mt-2 text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em]"
            style={{ color: 'rgba(255,255,255,0.94)' }}
          >
            James Wright
          </p>
        </motion.div>

        {CARDS.map((card) => (
          <MilestoneCard key={card.id} card={card} progress={progress} />
        ))}

        <motion.div
          className="absolute bottom-6 right-6 z-[3]"
          style={{
            opacity: knightOpacity,
            scale: knightScale,
            y: knightY,
            pointerEvents: knightPointerEvents,
          }}
        >
          <HeroKnightEasterEgg />
        </motion.div>

        <motion.div
          className="absolute bottom-7 left-6 z-[2]"
          style={{ opacity: skipOpacity, pointerEvents: skipPointerEvents }}
        >
          <button
            type="button"
            onClick={skipToEnd}
            className="rounded-full border px-4 py-2 text-[10.5px] font-medium uppercase tracking-[0.22em] backdrop-blur-md transition-colors hover:text-white"
            style={{
              borderColor: 'rgba(255,255,255,0.12)',
              background: 'rgba(10,14,22,0.5)',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            Skip intro
          </button>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute bottom-7 left-1/2 z-[2] -translate-x-1/2"
          style={{ opacity: pillOpacity }}
          aria-hidden="true"
        >
          <div
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-[10.5px] font-medium uppercase tracking-[0.22em] backdrop-blur-md"
            style={{
              borderColor: 'rgba(255,255,255,0.12)',
              background: 'rgba(10,14,22,0.5)',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            Scroll
            <span className="cine-scroll-line" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
