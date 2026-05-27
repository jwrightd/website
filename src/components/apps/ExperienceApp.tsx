'use client';

import { useState } from 'react';
import { EXPERIENCE } from '@/data/experience';
import { PROFILE } from '@/data/profile';
import { BodyText, BulletList, SectionBlock, SurfacePanel } from './shared/AppContent';

const STATUS: Record<string, { dot: string; label: string }> = {
  Active: { dot: '#32d74b', label: 'Active' },
  Completed: { dot: '#4f8ef7', label: 'Completed' },
  Incoming: { dot: '#ffd60a', label: 'Incoming' },
  'On Hold': { dot: '#ffd60a', label: 'On Hold' },
};

export default function ExperienceApp() {
  const active = EXPERIENCE.filter((entry) => entry.status === 'Active' || entry.status === 'Incoming').length;
  const [selectedPid, setSelectedPid] = useState(EXPERIENCE[0]?.pid ?? '');

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div
        className="flex items-center justify-between gap-3 px-5 py-3 shrink-0"
        style={{ borderBottom: '1px solid var(--os-border)', background: 'rgba(255,255,255,0.015)' }}
      >
        <div>
          <p className="text-[13px] font-medium" style={{ color: 'var(--os-text)' }}>
            Experience
          </p>
          <p className="mt-0.5 text-[11.5px]" style={{ color: 'var(--os-text-3)' }}>
            {EXPERIENCE.length} roles · {active} current or incoming
          </p>
        </div>
        <span className="text-[11px]" style={{ color: 'var(--os-text-3)' }}>
          Updated {PROFILE.lastUpdated}
        </span>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5">
        <div className="flex flex-col gap-5">
          <SectionBlock
            title="Process Table"
            description="Compact role index for quick scanning. Select a row to emphasize its detailed card below."
          >
            <SurfacePanel className="px-0 py-0 overflow-hidden">
              <div
                className="grid px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                style={{
                  gridTemplateColumns: '56px minmax(0,1.25fr) minmax(0,1fr) 96px',
                  color: 'var(--os-text-3)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <span>PID</span>
                <span>Role</span>
                <span>Organization</span>
                <span>Status</span>
              </div>

              <div className="flex flex-col">
                {EXPERIENCE.map((entry, index) => {
                  const status = STATUS[entry.status] ?? STATUS.Completed;
                  const isSelected = entry.pid === selectedPid;

                  return (
                    <button
                      key={entry.pid}
                      type="button"
                      onClick={() => setSelectedPid(entry.pid)}
                      className="grid w-full px-4 py-3 text-left transition-colors"
                      style={{
                        gridTemplateColumns: '56px minmax(0,1.25fr) minmax(0,1fr) 96px',
                        borderBottom:
                          index === EXPERIENCE.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                        background: isSelected
                          ? 'rgba(79,142,247,0.12)'
                          : index % 2 === 0
                            ? 'transparent'
                            : 'rgba(255,255,255,0.015)',
                      }}
                    >
                      <span className="font-mono text-[11.5px]" style={{ color: 'var(--os-text-3)' }}>
                        {entry.pid}
                      </span>
                      <div className="min-w-0 pr-4">
                        <p className="truncate text-[13px] font-medium" style={{ color: 'var(--os-text)' }}>
                          {entry.role}
                        </p>
                        <p className="mt-0.5 truncate text-[11.5px]" style={{ color: 'var(--os-text-3)' }}>
                          {entry.period}
                        </p>
                      </div>
                      <p className="truncate pr-4 text-[12.5px]" style={{ color: 'var(--os-text-2)' }}>
                        {entry.organization}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: status.dot }} />
                        <span className="text-[12px]" style={{ color: status.dot }}>
                          {status.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </SurfacePanel>
          </SectionBlock>

          {EXPERIENCE.map((entry) => {
            const status = STATUS[entry.status] ?? STATUS.Completed;
            const isSelected = entry.pid === selectedPid;

            return (
              <SurfacePanel
                key={entry.pid}
                className="transition-colors"
                styleOverride={{
                  borderColor: isSelected ? 'rgba(79,142,247,0.3)' : 'rgba(255,255,255,0.08)',
                  background: isSelected ? 'rgba(79,142,247,0.045)' : 'rgba(255,255,255,0.03)',
                  boxShadow: isSelected ? '0 0 0 1px rgba(79,142,247,0.08) inset' : 'none',
                }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-[16px] font-semibold" style={{ color: 'var(--os-text)' }}>
                          {entry.role}
                        </h2>
                        <span
                          className="inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11.5px]"
                          style={{
                            borderColor: `${status.dot}2e`,
                            background: `${status.dot}12`,
                            color: status.dot,
                          }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: status.dot }} />
                          {status.label}
                        </span>
                      </div>
                      <p className="mt-1 text-[13px]" style={{ color: 'var(--os-text-2)' }}>
                        {entry.organization}
                        {entry.location ? ` · ${entry.location}` : ''}
                      </p>
                    </div>
                    <span className="text-[12px]" style={{ color: 'var(--os-text-3)' }}>
                      {entry.period}
                    </span>
                  </div>

                  <SectionBlock title="Focus">
                    <BodyText>{entry.focus}</BodyText>
                  </SectionBlock>

                  {entry.highlights && entry.highlights.length > 0 ? (
                    <SectionBlock title="Highlights">
                      <BulletList items={entry.highlights} accent={status.dot} />
                    </SectionBlock>
                  ) : null}
                </div>
              </SurfacePanel>
            );
          })}
        </div>
      </div>
    </div>
  );
}
