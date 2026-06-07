'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import {
  LENS_OPTIONS,
  type AudienceLens,
} from '@/data/highlights';

const PATH_STEPS = [
  { label: 'Resume', href: '#resume' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

const LENS_HIGHLIGHTS: Record<AudienceLens, string[]> = {
  systems: [
    'Saynario — shipped voice product with demo video and public repo',
    '1,000+ ICD-10 codes mapped with an AI pipeline on DIIG’s 15M+ row dataset',
    'Code+ summer SWE — LLM honeypot and threat analysis tooling on STINGAR',
    'DataCrawl — multi-agent financial dataset pipeline',
  ],
  quant: [
    'MINGL — GMM-based spatial proteomics package, bioRxiv co-author',
    'ADNI Neural CDE forecasting on irregular longitudinal clinical + MRI data',
    '4.0 GPA in Mathematics + Computer Science at Duke',
    'USCF Candidate Master · Top 100 Lichess rapid',
  ],
};

export default function SimpleRecruiterBrief() {
  const [lens, setLens] = useState<AudienceLens>('systems');
  const prefersReducedMotion = useReducedMotion();
  const activeOption = LENS_OPTIONS.find((option) => option.id === lens) ?? LENS_OPTIONS[0];

  return (
    <div className="simple-recruiter-brief rounded-xl border px-4 py-4 sm:px-5 sm:py-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <h3 className="text-[15px] font-semibold tracking-[-0.01em]" style={{ color: 'rgba(255,255,255,0.88)' }}>
            Highlights by focus
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {PATH_STEPS.map((step, index) => (
              <a
                key={step.href}
                href={step.href}
                className="simple-path-step inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[12.5px] font-medium"
              >
                <span style={{ color: 'rgba(255,255,255,0.86)' }}>{step.label}</span>
                {index < PATH_STEPS.length - 1 ? <ArrowRight size={12} aria-hidden="true" /> : null}
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-xl border p-1" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(8,10,14,0.38)' }}>
          <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
            {LENS_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setLens(option.id)}
                aria-pressed={lens === option.id}
                className="simple-lens-button rounded-lg px-3 py-2 text-left"
                data-active={lens === option.id ? 'true' : 'false'}
              >
                <span className="block text-[12.5px] font-semibold">{option.label}</span>
                <span className="mt-0.5 block text-[11px] leading-[1.35]">{option.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        key={lens}
        className="mt-5 grid gap-3 border-t pt-4 md:grid-cols-[0.34fr_1fr]"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <p className="text-[12px] font-semibold" style={{ color: 'rgba(255,255,255,0.78)' }}>
            {activeOption.label}
          </p>
          <p className="mt-1 text-[12px] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.42)' }}>
            {activeOption.description}
          </p>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {LENS_HIGHLIGHTS[lens].map((note) => (
            <li
              key={note}
              className="rounded-lg border px-3 py-2.5 text-[13px] leading-[1.6]"
              style={{
                borderColor: 'rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.025)',
                color: 'rgba(255,255,255,0.58)',
              }}
            >
              {note}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
