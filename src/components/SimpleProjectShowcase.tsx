'use client';

import { useMotionValue, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState, type MouseEvent } from 'react';
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
const DECK_LIMIT = 4;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function SimpleProjectShowcase({ projects }: SimpleProjectShowcaseProps) {
  const [previewEnabled, setPreviewEnabled] = useState(false);
  const [preview, setPreview] = useState<CursorPreviewItem | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const { deckProjects, moreProjects } = useMemo(() => {
    const featured = projects.filter((project) => project.featured);
    const flagship = featured.length > 0 ? featured : projects.slice(0, DECK_LIMIT);
    const deck = flagship.slice(0, DECK_LIMIT);
    const deckIds = new Set(deck.map((project) => project.id));
    return {
      deckProjects: deck,
      moreProjects: projects.filter((project) => !deckIds.has(project.id)),
    };
  }, [projects]);

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

  const renderCard = (project: Project) => (
    <ProjectMediaCard
      key={project.id}
      project={project}
      expandable
      onPreviewEnter={(event) => showPreview(project, event)}
      onPreviewMove={(event) => {
        if (visible) updatePosition(event);
      }}
      onPreviewLeave={() => setPreview(null)}
    />
  );

  return (
    <div className="simple-project-showcase">
      <FeaturedProjectDeck projects={deckProjects} />

      {moreProjects.length > 0 ? (
        <div className="mt-8 border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-[12.5px] font-semibold" style={{ color: 'rgba(255,255,255,0.52)' }}>
            More projects
          </p>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {moreProjects.map((project) => renderCard(project))}
          </div>
        </div>
      ) : null}

      <CursorMediaPreview item={preview} x={x} y={y} visible={visible} />
    </div>
  );
}
