'use client';

export type ConstellationEventKind = 'open' | 'hover' | 'workspace' | 'recruiter' | 'arrange';

export interface ConstellationEventDetail {
  kind: ConstellationEventKind;
  intensity?: number;
}

export const CONSTELLATION_EVENT = 'jamesos:constellation';

export function emitConstellationEvent(detail: ConstellationEventDetail) {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent<ConstellationEventDetail>(CONSTELLATION_EVENT, {
      detail,
    })
  );
}
