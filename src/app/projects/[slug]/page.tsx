import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/ProjectDetail';
import { PROJECTS } from '@/data/projects';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((entry) => entry.id === slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: `${project.name} — James Wright`,
      description: project.outcome,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((entry) => entry.id === slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
