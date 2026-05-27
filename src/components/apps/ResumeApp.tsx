'use client';

import { useState } from 'react';
import { Check, Copy, Download, ExternalLink } from 'lucide-react';
import { ACHIEVEMENTS } from '@/data/achievements';
import { EDUCATION } from '@/data/education';
import { EXPERIENCE } from '@/data/experience';
import { PROFILE } from '@/data/profile';
import { SKILLS } from '@/data/skills';
import { BulletList, LeadText, SectionBlock } from './shared/AppContent';

interface ResumeAppProps {
  isMobile?: boolean;
}

export default function ResumeApp({ isMobile = false }: ResumeAppProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div
        className="flex shrink-0 items-center justify-between gap-3 px-5"
        style={{ minHeight: 52, borderBottom: '1px solid var(--os-border)', background: 'rgba(255,255,255,0.015)' }}
      >
        <div className="min-w-0">
          <p className="truncate text-[12.5px] font-medium" style={{ color: 'var(--os-text-2)' }}>
            {PROFILE.resumeLabel}
          </p>
          <p className="mt-0.5 text-[10.5px]" style={{ color: 'var(--os-text-3)' }}>
            Last updated {PROFILE.lastUpdated}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <a
            href={PROFILE.resumeHref}
            download
            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors hover:bg-white/6"
            style={{
              borderColor: 'rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.78)',
            }}
          >
            <Download size={12} />
            Download Resume
          </a>
          <a
            href={PROFILE.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors hover:bg-white/6"
            style={{
              borderColor: 'rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.74)',
            }}
          >
            <ExternalLink size={12} />
            Open in New Tab
          </a>
          <button
            onClick={() => {
              void handleCopyEmail();
            }}
            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors hover:bg-white/6"
            style={{
              borderColor: 'rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.74)',
            }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy Email'}
          </button>
        </div>
      </div>

      <div className={`flex-1 overflow-auto ${isMobile ? 'px-5 py-5' : 'px-8 py-6'}`}>
        <div className="flex flex-col gap-5">
          <div className="border-b pb-4" style={{ borderColor: 'var(--os-border)' }}>
            <h2 className="text-[20px] font-semibold" style={{ color: 'var(--os-text)' }}>
              {PROFILE.name}
            </h2>
            <p className="mt-1 text-[13px]" style={{ color: 'var(--os-text-2)' }}>
              {PROFILE.subtitle} · {PROFILE.location}
            </p>
            <div className="mt-2 max-w-[72ch]">
              <LeadText>{PROFILE.aboutSummary}</LeadText>
            </div>
          </div>

          <SectionBlock title="Education">
            {EDUCATION.map((entry) => (
              <ResumeEntry
                key={entry.id}
                title={entry.institution}
                subtitle={`${entry.program} · ${entry.location}`}
                right={entry.period}
              />
            ))}
          </SectionBlock>

          <SectionBlock title="Experience">
            {EXPERIENCE.map((entry) => (
              <ResumeEntry
                key={entry.pid}
                title={entry.role}
                subtitle={entry.location ? `${entry.organization} · ${entry.location}` : entry.organization}
                right={entry.period}
                details={entry.highlights}
              />
            ))}
          </SectionBlock>

          <SectionBlock title="Skills">
            <div className="flex flex-col gap-3">
              {SKILLS.map((group) => (
                <div key={group.category} className={`${isMobile ? 'flex flex-col gap-1' : 'flex gap-4'}`}>
                  <span className="w-20 shrink-0 text-[12px]" style={{ color: 'var(--os-text-3)' }}>
                    {group.category}
                  </span>
                  <p className="text-[13.5px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.62)' }}>
                    {group.items.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="Selected Recognition">
            <div className="flex flex-col gap-3">
              {ACHIEVEMENTS.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <span className="w-24 shrink-0 text-[12px]" style={{ color: 'var(--os-text-3)' }}>
                    {item.label}
                  </span>
                  <p className="text-[13.5px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.62)' }}>
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </SectionBlock>
        </div>
      </div>
    </div>
  );
}

function ResumeEntry({
  title,
  subtitle,
  right,
  details,
}: {
  title: string;
  subtitle?: string;
  right: string;
  details?: string[];
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b py-3 last:border-b-0 last:pb-0 first:pt-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div>
        <p className="text-[14px] font-medium" style={{ color: 'var(--os-text)' }}>
          {title}
        </p>
        {subtitle && (
          <p className="mt-0.5 text-[12.5px]" style={{ color: 'var(--os-text-2)' }}>
            {subtitle}
          </p>
        )}
        {details && details.length > 0 && (
          <div className="mt-2">
            <BulletList items={details} accent="rgba(255,255,255,0.35)" />
          </div>
        )}
      </div>
      <span className="shrink-0 text-[11.5px]" style={{ color: 'var(--os-text-3)' }}>
        {right}
      </span>
    </div>
  );
}
