'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { PROFILE } from '@/data/profile';

interface BootScreenProps {
  onComplete: () => void;
}

const FULL_DURATION = 1200;
const REDUCED_DURATION = 320;

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const fallbackInitials = useMemo(
    () =>
      PROFILE.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase(),
    []
  );

  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onComplete();
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(finish, reduceMotion ? REDUCED_DURATION : FULL_DURATION);

    // Any intentional interaction skips straight to the desktop.
    const events: (keyof WindowEventMap)[] = ['keydown', 'pointerdown', 'wheel', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, finish, { once: true, passive: true }));

    return () => {
      window.clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, finish));
    };
  }, [onComplete]);

  return (
    <motion.div
      role="status"
      aria-label="Waking JamesOS"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      className="boot-screen fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 84% 44%, rgba(79,142,247,0.18) 0%, rgba(79,142,247,0.08) 18%, rgba(79,142,247,0) 46%), linear-gradient(180deg, #08090b 0%, #0d0f12 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="boot-ambient absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            'repeating-linear-gradient(rgba(255,255,255,0.012) 0px, transparent 1px, transparent 34px, rgba(255,255,255,0.012) 35px), repeating-linear-gradient(90deg, rgba(255,255,255,0.01) 0px, transparent 1px, transparent 34px, rgba(255,255,255,0.01) 35px)',
        }}
      />

      <div className="boot-content relative z-10 flex w-full max-w-[420px] flex-col items-center px-6 text-center">
        <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full border border-white/12 bg-white/6 shadow-[0_18px_60px_rgba(0,0,0,0.42)]">
          {!imageFailed ? (
            <Image
              src={PROFILE.profilePhotoSrc}
              alt={PROFILE.profilePhotoAlt}
              fill
              priority
              sizes="100px"
              className="object-cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[28px] font-semibold tracking-[0.08em] text-white/78">
              {fallbackInitials}
            </div>
          )}
        </div>

        <p className="mt-6 text-[32px] font-light tracking-[-0.02em] text-white/90 sm:text-[36px]">{PROFILE.name}</p>
        <p className="mt-2 text-[11.5px] tracking-[0.2em] text-white/26">WAKING JAMESOS</p>

        <div className="mt-7 h-[3px] w-[200px] overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: FULL_DURATION / 1000, ease: 'easeInOut' }}
            className="h-full rounded-full"
            style={{ background: 'var(--os-accent)' }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onComplete}
        className="absolute bottom-8 right-8 rounded-full border border-white/14 bg-white/6 px-4 py-2 text-[12.5px] font-medium text-white/70 transition-colors hover:bg-white/12 hover:text-white/90"
      >
        Skip →
      </button>
    </motion.div>
  );
}
