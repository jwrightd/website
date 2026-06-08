import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';
import { ProjectsIndexList } from '@/components/ProjectsIndexList';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected software engineering, ML, and research projects by James Wright — case studies with metrics, architecture, and code links.',
  openGraph: {
    title: 'Projects — James Wright',
    description:
      'Shipped products, research pipelines, and hackathon builds with full case studies.',
  },
};

const cardStyle = {
  borderColor: 'rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
} as const;

export default function ProjectsIndexPage() {
  return (
    <div style={{ background: 'var(--os-bg)', color: 'var(--os-text)', minHeight: '100vh' }}>
      <header
        className="sticky top-0 z-10 border-b backdrop-blur"
        style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(15,15,17,0.82)' }}
      >
        <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
          <Link href="/" className="text-[14px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.82)' }}>
            James Wright
          </Link>
          <Link
            href="/#contact"
            className="rounded-md border px-3 py-1.5 text-[12.5px]"
            style={{ ...cardStyle, color: 'rgba(255,255,255,0.74)' }}
          >
            Contact
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-6 py-12">
        <p className="font-mono text-[11px] tracking-[0.08em]" style={{ color: 'rgba(255,255,255,0.34)' }}>
          all projects
        </p>
        <h1 className="mt-2 text-[32px] font-semibold tracking-[-0.02em]" style={{ color: 'rgba(255,255,255,0.92)' }}>
          Selected work
        </h1>
        <p className="mt-3 max-w-[640px] text-[15px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.54)' }}>
          Full case studies for shipped products, research pipelines, and hackathon builds.
        </p>

        <ProjectsIndexList projects={PROJECTS} />
      </main>
    </div>
  );
}
