'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DESKTOP_GRID_SIZE,
  DESKTOP_SELECTION_DRAG_THRESHOLD,
  DESKTOP_SELECTION_FADE_MS,
} from '@/lib/desktop-grid';
import type { AppId } from '@/types';

interface SelectionRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

type SelectionPhase = 'idle' | 'dragging' | 'fading';

interface DesktopInteractionLayerProps {
  onSelectionAppsChange: (ids: AppId[]) => void;
}

function intersect(a: DOMRect, b: SelectionRect) {
  return !(
    a.right < b.left ||
    a.left > b.left + b.width ||
    a.bottom < b.top ||
    a.top > b.top + b.height
  );
}

export default function DesktopInteractionLayer({
  onSelectionAppsChange,
}: DesktopInteractionLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const originRef = useRef<{ x: number; y: number } | null>(null);
  const clearTimerRef = useRef<number | null>(null);
  const onSelectionAppsChangeRef = useRef(onSelectionAppsChange);
  const [phase, setPhase] = useState<SelectionPhase>('idle');
  const [selectionRect, setSelectionRect] = useState<SelectionRect | null>(null);

  useEffect(() => {
    onSelectionAppsChangeRef.current = onSelectionAppsChange;
  }, [onSelectionAppsChange]);

  const clearSelection = useCallback(() => {
    if (clearTimerRef.current) {
      window.clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }

    pointerIdRef.current = null;
    originRef.current = null;
    setPhase('idle');
    setSelectionRect(null);
    onSelectionAppsChangeRef.current([]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearSelection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearSelection();
    };
  }, [clearSelection]);

  const collectSelectedApps = (rect: SelectionRect) => {
    const icons = Array.from(
      document.querySelectorAll<HTMLElement>('[data-desktop-icon="true"][data-app-id]')
    );

    const selectedIds = icons
      .filter((icon) => intersect(icon.getBoundingClientRect(), rect))
      .map((icon) => icon.dataset.appId as AppId);

    onSelectionAppsChangeRef.current(selectedIds);
  };

  const updateSelectionFromPointer = (clientX: number, clientY: number) => {
    const bounds = layerRef.current?.getBoundingClientRect();
    const origin = originRef.current;
    if (!bounds || !origin) {
      return;
    }

    const nextLeft = Math.max(bounds.left, Math.min(origin.x, clientX));
    const nextTop = Math.max(bounds.top, Math.min(origin.y, clientY));
    const nextRight = Math.min(bounds.right, Math.max(origin.x, clientX));
    const nextBottom = Math.min(bounds.bottom, Math.max(origin.y, clientY));
    const nextWidth = Math.max(0, nextRight - nextLeft);
    const nextHeight = Math.max(0, nextBottom - nextTop);

    if (
      nextWidth < DESKTOP_SELECTION_DRAG_THRESHOLD &&
      nextHeight < DESKTOP_SELECTION_DRAG_THRESHOLD
    ) {
      setSelectionRect(null);
      setPhase('idle');
      onSelectionAppsChangeRef.current([]);
      return;
    }

    const nextRect = {
      left: nextLeft,
      top: nextTop,
      width: nextWidth,
      height: nextHeight,
    };

    setPhase('dragging');
    setSelectionRect(nextRect);
    collectSelectedApps(nextRect);
  };

  const finishSelection = (pointerId: number) => {
    if (pointerIdRef.current !== pointerId) {
      return;
    }

    if (layerRef.current?.hasPointerCapture(pointerId)) {
      layerRef.current.releasePointerCapture(pointerId);
    }

    pointerIdRef.current = null;
    originRef.current = null;
    onSelectionAppsChangeRef.current([]);

    if (!selectionRect) {
      clearSelection();
      return;
    }

    setPhase('fading');
    clearTimerRef.current = window.setTimeout(() => {
      clearSelection();
    }, DESKTOP_SELECTION_FADE_MS);
  };

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="absolute inset-0 z-[1]"
      onPointerDown={(event) => {
        if (event.button !== 0) {
          return;
        }

        clearSelection();
        pointerIdRef.current = event.pointerId;
        originRef.current = { x: event.clientX, y: event.clientY };
        layerRef.current?.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (pointerIdRef.current !== event.pointerId) {
          return;
        }

        updateSelectionFromPointer(event.clientX, event.clientY);
      }}
      onPointerUp={(event) => {
        finishSelection(event.pointerId);
      }}
      onPointerCancel={(event) => {
        finishSelection(event.pointerId);
      }}
    >
      {selectionRect ? (
        <div
          className="desktop-selection-marquee pointer-events-none absolute overflow-hidden"
          data-phase={phase}
          style={{
            left: selectionRect.left,
            top: selectionRect.top,
            width: selectionRect.width,
            height: selectionRect.height,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-45"
            style={{
              backgroundImage:
                `repeating-linear-gradient(rgba(255,255,255,0.025) 0px, transparent 1px, transparent ${DESKTOP_GRID_SIZE - 1}px, rgba(255,255,255,0.025) ${DESKTOP_GRID_SIZE}px), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, transparent 1px, transparent ${DESKTOP_GRID_SIZE - 1}px, rgba(255,255,255,0.02) ${DESKTOP_GRID_SIZE}px)`,
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
