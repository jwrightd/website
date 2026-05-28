'use client';

import { useState } from 'react';
import { ArrowUpRight, Trophy } from 'lucide-react';
import { PERSONAL_INTERESTS } from '@/data/interests';
import type { PersonalInterest } from '@/types';
import { BodyText, BulletList, LeadText, MetaGrid, MetaTile, SectionBlock } from './shared/AppContent';

const INTERESTS_ACCENT = '#f59e0b';

export default function InterestsApp() {
  const [selectedId, setSelectedId] = useState(PERSONAL_INTERESTS[0].id);
  const selected = PERSONAL_INTERESTS.find((item) => item.id === selectedId) ?? PERSONAL_INTERESTS[0];

  return (
    <div className="flex h-full overflow-hidden">
      <div
        className="flex w-[204px] shrink-0 flex-col"
        style={{ background: 'var(--os-sidebar)', borderRight: '1px solid var(--os-border)' }}
      >
        <div className="px-3 pt-3 pb-2">
          <p className="px-2 text-[12px] font-medium" style={{ color: 'var(--os-text-2)' }}>
            Interests
          </p>
        </div>

        {PERSONAL_INTERESTS.map((item) => {
          const isSelected = item.id === selected.id;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              data-active={isSelected ? 'true' : 'false'}
              className="os-sidebar-tab mx-2 mb-1 w-auto rounded-[10px] px-4 py-3.5 text-left"
              style={{
                background: isSelected ? 'rgba(245,158,11,0.1)' : undefined,
                borderColor: isSelected ? 'rgba(245,158,11,0.18)' : undefined,
                boxShadow: isSelected
                  ? `inset 2px 0 0 ${INTERESTS_ACCENT}, inset 0 1px 0 rgba(255,255,255,0.035), 0 0 0 1px rgba(255,255,255,0.02)`
                  : undefined,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: INTERESTS_ACCENT }} />
                <p
                  className="text-[13px] font-medium"
                  style={{ color: isSelected ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.62)' }}
                >
                  {item.name}
                </p>
              </div>
              <p className="mt-1 pl-[14px] text-[11.5px]" style={{ color: 'var(--os-text-3)' }}>
                {item.category}
              </p>
            </button>
          );
        })}

        <div className="flex-1" />
        <div
          className="px-4 py-2.5 text-[11px]"
          style={{ color: 'var(--os-text-3)', borderTop: '1px solid var(--os-border)' }}
        >
          {PERSONAL_INTERESTS.length} personal interest{PERSONAL_INTERESTS.length === 1 ? '' : 's'}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div
          className="flex h-8 items-center gap-2 px-4 text-[11px]"
          style={{
            borderBottom: '1px solid var(--os-border)',
            background: 'rgba(255,255,255,0.02)',
            color: 'var(--os-text-3)',
          }}
        >
          <span>Interests</span>
          <span>/</span>
          <span style={{ color: 'var(--os-text-2)' }}>{selected.name}</span>
        </div>

        <InterestDetail interest={selected} />

        <div
          className="flex h-7 items-center justify-between px-4 text-[10.5px]"
          style={{
            borderTop: '1px solid var(--os-border)',
            color: 'var(--os-text-3)',
            background: 'rgba(255,255,255,0.01)',
          }}
        >
          <span>{selected.category}</span>
          <span>{selected.status}</span>
        </div>
      </div>
    </div>
  );
}

function InterestDetail({ interest }: { interest: PersonalInterest }) {
  return (
    <div className="flex-1 overflow-auto px-6 py-5">
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg border"
              style={{
                background: 'rgba(245,158,11,0.1)',
                borderColor: 'rgba(245,158,11,0.18)',
              }}
            >
              <Trophy size={17} style={{ color: INTERESTS_ACCENT }} />
            </div>
            <div>
              <h2 className="text-[20px] font-semibold" style={{ color: 'var(--os-text)' }}>
                {interest.name}
              </h2>
              <p className="mt-0.5 text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {interest.category}
              </p>
            </div>
          </div>
          {interest.summary && (
            <div className="mt-3 max-w-[68ch]">
              <LeadText>{interest.summary}</LeadText>
            </div>
          )}
        </div>

        <MetaGrid>
          <MetaTile label="Category" value={interest.category} />
          <MetaTile label="Status" value={interest.status} accent={INTERESTS_ACCENT} />
        </MetaGrid>

        <SectionBlock title="Overview">
          <BodyText>{interest.overview}</BodyText>
        </SectionBlock>

        <SectionBlock title="Recognition">
          <BulletList items={interest.recognition} accent={INTERESTS_ACCENT} />
        </SectionBlock>

        {interest.notes && interest.notes.length > 0 && (
          <SectionBlock title="Notes">
            <BulletList items={interest.notes} accent="rgba(255,255,255,0.34)" />
          </SectionBlock>
        )}

        {interest.links && interest.links.length > 0 && (
          <SectionBlock title="Links">
            <div className="flex flex-wrap gap-2">
              {interest.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-[12.5px] font-medium transition-colors hover:bg-white/6"
                  style={{
                    borderColor: 'rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.74)',
                  }}
                >
                  <ArrowUpRight size={13} />
                  {link.label}
                </a>
              ))}
            </div>
          </SectionBlock>
        )}
      </div>
    </div>
  );
}
