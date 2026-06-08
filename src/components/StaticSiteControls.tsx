'use client';

import type { ReactNode } from 'react';
import { preloadJamesOS } from '@/lib/preload-jamesos';
import { setSimpleView } from '@/lib/view-mode';

/** Switches from the static / simple reading view into the interactive JamesOS shell.
 *  Rendered inside the server-rendered static site, which is why it's its own island. */
export function EnterJamesOSButton({
  className,
  children,
  onActivate,
}: {
  className?: string;
  children: ReactNode;
  onActivate?: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={preloadJamesOS}
      onFocus={preloadJamesOS}
      onClick={() => {
        preloadJamesOS();
        setSimpleView(false);
        window.scrollTo({ top: 0 });
        onActivate?.();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
