'use client';

import { ArrowRight, FileText, FolderOpen, Mail, MonitorSmartphone } from 'lucide-react';
import { JAMES_OS_README, PROFILE } from '@/data/profile';
import type { AppId } from '@/types';

interface AboutAppProps {
  onOpen: (id: AppId) => void;
  onOpenWorkspace: () => void;
}

export default function AboutApp({ onOpen, onOpenWorkspace }: AboutAppProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="px-6 pt-5 pb-4 shrink-0"
        style={{ borderBottom: '1px solid var(--os-border)' }}
      >
        <div className="flex items-center gap-3.5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-[17px] font-black text-white shrink-0"
            style={{ background: 'linear-gradient(145deg,#2563eb,#6d28d9)', boxShadow: '0 4px 16px rgba(37,99,235,0.3)' }}
          >
            JW
          </div>
          <div>
            <h1 className="text-[16px] font-bold" style={{ color: 'var(--os-text)' }}>{PROFILE.name}</h1>
            <p className="mt-0.5 text-[12.5px]" style={{ color: 'var(--os-accent)' }}>
              {PROFILE.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="flex-1 overflow-auto px-6 py-5 flex flex-col gap-4">
        <p className="text-[14.5px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.62)' }}>
          {PROFILE.aboutSummary}
        </p>

        <p className="text-[13.5px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.44)' }}>
          {PROFILE.aboutSecondary}
        </p>

        {/* Interest chips */}
        <div className="flex flex-wrap gap-1.5">
          {PROFILE.interests.map((tag) => (
            <span
              key={tag}
              className="rounded px-2.5 py-0.5 text-[12px]"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--os-text-3)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="rounded-lg border px-4 py-4"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-[13px] font-medium" style={{ color: 'var(--os-text)' }}>
              {JAMES_OS_README.label}
            </p>
            <span className="text-[11px]" style={{ color: 'var(--os-text-3)' }}>
              Portfolio shell
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.75]" style={{ color: 'var(--os-text-2)' }}>
            {JAMES_OS_README.summary}
          </p>
          <p className="mt-2 text-[13px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.44)' }}>
            {JAMES_OS_README.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {JAMES_OS_README.stack.map((item) => (
              <span
                key={item}
                className="rounded-md border px-2 py-0.5 text-[12px]"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  color: 'var(--os-text-3)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA footer */}
      <div
        className="px-6 py-4 shrink-0"
        style={{ borderTop: '1px solid var(--os-border)' }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-2.5" style={{ color: 'var(--os-text-3)' }}>
          Quick access
        </p>
        <button
          onClick={onOpenWorkspace}
          className="mb-2 flex w-full items-center justify-between rounded-lg border px-3.5 py-2.5 text-left text-[13px] font-medium transition-colors hover:bg-white/6"
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderColor: 'rgba(255,255,255,0.09)',
            color: 'rgba(255,255,255,0.74)',
          }}
        >
          <span className="flex items-center gap-2">
            <MonitorSmartphone size={13} strokeWidth={1.8} />
            Open Workspace
          </span>
          <ArrowRight size={11} style={{ color: 'rgba(255,255,255,0.34)' }} />
        </button>
        <div className="grid grid-cols-3 gap-2">
          {([
            { id: 'resume'   as AppId, icon: FileText,   label: 'Resume',   color: '#32d74b' },
            { id: 'projects' as AppId, icon: FolderOpen, label: 'Projects', color: '#a78bfa' },
            { id: 'contact'  as AppId, icon: Mail,       label: 'Contact',  color: '#f472b6' },
          ] as const).map(({ id, icon: Icon, label, color }) => (
            <button
              key={id}
              onClick={() => onOpen(id)}
              className="group flex items-center justify-center gap-1.5 rounded-lg py-2 text-[13px] font-medium transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.55)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = 'rgba(255,255,255,0.08)';
                el.style.color = color;
                el.style.borderColor = `${color}30`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = 'rgba(255,255,255,0.04)';
                el.style.color = 'rgba(255,255,255,0.55)';
                el.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <Icon size={12} strokeWidth={1.8} />
              {label}
              <ArrowRight size={10} className="opacity-0 group-hover:opacity-60 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
