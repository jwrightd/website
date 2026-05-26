'use client';

import { useState } from 'react';
import { Mail, GitBranch, Briefcase, FileText, ArrowUpRight } from 'lucide-react';

const CONTACTS = [
  {
    id: 'email',
    label: 'Email',
    address: 'your-email@duke.edu',
    href: 'mailto:your-email@duke.edu',
    icon: Mail,
    dot: '#4f8ef7',
    subject: 'New message',
    body: "Say hi — I'm open to research collaborations, internships, and interesting problems.",
  },
  {
    id: 'github',
    label: 'GitHub',
    address: 'github.com/yourusername',
    href: 'https://github.com/yourusername',
    icon: GitBranch,
    dot: '#94a3b8',
    subject: 'Source code',
    body: 'Browse my public repositories, open-source contributions, and project code.',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    address: 'linkedin.com/in/yourusername',
    href: 'https://linkedin.com/in/yourusername',
    icon: Briefcase,
    dot: '#22d3ee',
    subject: 'Professional profile',
    body: 'View my full work history, endorsements, and professional network.',
  },
  {
    id: 'resume',
    label: 'Resume',
    address: 'resume.pdf',
    href: '/resume.pdf',
    icon: FileText,
    dot: '#32d74b',
    subject: 'Curriculum Vitae',
    body: 'Download my full resume as a PDF — education, experience, projects, and skills.',
  },
];

export default function ContactApp() {
  const [selectedId, setSelectedId] = useState('email');
  const selected = CONTACTS.find((c) => c.id === selectedId) ?? CONTACTS[0];

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── Sidebar — mailbox list ────────────────── */}
      <div
        className="w-[148px] shrink-0 flex flex-col"
        style={{ background: 'var(--os-sidebar)', borderRight: '1px solid var(--os-border)' }}
      >
        <div className="px-3 pt-3 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest px-2" style={{ color: 'var(--os-text-3)' }}>
            Accounts
          </p>
        </div>

        {CONTACTS.map((c) => {
          const Icon = c.icon;
          const isSelected = c.id === selectedId;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors"
              style={{
                background: isSelected ? 'rgba(79,142,247,0.15)' : 'transparent',
                borderLeft: `2px solid ${isSelected ? '#4f8ef7' : 'transparent'}`,
              }}
            >
              <Icon size={13} strokeWidth={1.7} className="shrink-0" style={{ color: isSelected ? c.dot : 'rgba(255,255,255,0.4)' }} />
              <span
                className="text-[12.5px] font-medium"
                style={{ color: isSelected ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.50)' }}
              >
                {c.label}
              </span>
            </button>
          );
        })}

        <div className="flex-1" />
        <div
          className="px-4 py-2.5 text-[11px]"
          style={{ borderTop: '1px solid var(--os-border)', color: 'var(--os-text-3)' }}
        >
          {CONTACTS.length} channels
        </div>
      </div>

      {/* ── Message pane ─────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Message header */}
        <div
          className="px-5 py-3.5 shrink-0"
          style={{ borderBottom: '1px solid var(--os-border)', background: 'rgba(255,255,255,0.015)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11.5px] font-semibold" style={{ color: 'var(--os-text)' }}>{selected.subject}</p>
              <p className="text-[11px] mt-0.5 font-mono" style={{ color: 'var(--os-text-3)' }}>{selected.address}</p>
            </div>
            <div className="w-2 h-2 rounded-full" style={{ background: selected.dot }} />
          </div>
        </div>

        {/* Message body */}
        <div className="flex-1 overflow-auto px-5 py-5">
          <p className="text-[13.5px] leading-[1.75]" style={{ color: 'var(--os-text-2)' }}>
            {selected.body}
          </p>

          {selected.id === 'email' && (
            <div
              className="mt-5 p-4 rounded-lg text-[12.5px] leading-[1.7]"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--os-border)', color: 'var(--os-text-2)' }}
            >
              <strong style={{ color: 'var(--os-text)' }}>Open to:</strong><br />
              · Research collaborations in ML / data science<br />
              · Summer 2026 internships and SWE / ML roles<br />
              · Hackathons and interesting side projects
            </div>
          )}
        </div>

        {/* Action footer */}
        <div
          className="flex items-center gap-2 px-5 py-3 shrink-0"
          style={{ borderTop: '1px solid var(--os-border)' }}
        >
          <a
            href={selected.href}
            target={selected.href.startsWith('http') ? '_blank' : undefined}
            rel={selected.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12.5px] font-semibold transition-colors"
            style={{ background: '#4f8ef7', color: '#fff' }}
          >
            <ArrowUpRight size={13} />
            {selected.id === 'resume' ? 'Download' : `Open ${selected.label}`}
          </a>
          <p className="text-[10.5px] ml-1" style={{ color: 'var(--os-text-3)' }}>
            {selected.address}
          </p>
        </div>
      </div>
    </div>
  );
}
