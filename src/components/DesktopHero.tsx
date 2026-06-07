'use client';

import { motion } from 'framer-motion';
import { ArrowRight, FileText, FolderOpen, Mail, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import {
  LENS_OPTIONS,
  POSITIONING,
  PROOF_GROUPS,
  RECRUITER_PATH,
  STATS,
  type AudienceLens,
  type ProofGroup,
  type ProofPoint,
} from '@/data/highlights';
import { PROFILE } from '@/data/profile';
import type { AppId } from '@/types';

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

function ProofRow({ point }: { point: ProofPoint }) {
  const stat = point.statId ? STATS.find((s) => s.id === point.statId) : null;
  const animated = useCountUp(stat?.value ?? null, 950);
  const value =
    stat && stat.value != null
      ? `${stat.prefix ?? ''}${animated.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ''}`
      : (stat?.display ?? point.label);

  return (
    <div className="grid grid-cols-[82px_1fr] gap-2.5 border-t py-2 first:border-t-0" style={{ borderColor: 'rgba(255,255,255,0.065)' }}>
      <p className="text-[14px] font-semibold leading-snug tabular-nums" style={{ color: 'rgba(255,255,255,0.92)' }}>
        {value}
      </p>
      <div>
        <p className="text-[12px] font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.76)' }}>
          {point.label}
        </p>
        <p className="mt-0.5 line-clamp-1 text-[10.8px] leading-[1.35]" style={{ color: 'rgba(255,255,255,0.42)' }}>
          {point.detail}
        </p>
      </div>
    </div>
  );
}

function ProofGroupCard({ group, active }: { group: ProofGroup; active: boolean }) {
  const visiblePoints = group.points.slice(0, 3);
  const remainingCount = group.points.length - visiblePoints.length;

  return (
    <div
      className="hero-proof-group rounded-xl border px-3.5 py-2.5"
      data-active={active ? 'true' : 'false'}
      style={{
        borderColor: active ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.075)',
        background: group.id === 'systems' ? 'rgba(79,142,247,0.055)' : 'rgba(167,139,250,0.052)',
      }}
    >
      <p className="text-[11.5px] font-semibold" style={{ color: 'rgba(255,255,255,0.72)' }}>
        {group.label}
      </p>
      <div className="mt-2">
        {visiblePoints.map((point) => (
          <ProofRow key={point.id} point={point} />
        ))}
      </div>
      {remainingCount > 0 ? (
        <p className="border-t pt-2 text-[10.8px]" style={{ borderColor: 'rgba(255,255,255,0.055)', color: 'rgba(255,255,255,0.36)' }}>
          +{remainingCount} more proof point{remainingCount === 1 ? '' : 's'} in Projects and Research
        </p>
      ) : null}
    </div>
  );
}

function HeroMetric({ statId }: { statId: string }) {
  const stat = STATS.find((s) => s.id === statId);
  const animated = useCountUp(stat?.value ?? null, 900);
  if (!stat) return null;

  const rendered =
    stat.value == null
      ? stat.display
      : `${stat.prefix ?? ''}${animated.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ''}`;

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
  const [lens, setLens] = useState<AudienceLens>('systems');
  const orderedGroups = useMemo(
    () => [...PROOF_GROUPS].sort((a, b) => (a.id === lens ? -1 : b.id === lens ? 1 : 0)),
    [lens]
  );
  const metricIds = lens === 'systems'
    ? ['pipeline', 'hackathons', 'cv', 'universities']
    : ['gpa', 'biorxiv', 'lichess', 'elo'];

  return (
    <motion.section
      aria-label="Introduction"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.45, ease: 'easeOut' }}
      className="pointer-events-auto absolute left-1/2 top-[58px] z-[20] w-[min(840px,calc(100vw-400px))] -translate-x-1/2"
    >
      <div
        className="relative max-h-[calc(100vh-172px)] overflow-y-auto rounded-2xl border px-6 py-5 shadow-[0_26px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl"
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

        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-[520px]">
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
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3 rounded-xl border px-4 py-3" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)' }}>
            {metricIds.map((id) => (
              <HeroMetric key={id} statId={id} />
            ))}
          </div>
        </div>

        <div className="hero-signal-map mt-4 rounded-2xl border px-3.5 py-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[12px] font-semibold" style={{ color: 'rgba(255,255,255,0.76)' }}>
                Recruiter signal map
              </p>
              <p className="mt-0.5 text-[11.5px]" style={{ color: 'rgba(255,255,255,0.38)' }}>
                Same proof, emphasized for the role you care about.
              </p>
            </div>
            <div className="flex rounded-lg border p-1" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(8,10,14,0.34)' }}>
              {LENS_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setLens(option.id)}
                  aria-pressed={lens === option.id}
                  className="hero-lens-button rounded-md px-3 py-1.5 text-[11.5px] font-semibold"
                  data-active={lens === option.id ? 'true' : 'false'}
                  title={option.description}
                >
                  {option.id === 'systems' ? 'SWE' : 'Quant / ML'}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            {orderedGroups.map((group) => (
              <ProofGroupCard key={group.id} group={group} active={group.id === lens} />
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t pt-3.5" style={{ borderColor: 'rgba(255,255,255,0.075)' }}>
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
