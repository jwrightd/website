'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
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
  const media = project.media?.[0];
  const isVideo = media?.type === 'video';

  return (
    <div className={`project-media-surface relative aspect-[16/10] overflow-hidden ${className ?? ''}`}>
      {media ? (
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
              className="object-cover opacity-90"
            />
          )}
        </>
      ) : (
        <div className="project-media-placeholder flex h-full flex-col justify-between p-4">
          <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.34)' }}>
            /projects/{project.id}
          </span>
          <div>
            <p className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.72)' }}>
              Visual slot ready
            </p>
            <p className="mt-1 text-[11.5px] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Add a screenshot or short loop to make this project feel as tactile as the shipped work.
            </p>
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />
    </div>
  );
}

export default function ProjectMediaCard({
  project,
  onPreviewEnter,
  onPreviewMove,
  onPreviewLeave,
}: ProjectMediaCardProps) {
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
          {project.name}
        </h3>
        <p className="mt-2 text-[13px] font-medium leading-[1.6]" style={{ color: 'rgba(255,255,255,0.66)' }}>
          {project.outcome}
        </p>
        <p className="mt-2 line-clamp-3 text-[12.5px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.46)' }}>
          {project.summary}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
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

        {project.links.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-3 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
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
        ) : null}
      </div>
    </motion.article>
  );
}
