import { POSITIONING, TAGLINE } from '@/data/highlights';

import SimpleSectionReveal from './SimpleSectionReveal';

const LICHESS_RAPID_URL = 'https://lichess.org/@/jamesw112106/perf/rapid';

/**
 * Compact positioning section between the hero and the stats cards. Previously a
 * 260vh sticky scroll-reveal track; folded into a single viewport so skimming
 * recruiters reach the proof points without burning scroll distance.
 *
 * Doubles as the hero's landing strip: the cinematic intro dissolves into this
 * section, so it carries the hero's grid texture and a faint accent glow that
 * fade out down the page instead of cutting to a flat background.
 */
export default function ScrollTextReveal() {
  return (
    <section aria-label="Focus" className="relative">
      <div
        className="cine-bridge-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        aria-hidden="true"
      />
      <div
        className="cine-grid-bridge pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1100px] px-6 pb-14 pt-6 text-center">
      <SimpleSectionReveal>
        <p
          className="mx-auto max-w-[900px] text-[clamp(26px,4.2vw,46px)] font-semibold leading-[1.14] tracking-[-0.02em]"
          style={{ color: 'rgba(255,255,255,0.93)' }}
        >
          I build software at the edge of machine learning, data, and systems.
        </p>
        <p className="mt-4 text-[clamp(12px,1.4vw,14.5px)] tracking-[0.04em]" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {POSITIONING}
        </p>

        <div className="mx-auto mt-10 grid max-w-[920px] gap-8 sm:grid-cols-2">
          <div>
            <p
              className="text-[clamp(17px,2vw,21px)] font-semibold leading-[1.3] tracking-[-0.01em]"
              style={{ color: 'rgba(255,255,255,0.88)' }}
            >
              Chess-trained intuition. Engineering-first execution.
            </p>
            <p className="mt-3 text-[clamp(12px,1.3vw,13.5px)] tracking-[0.03em]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              USCF Candidate Master ·{' '}
              <a
                href={LICHESS_RAPID_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[rgba(199,217,255,0.4)] underline-offset-2"
                style={{ color: '#c7d9ff' }}
              >
                Peak top 100 Lichess rapid (2538)
              </a>
            </p>
          </div>
          <div>
            <p
              className="text-[clamp(17px,2vw,21px)] font-semibold leading-[1.3] tracking-[-0.01em]"
              style={{ color: 'rgba(255,255,255,0.88)' }}
            >
              {TAGLINE}
            </p>
            <p className="mt-3 text-[clamp(12px,1.3vw,13.5px)] tracking-[0.03em]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Four concurrent campus roles · Code+, DIIG, Duke AML, Hickey Lab
            </p>
          </div>
        </div>
      </SimpleSectionReveal>
      </div>
    </section>
  );
}
