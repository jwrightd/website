import { ArrowUpRight } from 'lucide-react';
import { LEETCODE } from '@/data/leetcode';
import { fetchLeetCodeProgress } from '@/lib/leetcode-progress';

const cardStyle = {
  borderColor: 'rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
} as const;

function formatSyncedAt(iso: string | null) {
  if (!iso) return 'Syncs daily from GitHub';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'Syncs daily from GitHub';
  return `Repo updated ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
}

export default async function SimpleLeetCodeSection() {
  const progress = await fetchLeetCodeProgress();

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_420px] lg:items-start">
      <div className="rounded-xl border px-4 py-4 sm:px-5 sm:py-5" style={cardStyle}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-[15px] font-semibold" style={{ color: 'rgba(255,255,255,0.88)' }}>
              NeetCode 150
            </h3>
            <p className="mt-1 text-[12.5px]" style={{ color: 'rgba(255,255,255,0.46)' }}>
              {formatSyncedAt(progress.lastSynced)} · via{' '}
              <a href={LEETCODE.repoUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#c7d9ff' }}>
                jwrightd/leetcode
              </a>
            </p>
          </div>
          <a
            href={LEETCODE.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[12px] font-semibold"
            style={{ color: '#c7d9ff' }}
          >
            View solutions
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </div>

        <div className="mt-5">
          <div className="flex items-end justify-between gap-3">
            <p className="text-[34px] font-semibold leading-none tracking-[-0.02em]" style={{ color: 'rgba(255,255,255,0.92)' }}>
              {progress.neetcodeSolved}
              <span className="text-[18px] font-medium" style={{ color: 'rgba(255,255,255,0.38)' }}>
                {' '}
                / {progress.neetcodeTotal}
              </span>
            </p>
            <p className="text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.52)' }}>
              {progress.percent}% complete
            </p>
          </div>
          <div
            className="mt-3 h-2 overflow-hidden rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            role="progressbar"
            aria-valuenow={progress.neetcodeSolved}
            aria-valuemin={0}
            aria-valuemax={progress.neetcodeTotal}
            aria-label="NeetCode 150 progress"
          >
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progress.percent}%`, background: 'var(--os-accent)' }}
            />
          </div>
          <p className="mt-2 text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {progress.totalRepoSolved} total solutions in repo · {progress.byDifficulty.Easy} easy ·{' '}
            {progress.byDifficulty.Medium} medium · {progress.byDifficulty.Hard} hard (NeetCode 150)
          </p>
        </div>

        {progress.byTopic.length > 0 ? (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {progress.byTopic.map((topic) => {
              const topicPercent = Math.round((topic.solved / topic.total) * 100);
              return (
                <li
                  key={topic.topic}
                  className="rounded-lg border px-3 py-2.5"
                  style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[12.5px] font-medium" style={{ color: 'rgba(255,255,255,0.72)' }}>
                      {topic.topic}
                    </p>
                    <p className="text-[11.5px] tabular-nums" style={{ color: 'rgba(255,255,255,0.42)' }}>
                      {topic.solved}/{topic.total}
                    </p>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full" style={{ width: `${topicPercent}%`, background: 'rgba(79,142,247,0.72)' }} />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      <div className="rounded-xl border overflow-hidden" style={cardStyle}>
        <div className="border-b px-4 py-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.82)' }}>
            LeetCode stats
          </p>
          <p className="mt-0.5 text-[11.5px]" style={{ color: 'rgba(255,255,255,0.42)' }}>
            Live profile · @{LEETCODE.username}
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LEETCODE.statsCardUrl}
          alt={`LeetCode statistics for ${LEETCODE.username}`}
          width={420}
          height={200}
          className="block w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}
