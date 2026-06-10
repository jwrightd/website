'use client';

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

// Organic S-curve weaving between the content gutters, as fractions of the
// section's width/height. The path is rebuilt in real pixel coordinates from a
// ResizeObserver: rendering it in a non-uniformly stretched viewBox with
// non-scaling strokes made the browser measure dash lengths in a different
// space than getPointAtLength, so the drawn tip and the dot drifted apart.
const START: [number, number] = [0.58, 0];
const SEGMENTS: Array<[[number, number], [number, number], [number, number]]> = [
  [[0.86, 0.038], [0.92, 0.074], [0.7, 0.108]],
  [[0.48, 0.142], [0.12, 0.158], [0.1, 0.2]],
  [[0.08, 0.244], [0.4, 0.266], [0.6, 0.3]],
  [[0.8, 0.334], [0.92, 0.366], [0.78, 0.404]],
  [[0.64, 0.442], [0.18, 0.452], [0.12, 0.496]],
  [[0.07, 0.536], [0.34, 0.56], [0.52, 0.596]],
  [[0.7, 0.632], [0.88, 0.66], [0.8, 0.7]],
  [[0.72, 0.74], [0.26, 0.75], [0.16, 0.792]],
  [[0.07, 0.83], [0.3, 0.856], [0.46, 0.892]],
  [[0.62, 0.928], [0.7, 0.962], [0.56, 1]],
];

function buildPath(w: number, h: number) {
  const pt = ([fx, fy]: [number, number]) => `${(fx * w).toFixed(1)} ${(fy * h).toFixed(1)}`;
  return (
    `M ${pt(START)} ` +
    SEGMENTS.map(([c1, c2, p]) => `C ${pt(c1)}, ${pt(c2)}, ${pt(p)}`).join(' ')
  );
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

// How visible the trail is while crossing a content block (mask luminance).
const DIM_FILL = '#5a5a5a';
const DIM_PAD = 10;

export default function ScrollPath() {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [dimRects, setDimRects] = useState<Rect[]>([]);
  const dimRectsRef = useRef<Rect[]>([]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start 0.72', 'end 0.92'],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
    restDelta: 0.001,
  });

  // Measure the section size and the content blocks the trail should ghost
  // through. Blocks live in the sibling content column, so rects are relative
  // to this wrapper (which is inset-0 of the same parent).
  useEffect(() => {
    const node = wrapperRef.current;
    const host = node?.parentElement;
    if (!node || !host) return;
    const measure = () => {
      const base = node.getBoundingClientRect();
      const rects: Rect[] = [];
      host.querySelectorAll('section > *').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        rects.push({
          x: r.left - base.left - DIM_PAD,
          y: r.top - base.top - DIM_PAD,
          w: r.width + DIM_PAD * 2,
          h: r.height + DIM_PAD * 2,
        });
      });
      dimRectsRef.current = rects;
      setDimRects(rects);
      setSize((prev) =>
        prev && prev.w === base.width && prev.h === base.height
          ? prev
          : { w: base.width, h: base.height }
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // The tip dot tracks the end of the drawn stroke. With the path in pixel
  // space, getPointAtLength returns wrapper-relative pixel offsets directly.
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  // Target visibility for the dot: ghosted while it travels over content.
  const dotDim = useMotionValue(1);
  const syncDot = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;
    const clamped = Math.min(1, Math.max(0, pathLength.get()));
    const point = path.getPointAtLength(path.getTotalLength() * clamped);
    dotX.set(point.x);
    dotY.set(point.y);
    const overContent = dimRectsRef.current.some(
      (r) => point.x >= r.x && point.x <= r.x + r.w && point.y >= r.y && point.y <= r.y + r.h
    );
    dotDim.set(overContent ? 0.4 : 1);
  }, [pathLength, dotX, dotY, dotDim]);
  useMotionValueEvent(pathLength, 'change', syncDot);
  // Re-anchor the dot whenever the path is rebuilt at a new size.
  useEffect(() => {
    syncDot();
  }, [size, syncDot]);

  const dotLeft = useTransform(dotX, (x) => `${x}px`);
  const dotTop = useTransform(dotY, (y) => `${y}px`);
  const dotDimSmooth = useSpring(dotDim, { stiffness: 170, damping: 26 });
  const dotEndsFade = useTransform(pathLength, [0, 0.015, 0.985, 1], [0, 1, 1, 0]);
  const dotOpacity = useTransform(() => dotEndsFade.get() * dotDimSmooth.get());

  const d = size ? buildPath(size.w, size.h) : null;

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      {d && size && (
        <svg className="h-full w-full" fill="none">
          <defs>
            <linearGradient id="scroll-path-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f4f7ff" stopOpacity="0.75" />
              <stop offset="0.55" stopColor="#dde4f2" stopOpacity="0.6" />
              <stop offset="1" stopColor="#e8dcb8" stopOpacity="0.5" />
            </linearGradient>
            {/* Ghost the trail wherever it crosses a content block so it never
                competes with text; full brightness in the open gutters. */}
            <mask id="scroll-path-mask" maskUnits="userSpaceOnUse">
              <rect width={size.w} height={size.h} fill="#ffffff" />
              {dimRects.map((r, i) => (
                <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} rx={14} fill={DIM_FILL} />
              ))}
            </mask>
          </defs>
          <g mask="url(#scroll-path-mask)">
            {/* Faint ghost of the full route ahead. */}
            <path d={d} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
            <motion.path
              ref={pathRef}
              d={d}
              stroke="url(#scroll-path-gradient)"
              strokeWidth={1.6}
              strokeLinecap="round"
              style={{
                pathLength: prefersReducedMotion ? 1 : pathLength,
                filter: 'drop-shadow(0 0 7px rgba(190,210,255,0.5))',
              }}
            />
          </g>
        </svg>
      )}
      {d && !prefersReducedMotion && (
        <motion.div
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: dotLeft,
            top: dotTop,
            opacity: dotOpacity,
            background: '#ffffff',
            boxShadow: '0 0 14px 3px rgba(220,232,255,0.65)',
          }}
        />
      )}
    </div>
  );
}
