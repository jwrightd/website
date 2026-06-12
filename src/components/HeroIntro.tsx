import { MapPin } from 'lucide-react';
import Image from 'next/image';

import { HERO_CTAS, HERO_PROOF, RECRUITER_PATH } from '@/data/highlights';
import { PROFILE } from '@/data/profile';

const cardStyle = {
  borderColor: 'rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
} as const;

/**
 * The hero's textual identity block (eyebrow, name, proof, CTAs, location).
 * Presentational and shared by both the static hero and the scroll-scrub hero
 * so the copy lives in exactly one place. Fades in via CSS (cine-hero-in) so it
 * paints with the initial HTML rather than waiting on hydration.
 */
export default function HeroIntro() {
  return (
    <div className="flex w-full max-w-[1100px] flex-col items-center text-center">
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

      <p
        className="cine-hero-in mt-5 max-w-[680px] text-[14px] leading-[1.6]"
        style={{ color: 'rgba(255,255,255,0.66)' }}
      >
        {HERO_PROOF}
      </p>

      <div className="cine-hero-in mt-7 flex flex-wrap justify-center gap-2.5">
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
    </div>
  );
}
