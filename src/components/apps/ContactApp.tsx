'use client';

import { useState } from 'react';
import { ArrowUpRight, Briefcase, FileText, GitBranch, Mail, Copy, Check } from 'lucide-react';
import { CONTACT_METHODS, PROFILE } from '@/data/profile';
import type { ContactMethod } from '@/types';

const ICON_MAP = {
  Mail,
  GitBranch,
  Briefcase,
  FileText,
};

interface ContactAppProps {
  isMobile?: boolean;
}

export default function ContactApp({ isMobile = false }: ContactAppProps) {
  const [selectedId, setSelectedId] = useState<ContactMethod['id']>('email');
  const [copied, setCopied] = useState(false);
  const selected = CONTACT_METHODS.find((item) => item.id === selectedId) ?? CONTACT_METHODS[0];

  const handleCopy = async () => {
    if (!selected.copyValue) {
      return;
    }

    try {
      await navigator.clipboard.writeText(selected.copyValue);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  if (isMobile) {
    return (
      <div className="flex h-full flex-col overflow-auto">
        <div
          className="border-b px-4 py-4"
          style={{ borderColor: 'var(--os-border)', background: 'rgba(255,255,255,0.02)' }}
        >
          <p className="text-[15px] font-semibold" style={{ color: 'var(--os-text)' }}>
            Contact
          </p>
          <p className="mt-1 text-[12px]" style={{ color: 'var(--os-text-2)' }}>
            Resume, email, GitHub, and LinkedIn in one place.
          </p>
        </div>

        <div className="px-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            {CONTACT_METHODS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className="rounded-lg border px-3 py-3 text-left"
                style={{
                  borderColor: item.id === selected.id ? 'rgba(79,142,247,0.34)' : 'rgba(255,255,255,0.08)',
                  background: item.id === selected.id ? 'rgba(79,142,247,0.12)' : 'rgba(255,255,255,0.03)',
                }}
              >
                <p className="text-[13px] font-medium" style={{ color: 'var(--os-text)' }}>
                  {item.label}
                </p>
                <p className="mt-1 text-[11px]" style={{ color: 'var(--os-text-3)' }}>
                  {item.address}
                </p>
              </button>
            ))}
          </div>

          <ContactDetail selected={selected} copied={copied} onCopy={handleCopy} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">
      <div
        className="flex w-[170px] shrink-0 flex-col"
        style={{ background: 'var(--os-sidebar)', borderRight: '1px solid var(--os-border)' }}
      >
        <div className="px-3 pt-3 pb-2">
          <p className="px-2 text-[12px] font-medium" style={{ color: 'var(--os-text-2)' }}>
            Contact
          </p>
        </div>

        {CONTACT_METHODS.map((item) => {
          const Icon = ICON_MAP[item.iconName as keyof typeof ICON_MAP] ?? Mail;
          const isSelected = item.id === selected.id;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              data-active={isSelected ? 'true' : 'false'}
              className="os-sidebar-tab mx-2 mb-1 w-auto rounded-[10px] px-4 py-3 text-left"
              style={{
                background: isSelected ? 'rgba(79,142,247,0.12)' : undefined,
                borderColor: isSelected ? 'rgba(79,142,247,0.18)' : undefined,
                boxShadow: isSelected
                  ? 'inset 2px 0 0 #4f8ef7, inset 0 1px 0 rgba(255,255,255,0.035), 0 0 0 1px rgba(255,255,255,0.02)'
                  : undefined,
              }}
            >
              <div className="flex items-center gap-2">
                <Icon size={13} style={{ color: isSelected ? item.dot : 'rgba(255,255,255,0.4)' }} />
                <span
                  className="text-[13px] font-medium"
                  style={{ color: isSelected ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.56)' }}
                >
                  {item.label}
                </span>
              </div>
              <p
                className="mt-1 pl-[21px] text-[11px] leading-[1.4] break-all"
                style={{ color: 'var(--os-text-3)' }}
              >
                {item.address}
              </p>
            </button>
          );
        })}

        <div className="flex-1" />
        <div
          className="px-4 py-2.5 text-[11px]"
          style={{ borderTop: '1px solid var(--os-border)', color: 'var(--os-text-3)' }}
        >
          {PROFILE.recruiterHeadline}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div
          className="px-5 py-3.5"
          style={{ borderBottom: '1px solid var(--os-border)', background: 'rgba(255,255,255,0.015)' }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[13px] font-medium" style={{ color: 'var(--os-text)' }}>
                {selected.subject}
              </p>
              <p
                className="mt-0.5 text-[11px] leading-[1.4] break-all"
                style={{ color: 'var(--os-text-3)' }}
              >
                {selected.address}
              </p>
            </div>
            <div className="h-2 w-2 rounded-full" style={{ background: selected.dot }} />
          </div>
        </div>

        <div className="flex-1 overflow-auto px-5 py-5">
          <ContactDetail selected={selected} copied={copied} onCopy={handleCopy} />
        </div>
      </div>
    </div>
  );
}

function ContactDetail({
  selected,
  copied,
  onCopy,
}: {
  selected: ContactMethod;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[14px] leading-[1.75]" style={{ color: 'var(--os-text-2)' }}>
        {selected.body}
      </p>

      <div
        className="rounded-lg border px-4 py-4"
        style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'var(--os-border)' }}
      >
        <p className="text-[11px]" style={{ color: 'var(--os-text-3)' }}>
          Address
        </p>
        <p className="mt-1 text-[13.5px] leading-[1.55] break-all" style={{ color: 'var(--os-text)' }}>
          {selected.address}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={selected.href}
          target={selected.href.startsWith('http') ? '_blank' : undefined}
          rel={selected.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-[13px] font-medium transition-colors hover:bg-white/6"
          style={{
            borderColor: 'rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)',
            color: 'rgba(255,255,255,0.78)',
          }}
        >
          <ArrowUpRight size={13} />
          {selected.actionLabel}
        </a>

        {selected.copyValue && (
          <button
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-[13px] font-medium transition-colors hover:bg-white/6"
            style={{
              borderColor: 'rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
        )}
      </div>
    </div>
  );
}
