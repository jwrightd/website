import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { QUANT_COURSEWORK, QUANT_SIGNALS, QUANT_SUMMARY } from '@/data/quant';

const cardStyle = {
  borderColor: 'rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
} as const;

export default function SimpleQuantSection() {
  return (
    <div className="rounded-xl border px-4 py-4 sm:px-5 sm:py-5" style={cardStyle}>
      <p className="max-w-[720px] text-[14px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.58)' }}>
        {QUANT_SUMMARY}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {QUANT_COURSEWORK.map((course) => (
          <span
            key={course}
            className="rounded-md border px-2 py-1 text-[11.5px]"
            style={{
              borderColor: 'rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              color: 'rgba(255,255,255,0.52)',
            }}
          >
            {course}
          </span>
        ))}
      </div>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {QUANT_SIGNALS.map((signal) => (
          <li
            key={signal.id}
            className="rounded-lg border px-3 py-3"
            style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
          >
            <p className="text-[13.5px] font-semibold" style={{ color: 'rgba(255,255,255,0.84)' }}>
              {signal.title}
            </p>
            <p className="mt-1.5 text-[12.5px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {signal.detail}
            </p>
            {signal.projectId ? (
              <Link
                href={`/projects/${signal.projectId}`}
                className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold"
                style={{ color: '#c7d9ff' }}
              >
                View project
                <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
