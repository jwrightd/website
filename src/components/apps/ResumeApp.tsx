'use client';

import { Download } from 'lucide-react';
import { SKILLS } from '@/data/skills';
import { EXPERIENCE } from '@/data/experience';

export default function ResumeApp() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-5 h-10 shrink-0"
        style={{ borderBottom: '1px solid var(--os-border)', background: 'rgba(255,255,255,0.015)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold" style={{ color: 'var(--os-text-2)' }}>resume.pdf</span>
          <span className="text-[10.5px] font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(50,215,75,0.12)', color: '#32d74b', border: '1px solid rgba(50,215,75,0.2)' }}>
            Preview
          </span>
        </div>
        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: '#32d74b', color: '#000' }}
        >
          <Download size={12} strokeWidth={2.5} />
          Download
        </a>
      </div>

      {/* Document body */}
      <div className="flex-1 overflow-auto px-8 py-6 flex flex-col gap-5">
        {/* Document header */}
        <div className="pb-4" style={{ borderBottom: '1px solid var(--os-border)' }}>
          <h2 className="text-[20px] font-bold" style={{ color: 'var(--os-text)' }}>James Wright</h2>
          <p className="text-[12.5px] mt-0.5" style={{ color: 'var(--os-text-2)' }}>
            CS + Mathematics · Duke University · Durham, NC
          </p>
        </div>

        <DocSection title="Education">
          <DocEntry
            title="Duke University"
            subtitle="B.S. Computer Science + Mathematics"
            right="Expected May 2027"
          />
        </DocSection>

        <DocSection title="Experience">
          {EXPERIENCE.map((e) => (
            <DocEntry key={e.pid} title={e.role} subtitle={e.organization} right={e.period} />
          ))}
        </DocSection>

        <DocSection title="Skills">
          <div className="flex flex-col gap-2.5">
            {SKILLS.map((s) => (
              <div key={s.category} className="flex gap-4 items-start">
                <span
                  className="text-[11.5px] w-20 shrink-0 pt-0.5"
                  style={{ color: 'var(--os-text-3)' }}
                >
                  {s.category}
                </span>
                <p className="text-[12.5px] leading-relaxed" style={{ color: 'var(--os-text-2)' }}>
                  {s.items.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </DocSection>

        <p className="text-[11px] text-center mt-2 pb-2" style={{ color: 'var(--os-text-3)' }}>
          Place your actual resume at <span className="font-mono" style={{ color: 'var(--os-text-2)' }}>public/resume.pdf</span>
        </p>
      </div>
    </div>
  );
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#32d74b' }}>{title}</span>
        <div className="flex-1 h-px" style={{ background: 'rgba(50,215,75,0.2)' }} />
      </div>
      {children}
    </div>
  );
}

function DocEntry({ title, subtitle, right }: { title: string; subtitle?: string; right: string }) {
  return (
    <div className="flex justify-between items-start mb-3 last:mb-0">
      <div>
        <p className="text-[13.5px] font-semibold" style={{ color: 'var(--os-text)' }}>{title}</p>
        {subtitle && <p className="text-[12px] mt-0.5" style={{ color: 'var(--os-text-2)' }}>{subtitle}</p>}
      </div>
      <span className="text-[11.5px] shrink-0 ml-4 mt-0.5" style={{ color: 'var(--os-text-3)' }}>{right}</span>
    </div>
  );
}
