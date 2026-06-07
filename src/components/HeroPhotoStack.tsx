'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { HERO_PHOTOS } from '@/data/heroPhotos';

const AUTO_INTERVAL_MS = 3500;
const PEEK_OFFSETS = [1, 2] as const;

const PEEK_MOTION = {
  1: { x: 26, y: 8, rotate: 5.5, scale: 0.94, opacity: 0.78 },
  2: { x: 52, y: 16, rotate: 11, scale: 0.87, opacity: 0.52 },
} as const;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function HeroPhotoStack() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const total = HERO_PHOTOS.length;
  const current = HERO_PHOTOS[index];

  const goTo = useCallback((nextIndex: number) => {
    setIndex(mod(nextIndex, total));
  }, [total]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (prefersReducedMotion || paused) return;
    const timer = window.setTimeout(() => {
      setIndex((currentIndex) => mod(currentIndex + 1, total));
    }, AUTO_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, prefersReducedMotion, total]);

  return (
    <div
      className="hero-photo-stack"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="hero-photo-stack-stage">
        {PEEK_OFFSETS.map((offset) => {
          const photo = HERO_PHOTOS[mod(index + offset, total)];
          const peekTarget = PEEK_MOTION[offset];

          return (
            <motion.div
              key={`peek-${photo.id}-${offset}`}
              aria-hidden="true"
              className="hero-photo-stack-peek"
              style={{ zIndex: offset === 1 ? 2 : 1 }}
              initial={false}
              animate={
                prefersReducedMotion
                  ? { opacity: peekTarget.opacity * 0.8, scale: peekTarget.scale }
                  : peekTarget
              }
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={photo.src} alt="" fill sizes="(max-width: 1024px) 280px, 340px" className="object-cover" />
            </motion.div>
          );
        })}

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.button
            key={current.id}
            type="button"
            className="hero-photo-stack-active"
            onClick={next}
            aria-label={`Photo ${index + 1} of ${total}. Click for next.`}
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0.84, scale: 0.96, x: 18, rotate: 2 }
            }
            animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: -90, rotate: -9, scale: 0.92 }
            }
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              sizes="(max-width: 1024px) 280px, 340px"
              className="object-cover"
            />
          </motion.button>
        </AnimatePresence>
      </div>

      <div className="hero-photo-stack-controls">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="hero-photo-stack-nav"
        >
          <ChevronLeft size={14} aria-hidden="true" />
        </button>

        <div className="hero-photo-stack-dots" role="tablist" aria-label="Photo selection">
          {HERO_PHOTOS.map((photo, photoIndex) => {
            const isActive = photoIndex === index;
            const showProgress = isActive && !prefersReducedMotion;

            return (
              <button
                key={photo.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show photo ${photoIndex + 1}`}
                className="hero-photo-stack-dot"
                data-active={isActive ? 'true' : 'false'}
                data-progress={isActive ? (prefersReducedMotion ? 'static' : 'animated') : 'idle'}
                onClick={() => goTo(photoIndex)}
              >
                {showProgress ? (
                  <span className="hero-photo-stack-dot-track" aria-hidden="true">
                    <span
                      key={`progress-${index}`}
                      className="hero-photo-stack-dot-fill"
                      style={{
                        animationDuration: `${AUTO_INTERVAL_MS}ms`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                    />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="hero-photo-stack-nav"
        >
          <ChevronRight size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
