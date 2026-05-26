'use client';

import { useState } from 'react';
import { PROFILE } from '@/data/profile';
import { RESEARCH } from '@/data/research';
import type { ResearchItem } from '@/types';

const STATUS_COLOR: Record<string, string> = {
  Ongoing:       '#32d74b',
  'In Progress': '#4f8ef7',
  Exploratory:   '#a78bfa',
  Published:     '#ffd60a',
};

export default function ResearchApp() {
  const [selectedId, setSelectedId] = useState(RESEARCH[0].id);
  const selected = RESEARCH.find((r) => r.id === selectedId) ?? RESEARCH[0];

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────────── */}
      <div
        className="w-[188px] shrink-0 flex flex-col overflow-y-auto"
        style={{ background: 'var(--os-sidebar)', borderRight: '1px solid var(--os-border)' }}
      >
        <div className="px-3 pt-3 pb-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest px-2" style={{ color: 'var(--os-text-3)' }}>
            Experiment Log
          </p>
        </div>

        {RESEARCH.map((item, i) => {
          const isSelected = item.id === selectedId;
          const dot = STATUS_COLOR[item.status] ?? '#94a3b8';
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className="w-full flex items-start gap-2.5 px-3 py-2.5 text-left transition-colors"
              style={{
                background: isSelected ? 'rgba(79,142,247,0.15)' : 'transparent',
                borderLeft: `2px solid ${isSelected ? '#4f8ef7' : 'transparent'}`,
              }}
            >
              <span className="text-[10px] font-mono mt-0.5 shrink-0" style={{ color: 'var(--os-text-3)' }}>
                [{String(i + 1).padStart(2, '0')}]
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
                  <span className="text-[10.5px]" style={{ color: dot }}>{item.status}</span>
                </div>
                <p
                  className="text-[12.5px] font-medium leading-tight truncate"
                  style={{ color: isSelected ? 'rgba(255,255,255,0.88)' : 'var(--os-text-2)' }}
                >
                  {item.title.split('—')[0].trim()}
                </p>
              </div>
            </button>
          );
        })}

        <div className="flex-1" />
        <div
          className="px-4 py-2 text-[10.5px]"
          style={{ borderTop: '1px solid var(--os-border)', color: 'var(--os-text-3)' }}
        >
          {RESEARCH.length} entries
        </div>
      </div>

      {/* ── Entry detail ────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Path / breadcrumb */}
        <div
          className="flex items-center gap-1.5 px-4 h-8 shrink-0 text-[11px]"
          style={{ borderBottom: '1px solid var(--os-border)', background: 'rgba(255,255,255,0.015)', color: 'var(--os-text-3)' }}
        >
          <span className="font-mono">~/research</span>
          <span>/</span>
          <span style={{ color: 'var(--os-text-2)' }}>{selected.id}</span>
        </div>

        <EntryDetail item={selected} />

        <div
          className="flex items-center px-4 h-7 shrink-0 text-[10.5px]"
          style={{ borderTop: '1px solid var(--os-border)', color: 'var(--os-text-3)', background: 'rgba(255,255,255,0.01)' }}
        >
          Last updated: {PROFILE.lastUpdated}
        </div>
      </div>
    </div>
  );
}

function EntryDetail({ item }: { item: ResearchItem }) {
  const dot = STATUS_COLOR[item.status] ?? '#94a3b8';
  return (
    <div className="flex-1 overflow-auto px-6 py-5 flex flex-col gap-5">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full" style={{ background: dot }} />
          <span className="text-[11px] font-medium" style={{ color: dot }}>{item.status}</span>
        </div>
        <h2 className="text-[17px] font-bold leading-snug" style={{ color: 'var(--os-text)' }}>
          {item.title}
        </h2>
      </div>

      <Section label="Research Question">
        <p className="text-[14px] leading-[1.75] italic" style={{ color: 'var(--os-text-2)' }}>
          &ldquo;{item.question}&rdquo;
        </p>
      </Section>

      <Section label="Methods">
        <div className="flex flex-wrap gap-1.5">
          {item.methods.map((m) => (
            <span
              key={m}
              className="rounded px-2 py-0.5 text-[12px] font-mono"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.58)',
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </Section>

      <Section label="Why It Matters">
        <p className="text-[14px] leading-[1.75]" style={{ color: 'var(--os-text-2)' }}>
          {item.impact}
        </p>
      </Section>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--os-text-3)' }}>
        {label}
      </p>
      {children}
    </div>
  );
}
