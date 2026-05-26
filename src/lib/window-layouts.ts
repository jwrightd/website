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

const OPEN_SCAN_X = 40;
const OPEN_SCAN_Y = 28;
const OPEN_OVERLAP_PADDING = 14;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function rectsOverlap(left: WindowRect, right: WindowRect, padding = 0) {
  const leftRight = left.position.x + left.size.width + padding;
  const rightRight = right.position.x + right.size.width + padding;
  const leftBottom = left.position.y + left.size.height + WINDOW_CHROME_HEIGHT + padding;
  const rightBottom = right.position.y + right.size.height + WINDOW_CHROME_HEIGHT + padding;

  return !(
    leftRight <= right.position.x ||
    rightRight <= left.position.x ||
    leftBottom <= right.position.y ||
    rightBottom <= left.position.y
  );
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

export function getNextOpenWindowRect(
  id: AppId,
  currentWindows: Record<AppId, WindowState>
): WindowRect {
  const app = APPS.find((item) => item.id === id);

  if (!app) {
    return normalizeWindowRect({ x: 88, y: 52 }, { width: 640, height: 420 });
  }

  const visibleWindows = Object.values(currentWindows)
    .filter((windowState) => windowState.isOpen && !windowState.isMinimized && windowState.id !== id)
    .sort((left, right) => right.zIndex - left.zIndex);

  const desiredSize = currentWindows[id]?.size ?? app.defaultSize;
  const minSize = app.minSize ?? FALLBACK_MIN_SIZE;
  const defaultRect = normalizeWindowRect(app.defaultPosition, desiredSize, minSize);

  if (visibleWindows.length === 0) {
    return defaultRect;
  }

  const bounds = getDesktopWorkspaceBounds();
  const existingRects = visibleWindows.map((windowState) => ({
    position: windowState.position,
    size: windowState.size,
  }));
  const anchor = visibleWindows[0];
  const candidatePositions: WindowPosition[] = [
    {
      x: anchor.position.x + anchor.size.width + WINDOW_GAP,
      y: anchor.position.y,
    },
    {
      x: anchor.position.x + OPEN_SCAN_X,
      y: anchor.position.y + OPEN_SCAN_Y,
    },
    ...visibleWindows.map((windowState) => ({
      x: windowState.position.x + windowState.size.width + WINDOW_GAP,
      y: windowState.position.y,
    })),
    ...visibleWindows.map((windowState) => ({
      x: windowState.position.x,
      y: windowState.position.y + windowState.size.height + WINDOW_CHROME_HEIGHT + WINDOW_GAP,
    })),
    ...Array.from({ length: 12 }, (_value, index) => ({
      x: defaultRect.position.x + index * OPEN_SCAN_X,
      y: defaultRect.position.y + index * OPEN_SCAN_Y,
    })),
  ];

  for (const candidate of candidatePositions) {
    const rect = normalizeWindowRect(candidate, desiredSize, minSize);
    const overlapsExisting = existingRects.some((existingRect) =>
      rectsOverlap(rect, existingRect, OPEN_OVERLAP_PADDING)
    );

    if (!overlapsExisting) {
      return rect;
    }
  }

  const maxX = bounds.left + bounds.width - defaultRect.size.width;
  const maxY = bounds.top + bounds.height - defaultRect.size.height - WINDOW_CHROME_HEIGHT;

  for (let y = bounds.top; y <= maxY; y += OPEN_SCAN_Y) {
    for (let x = bounds.left; x <= maxX; x += OPEN_SCAN_X) {
      const rect = normalizeWindowRect({ x, y }, desiredSize, minSize);
      const overlapsExisting = existingRects.some((existingRect) =>
        rectsOverlap(rect, existingRect, OPEN_OVERLAP_PADDING)
      );

      if (!overlapsExisting) {
        return rect;
      }
    }
  }

  return normalizeWindowRect(
    {
      x: anchor.position.x + OPEN_SCAN_X,
      y: anchor.position.y + OPEN_SCAN_Y,
    },
    desiredSize,
    minSize
  );
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
