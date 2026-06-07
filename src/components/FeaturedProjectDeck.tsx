'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState, type CSSProperties } from 'react';
import { getProjectProofTone } from '@/lib/badges';
import type { Project } from '@/types';
import { ProjectMediaSurface } from './ProjectMediaCard';

interface FeaturedProjectDeckProps {
  projects: Project[];
}

export default function FeaturedProjectDeck({ projects }: FeaturedProjectDeckProps) {
  const featured = useMemo(() => {
    const selected = projects.filter((project) => project.featured);
    return (selected.length > 0 ? selected : projects).slice(0, 4);
  }, [projects]);
  const [activeId, setActiveId] = useState(featured[0]?.id);
  const prefersReducedMotion = useReducedMotion();
  const active = featured.find((project) => project.id === activeId) ?? featured[0];
  const tone = getProjectProofTone(active.proofTone);

  if (!active) return null;

  return (
    <div className="featured-project-deck rounded-xl border px-4 py-4 md:px-5 md:py-5">
      <div className="grid gap-5 lg:grid-cols-[0.84fr_1.16fr] lg:items-stretch">
        <div>
          <p className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.36)' }}>
            selected project deck
          </p>
          <div className="mt-3 grid gap-2">
            {featured.map((project, index) => {
              const selected = project.id === active.id;
              const projectTone = getProjectProofTone(project.proofTone);

              return (
                <motion.button
                  key={project.id}
                  type="button"
                  onPointerEnter={() => setActiveId(project.id)}
                  onFocus={() => setActiveId(project.id)}
                  onClick={() => setActiveId(project.id)}
                  aria-pressed={selected}
                  data-active={selected ? 'true' : 'false'}
                  className="featured-project-selector rounded-lg border px-3 py-3 text-left"
                  style={{ '--project-accent': projectTone.border } as CSSProperties}
                  initial={false}
                  whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                  whileFocus={prefersReducedMotion ? undefined : { x: 2 }}
                  transition={{ duration: 0.14 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.34)' }}>
                      0{index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.84)' }}>
                        {project.name}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-[12px] leading-[1.45]" style={{ color: 'rgba(255,255,255,0.46)' }}>
                        {project.proof}
                      </span>
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={active.id}
          className="featured-project-stage relative overflow-hidden rounded-xl border"
          style={{ '--project-accent': tone.border } as CSSProperties}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10, rotateX: 4, rotateY: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
          whileHover={prefersReducedMotion ? undefined : { y: -3, rotateX: 3, rotateY: -4 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="featured-project-glow" aria-hidden="true" />
          <ProjectMediaSurface project={active} sizes="(max-width: 1024px) 100vw, 620px" priority />
          <div className="px-4 py-4 md:px-5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-md border px-2 py-1 text-[11px] font-semibold"
                style={{ color: tone.fg, background: tone.bg, borderColor: tone.border }}
              >
                {active.proof}
              </span>
              <span className="text-[11.5px]" style={{ color: 'rgba(255,255,255,0.36)' }}>
                {active.category}
              </span>
            </div>
            <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em]" style={{ color: 'rgba(255,255,255,0.92)' }}>
              {active.name}
            </h3>
            <p className="mt-2 text-[13.5px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.58)' }}>
              {active.outcome}
            </p>
            {active.links.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {active.links.slice(0, 3).map((link) => (
                  <a
                    key={`${active.id}-${link.href}`}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] font-semibold"
                    style={{ color: '#c7d9ff' }}
                  >
                    {link.label}
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
