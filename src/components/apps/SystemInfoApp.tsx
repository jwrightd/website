'use client';

import { useState } from 'react';
import { SKILLS } from '@/data/skills';

const SECTIONS = ['System', 'Stack', 'Skills'] as const;
type Section = typeof SECTIONS[number];

const SYSTEM_INFO = [
  { label: 'Name',       value: 'James Wright' },
  { label: 'OS',         value: 'JamesOS v1.0' },
  { label: 'Build',      value: 'CS + Mathematics' },
  { label: 'Institution',value: 'Duke University' },
  { label: 'Focus',      value: 'ML · Systems · Data Science · Quant' },
  { label: 'Kernel',     value: 'curiosity-driven-5.4.0' },
  { label: 'Shell',      value: 'python3 + typescript' },
  { label: 'Uptime',     value: '20+ years' },
  { label: 'Status',     value: 'Seeking 2026 internships / research' },
];

export default function SystemInfoApp() {
  const [active, setActive] = useState<Section>('System');

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────── */}
      <div
        className="w-[148px] shrink-0 flex flex-col"
        style={{ background: 'var(--os-sidebar)', borderRight: '1px solid var(--os-border)' }}
      >
        <div className="px-3 pt-3 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest px-2" style={{ color: 'var(--os-text-3)' }}>
            JamesOS
          </p>
        </div>

        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className="w-full text-left px-5 py-2.5 text-[13px] font-medium transition-colors"
            style={{
              background: active === s ? 'rgba(79,142,247,0.15)' : 'transparent',
              borderLeft: `2px solid ${active === s ? '#4f8ef7' : 'transparent'}`,
              color: active === s ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.48)',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ── Content ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center gap-4 px-6 py-4 shrink-0"
          style={{ borderBottom: '1px solid var(--os-border)' }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-[16px] font-black text-white shrink-0"
            style={{ background: 'linear-gradient(145deg,#2563eb,#6d28d9)' }}
          >
            J
          </div>
          <div>
            <p className="text-[15px] font-bold" style={{ color: 'var(--os-text)' }}>JamesOS</p>
            <p className="text-[11.5px] mt-0.5" style={{ color: 'var(--os-text-3)' }}>
              {active} · v1.0
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-6 py-5">
          {active === 'System' && <SystemSection />}
          {active === 'Stack' && <StackSection />}
          {active === 'Skills' && <SkillsSection />}
        </div>

        <div
          className="flex items-center px-6 h-7 shrink-0 text-[10.5px]"
          style={{ borderTop: '1px solid var(--os-border)', color: 'var(--os-text-3)', background: 'rgba(255,255,255,0.01)' }}
        >
          © James Wright · All rights reserved
        </div>
      </div>
    </div>
  );
}

function SystemSection() {
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--os-border)' }}
    >
      {SYSTEM_INFO.map(({ label, value }, i) => (
        <div
          key={label}
          className="flex gap-4 px-4 py-2.5"
          style={{
            background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
            borderBottom: i < SYSTEM_INFO.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}
        >
          <span className="text-[12px] font-mono w-24 shrink-0" style={{ color: 'var(--os-text-3)' }}>{label}</span>
          <span className="text-[12.5px]" style={{ color: 'var(--os-text-2)' }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function StackSection() {
  const allSkills = SKILLS.flatMap((s) => s.items);
  return (
    <div className="flex flex-col gap-4">
      {SKILLS.map((s) => (
        <div key={s.category}>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--os-text-3)' }}>
            {s.category}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {s.items.map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 rounded text-[11.5px] font-mono"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.62)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
      <p className="text-[11px] mt-1" style={{ color: 'var(--os-text-3)' }}>
        {allSkills.length} packages installed
      </p>
    </div>
  );
}

function SkillsSection() {
  return (
    <div className="flex flex-col gap-5">
      {[
        { label: 'Core CS', items: ['Algorithms', 'Data Structures', 'Systems Programming', 'Linear Algebra', 'Probability', 'Optimization'] },
        { label: 'Strengths', items: ['Applied ML', 'Research Engineering', 'Scientific Computing', 'Data Pipelines', 'API Design'] },
      ].map((group) => (
        <div key={group.label}>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--os-text-3)' }}>
            {group.label}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 rounded text-[11.5px]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.62)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
