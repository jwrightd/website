'use client';

import Image from 'next/image';
import { useState, type PointerEvent } from 'react';
import type { ProjectMedia } from '@/types';

interface ProjectVisualFrameProps {
  media: ProjectMedia;
  sizes: string;
  aspectClass?: string;
  fit?: 'cover' | 'contain';
  showCaption?: boolean;
  priority?: boolean;
  className?: string;
  /** Full-width fixed-height strip for project headers. */
  variant?: 'default' | 'banner';
}

export default function ProjectVisualFrame({
  media,
  sizes,
  aspectClass = 'aspect-[16/9]',
  fit = 'cover',
  showCaption = false,
  priority = false,
  className = '',
  variant = 'default',
}: ProjectVisualFrameProps) {
  const [intrinsicAspect, setIntrinsicAspect] = useState<number | null>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    event.currentTarget.style.setProperty('--visual-x', `${x.toFixed(2)}%`);
    event.currentTarget.style.setProperty('--visual-y', `${y.toFixed(2)}%`);
  };

  if (variant === 'banner') {
    return (
      <figure
        className={`project-visual-frame project-visual-banner w-full overflow-hidden rounded-xl border ${className}`.trim()}
        data-fit="cover"
        onPointerMove={handlePointerMove}
        onPointerLeave={(event) => {
          event.currentTarget.style.removeProperty('--visual-x');
          event.currentTarget.style.removeProperty('--visual-y');
        }}
      >
        <div className="project-visual-plane relative h-[188px] w-full overflow-hidden">
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority={priority}
            sizes={sizes}
            className="project-visual-image object-cover object-top"
          />
        </div>
      </figure>
    );
  }

  const useIntrinsicAspect = fit === 'contain' && intrinsicAspect != null;
  const planeClass = useIntrinsicAspect ? 'relative w-full overflow-hidden' : `relative w-full overflow-hidden ${aspectClass}`;

  return (
    <figure
      className={`project-visual-frame w-full self-start overflow-hidden rounded-xl border ${className}`.trim()}
      data-fit={fit}
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => {
        event.currentTarget.style.removeProperty('--visual-x');
        event.currentTarget.style.removeProperty('--visual-y');
      }}
    >
      <div
        className={`project-visual-plane ${planeClass}`}
        style={useIntrinsicAspect ? { aspectRatio: intrinsicAspect } : undefined}
      >
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority={priority}
          sizes={sizes}
          onLoad={(event) => {
            const { naturalWidth, naturalHeight } = event.currentTarget;
            if (fit === 'contain' && naturalWidth > 0 && naturalHeight > 0) {
              setIntrinsicAspect(naturalWidth / naturalHeight);
            }
          }}
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
