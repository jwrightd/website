'use client';

import { EXPERIENCE } from '@/data/experience';
import { PROFILE } from '@/data/profile';

const STATUS: Record<string, { dot: string; label: string }> = {
  Active:    { dot: '#32d74b', label: 'Active' },
  Completed: { dot: '#4f8ef7', label: 'Completed' },
  Incoming:  { dot: '#ffd60a', label: 'Incoming' },
  'On Hold': { dot: '#ffd60a', label: 'On Hold' },
};

export default function ExperienceApp() {
  const active = EXPERIENCE.filter((e) => e.status === 'Active' || e.status === 'Incoming').length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div
        className="flex items-center gap-3 px-4 h-9 shrink-0"
        style={{ borderBottom: '1px solid var(--os-border)', background: 'rgba(255,255,255,0.015)' }}
      >
        <span className="text-[12px] font-semibold" style={{ color: 'var(--os-text-2)' }}>
          Process Manager
        </span>
        <div className="w-px h-3.5" style={{ background: 'var(--os-border)' }} />
        <span className="text-[11.5px]" style={{ color: 'var(--os-text-3)' }}>
          {EXPERIENCE.length} processes · {active} active
        </span>
      </div>

      {/* Column headers */}
      <div
        className="grid px-4 py-2 text-[10px] font-semibold uppercase tracking-widest"
        style={{
          gridTemplateColumns: '36px 1fr 1fr 88px',
          gap: '12px',
          color: 'var(--os-text-3)',
          borderBottom: '1px solid var(--os-border)',
          background: 'rgba(255,255,255,0.01)',
        }}
      >
        <span>PID</span>
        <span>Role</span>
        <span>Organization</span>
        <span>Status</span>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-auto">
        {EXPERIENCE.map((exp, i) => {
          const s = STATUS[exp.status] ?? STATUS.Completed;
          return (
            <div
              key={exp.pid}
              className="grid px-4 py-3 transition-colors"
              style={{
                gridTemplateColumns: '36px 1fr 1fr 88px',
                gap: '12px',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)')}
            >
              <span className="text-[11px] font-mono pt-0.5" style={{ color: 'var(--os-text-3)' }}>
                {exp.pid}
              </span>
              <div>
                <p className="text-[13px] font-semibold" style={{ color: 'var(--os-text)' }}>{exp.role}</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--os-text-3)' }}>{exp.period}</p>
              </div>
              <p className="text-[13px] pt-0.5" style={{ color: 'var(--os-text-2)' }}>{exp.organization}</p>
              <div className="flex items-center gap-1.5 pt-0.5">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot }} />
                <span className="text-[12px]" style={{ color: s.dot }}>{s.label}</span>
              </div>
            </div>
          );
        })}

        {/* Focus details */}
        <div className="px-4 py-4 mt-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--os-text-3)' }}>
            Focus Details
          </p>
          {EXPERIENCE.map((exp) => (
            <div key={exp.pid} className="flex gap-3 mb-3 last:mb-0">
              <span className="text-[11px] font-mono shrink-0 pt-0.5" style={{ color: 'var(--os-text-3)' }}>{exp.pid}</span>
              <span className="text-[13px] leading-[1.65]" style={{ color: 'var(--os-text-2)' }}>{exp.focus}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 h-7 shrink-0 text-[10.5px]"
        style={{ borderTop: '1px solid var(--os-border)', color: 'var(--os-text-3)', background: 'rgba(255,255,255,0.01)' }}
      >
        <span>{EXPERIENCE.length} processes · {active} active · {EXPERIENCE.length - active} completed</span>
        <span>Last updated: {PROFILE.lastUpdated}</span>
      </div>
    </div>
  );
}
