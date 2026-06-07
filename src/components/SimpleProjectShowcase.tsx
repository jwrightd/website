'use client';

import { useMotionValue, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type MouseEvent } from 'react';
import { getProjectProofTone } from '@/lib/badges';
import type { Project } from '@/types';
import CursorMediaPreview, { type CursorPreviewItem } from './CursorMediaPreview';
import FeaturedProjectDeck from './FeaturedProjectDeck';
import ProjectMediaCard from './ProjectMediaCard';

interface SimpleProjectShowcaseProps {
  projects: Project[];
}

const PREVIEW_WIDTH = 282;
const PREVIEW_HEIGHT = 238;
const PREVIEW_GAP = 18;
const VIEWPORT_MARGIN = 18;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function SimpleProjectShowcase({ projects }: SimpleProjectShowcaseProps) {
  const [previewEnabled, setPreviewEnabled] = useState(false);
  const [preview, setPreview] = useState<CursorPreviewItem | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setPreviewEnabled(finePointer.matches);
    const frame = window.requestAnimationFrame(update);

    finePointer.addEventListener('change', update);

    return () => {
      window.cancelAnimationFrame(frame);
      finePointer.removeEventListener('change', update);
    };
  }, []);

  const updatePosition = (event: MouseEvent<HTMLElement>) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    const maxX = window.innerWidth - PREVIEW_WIDTH - VIEWPORT_MARGIN;
    const maxY = window.innerHeight - PREVIEW_HEIGHT - VIEWPORT_MARGIN;
    const canSitRight = cardRect.right + PREVIEW_GAP + PREVIEW_WIDTH <= window.innerWidth - VIEWPORT_MARGIN;
    const canSitLeft = cardRect.left - PREVIEW_GAP - PREVIEW_WIDTH >= VIEWPORT_MARGIN;
    const nextX = canSitRight
      ? cardRect.right + PREVIEW_GAP
      : canSitLeft
        ? cardRect.left - PREVIEW_GAP - PREVIEW_WIDTH
        : event.clientX + PREVIEW_GAP;

    x.set(clamp(nextX, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, maxX)));
    y.set(clamp(event.clientY - PREVIEW_HEIGHT / 2, VIEWPORT_MARGIN, Math.max(VIEWPORT_MARGIN, maxY)));
  };

  const showPreview = (project: Project, event: MouseEvent<HTMLElement>) => {
    if (!previewEnabled || prefersReducedMotion) return;

    const tone = getProjectProofTone(project.proofTone);
    updatePosition(event);
    setPreview({
      title: project.name,
      proof: project.proof,
      media: project.media?.[0],
      accent: tone.border,
    });
  };

  const visible = Boolean(preview && previewEnabled && !prefersReducedMotion);

  return (
    <div className="simple-project-showcase">
      <FeaturedProjectDeck projects={projects} />

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectMediaCard
            key={project.id}
            project={project}
            onPreviewEnter={(event) => showPreview(project, event)}
            onPreviewMove={(event) => {
              if (visible) updatePosition(event);
            }}
            onPreviewLeave={() => setPreview(null)}
          />
        ))}
      </div>

      <CursorMediaPreview item={preview} x={x} y={y} visible={visible} />
    </div>
  );
}
