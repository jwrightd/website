export const SIMPLE_VIEW_CLASS = 'simple-view';
export const SIMPLE_VIEW_STORAGE_KEY = 'jamesos:simple';
export const VIEW_MODE_EVENT = 'jamesos:viewmode';

/** Toggle the no-gimmick reading mode. Driven by a class on <html> so it works
 *  across the server-rendered static site and the client JamesOS shell without
 *  shared React state. */
export function setSimpleView(on: boolean) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.toggle(SIMPLE_VIEW_CLASS, on);
  try {
    sessionStorage.setItem(SIMPLE_VIEW_STORAGE_KEY, on ? '1' : '0');
  } catch {
    /* storage unavailable — class still applies for this load */
  }
  window.dispatchEvent(new CustomEvent(VIEW_MODE_EVENT, { detail: { simple: on } }));
}

export function isSimpleView(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains(SIMPLE_VIEW_CLASS);
}
