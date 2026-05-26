'use client';

import Image from 'next/image';
import { ExternalLink, FolderOpen, GitBranch, Link2 } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import type { Project, ProjectLink } from '@/types';

interface ProjectsAppProps {
  selectedId: string;
  onSelectProject: (id: string) => void;
  isMobile?: boolean;
}

export default function ProjectsApp({
  selectedId,
  onSelectProject,
  isMobile = false,
}: ProjectsAppProps) {
  const selected = PROJECTS.find((project) => project.id === selectedId) ?? PROJECTS[0];

  if (isMobile) {
    return (
      <div className="flex h-full flex-col overflow-auto">
        <div
          className="border-b px-4 py-4"
          style={{ borderColor: 'var(--os-border)', background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex items-center gap-2 text-[13px] font-medium" style={{ color: 'var(--os-text)' }}>
            <FolderOpen size={15} />
            Projects
          </div>
          <p className="mt-1 text-[12px]" style={{ color: 'var(--os-text-2)' }}>
            Open a project to review the problem, build details, and outcomes.
          </p>
        </div>

        <div className="border-b px-4 py-3" style={{ borderColor: 'var(--os-border)' }}>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {PROJECTS.map((project) => {
              const isSelected = project.id === selected.id;
              return (
                <button
                  key={project.id}
                  onClick={() => onSelectProject(project.id)}
                  className="min-w-[150px] rounded-lg border px-3 py-2 text-left"
                  style={{
                    borderColor: isSelected ? 'rgba(79,142,247,0.34)' : 'rgba(255,255,255,0.08)',
                    background: isSelected ? 'rgba(79,142,247,0.12)' : 'rgba(255,255,255,0.03)',
                  }}
                >
                  <p className="text-[12.5px] font-medium" style={{ color: 'var(--os-text)' }}>
                    {project.name}
                  </p>
                  <p className="mt-0.5 text-[11px]" style={{ color: 'var(--os-text-3)' }}>
                    {project.category}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <ProjectDetail project={selected} isMobile />
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">
      <div
        className="flex w-[222px] shrink-0 flex-col overflow-y-auto"
        style={{
          background: 'var(--os-sidebar)',
          borderRight: '1px solid var(--os-border)',
        }}
      >
        <div className="px-3 pt-3 pb-2">
          <p className="px-2 text-[12px] font-medium" style={{ color: 'var(--os-text-2)' }}>
            Projects
          </p>
        </div>

        {PROJECTS.map((project) => {
          const isSelected = selectedId === project.id;

          return (
            <button
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="w-full border-l-2 px-4 py-3 text-left transition-colors"
              style={{
                background: isSelected ? 'rgba(167,139,250,0.16)' : 'transparent',
                borderLeftColor: isSelected ? '#4f8ef7' : 'transparent',
              }}
            >
              <p
                className="text-[13px] font-medium"
                style={{ color: isSelected ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.62)' }}
              >
                {project.name}
              </p>
              <p className="mt-1 text-[11.5px]" style={{ color: 'var(--os-text-3)' }}>
                {project.category}
              </p>
              <p className="mt-1 line-clamp-2 text-[11.5px]" style={{ color: 'rgba(255,255,255,0.34)' }}>
                {project.summary}
              </p>
            </button>
          );
        })}

        <div className="flex-1" />
        <div
          className="px-4 py-2.5 text-[11px]"
          style={{ color: 'var(--os-text-3)', borderTop: '1px solid var(--os-border)' }}
        >
          {PROJECTS.length} projects indexed
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div
          className="flex h-8 items-center gap-2 px-4 text-[11px]"
          style={{ borderBottom: '1px solid var(--os-border)', background: 'rgba(255,255,255,0.02)', color: 'var(--os-text-3)' }}
        >
          <span>Projects</span>
          <span>/</span>
          <span style={{ color: 'var(--os-text-2)' }}>{selected.name}</span>
        </div>

        <ProjectDetail project={selected} />

        <div
          className="flex h-7 items-center justify-between px-4 text-[10.5px]"
          style={{ borderTop: '1px solid var(--os-border)', color: 'var(--os-text-3)', background: 'rgba(255,255,255,0.01)' }}
        >
          <span>{selected.category}</span>
          <span>{selected.status}</span>
        </div>
      </div>
    </div>
  );
}

function ProjectDetail({ project, isMobile = false }: { project: Project; isMobile?: boolean }) {
  return (
    <div className={`flex-1 overflow-auto ${isMobile ? 'px-4 py-4' : 'px-6 py-5'}`}>
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[20px] font-semibold" style={{ color: 'var(--os-text)' }}>
              {project.name}
            </h2>
            <span
              className="rounded-md border px-2 py-0.5 text-[11.5px]"
              style={{
                borderColor: 'rgba(167,139,250,0.18)',
                background: 'rgba(167,139,250,0.08)',
                color: 'rgba(201,183,255,0.92)',
              }}
            >
              {project.status}
            </span>
          </div>
          <p className="mt-2 text-[14px] leading-[1.75]" style={{ color: 'var(--os-text-2)' }}>
            {project.summary}
          </p>
        </div>

        <div className={`${isMobile ? 'grid grid-cols-1 gap-2' : 'grid grid-cols-2 gap-3'}`}>
          <MetaCard label="Category" value={project.category} />
          <MetaCard label="Status" value={project.status} />
        </div>

        <DetailSection title="Overview">
          <p className="text-[14px] leading-[1.75]" style={{ color: 'var(--os-text-2)' }}>
            {project.overview}
          </p>
        </DetailSection>

        <DetailSection title="Problem">
          <p className="text-[14px] leading-[1.75]" style={{ color: 'var(--os-text-2)' }}>
            {project.problem}
          </p>
        </DetailSection>

        <DetailSection title="Approach">
          <div className="flex flex-col gap-2">
            {project.approach.map((item) => (
              <p key={item} className="text-[14px] leading-[1.75]" style={{ color: 'var(--os-text-2)' }}>
                {item}
              </p>
            ))}
          </div>
        </DetailSection>

        <DetailSection title="Technical Challenge">
          <p className="text-[14px] leading-[1.75]" style={{ color: 'var(--os-text-2)' }}>
            {project.technicalChallenge}
          </p>
        </DetailSection>

        <DetailSection title="Result / Impact">
          <p className="text-[14px] leading-[1.75]" style={{ color: 'var(--os-text-2)' }}>
            {project.result}
          </p>
        </DetailSection>

        <DetailSection title="Tech Stack">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((item) => (
              <span
                key={item}
                className="rounded-md border px-2 py-1 text-[12px]"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.64)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </DetailSection>

        {project.media && project.media.length > 0 && (
          <DetailSection title="Images">
            <div className="grid gap-2">
              {project.media.map((item) => (
                <figure
                  key={`${project.id}-${item.alt}`}
                  className="overflow-hidden rounded-lg border"
                  style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <div
                    className="relative aspect-[16/9] w-full overflow-hidden border-b"
                    style={{
                      borderColor: 'rgba(255,255,255,0.08)',
                      background: 'rgba(8,11,20,0.92)',
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes={isMobile ? '100vw' : '(max-width: 1280px) 100vw, 720px'}
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="px-3 py-3">
                    <p className="text-[12.5px]" style={{ color: 'var(--os-text)' }}>
                      {item.alt}
                    </p>
                    {item.caption && (
                      <p className="mt-1 text-[12px]" style={{ color: 'var(--os-text-3)' }}>
                        {item.caption}
                      </p>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </DetailSection>
        )}

        <DetailSection title="Links">
          <div className="flex flex-wrap gap-2">
            {project.links.map((link) => (
              <ProjectLinkButton key={`${project.id}-${link.label}`} link={link} />
            ))}
          </div>
        </DetailSection>
      </div>
    </div>
  );
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-lg border px-3 py-3"
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
      }}
    >
      <p className="text-[11px]" style={{ color: 'var(--os-text-3)' }}>
        {label}
      </p>
      <p className="mt-1 text-[12.5px] leading-[1.65]" style={{ color: 'var(--os-text-2)' }}>
        {value}
      </p>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-[12.5px] font-medium" style={{ color: 'var(--os-text)' }}>
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function ProjectLinkButton({ link }: { link: ProjectLink }) {
  const Icon = link.kind === 'github' ? GitBranch : link.kind === 'live' ? Link2 : ExternalLink;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-white/6"
      style={{
        borderColor: 'rgba(255,255,255,0.09)',
        background: 'rgba(255,255,255,0.03)',
        color: 'rgba(255,255,255,0.68)',
      }}
    >
      <Icon size={12} />
      {link.label}
    </a>
  );
}
