'use client';

import { useState } from 'react';
import { ExternalLink, GitBranch, Link2 } from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { RESEARCH } from '@/data/research';
import type { ProjectLink, ResearchItem } from '@/types';
import { BodyText, LeadText, SectionBlock, TagList } from './shared/AppContent';

const RESEARCH_ACCENT = '#4f8ef7';

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
      <div
        className="w-[188px] shrink-0 flex flex-col overflow-y-auto"
        style={{ background: 'var(--os-sidebar)', borderRight: '1px solid var(--os-border)' }}
      >
        <div className="px-3 pt-3 pb-1.5">
          <p className="px-2 text-[12px] font-medium" style={{ color: 'var(--os-text-2)' }}>
            Research
          </p>
        </div>

        {RESEARCH.map((item, i) => {
          const isSelected = item.id === selectedId;
          const dot = STATUS_COLOR[item.status] ?? '#94a3b8';
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              data-active={isSelected ? 'true' : 'false'}
              className="os-sidebar-tab mx-2 mb-1 flex w-auto items-start gap-2.5 rounded-[10px] px-3 py-2.5 text-left"
              style={{
                background: isSelected ? 'rgba(79,142,247,0.12)' : undefined,
                borderColor: isSelected ? 'rgba(79,142,247,0.18)' : undefined,
                boxShadow: isSelected
                  ? 'inset 2px 0 0 #4f8ef7, inset 0 1px 0 rgba(255,255,255,0.035), 0 0 0 1px rgba(255,255,255,0.02)'
                  : undefined,
              }}
            >
              <span className="text-[10px] font-mono mt-0.5 shrink-0" style={{ color: 'var(--os-text-3)' }}>
                [{String(i + 1).padStart(2, '0')}]
              </span>
              <div className="min-w-0">
                <div className="mb-0.5 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
                  <span className="text-[10.5px]" style={{ color: 'var(--os-text-3)' }}>{item.status}</span>
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
        <div
          className="flex items-center gap-1.5 px-4 h-8 shrink-0 text-[11px]"
          style={{ borderBottom: '1px solid var(--os-border)', background: 'rgba(255,255,255,0.015)', color: 'var(--os-text-3)' }}
        >
          <span>Research</span>
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
  return (
    <div className="flex-1 overflow-auto px-6 py-5 flex flex-col gap-5">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full" style={{ background: RESEARCH_ACCENT }} />
          <span className="text-[11px] font-medium" style={{ color: RESEARCH_ACCENT }}>{item.status}</span>
        </div>
        <h2 className="text-[17px] font-bold leading-snug" style={{ color: 'var(--os-text)' }}>
          {item.title}
        </h2>
      </div>

      <SectionBlock title="Question">
        <LeadText>&ldquo;{item.question}&rdquo;</LeadText>
      </SectionBlock>

      <SectionBlock title="Methods">
        <TagList items={item.methods} />
      </SectionBlock>

      <SectionBlock title="Why It Matters">
        <BodyText>{item.impact}</BodyText>
      </SectionBlock>

      {item.links && item.links.length > 0 ? (
        <SectionBlock title="Links">
          <div className="flex flex-wrap gap-2">
            {item.links.map((link) => (
              <ResearchLinkButton key={`${item.id}-${link.label}`} link={link} />
            ))}
          </div>
        </SectionBlock>
      ) : null}
    </div>
  );
}

function ResearchLinkButton({ link }: { link: ProjectLink }) {
  const Icon = link.kind === 'github' ? GitBranch : link.kind === 'live' ? Link2 : ExternalLink;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-white/6"
      style={{
        borderColor: 'rgba(255,255,255,0.09)',
        background: 'rgba(255,255,255,0.03)',
        color: 'rgba(255,255,255,0.68)',
      }}
    >
      <Icon size={12} />
      {link.label}
    </a>
  );
}
