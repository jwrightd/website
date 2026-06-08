type DesktopModule = typeof import('@/components/Desktop');

let preloadPromise: Promise<DesktopModule> | null = null;

/** Warm the JamesOS shell chunk before the user clicks Enter JamesOS. */
export function preloadJamesOS() {
  if (!preloadPromise) {
    preloadPromise = import('@/components/Desktop');
  }
  return preloadPromise;
}
