'use client';

import { motion } from 'framer-motion';
import { ArrowRight, FileText, FolderOpen, Mail, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { POSITIONING, PROOF_GROUPS, RECRUITER_PATH, STATS, type ProofPoint } from '@/data/highlights';
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
    <div className="grid grid-cols-[92px_1fr] gap-3 border-t py-2.5 first:border-t-0" style={{ borderColor: 'rgba(255,255,255,0.065)' }}>
      <p className="text-[15px] font-semibold leading-snug tabular-nums" style={{ color: 'rgba(255,255,255,0.92)' }}>
        {value}
      </p>
      <div>
        <p className="text-[12.5px] font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.76)' }}>
          {point.label}
        </p>
        <p className="mt-0.5 text-[11.2px] leading-[1.45]" style={{ color: 'rgba(255,255,255,0.42)' }}>
          {point.detail}
        </p>
      </div>
    </div>
  );
}

function ProofGroupCard({ group }: { group: (typeof PROOF_GROUPS)[number] }) {
  return (
    <div
      className="rounded-xl border px-4 py-3.5"
      style={{
        borderColor: 'rgba(255,255,255,0.09)',
        background: group.id === 'systems' ? 'rgba(79,142,247,0.055)' : 'rgba(167,139,250,0.052)',
      }}
    >
      <p className="text-[11.5px] font-semibold" style={{ color: 'rgba(255,255,255,0.72)' }}>
        {group.label}
      </p>
      <div className="mt-2">
        {group.points.map((point) => (
          <ProofRow key={point.id} point={point} />
        ))}
      </div>
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
  onRecruiterMode: () => void;
  onSimpleView: () => void;
  onDismiss: () => void;
}

export default function DesktopHero({ onOpenApp, onRecruiterMode, onSimpleView, onDismiss }: DesktopHeroProps) {
  return (
    <motion.section
      aria-label="Introduction"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.45, ease: 'easeOut' }}
      className="pointer-events-auto absolute left-1/2 top-[72px] z-[20] w-[min(780px,calc(100vw-390px))] -translate-x-1/2"
    >
      <div
        className="relative overflow-hidden rounded-2xl border px-7 py-6 shadow-[0_26px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl"
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
            <h1 className="mt-2 text-[36px] font-semibold leading-none tracking-[-0.025em]" style={{ color: 'rgba(255,255,255,0.97)' }}>
              {PROFILE.name}
            </h1>
            <p className="mt-3 text-[14.2px] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {POSITIONING}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3 rounded-xl border px-4 py-3" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)' }}>
            {['gpa', 'pipeline', 'universities', 'cv'].map((id) => (
              <HeroMetric key={id} statId={id} />
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {PROOF_GROUPS.map((group) => (
            <ProofGroupCard key={group.id} group={group} />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.075)' }}>
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
