'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ACHIEVEMENTS } from '@/data/achievements';
import { EXPERIENCE } from '@/data/experience';
import { JAMES_OS_README, PROFILE } from '@/data/profile';
import { SKILLS } from '@/data/skills';
import { BodyText, KeyValueRows, SectionBlock, SurfacePanel, TagList } from './shared/AppContent';

const SECTIONS = ['System', 'Stack', 'Skills', 'README'] as const;
type Section = typeof SECTIONS[number];

const SYSTEM_INFO = [
  { label: 'Name', value: PROFILE.name },
  { label: 'OS', value: 'JamesOS v1.0' },
  { label: 'Major', value: 'Mathematics and Computer Science' },
  { label: 'Institution', value: 'Duke University' },
  { label: 'GPA', value: '4.0' },
  { label: 'Current', value: PROFILE.recruiterHeadline },
  { label: 'Focus', value: PROFILE.currentFocus },
  { label: 'Resume', value: `Updated ${PROFILE.lastUpdated}` },
] as const;

export default function SystemInfoApp() {
  const [active, setActive] = useState<Section>('System');

  return (
    <div className="flex h-full overflow-hidden">
      <div
        className="w-[148px] shrink-0 flex flex-col"
        style={{ background: 'var(--os-sidebar)', borderRight: '1px solid var(--os-border)' }}
      >
        <div className="px-3 pt-3 pb-2">
          <p className="px-2 text-[12px] font-medium" style={{ color: 'var(--os-text-2)' }}>
            JamesOS
          </p>
        </div>

        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            data-active={active === s ? 'true' : 'false'}
            className="os-sidebar-tab mx-2 mb-1 w-auto rounded-[10px] px-5 py-2.5 text-left text-[13.5px] font-medium"
            style={{
              background: active === s ? 'rgba(79,142,247,0.12)' : undefined,
              borderColor: active === s ? 'rgba(79,142,247,0.18)' : undefined,
              boxShadow: active === s
                ? 'inset 2px 0 0 #4f8ef7, inset 0 1px 0 rgba(255,255,255,0.035), 0 0 0 1px rgba(255,255,255,0.02)'
                : undefined,
              color: active === s ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.48)',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div
          className="flex items-center gap-4 px-6 py-4 shrink-0"
          style={{ borderBottom: '1px solid var(--os-border)' }}
        >
          <div
            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border"
            style={{
              borderColor: 'rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            <Image
              src="/logo.png"
              alt="JamesOS logo"
              fill
              sizes="48px"
              className="object-cover"
            />
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
          {active === 'README' && <ReadmeSection />}
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
    <SurfacePanel>
      <KeyValueRows rows={SYSTEM_INFO} />
    </SurfacePanel>
  );
}

function StackSection() {
  const allSkills = SKILLS.flatMap((s) => s.items);
  return (
    <div className="flex flex-col gap-4">
      {SKILLS.map((s) => (
        <SectionBlock key={s.category} title={s.category}>
          <TagList items={s.items} />
        </SectionBlock>
      ))}
      <p className="text-[11px] mt-1" style={{ color: 'var(--os-text-3)' }}>
        {allSkills.length} toolchain entries indexed
      </p>
    </div>
  );
}

function SkillsSection() {
  const groups = [
    {
      label: 'Current Roles',
      items: EXPERIENCE.map((item) => `${item.role} · ${item.organization}`),
    },
    {
      label: 'Recognition',
      items: ACHIEVEMENTS.map((item) => `${item.label} — ${item.detail}`),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {groups.map((group) => (
        <SectionBlock key={group.label} title={group.label}>
          <TagList items={group.items} />
        </SectionBlock>
      ))}
    </div>
  );
}

function ReadmeSection() {
  return (
    <div className="flex flex-col gap-5">
      <SurfacePanel>
        <div className="flex flex-col gap-3">
          <p className="text-[13.5px] font-medium" style={{ color: 'var(--os-text)' }}>
            {JAMES_OS_README.label}
          </p>
          <BodyText>{JAMES_OS_README.summary}</BodyText>
          <BodyText>{JAMES_OS_README.description}</BodyText>
        </div>
      </SurfacePanel>

      <SectionBlock title="Stack">
        <TagList items={JAMES_OS_README.stack} />
      </SectionBlock>
    </div>
  );
}
