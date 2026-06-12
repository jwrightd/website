'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const SpinningKnight = dynamic(() => import('./SpinningKnight'), {
  ssr: false,
  loading: () => null,
});

/**
 * Small interactive knight tucked into the hero's bottom-right corner.
 * Mounts only on desktop-width, motion-tolerant viewports so the Three.js
 * chunk never loads on mobile or before the hero text has painted.
 */
export default function HeroKnightEasterEgg() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const widthQuery = window.matchMedia('(min-width: 768px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(widthQuery.matches && !motionQuery.matches);
    update();
    widthQuery.addEventListener('change', update);
    motionQuery.addEventListener('change', update);
    return () => {
      widthQuery.removeEventListener('change', update);
      motionQuery.removeEventListener('change', update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="group relative h-[112px] w-[112px]"
      role="img"
      aria-label="Interactive chess knight easter egg — drag to spin"
    >
      <div className="cine-knight-glow absolute inset-[-22%] rounded-full" aria-hidden="true" />
      {/* Brightness lift: at easter-egg scale the dark metallic finish sinks
          into the hero vignette, so push the model out of the shadows. */}
      <div className="absolute inset-0 [filter:brightness(1.45)_saturate(1.05)]">
        <SpinningKnight />
      </div>
      <span
        className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.18em] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ color: 'rgba(255,255,255,0.45)' }}
        aria-hidden="true"
      >
        drag me
      </span>
    </div>
  );
}
