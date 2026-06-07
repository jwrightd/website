'use client';

import type { ReactNode } from 'react';
import { setSimpleView } from '@/lib/view-mode';

/** Switches from the static / simple reading view into the interactive JamesOS shell.
 *  Rendered inside the server-rendered static site, which is why it's its own island. */
export function EnterJamesOSButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        setSimpleView(false);
        window.scrollTo({ top: 0 });
      }}
      className={className}
    >
      {children}
    </button>
  );
}
