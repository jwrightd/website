'use client';

import { ArrowUpRight } from 'lucide-react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ProofGroup, Stat } from '@/data/highlights';

interface ProofProject {
  id: string;
  name: string;
  proof: string;
  outcome: string;
  href?: string;
}

interface SimpleProofFlowProps {
  groups: ProofGroup[];
  stats: Stat[];
  projects: ProofProject[];
}

function formatStat(value: number, stat: Stat) {
  const decimals = stat.decimals ?? 0;
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);

  return `${stat.prefix ?? ''}${formatted}${stat.suffix ?? ''}`;
}

function AnimatedStat({ stat }: { stat?: Stat }) {
  const prefersReducedMotion = useReducedMotion();
  const [text, setText] = useState(stat?.display ?? '');

  useEffect(() => {
    if (!stat) return;
    if (prefersReducedMotion || stat.value === null) return;

    const controls = animate(0, stat.value, {
      duration: 1.15,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setText(formatStat(latest, stat)),
      onComplete: () => setText(stat.display),
    });

    return () => controls.stop();
  }, [prefersReducedMotion, stat]);

  if (!stat) return null;

  return (
    <span className="tabular-nums" aria-label={stat.display}>
      {text}
    </span>
  );
}

export default function SimpleProofFlow({ groups, stats, projects }: SimpleProofFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();
  const statsById = useMemo(() => new Map(stats.map((stat) => [stat.id, stat])), [stats]);
  const visibleProjects = projects.slice(0, 5);

  const shouldAnimate = inView && !prefersReducedMotion;

  return (
    <div ref={ref} className="simple-proof-flow relative overflow-hidden rounded-xl border px-5 py-5 md:px-6 md:py-6">
      <svg
        className="pointer-events-none absolute inset-x-6 top-[118px] hidden h-[220px] md:block"
        viewBox="0 0 900 220"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M 24 38 C 190 8, 242 92, 394 68 S 648 24, 876 64"
          fill="none"
          stroke="rgba(79,142,247,0.34)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M 38 164 C 186 194, 286 120, 444 146 S 668 196, 856 132"
          fill="none"
          stroke="rgba(167,139,250,0.24)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ delay: 0.16, duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <div className="relative">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-[18px] font-semibold tracking-[-0.01em]" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Signal map
            </h2>
            <p className="mt-1 max-w-[620px] text-[13.5px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.52)' }}>
              The same work is framed two ways: shipped systems for software teams, math/research signal for quant and ML roles.
            </p>
          </div>
          <a
            href="#projects"
            className="inline-flex w-fit items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12.5px] font-medium"
            style={{
              borderColor: 'rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.035)',
              color: '#c7d9ff',
            }}
          >
            Jump to proof
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              className="rounded-lg border px-4 py-4"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                background: group.id === 'systems' ? 'rgba(79,142,247,0.055)' : 'rgba(167,139,250,0.045)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.08, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.82)' }}>
                {group.label}
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {group.points.map((point, pointIndex) => {
                  const stat = point.statId ? statsById.get(point.statId) : undefined;
                  return (
                    <motion.div
                      key={point.id}
                      className="simple-proof-node rounded-md border px-3 py-3"
                      style={{
                        borderColor: 'rgba(255,255,255,0.07)',
                        background: 'rgba(8,10,14,0.32)',
                      }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + pointIndex * 0.05, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="text-[18px] font-semibold leading-none" style={{ color: 'rgba(255,255,255,0.92)' }}>
                        {stat ? <AnimatedStat stat={stat} /> : point.label}
                      </p>
                      <p className="mt-2 text-[12.5px] font-medium leading-[1.45]" style={{ color: 'rgba(255,255,255,0.64)' }}>
                        {point.label}
                      </p>
                      <p className="mt-1 text-[12px] leading-[1.5]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {point.detail}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          {visibleProjects.map((project) => {
            const content = (
              <>
                <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.82)' }}>
                  {project.name}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.42)' }}>{project.proof}</span>
              </>
            );

            const className =
              'simple-proof-chip inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[12px] leading-none transition-colors';
            const style = {
              borderColor: 'rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.035)',
            } as const;

            return project.href ? (
              <a key={project.id} href={project.href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
                {content}
                <ArrowUpRight size={12} aria-hidden="true" style={{ color: 'rgba(255,255,255,0.42)' }} />
              </a>
            ) : (
              <span key={project.id} className={className} style={style}>
                {content}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
