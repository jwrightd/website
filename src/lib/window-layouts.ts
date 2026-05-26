import { APPS } from '@/data/apps';
import type { AppId, WindowPosition, WindowSize, WindowState } from '@/types';

const WORKSPACE_MARGIN = 24;
const WORKSPACE_TOP = 44;
const WORKSPACE_BOTTOM = 110;
const WINDOW_GAP = 16;
export const WINDOW_CHROME_HEIGHT = 40;
const FALLBACK_MIN_SIZE: WindowSize = { width: 360, height: 220 };

interface WorkspaceBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface WindowRect {
  position: WindowPosition;
  size: WindowSize;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getDesktopWorkspaceBounds(): WorkspaceBounds {
  if (typeof window === 'undefined') {
    return {
      left: WORKSPACE_MARGIN,
      top: WORKSPACE_TOP,
      width: 1280 - WORKSPACE_MARGIN * 2,
      height: 800 - WORKSPACE_TOP - WORKSPACE_BOTTOM,
    };
  }

  return {
    left: WORKSPACE_MARGIN,
    top: WORKSPACE_TOP,
    width: Math.max(window.innerWidth - WORKSPACE_MARGIN * 2, 680),
    height: Math.max(window.innerHeight - WORKSPACE_TOP - WORKSPACE_BOTTOM, 440),
  };
}

export function normalizeWindowRect(
  position: WindowPosition,
  size: WindowSize,
  minSize: WindowSize = FALLBACK_MIN_SIZE
): WindowRect {
  const bounds = getDesktopWorkspaceBounds();
  const maxHeight = bounds.height - WINDOW_CHROME_HEIGHT;
  const boundedMinWidth = Math.min(minSize.width, bounds.width);
  const boundedMinHeight = Math.min(minSize.height, maxHeight);
  const nextSize = {
    width: clamp(size.width, boundedMinWidth, bounds.width),
    height: clamp(size.height, boundedMinHeight, maxHeight),
  };

  return {
    size: nextSize,
    position: {
      x: clamp(position.x, bounds.left, bounds.left + bounds.width - nextSize.width),
      y: clamp(position.y, bounds.top, bounds.top + bounds.height - nextSize.height - WINDOW_CHROME_HEIGHT),
    },
  };
}

export function getArrangedWindowLayouts(ids: AppId[]): Partial<Record<AppId, WindowRect>> {
  const bounds = getDesktopWorkspaceBounds();

  if (ids.length === 0) {
    return {};
  }

  if (ids.length === 1) {
    const width = Math.min(Math.floor(bounds.width * 0.66), 860);
    const height = Math.min(Math.floor(bounds.height * 0.8), 640) - WINDOW_CHROME_HEIGHT;
    return {
      [ids[0]]: {
        size: { width, height },
        position: {
          x: bounds.left + Math.floor((bounds.width - width) / 2),
          y: bounds.top + Math.floor((bounds.height - height) / 2),
        },
      },
    };
  }

  if (ids.length === 2) {
    const width = Math.floor((bounds.width - WINDOW_GAP) / 2);
    const height = Math.min(Math.floor(bounds.height * 0.86), 640) - WINDOW_CHROME_HEIGHT;
    return {
      [ids[0]]: {
        size: { width, height },
        position: { x: bounds.left, y: bounds.top + 8 },
      },
      [ids[1]]: {
        size: { width, height },
        position: { x: bounds.left + width + WINDOW_GAP, y: bounds.top + 8 },
      },
    };
  }

  if (ids.length === 3) {
    const leftWidth = Math.floor(bounds.width * 0.46);
    const rightWidth = bounds.width - leftWidth - WINDOW_GAP;
    const topHeight = Math.floor(bounds.height * 0.6);
    const bottomHeight = bounds.height - topHeight - WINDOW_GAP;

    return {
      [ids[0]]: {
        size: { width: leftWidth, height: bounds.height - WINDOW_CHROME_HEIGHT },
        position: { x: bounds.left, y: bounds.top },
      },
      [ids[1]]: {
        size: { width: rightWidth, height: topHeight - WINDOW_CHROME_HEIGHT },
        position: { x: bounds.left + leftWidth + WINDOW_GAP, y: bounds.top },
      },
      [ids[2]]: {
        size: { width: rightWidth, height: bottomHeight - WINDOW_CHROME_HEIGHT },
        position: {
          x: bounds.left + leftWidth + WINDOW_GAP,
          y: bounds.top + topHeight + WINDOW_GAP,
        },
      },
    };
  }

  const columns = ids.length <= 4 ? 2 : 3;
  const rows = Math.ceil(ids.length / columns);
  const width = Math.floor((bounds.width - WINDOW_GAP * (columns - 1)) / columns);
  const height = Math.floor((bounds.height - WINDOW_GAP * (rows - 1)) / rows) - WINDOW_CHROME_HEIGHT;

  return ids.reduce<Partial<Record<AppId, WindowRect>>>((layouts, id, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);

    layouts[id] = {
      size: { width, height },
      position: {
        x: bounds.left + column * (width + WINDOW_GAP),
        y: bounds.top + row * (height + WINDOW_GAP),
      },
    };

    return layouts;
  }, {});
}

export function getRecruiterModeLayouts(): Partial<Record<AppId, WindowRect>> {
  const bounds = getDesktopWorkspaceBounds();
  const leftWidth = clamp(Math.floor(bounds.width * 0.44), 520, 640);
  const rightWidth = bounds.width - leftWidth - WINDOW_GAP;
  const projectsHeight = clamp(Math.floor(bounds.height * 0.63), 340, 520);
  const contactHeight = bounds.height - projectsHeight - WINDOW_GAP;

  return {
    resume: {
      size: { width: leftWidth, height: bounds.height - WINDOW_CHROME_HEIGHT },
      position: { x: bounds.left, y: bounds.top },
    },
    projects: {
      size: { width: rightWidth, height: projectsHeight - WINDOW_CHROME_HEIGHT },
      position: { x: bounds.left + leftWidth + WINDOW_GAP, y: bounds.top },
    },
    contact: {
      size: { width: rightWidth, height: contactHeight - WINDOW_CHROME_HEIGHT },
      position: {
        x: bounds.left + leftWidth + WINDOW_GAP,
        y: bounds.top + projectsHeight + WINDOW_GAP,
      },
    },
  };
}

export function getNormalizedWindowState(windowState: WindowState): WindowState {
  const minSize =
    APPS.find((app) => app.id === windowState.id)?.minSize ?? FALLBACK_MIN_SIZE;
  const normalized = normalizeWindowRect(windowState.position, windowState.size, minSize);

  return {
    ...windowState,
    position: normalized.position,
    size: normalized.size,
  };
}
