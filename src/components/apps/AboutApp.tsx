'use client';

import { FileText, FolderOpen, Mail, ArrowRight } from 'lucide-react';
import type { AppId } from '@/types';

interface AboutAppProps {
  onOpen: (id: AppId) => void;
}

const INTERESTS = [
  'Machine Learning', 'Systems', 'Data Science',
  'Quantitative Finance', 'Chess', 'Scientific Computing', 'Cybersecurity',
];

export default function AboutApp({ onOpen }: AboutAppProps) {
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
            <h1 className="text-[16px] font-bold" style={{ color: 'var(--os-text)' }}>James Wright</h1>
            <p className="text-[12px] mt-0.5" style={{ color: 'var(--os-accent)' }}>
              CS + Mathematics · Duke University
            </p>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="flex-1 overflow-auto px-6 py-5 flex flex-col gap-4">
        <p className="text-[13.5px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.62)' }}>
          I build at the intersection of{' '}
          <span style={{ color: '#4f8ef7' }} className="font-medium">machine learning</span>,{' '}
          <span style={{ color: '#a78bfa' }} className="font-medium">systems</span>, and{' '}
          <span style={{ color: '#22d3ee' }} className="font-medium">data science</span>. Whether it&apos;s a
          spatial proteomics pipeline, a multimodal Alzheimer&apos;s model, or a voice-first
          language app — I care about work that ships and does something real.
        </p>

        <p className="text-[13px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.44)' }}>
          Outside of research and engineering I play chess competitively, think about quantitative
          systems, and try to ship useful products.
        </p>

        {/* Interest chips */}
        <div className="flex flex-wrap gap-1.5">
          {INTERESTS.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded text-[11.5px]"
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
      </div>

      {/* CTA footer */}
      <div
        className="px-6 py-4 shrink-0"
        style={{ borderTop: '1px solid var(--os-border)' }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-2.5" style={{ color: 'var(--os-text-3)' }}>
          Quick access
        </p>
        <div className="grid grid-cols-3 gap-2">
          {([
            { id: 'resume'   as AppId, icon: FileText,   label: 'Resume',   color: '#32d74b' },
            { id: 'projects' as AppId, icon: FolderOpen, label: 'Projects', color: '#a78bfa' },
            { id: 'contact'  as AppId, icon: Mail,       label: 'Contact',  color: '#f472b6' },
          ] as const).map(({ id, icon: Icon, label, color }) => (
            <button
              key={id}
              onClick={() => onOpen(id)}
              className="group flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12.5px] font-medium transition-all"
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
