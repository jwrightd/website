import type { Stat } from '@/data/highlights';

/** Avoid count-up flash by showing the settled display until animation has started. */
export function formatAnimatedStat(stat: Stat, animated: number) {
  if (stat.value == null) return stat.display;
  if (animated < stat.value * 0.04) return stat.display;
  return `${stat.prefix ?? ''}${animated.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ''}`;
}
