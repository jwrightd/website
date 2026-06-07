'use client';

import Image from 'next/image';
import type { PointerEvent } from 'react';
import type { ProjectMedia } from '@/types';

interface ProjectVisualFrameProps {
  media: ProjectMedia;
  sizes: string;
  aspectClass?: string;
  fit?: 'cover' | 'contain';
  showCaption?: boolean;
  priority?: boolean;
}

export default function ProjectVisualFrame({
  media,
  sizes,
  aspectClass = 'aspect-[16/9]',
  fit = 'cover',
  showCaption = false,
  priority = false,
}: ProjectVisualFrameProps) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    event.currentTarget.style.setProperty('--visual-x', `${x.toFixed(2)}%`);
    event.currentTarget.style.setProperty('--visual-y', `${y.toFixed(2)}%`);
  };

  return (
    <figure
      className="project-visual-frame overflow-hidden rounded-xl border"
      data-fit={fit}
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => {
        event.currentTarget.style.removeProperty('--visual-x');
        event.currentTarget.style.removeProperty('--visual-y');
      }}
    >
      <div className={`project-visual-plane relative w-full overflow-hidden ${aspectClass}`}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`project-visual-image ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
        />
      </div>
      {showCaption ? (
        <figcaption className="px-3 py-3">
          <p className="text-[12.5px]" style={{ color: 'var(--os-text)' }}>
            {media.alt}
          </p>
          {media.caption ? (
            <p className="mt-1 text-[12px] leading-[1.65]" style={{ color: 'var(--os-text-3)' }}>
              {media.caption}
            </p>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
