'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const POSTER_SRC = '/videos/chess-hero-poster.jpg';
const WEBM_SRC = '/videos/chess-hero.webm';
const MP4_SRC = '/videos/chess-hero.mp4';

/**
 * Full-bleed cinematic chess loop behind the Simple-view hero. The poster (and
 * the hero text above it) paint first; the <video> mounts a beat later so the
 * loop never competes with LCP. Reduced-motion users get the poster only.
 */
export default function HeroChessVideo() {
  const prefersReducedMotion = useReducedMotion();
  const [mountVideo, setMountVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setTimeout(() => setMountVideo(true), 250);
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion]);

  const showVideo = mountVideo && !failed && !prefersReducedMotion;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Poster paints immediately; background-image fails silently if the
          asset is missing, leaving the site's dark backdrop. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${POSTER_SRC})` }}
      />
      {showVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER_SRC}
          onPlaying={() => setPlaying(true)}
          // Some browsers defer autoplay (e.g. Safari low-power mode); retry once ready.
          onCanPlay={(e) => { e.currentTarget.play().catch(() => {}); }}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={WEBM_SRC} type="video/webm" />
          <source src={MP4_SRC} type="video/mp4" onError={() => setFailed(true)} />
        </video>
      ) : null}

      {/* Readability scrim + top/bottom vignette so hero copy stays legible. */}
      <div className="absolute inset-0" style={{ background: 'rgba(8,9,12,0.4)' }} />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(8,9,12,0.8) 0%, rgba(8,9,12,0.14) 30%, rgba(8,9,12,0.1) 62%, rgba(8,9,12,0.85) 100%)',
        }}
      />
    </div>
  );
}
