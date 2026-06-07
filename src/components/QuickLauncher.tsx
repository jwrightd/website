'use client';

import { Command } from 'cmdk';
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
  Trophy,
  User,
  Users,
  WandSparkles,
  type LucideProps,
} from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';

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
  Trophy,
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

const GROUP_ORDER: QuickLauncherItem['group'][] = ['Actions', 'Apps', 'Projects'];

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
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const groupedItems = useMemo(
    () =>
      GROUP_ORDER.map((group) => ({
        group,
        items: items
          .filter((item) => item.group === group)
          .sort((left, right) => left.title.localeCompare(right.title)),
      })).filter(({ items }) => items.length > 0),
    [items]
  );

  useEffect(() => {
    window.setTimeout(() => inputRef.current?.focus(), 40);
  }, []);

  const scrollSelectedIntoView = () => {
    window.requestAnimationFrame(() => {
      listRef.current
        ?.querySelector('[cmdk-item][data-selected="true"]')
        ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
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
        <Command
          loop
          label="JamesOS command launcher"
          className="quick-command-palette"
          onKeyDownCapture={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              onOpenChange(false);
              return;
            }

            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              scrollSelectedIntoView();
            }
          }}
        >
          <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <Search size={15} className="shrink-0 text-white/32" />
            <Command.Input
              ref={inputRef}
              placeholder="Search apps, projects, and actions"
              className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/26"
              onValueChange={scrollSelectedIntoView}
            />
            <kbd className="rounded border px-1.5 py-0.5 font-mono text-[10px]" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.25)' }}>
              ESC
            </kbd>
          </div>

          <Command.List ref={listRef} className="max-h-[420px] overflow-y-auto py-2">
            <Command.Empty className="px-4 py-10 text-center text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              No matching command
            </Command.Empty>

            {groupedItems.map(({ group, items }) => (
              <Command.Group
                key={group}
                heading={group}
                className="quick-command-group"
              >
                {items.map((item) => {
                  const Icon = ICON_MAP[item.iconName] ?? WandSparkles;

                  return (
                    <Command.Item
                      key={item.id}
                      value={`${item.title} ${item.subtitle}`}
                      keywords={[item.id, item.group, ...(item.keywords ?? [])]}
                      onSelect={() => runItem(item)}
                      className="quick-command-item flex w-full cursor-default items-center gap-3 px-4 py-2.5 text-left"
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
                      <span className="text-[10.5px]" style={{ color: 'rgba(255,255,255,0.24)' }}>
                        Enter
                      </span>
                    </Command.Item>
                  );
                })}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </motion.div>
    </>
  );
}
