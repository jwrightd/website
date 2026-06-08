import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectProofTone } from '@/lib/badges';
import type { Project } from '@/types';
import { ProjectMediaSurface } from './ProjectMediaCard';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const tone = getProjectProofTone(project.proofTone);
  const badges = project.badges ?? [project.proof];

  return (
    <div style={{ background: 'var(--os-bg)', color: 'var(--os-text)', minHeight: '100vh' }}>
      <header
        className="sticky top-0 z-10 border-b backdrop-blur"
        style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(15,15,17,0.82)' }}
      >
        <div className="mx-auto flex h-14 max-w-[900px] items-center justify-between px-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[13px] font-medium"
            style={{ color: 'rgba(255,255,255,0.72)' }}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            All projects
          </Link>
          <Link href="/" className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.82)' }}>
            jameswright.dev
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-6 py-10">
        <div className="flex flex-wrap items-center gap-1.5">
          {badges.map((badge) => (
            <span
              key={`${project.id}-${badge}`}
              className="rounded-md border px-2 py-1 text-[10.5px] font-semibold"
              style={{ color: tone.fg, background: tone.bg, borderColor: tone.border }}
            >
              {badge}
            </span>
          ))}
        </div>

        <p className="mt-4 font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.36)' }}>
          {project.category} · {project.status}
        </p>
        <h1 className="mt-2 text-[36px] font-semibold leading-[1.05] tracking-[-0.02em]" style={{ color: 'rgba(255,255,255,0.95)' }}>
          {project.name}
        </h1>
        <p className="mt-4 max-w-[720px] text-[16px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.68)' }}>
          {project.outcome}
        </p>

        <div className="mt-6 overflow-hidden rounded-xl border" style={{ borderColor: tone.border }}>
          <ProjectMediaSurface project={project} sizes="(max-width: 900px) 100vw, 860px" priority />
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <section>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Overview
            </h2>
            <p className="mt-2 text-[15px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.62)' }}>
              {project.overview}
            </p>
          </section>

          {project.myContribution ? (
            <section>
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.38)' }}>
                My contribution
              </h2>
              <p className="mt-2 text-[15px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.62)' }}>
                {project.myContribution}
              </p>
            </section>
          ) : null}

          <section>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Problem
            </h2>
            <p className="mt-2 text-[15px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.62)' }}>
              {project.problem}
            </p>
          </section>

          <section>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Approach
            </h2>
            <ul className="mt-2 flex flex-col gap-2">
              {project.approach.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[15px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--os-accent)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Result
            </h2>
            <p className="mt-2 text-[15px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.62)' }}>
              {project.result}
            </p>
          </section>

          {project.media && project.media.length > 1 ? (
            <section className="grid gap-4">
              {project.media.slice(1).map((item) => (
                <figure key={item.src} className="overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="relative aspect-[16/10]">
                    <Image src={item.src} alt={item.alt} fill sizes="(max-width: 900px) 100vw, 860px" className="object-cover" />
                  </div>
                  {item.caption ? (
                    <figcaption className="px-4 py-3 text-[12.5px] leading-[1.5]" style={{ color: 'rgba(255,255,255,0.44)' }}>
                      {item.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </section>
          ) : null}

          <section>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Stack
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border px-2.5 py-1 text-[12px]"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.52)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {project.links.length > 0 ? (
            <section className="flex flex-wrap gap-4 border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[13px] font-semibold"
                  style={{ color: '#c7d9ff' }}
                >
                  {link.label}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              ))}
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}
