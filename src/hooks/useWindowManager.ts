'use client';

import { useEffect, useRef, useState } from 'react';
import { APPS } from '@/data/apps';
import { PRIMARY_RECRUITER_APPS, PRIMARY_WORKSPACE_APPS } from '@/data/profile';
import { getArrangedWindowLayouts, getNormalizedWindowState, getRecruiterModeLayouts } from '@/lib/window-layouts';
import type { AppId, WindowPosition, WindowSize, WindowState } from '@/types';

const buildInitialState = (): Record<AppId, WindowState> => {
  const state: Partial<Record<AppId, WindowState>> = {};
  let zIndex = 10;

  for (const app of APPS) {
    state[app.id] = {
      id: app.id,
      isOpen: app.id === 'about',
      isMinimized: false,
      zIndex: app.id === 'about' ? 101 : zIndex++,
      position: { ...app.defaultPosition },
      size: { ...app.defaultSize },
    };
  }

  return state as Record<AppId, WindowState>;
};

export function useWindowManager() {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(buildInitialState);
  const topZRef = useRef(100);

  const getNextZIndex = () => {
    topZRef.current += 1;
    return topZRef.current;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindows((current) =>
        Object.fromEntries(
          Object.entries(current).map(([id, windowState]) => [
            id,
            getNormalizedWindowState(windowState),
          ])
        ) as Record<AppId, WindowState>
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openApp = (id: AppId) => {
    setWindows((current) => ({
      ...current,
      [id]: getNormalizedWindowState({
        ...current[id],
        isOpen: true,
        isMinimized: false,
        zIndex: getNextZIndex(),
      }),
    }));
  };

  const closeApp = (id: AppId) => {
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        isOpen: false,
        isMinimized: false,
      },
    }));
  };

  const minimizeApp = (id: AppId) => {
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        isMinimized: true,
      },
    }));
  };

  const focusApp = (id: AppId) => {
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        isMinimized: false,
        zIndex: getNextZIndex(),
      },
    }));
  };

  const moveApp = (id: AppId, position: WindowPosition) => {
    setWindows((current) => ({
      ...current,
      [id]: getNormalizedWindowState({
        ...current[id],
        position,
      }),
    }));
  };

  const resizeApp = (id: AppId, position: WindowPosition, size: WindowSize) => {
    setWindows((current) => ({
      ...current,
      [id]: getNormalizedWindowState({
        ...current[id],
        position,
        size,
      }),
    }));
  };

  const arrangeWindows = () => {
    setWindows((current) => {
      const visibleIds = Object.values(current)
        .filter((windowState) => windowState.isOpen && !windowState.isMinimized)
        .sort((left, right) => left.zIndex - right.zIndex)
        .map((windowState) => windowState.id);

      const layouts = getArrangedWindowLayouts(visibleIds);
      const nextWindows = { ...current };

      for (const id of visibleIds) {
        const layout = layouts[id];
        if (!layout) {
          continue;
        }

        nextWindows[id] = {
          ...current[id],
          isMinimized: false,
          position: layout.position,
          size: layout.size,
          zIndex: getNextZIndex(),
        };
      }

      return nextWindows;
    });
  };

  const setPrimaryWorkspace = (mode: 'workspace' | 'recruiter') => {
    setWindows((current) => {
      const layouts = getRecruiterModeLayouts();
      const nextWindows = { ...current };
      const primaryApps = mode === 'workspace' ? PRIMARY_WORKSPACE_APPS : PRIMARY_RECRUITER_APPS;
      const focusOrder: AppId[] =
        mode === 'workspace'
          ? ['resume', 'contact', 'projects']
          : ['contact', 'projects', 'resume'];

      for (const app of APPS) {
        const isPrimary = primaryApps.includes(app.id);
        const layout = layouts[app.id];

        nextWindows[app.id] = isPrimary && layout
          ? {
              ...current[app.id],
              isOpen: true,
              isMinimized: false,
              position: layout.position,
              size: layout.size,
              zIndex: getNextZIndex(),
            }
          : {
              ...current[app.id],
              isMinimized: current[app.id].isOpen,
            };
      }

      for (const id of focusOrder) {
        const windowState = nextWindows[id];
        if (!windowState?.isOpen || windowState.isMinimized) {
          continue;
        }

        nextWindows[id] = {
          ...windowState,
          zIndex: getNextZIndex(),
        };
      }

      return nextWindows;
    });
  };

  const openWorkspace = () => {
    setPrimaryWorkspace('workspace');
  };

  const activateRecruiterMode = () => {
    setPrimaryWorkspace('recruiter');
  };

  const openApps = Object.values(windows).filter((windowState) => windowState.isOpen);
  const visibleApps = openApps.filter((windowState) => !windowState.isMinimized);

  const focusedId: AppId | null =
    visibleApps.length > 0
      ? visibleApps.reduce((best, windowState) => (
          windowState.zIndex > best.zIndex ? windowState : best
        ), visibleApps[0]).id
      : null;

  return {
    windows,
    openApps,
    visibleApps,
    focusedId,
    openApp,
    closeApp,
    minimizeApp,
    focusApp,
    moveApp,
    resizeApp,
    arrangeWindows,
    openWorkspace,
    activateRecruiterMode,
  };
}
