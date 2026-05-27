'use client';

import Image from 'next/image';
import { ArrowRight, FileText, FolderOpen, Mail, MonitorSmartphone } from 'lucide-react';
import { JAMES_OS_README, PROFILE } from '@/data/profile';
import type { AppId } from '@/types';
import { BodyText, LeadText, SectionBlock, SurfacePanel, TagList } from './shared/AppContent';

interface AboutAppProps {
  onOpen: (id: AppId) => void;
  onOpenWorkspace: () => void;
}

export default function AboutApp({ onOpen, onOpenWorkspace }: AboutAppProps) {
  const quickLinks = [
    { id: 'resume' as AppId, icon: FileText, label: 'Resume', color: '#32d74b' },
    { id: 'projects' as AppId, icon: FolderOpen, label: 'Projects', color: '#a78bfa' },
    { id: 'contact' as AppId, icon: Mail, label: 'Contact', color: '#f472b6' },
  ] as const;

  return (
    <div className="flex flex-col h-full">
      <div
        className="px-6 pt-5 pb-4 shrink-0"
        style={{ borderBottom: '1px solid var(--os-border)' }}
      >
        <div className="flex items-center gap-3.5">
          <div
            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border"
            style={{
              borderColor: 'rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.24)',
            }}
          >
            <Image
              src={PROFILE.profilePhotoSrc}
              alt={PROFILE.profilePhotoAlt}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-[16px] font-bold" style={{ color: 'var(--os-text)' }}>{PROFILE.name}</h1>
            <p className="mt-0.5 text-[12.5px]" style={{ color: 'var(--os-accent)' }}>
              {PROFILE.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5 flex flex-col gap-4">
        <LeadText>{PROFILE.aboutSummary}</LeadText>

        <SectionBlock title="Overview">
          <BodyText>{PROFILE.aboutSecondary}</BodyText>
        </SectionBlock>

        <SectionBlock title={JAMES_OS_README.label} description="This site is itself a small interactive portfolio system.">
          <SurfacePanel>
            <div className="flex flex-col gap-3">
              <BodyText>{JAMES_OS_README.summary}</BodyText>
              <BodyText>{JAMES_OS_README.description}</BodyText>
              <TagList items={JAMES_OS_README.stack} />
            </div>
          </SurfacePanel>
        </SectionBlock>
      </div>

      <div
        className="px-6 py-4 shrink-0"
        style={{ borderTop: '1px solid var(--os-border)' }}
      >
        <p className="mb-2.5 text-[12px] font-medium" style={{ color: 'var(--os-text-2)' }}>
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
          {quickLinks.map(({ id, icon: Icon, label, color }) => (
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
