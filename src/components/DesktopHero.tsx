'use client';

import { motion } from 'framer-motion';
import { ArrowRight, FileText, FolderOpen, Mail, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import {
  POSITIONING,
  RECRUITER_PATH,
  STATS,
} from '@/data/highlights';
import { PROFILE } from '@/data/profile';
import { formatAnimatedStat } from '@/lib/format-stat';
import type { AppId } from '@/types';
import HeroPhotoStack from './HeroPhotoStack';

function useCountUp(target: number | null, durationMs = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target == null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const raf = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(raf);
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

function HeroMetric({ statId }: { statId: string }) {
  const stat = STATS.find((s) => s.id === statId);
  const animated = useCountUp(stat?.value ?? null, 900);
  if (!stat) return null;

  const rendered = formatAnimatedStat(stat, animated);

  return (
    <div className="min-w-0">
      <p className="text-[22px] font-semibold leading-none tracking-[-0.01em] tabular-nums" style={{ color: 'rgba(255,255,255,0.94)' }}>
        {rendered}
      </p>
      <p className="mt-1 text-[11px] leading-[1.35]" style={{ color: 'rgba(255,255,255,0.48)' }}>
        {stat.label}
      </p>
    </div>
  );
}

interface DesktopHeroProps {
  onOpenApp: (id: AppId) => void;
  onOpenWorkspace: () => void;
  onRecruiterMode: () => void;
  onSimpleView: () => void;
  onDismiss: () => void;
}

const RECRUITER_STEPS: Array<{ label: string; app: AppId; detail: string }> = [
  { label: 'Resume', app: 'resume', detail: 'credentials' },
  { label: 'Projects', app: 'projects', detail: 'proof' },
  { label: 'Contact', app: 'contact', detail: 'next step' },
];

export default function DesktopHero({
  onOpenApp,
  onOpenWorkspace,
  onRecruiterMode,
  onSimpleView,
  onDismiss,
}: DesktopHeroProps) {
  const metricIds = useMemo(
    () => ['hackathons', 'chesscom-blitz', 'biorxiv', 'gpa'],
    [],
  );

  return (
    <motion.section
      aria-label="Introduction"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.45, ease: 'easeOut' }}
      className="pointer-events-auto absolute left-1/2 top-[58px] z-[20] w-[min(920px,calc(100vw-360px))] -translate-x-1/2"
    >
      <div
        className="relative rounded-2xl border px-5 py-4 shadow-[0_26px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:px-6 sm:py-5"
        style={{
          borderColor: 'rgba(255,255,255,0.13)',
          background: 'linear-gradient(180deg, rgba(24,25,29,0.88) 0%, rgba(16,17,20,0.82) 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)' }}
        />
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss intro"
          className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-white/40 transition-colors hover:bg-white/8 hover:text-white/70"
        >
          <X size={14} />
        </button>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:items-stretch">
          <div className="min-w-0">
            <p className="text-[12px] font-semibold" style={{ color: 'var(--os-accent)' }}>
              {RECRUITER_PATH}
            </p>
            <h1 className="mt-2 text-[34px] font-semibold leading-none tracking-[-0.025em]" style={{ color: 'rgba(255,255,255,0.97)' }}>
              {PROFILE.name}
            </h1>
            <p className="mt-2.5 text-[14px] leading-[1.5]" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {POSITIONING}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2" aria-label="Recruiter path">
              <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'rgba(255,255,255,0.34)' }}>
                Start
              </span>
              {RECRUITER_STEPS.map((step, index) => (
                <button
                  key={step.app}
                  type="button"
                  onClick={() => onOpenApp(step.app)}
                  className="hero-path-step inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-medium"
                >
                  <span>{step.label}</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>{step.detail}</span>
                  {index < RECRUITER_STEPS.length - 1 ? <ArrowRight size={11} aria-hidden="true" /> : null}
                </button>
              ))}
            </div>
            <div
              className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 rounded-xl border px-4 py-3 sm:max-w-[420px]"
              style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)' }}
            >
              {metricIds.map((id) => (
                <HeroMetric key={id} statId={id} />
              ))}
            </div>
          </div>

          <div className="flex min-h-[300px] w-full shrink-0 items-center justify-center lg:min-h-0 lg:justify-end">
            <HeroPhotoStack />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.075)' }}>
          <button
            type="button"
            onClick={() => onOpenApp('resume')}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium"
            style={{ background: 'var(--os-accent)', color: '#08101f' }}
          >
            <FileText size={14} /> View Resume
          </button>
          <button
            type="button"
            onClick={() => onOpenApp('projects')}
            className="os-shell-action inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium"
          >
            <FolderOpen size={14} /> Browse Projects
          </button>
          <button
            type="button"
            onClick={onOpenWorkspace}
            className="os-shell-action inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium"
          >
            <FolderOpen size={14} /> Open Workspace
          </button>
          <button
            type="button"
            onClick={() => onOpenApp('contact')}
            className="os-shell-action inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium"
          >
            <Mail size={14} /> Contact
          </button>
          <button
            type="button"
            onClick={onRecruiterMode}
            className="ml-auto inline-flex items-center gap-1.5 text-[12.5px] font-medium"
            style={{ color: '#bcd4ff' }}
          >
            Recruiter Mode <ArrowRight size={13} />
          </button>
          <button
            type="button"
            onClick={onSimpleView}
            className="text-[12.5px]"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Simple view
          </button>
        </div>
      </div>
    </motion.section>
  );
}
