'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { SIMPLE_VIEW_STORAGE_KEY, VIEW_MODE_EVENT } from '@/lib/view-mode';

const Desktop = dynamic(() => import('./Desktop'), {
  ssr: false,
  loading: () => null,
});

function shouldMountJamesOS() {
  try {
    return sessionStorage.getItem(SIMPLE_VIEW_STORAGE_KEY) === '0';
  } catch {
    return false;
  }
}

export default function JamesOSLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (shouldMountJamesOS()) {
      setMounted(true);
    }

    const onViewMode = (event: Event) => {
      const detail = (event as CustomEvent<{ simple: boolean }>).detail;
      if (!detail?.simple) setMounted(true);
    };

    window.addEventListener(VIEW_MODE_EVENT, onViewMode);
    return () => window.removeEventListener(VIEW_MODE_EVENT, onViewMode);
  }, []);

  return mounted ? <Desktop /> : null;
}
