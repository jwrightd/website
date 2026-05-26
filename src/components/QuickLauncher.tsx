'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  FolderOpen,
  FlaskConical,
  GitBranch,
  Mail,
  Monitor,
  Search,
  User,
  Users,
  WandSparkles,
  type LucideProps,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Briefcase,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  FolderOpen,
  FlaskConical,
  GitBranch,
  Mail,
  Monitor,
  Search,
  User,
  Users,
  WandSparkles,
};

export interface QuickLauncherItem {
  id: string;
  title: string;
  subtitle: string;
  group: 'Apps' | 'Projects' | 'Actions';
  iconName: string;
  keywords?: string[];
  onSelect: () => void;
}

interface QuickLauncherProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: QuickLauncherItem[];
}

const GROUP_ORDER: Record<QuickLauncherItem['group'], number> = {
  Actions: 0,
  Apps: 1,
  Projects: 2,
};

function getScore(item: QuickLauncherItem, query: string) {
  if (!query) {
    return 0;
  }

  const haystack = [item.title, item.subtitle, ...(item.keywords ?? [])].join(' ').toLowerCase();
  if (!haystack.includes(query)) {
    return Number.NEGATIVE_INFINITY;
  }

  if (item.title.toLowerCase().startsWith(query)) {
    return 4;
  }

  if (item.title.toLowerCase().includes(query)) {
    return 3;
  }

  if (item.subtitle.toLowerCase().includes(query)) {
    return 2;
  }

  return 1;
}

export default function QuickLauncher({
  open,
  onOpenChange,
  items,
}: QuickLauncherProps) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onOpenChange(!open);
      }

      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && <QuickLauncherPanel items={items} onOpenChange={onOpenChange} />}
    </AnimatePresence>
  );
}

function QuickLauncherPanel({
  items,
  onOpenChange,
}: {
  items: QuickLauncherItem[];
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    window.setTimeout(() => inputRef.current?.focus(), 40);
  }, []);

  const filtered = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();

    return items
      .map((item) => ({ item, score: getScore(item, trimmedQuery) }))
      .filter(({ score }) => score > Number.NEGATIVE_INFINITY)
      .sort((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score;
        }

        if (GROUP_ORDER[left.item.group] !== GROUP_ORDER[right.item.group]) {
          return GROUP_ORDER[left.item.group] - GROUP_ORDER[right.item.group];
        }

        return left.item.title.localeCompare(right.item.title);
      })
      .map(({ item }) => item);
  }, [items, query]);
  const boundedSelectedIdx = filtered.length
    ? Math.min(selectedIdx, filtered.length - 1)
    : 0;

  useEffect(() => {
    if (!filtered.length) {
      return;
    }

    itemRefs.current[boundedSelectedIdx]?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }, [boundedSelectedIdx, filtered]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filtered.length) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIdx((current) => (current + 1) % filtered.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIdx((current) => (current - 1 + filtered.length) % filtered.length);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      filtered[boundedSelectedIdx]?.onSelect();
      onOpenChange(false);
    }
  };

  const runItem = (item: QuickLauncherItem) => {
    item.onSelect();
    onOpenChange(false);
  };

  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.14 }}
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 z-[9990]"
        style={{ background: 'rgba(0,0,0,0.56)', backdropFilter: 'blur(4px)' }}
      />

      <motion.div
        key="launcher"
        initial={{ opacity: 0, scale: 0.98, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -10 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        className="fixed left-1/2 top-[18%] z-[9991] w-[640px] max-w-[calc(100vw-32px)] -translate-x-1/2 overflow-hidden rounded-xl border"
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
          background: 'rgba(26,26,28,0.98)',
          boxShadow: '0 28px 80px rgba(0,0,0,0.58)',
        }}
      >
        <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <Search size={15} className="shrink-0 text-white/32" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedIdx(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search apps, projects, and actions"
            className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/26"
          />
          <kbd className="rounded border px-1.5 py-0.5 font-mono text-[10px]" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.25)' }}>
            ESC
          </kbd>
        </div>

        <div className="max-h-[420px] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="px-4 py-10 text-center text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              No matches for “{query}”
            </p>
          ) : (
            filtered.map((item, index) => {
              const previousGroup = filtered[index - 1]?.group;
              const showGroupLabel = index === 0 || previousGroup !== item.group;
              const Icon = ICON_MAP[item.iconName] ?? WandSparkles;
              const isSelected = index === boundedSelectedIdx;

              return (
                <div key={item.id}>
                  {showGroupLabel && (
                    <div className="px-4 pb-1 pt-2 text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {item.group}
                    </div>
                  )}
                  <button
                    ref={(node) => {
                      itemRefs.current[index] = node;
                    }}
                    onClick={() => runItem(item)}
                    onMouseEnter={() => setSelectedIdx(index)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left"
                    style={{ background: isSelected ? 'rgba(255,255,255,0.06)' : 'transparent' }}
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
                      style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
                    >
                      <Icon size={15} className="text-white/72" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.84)' }}>
                        {item.title}
                      </p>
                      <p className="truncate text-[11.5px]" style={{ color: 'rgba(255,255,255,0.34)' }}>
                        {item.subtitle}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.24)' }}>
                        ↵
                      </span>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div
          className="flex items-center justify-between border-t px-4 py-2 text-[11px]"
          style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.24)' }}
        >
          <span>Use arrow keys to move</span>
          <span>Press Enter to run</span>
        </div>
      </motion.div>
    </>
  );
}
