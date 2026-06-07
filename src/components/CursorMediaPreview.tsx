'use client';

import { motion, useSpring, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ProjectMedia } from '@/types';

export interface CursorPreviewItem {
  title: string;
  proof: string;
  media?: ProjectMedia;
  accent: string;
}

interface CursorMediaPreviewProps {
  item: CursorPreviewItem | null;
  x: MotionValue<number>;
  y: MotionValue<number>;
  visible: boolean;
}

export default function CursorMediaPreview({
  item,
  x,
  y,
  visible,
}: CursorMediaPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const springX = useSpring(x, { stiffness: 320, damping: 34, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 320, damping: 34, mass: 0.45 });
  const media = item?.media;
  const isVideo = media?.type === 'video';

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      className="cursor-media-preview fixed left-0 top-0 z-[60] hidden w-[282px] overflow-hidden rounded-xl border md:block"
      style={{
        x: springX,
        y: springY,
        borderColor: item?.accent ?? 'rgba(255,255,255,0.1)',
        boxShadow: item ? `0 18px 42px rgba(0,0,0,0.32), 0 0 28px ${item.accent}` : undefined,
      }}
      initial={false}
      animate={visible && item ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.975 }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[rgba(8,10,14,0.94)]">
        {media ? (
          isVideo ? (
            <video
              src={media.src}
              poster={media.poster}
              muted
              loop
              playsInline
              autoPlay
              className="h-full w-full object-cover opacity-90"
            />
          ) : (
            <Image
              src={media.src}
              alt=""
              fill
              sizes="282px"
              className="object-cover opacity-90"
            />
          )
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.36)' }}>
              media slot ready
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
      </div>
      <div className="border-t px-3 py-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <p className="text-[12.5px] font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
          {item?.title}
        </p>
        <p className="mt-1 text-[11.5px]" style={{ color: 'rgba(255,255,255,0.46)' }}>
          {item?.proof}
        </p>
      </div>
    </motion.div>,
    document.body
  );
}
