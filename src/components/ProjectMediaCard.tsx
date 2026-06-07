'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type CSSProperties, type MouseEventHandler } from 'react';
import { getProjectProofTone } from '@/lib/badges';
import type { Project } from '@/types';

interface ProjectMediaSurfaceProps {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}

interface ProjectMediaCardProps {
  project: Project;
  expandable?: boolean;
  onPreviewEnter?: MouseEventHandler<HTMLElement>;
  onPreviewMove?: MouseEventHandler<HTMLElement>;
  onPreviewLeave?: MouseEventHandler<HTMLElement>;
}

export function ProjectMediaSurface({
  project,
  sizes,
  priority = false,
  className,
}: ProjectMediaSurfaceProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const media = project.media?.[0];
  const isVideo = media?.type === 'video';
  const showFallback = !media || failed;

  return (
    <div className={`project-media-surface relative aspect-[16/10] overflow-hidden ${className ?? ''}`}>
      {media && !failed ? (
        <>
          {!loaded ? <div className="project-media-skeleton absolute inset-0" /> : null}
          {isVideo ? (
            <video
              src={media.src}
              poster={media.poster}
              muted
              loop
              playsInline
              autoPlay
              onLoadedData={() => setLoaded(true)}
              onError={() => setFailed(true)}
              className="h-full w-full object-cover opacity-90"
            />
          ) : (
            <Image
              src={media.src}
              alt={media.alt}
              fill
              priority={priority}
              sizes={sizes}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              className="object-cover opacity-90"
            />
          )}
        </>
      ) : showFallback ? (
        <div
          className="project-media-placeholder flex h-full flex-col justify-end p-4"
          style={{
            background:
              'linear-gradient(145deg, rgba(79,142,247,0.14) 0%, rgba(255,255,255,0.03) 48%, rgba(15,15,17,0.92) 100%)',
          }}
        >
          <p className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.34)' }}>
            {project.category}
          </p>
          <p className="mt-2 text-[15px] font-semibold" style={{ color: 'rgba(255,255,255,0.78)' }}>
            {project.name}
          </p>
          <p className="mt-1 line-clamp-2 text-[11.5px] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.42)' }}>
            {project.proof}
          </p>
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />
    </div>
  );
}

export default function ProjectMediaCard({
  project,
  expandable = false,
  onPreviewEnter,
  onPreviewMove,
  onPreviewLeave,
}: ProjectMediaCardProps) {
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const tone = getProjectProofTone(project.proofTone);
  const badges = project.badges ?? [project.proof];

  return (
    <motion.article
      className="project-media-card overflow-hidden rounded-xl border"
      style={{ '--project-accent': tone.border } as CSSProperties}
      onMouseEnter={onPreviewEnter}
      onMouseMove={onPreviewMove}
      onMouseLeave={onPreviewLeave}
      initial={false}
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <ProjectMediaSurface project={project} sizes="(max-width: 768px) 100vw, 520px" />

      <div className="px-4 py-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {badges.map((badge) => (
            <span
              key={`${project.id}-${badge}`}
              className="project-proof-badge rounded-md border px-2 py-1 text-[10.5px] font-semibold"
              style={{ color: tone.fg, background: tone.bg, borderColor: tone.border }}
            >
              {badge}
            </span>
          ))}
        </div>

        <h3 className="mt-3 text-[16px] font-semibold" style={{ color: 'rgba(255,255,255,0.91)' }}>
          <Link href={`/projects/${project.id}`} className="transition-colors hover:text-white">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 text-[13px] font-medium leading-[1.6]" style={{ color: 'rgba(255,255,255,0.66)' }}>
          {project.outcome}
        </p>
        <p className="mt-2 line-clamp-3 text-[12.5px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.46)' }}>
          {project.summary}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {(expanded ? project.techStack : project.techStack.slice(0, 4)).map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="rounded-md border px-2 py-1 text-[11px]"
              style={{
                borderColor: 'rgba(255,255,255,0.075)',
                background: 'rgba(255,255,255,0.028)',
                color: 'rgba(255,255,255,0.48)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {expandable ? (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold"
              style={{ color: '#c7d9ff' }}
            >
              {expanded ? 'Hide case study' : 'Read case study'}
              <ChevronDown
                size={14}
                aria-hidden="true"
                style={{ transform: expanded ? 'rotate(180deg)' : undefined, transition: 'transform 150ms ease' }}
              />
            </button>
            {expanded ? (
              <div className="mt-3 flex flex-col gap-3 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {project.myContribution ? (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      My contribution
                    </p>
                    <p className="mt-1 text-[12.5px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.56)' }}>
                      {project.myContribution}
                    </p>
                  </div>
                ) : null}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    Problem
                  </p>
                  <p className="mt-1 text-[12.5px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.56)' }}>
                    {project.problem}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    Approach
                  </p>
                  <ul className="mt-1 flex flex-col gap-1.5">
                    {project.approach.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[12.5px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.56)' }}>
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--os-accent)' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    Result
                  </p>
                  <p className="mt-1 text-[12.5px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.56)' }}>
                    {project.result}
                  </p>
                </div>
                {project.media && project.media.length > 1 ? (
                  <div className="flex flex-col gap-3">
                    {project.media.slice(1).map((item) => (
                      <figure
                        key={item.src}
                        className="overflow-hidden rounded-lg border"
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                      >
                        <div className="relative aspect-[16/10]">
                          <Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 520px" className="object-cover" />
                        </div>
                        {item.caption ? (
                          <figcaption className="px-3 py-2 text-[11.5px] leading-[1.5]" style={{ color: 'rgba(255,255,255,0.44)' }}>
                            {item.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-3 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1 text-[12px] font-semibold"
            style={{ color: '#c7d9ff' }}
          >
            Full case study
            <ArrowUpRight size={12} aria-hidden="true" />
          </Link>
          {project.links.slice(0, 3).map((link) => (
              <a
                key={`${project.id}-${link.href}`}
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
      </div>
    </motion.article>
  );
}
