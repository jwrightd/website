'use client';

import { useState, useCallback, useEffect } from 'react';
import type { AppId, WindowState } from '@/types';
import { APPS } from '@/data/apps';

const buildInitialState = (): Record<AppId, WindowState> => {
  const state: Partial<Record<AppId, WindowState>> = {};
  let z = 10;
  APPS.forEach((app) => {
    state[app.id] = {
      id: app.id,
      isOpen: false,
      isMinimized: false,
      zIndex: z++,
      position: { ...app.defaultPosition },
    };
  });
  return state as Record<AppId, WindowState>;
};

export function useWindowManager() {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(buildInitialState);
  const [topZ, setTopZ] = useState(100);

  // Auto-open About after boot screen clears
  useEffect(() => {
    const timer = setTimeout(() => {
      setTopZ((z) => z + 1);
      setWindows((prev) => ({
        ...prev,
        about: { ...prev.about, isOpen: true, zIndex: 101 },
      }));
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  const openApp = useCallback(
    (id: AppId) => {
      setTopZ((z) => z + 1);
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: topZ + 1 },
      }));
    },
    [topZ]
  );

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isMinimized: false },
    }));
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
  }, []);

  const focusApp = useCallback(
    (id: AppId) => {
      setTopZ((z) => z + 1);
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], zIndex: topZ + 1, isMinimized: false },
      }));
    },
    [topZ]
  );

  const openApps = Object.values(windows).filter((w) => w.isOpen && !w.isMinimized);

  // The window with the highest zIndex is the focused one
  const focusedId: AppId | null =
    openApps.length > 0
      ? openApps.reduce((best, w) => (w.zIndex > best.zIndex ? w : best), openApps[0]).id
      : null;

  return { windows, openApps, focusedId, openApp, closeApp, minimizeApp, focusApp };
}
