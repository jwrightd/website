import type { ReactNode } from 'react';
import type { CSSProperties } from 'react';

export function SurfacePanel({
  children,
  className = '',
  styleOverride,
}: {
  children: ReactNode;
  className?: string;
  styleOverride?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-[10px] border px-4 py-4 ${className}`.trim()}
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
        ...styleOverride,
      }}
    >
      {children}
    </div>
  );
}

export function SectionBlock({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div>
        <h3 className="text-[13.5px] font-semibold" style={{ color: 'var(--os-text)' }}>
          {title}
        </h3>
        {description ? (
          <p className="mt-1 text-[12.5px] leading-[1.7]" style={{ color: 'var(--os-text-3)' }}>
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function LeadText({ children }: { children: ReactNode }) {
  return (
    <p className="text-[15px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.74)' }}>
      {children}
    </p>
  );
}

export function BodyText({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13.5px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.58)' }}>
      {children}
    </p>
  );
}

export function MetaGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

export function MetaTile({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div
      className="rounded-[10px] border px-3.5 py-3"
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.025)',
      }}
    >
      <p className="text-[11.5px]" style={{ color: 'var(--os-text-3)' }}>
        {label}
      </p>
      <p className="mt-1 text-[13px] leading-[1.7]" style={{ color: accent ?? 'var(--os-text-2)' }}>
        {value}
      </p>
    </div>
  );
}

export function BulletList({
  items,
  accent,
}: {
  items: string[];
  accent?: string;
}) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span
            className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: accent ?? 'rgba(255,255,255,0.42)' }}
          />
          <span className="text-[13.5px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.62)' }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-md border px-2 py-1 text-[12px]"
          style={{
            borderColor: 'rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
            color: 'rgba(255,255,255,0.68)',
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function KeyValueRows({
  rows,
}: {
  rows: ReadonlyArray<{
    label: string;
    value: string;
  }>;
}) {
  return (
    <div className="flex flex-col gap-0">
      {rows.map(({ label, value }, index) => (
        <div
          key={label}
          className="flex items-start justify-between gap-4 border-b py-2.5 last:border-b-0"
          style={{ borderColor: index === rows.length - 1 ? 'transparent' : 'rgba(255,255,255,0.05)' }}
        >
          <span className="text-[12px]" style={{ color: 'var(--os-text-3)' }}>
            {label}
          </span>
          <span className="text-right text-[13px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
