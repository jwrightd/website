'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { APP_ACCENTS, APPS } from '@/data/apps';
import { WINDOW_CHROME_HEIGHT, getDesktopWorkspaceBounds } from '@/lib/window-layouts';
import type { AppId, WindowPosition, WindowSize } from '@/types';

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

interface ResizeState {
  direction: ResizeDirection;
  pointerId: number;
  startX: number;
  startY: number;
  startPosition: WindowPosition;
  startSize: WindowSize;
}

interface WindowProps {
  id: AppId;
  isFocused: boolean;
  zIndex: number;
  isMinimized: boolean;
  position: WindowPosition;
  size: WindowSize;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onMove: (position: WindowPosition) => void;
  onResize: (position: WindowPosition, size: WindowSize) => void;
  children: React.ReactNode;
}

const RESIZE_CURSOR: Record<ResizeDirection, string> = {
  n: 'ns-resize',
  s: 'ns-resize',
  e: 'ew-resize',
  w: 'ew-resize',
  ne: 'nesw-resize',
  sw: 'nesw-resize',
  nw: 'nwse-resize',
  se: 'nwse-resize',
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function Window({
  id,
  isFocused,
  zIndex,
  isMinimized,
  position,
  size,
  onClose,
  onMinimize,
  onFocus,
  onMove,
  onResize,
  children,
}: WindowProps) {
  const app = APPS.find((item) => item.id === id)!;
  const accent = APP_ACCENTS[id];
  const dragControls = useDragControls();
  const [resizeState, setResizeState] = useState<ResizeState | null>(null);
  const onResizeRef = useRef(onResize);
  const onFocusRef = useRef(onFocus);

  useEffect(() => {
    onResizeRef.current = onResize;
    onFocusRef.current = onFocus;
  }, [onResize, onFocus]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    onMove({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y,
    });
  };

  useEffect(() => {
    if (!resizeState) {
      return;
    }

    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;
    document.body.style.cursor = RESIZE_CURSOR[resizeState.direction];
    document.body.style.userSelect = 'none';

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== resizeState.pointerId) {
        return;
      }

      event.preventDefault();

      const bounds = getDesktopWorkspaceBounds();
      const boundsRight = bounds.left + bounds.width;
      const boundsBottom = bounds.top + bounds.height;
      const minWidth = Math.min(app.minSize.width, bounds.width);
      const minHeight = Math.min(app.minSize.height, bounds.height - WINDOW_CHROME_HEIGHT);
      const deltaX = event.clientX - resizeState.startX;
      const deltaY = event.clientY - resizeState.startY;
      const direction = resizeState.direction;
      const startPosition = resizeState.startPosition;
      const startSize = resizeState.startSize;
      const rightEdge = startPosition.x + startSize.width;
      const bottomEdge = startPosition.y + startSize.height + WINDOW_CHROME_HEIGHT;

      let nextX = startPosition.x;
      let nextY = startPosition.y;
      let nextWidth = startSize.width;
      let nextHeight = startSize.height;

      if (direction.includes('e')) {
        nextWidth = clamp(startSize.width + deltaX, minWidth, boundsRight - startPosition.x);
      }

      if (direction.includes('s')) {
        nextHeight = clamp(
          startSize.height + deltaY,
          minHeight,
          boundsBottom - startPosition.y - WINDOW_CHROME_HEIGHT
        );
      }

      if (direction.includes('w')) {
        nextX = clamp(startPosition.x + deltaX, bounds.left, rightEdge - minWidth);
        nextWidth = clamp(rightEdge - nextX, minWidth, boundsRight - nextX);
      }

      if (direction.includes('n')) {
        nextY = clamp(
          startPosition.y + deltaY,
          bounds.top,
          bottomEdge - WINDOW_CHROME_HEIGHT - minHeight
        );
        nextHeight = clamp(
          bottomEdge - nextY - WINDOW_CHROME_HEIGHT,
          minHeight,
          boundsBottom - nextY - WINDOW_CHROME_HEIGHT
        );
      }

      onResizeRef.current(
        { x: Math.round(nextX), y: Math.round(nextY) },
        { width: Math.round(nextWidth), height: Math.round(nextHeight) }
      );
    };

    const stopResize = (event: PointerEvent) => {
      if (event.pointerId !== resizeState.pointerId) {
        return;
      }

      setResizeState(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopResize);
    window.addEventListener('pointercancel', stopResize);

    return () => {
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopResize);
      window.removeEventListener('pointercancel', stopResize);
    };
  }, [app.minSize.height, app.minSize.width, resizeState]);

  if (isMinimized) {
    return null;
  }

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 8 }}
      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
      onPointerDown={onFocus}
      onDragEnd={handleDragEnd}
      style={{
        position: 'absolute',
        zIndex,
        width: size.width,
        maxWidth: 'calc(100vw - 20px)',
        left: position.x,
        top: position.y,
        borderRadius: 11,
        overflow: 'hidden',
        touchAction: 'none',
        filter: isFocused ? 'none' : 'saturate(0.84) brightness(0.88)',
        boxShadow: isFocused
          ? `0 0 0 1px rgba(255,255,255,0.09), 0 0 0 1px ${accent?.dot ?? '#4f8ef7'}30 inset, 0 28px 68px rgba(0,0,0,0.62), 0 12px 22px rgba(0,0,0,0.26), 0 1px 0 rgba(255,255,255,0.06) inset`
          : '0 0 0 1px rgba(255,255,255,0.045), 0 12px 24px rgba(0,0,0,0.34), 0 1px 0 rgba(255,255,255,0.025) inset',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            isFocused
              ? 'linear-gradient(180deg, rgba(255,255,255,0.018) 0%, rgba(255,255,255,0) 12%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0) 10%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: accent?.dot ?? '#4f8ef7',
          opacity: isFocused ? 0.72 : 0.16,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-px"
        style={{
          background: accent?.dot ?? '#4f8ef7',
          opacity: isFocused ? 0.38 : 0.08,
        }}
      />
      <div
        className="relative flex h-10 shrink-0 select-none items-center gap-2.5 px-3.5"
        style={{
          background: isFocused ? 'rgba(19,20,23,0.94)' : 'rgba(16,17,20,0.9)',
          borderBottom: '1px solid var(--os-border)',
          touchAction: 'none',
          cursor: 'grab',
        }}
        onPointerDown={(event) => {
          onFocus();
          dragControls.start(event);
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        />
        <div className="flex items-center gap-1.5">
          <button
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="group flex h-3 w-3 items-center justify-center rounded-full transition-[transform,opacity] duration-150 hover:scale-105 active:scale-95"
            style={{ background: isFocused ? '#ff5f57' : '#3a3a3c' }}
            title="Close"
          >
            {isFocused && (
              <span className="text-[7px] font-black leading-none text-[#7a0000] opacity-0 transition-opacity group-hover:opacity-100">
                ✕
              </span>
            )}
          </button>
          <button
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onMinimize();
            }}
            className="group flex h-3 w-3 items-center justify-center rounded-full transition-[transform,opacity] duration-150 hover:scale-105 active:scale-95"
            style={{ background: isFocused ? '#febc2e' : '#3a3a3c' }}
            title="Minimize"
          >
            {isFocused && (
              <span className="text-[8px] font-black leading-none text-[#7a4800] opacity-0 transition-opacity group-hover:opacity-100">
                −
              </span>
            )}
          </button>
          <div className="h-3 w-3 rounded-full" style={{ background: isFocused ? '#28c840' : '#3a3a3c' }} />
        </div>

        <div className="flex min-w-0 flex-1 justify-center">
          <span
            className="pointer-events-none inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-[12px] font-medium"
            style={{
              borderColor: isFocused ? 'rgba(255,255,255,0.11)' : 'rgba(255,255,255,0.06)',
              background: isFocused ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
              color: isFocused ? 'rgba(255,255,255,0.86)' : 'rgba(255,255,255,0.62)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: accent?.dot ?? '#4f8ef7', opacity: isFocused ? 1 : 0.72 }}
            />
            <span className="truncate">{app.label}</span>
          </span>
        </div>

        <div className="w-[52px]" />
      </div>

      <div
        className="flex flex-col overflow-hidden"
        style={{
          height: size.height,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.012) 0%, rgba(255,255,255,0) 14%), var(--os-window)',
          opacity: isFocused ? 1 : 0.94,
        }}
      >
        {children}
      </div>

      {RESIZE_HANDLES.map(({ direction, style }) => (
        <button
          key={direction}
          type="button"
          aria-label={`Resize ${app.label} window`}
          className="absolute z-[2] block bg-transparent outline-none"
          style={{
            ...style,
            cursor: RESIZE_CURSOR[direction],
          }}
          onPointerDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onFocusRef.current();
            setResizeState({
              direction,
              pointerId: event.pointerId,
              startX: event.clientX,
              startY: event.clientY,
              startPosition: position,
              startSize: size,
            });
          }}
        />
      ))}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-2 bottom-2 z-[1] flex flex-col gap-[3px]"
        style={{ opacity: isFocused ? 0.48 : 0.22 }}
      >
        <span className="ml-auto block h-px w-2.5 rounded-full bg-white/45" />
        <span className="ml-auto block h-px w-1.5 rounded-full bg-white/35" />
      </div>
    </motion.div>
  );
}

const RESIZE_HANDLES: Array<{
  direction: ResizeDirection;
  style: React.CSSProperties;
}> = [
  {
    direction: 'n',
    style: {
      top: 0,
      left: 12,
      right: 12,
      height: 8,
    },
  },
  {
    direction: 's',
    style: {
      bottom: 0,
      left: 12,
      right: 12,
      height: 8,
    },
  },
  {
    direction: 'e',
    style: {
      top: 12,
      right: 0,
      bottom: 12,
      width: 8,
    },
  },
  {
    direction: 'w',
    style: {
      top: 12,
      left: 0,
      bottom: 12,
      width: 8,
    },
  },
  {
    direction: 'ne',
    style: {
      top: 0,
      right: 0,
      width: 12,
      height: 12,
    },
  },
  {
    direction: 'nw',
    style: {
      top: 0,
      left: 0,
      width: 12,
      height: 12,
    },
  },
  {
    direction: 'se',
    style: {
      right: 0,
      bottom: 0,
      width: 14,
      height: 14,
    },
  },
  {
    direction: 'sw',
    style: {
      bottom: 0,
      left: 0,
      width: 12,
      height: 12,
    },
  },
];
