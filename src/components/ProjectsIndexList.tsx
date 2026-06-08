'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { trackProjectClick } from '@/lib/analytics';
import { getProjectProofTone } from '@/lib/badges';
import type { Project } from '@/types';

const cardStyle = {
  borderColor: 'rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
} as const;

interface ProjectsIndexListProps {
  projects: Project[];
}

export function ProjectsIndexList({ projects }: ProjectsIndexListProps) {
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
      {projects.map((project) => {
        const tone = getProjectProofTone(project.proofTone);
        return (
          <li key={project.id}>
            <Link
              href={`/projects/${project.id}`}
              onClick={() => trackProjectClick(project.id, 'index')}
              className="block rounded-xl border px-5 py-5 transition-colors hover:border-white/14"
              style={cardStyle}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-md border px-2 py-1 text-[10.5px] font-semibold"
                  style={{ color: tone.fg, background: tone.bg, borderColor: tone.border }}
                >
                  {project.proof}
                </span>
                <span className="text-[11.5px]" style={{ color: 'rgba(255,255,255,0.36)' }}>
                  {project.category}
                </span>
              </div>
              <h2 className="mt-3 text-[17px] font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {project.name}
              </h2>
              <p className="mt-2 text-[13px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.56)' }}>
                {project.outcome}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold" style={{ color: '#c7d9ff' }}>
                Read case study
                <ArrowUpRight size={12} aria-hidden="true" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
