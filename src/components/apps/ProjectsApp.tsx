'use client';

import { useState } from 'react';
import { GitBranch, ExternalLink, Trophy, ChevronRight } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import type { Project } from '@/types';

export default function ProjectsApp() {
  const [selectedId, setSelectedId] = useState<string>(PROJECTS[0].id);
  const selected = PROJECTS.find((p) => p.id === selectedId) ?? PROJECTS[0];

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── Finder sidebar ─────────────────────────────── */}
      <div
        className="w-[196px] shrink-0 flex flex-col overflow-y-auto"
        style={{
          background: 'var(--os-sidebar)',
          borderRight: '1px solid var(--os-border)',
        }}
      >
        <div className="px-3 pt-3 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest px-2" style={{ color: 'var(--os-text-3)' }}>
            Projects
          </p>
        </div>

        {PROJECTS.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelectedId(project.id)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors"
            style={{
              background: selectedId === project.id ? 'rgba(79,142,247,0.18)' : 'transparent',
              borderLeft: selectedId === project.id ? '2px solid #4f8ef7' : '2px solid transparent',
            }}
          >
            <span className="text-[16px]">📁</span>
            <span
              className="text-[12.5px] font-medium truncate"
              style={{ color: selectedId === project.id ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.55)' }}
            >
              {project.name}
            </span>
          </button>
        ))}

        <div className="flex-1" />
        <div
          className="px-4 py-2.5 text-[10.5px]"
          style={{ color: 'var(--os-text-3)', borderTop: '1px solid var(--os-border)' }}
        >
          {PROJECTS.length} items
        </div>
      </div>

      {/* ── Detail pane ────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Path bar */}
        <div
          className="flex items-center gap-1 px-4 h-8 shrink-0"
          style={{ borderBottom: '1px solid var(--os-border)', background: 'rgba(255,255,255,0.02)' }}
        >
          <span className="text-[11px]" style={{ color: 'var(--os-text-3)' }}>~/projects</span>
          <ChevronRight size={11} style={{ color: 'var(--os-text-3)' }} />
          <span className="text-[11px]" style={{ color: 'var(--os-text-2)' }}>{selected.name}</span>
        </div>

        <ProjectDetail project={selected} />

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 h-7 shrink-0 text-[10.5px]"
          style={{ borderTop: '1px solid var(--os-border)', color: 'var(--os-text-3)', background: 'rgba(255,255,255,0.01)' }}
        >
          <span>~/projects/{selected.id}</span>
          {selected.result && <span style={{ color: '#fbbf24' }}>{selected.result}</span>}
        </div>
      </div>
    </div>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="flex-1 overflow-auto px-6 py-5 flex flex-col gap-5">
      {/* Name + badge */}
      <div>
        <div className="flex items-center gap-2.5 mb-1.5">
          <h2 className="text-[18px] font-bold" style={{ color: 'var(--os-text)' }}>
            {project.name}
          </h2>
          {project.result && (
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[10.5px] font-medium"
              style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.22)', color: '#fbbf24' }}
            >
              <Trophy size={9} /> {project.result}
            </span>
          )}
        </div>
        <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--os-text-2)' }}>
          {project.description}
        </p>
      </div>

      {/* Tech stack */}
      <div>
        <Label>Tech Stack</Label>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-[11.5px] font-mono"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: 'rgba(255,255,255,0.62)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      {(project.github || project.demo || project.devpost || project.writeup) && (
        <div>
          <Label>Links</Label>
          <div className="flex gap-2 mt-2">
            {project.github && (
              <LinkBtn href={project.github} icon={<GitBranch size={12} />} label="GitHub" />
            )}
            {project.devpost && (
              <LinkBtn href={project.devpost} icon={<ExternalLink size={12} />} label="Devpost" />
            )}
            {project.demo && (
              <LinkBtn href={project.demo} icon={<ExternalLink size={12} />} label="Demo" />
            )}
            {project.writeup && (
              <LinkBtn href={project.writeup} icon={<ExternalLink size={12} />} label="Write-up" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--os-text-3)' }}>
      {children}
    </p>
  );
}

function LinkBtn({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.09)',
        color: 'rgba(255,255,255,0.58)',
      }}
    >
      {icon}
      {label}
    </a>
  );
}
