type ProjectClickSource = 'card' | 'deck' | 'index' | 'detail';

/** Lightweight event tracking — no-ops when Vercel Analytics is unavailable. */
export function trackProjectClick(projectId: string, source: ProjectClickSource) {
  if (typeof window === 'undefined') return;

  void import('@vercel/analytics')
    .then(({ track }) => {
      track('project_click', { project: projectId, source });
    })
    .catch(() => {
      /* analytics optional in local dev */
    });
}
