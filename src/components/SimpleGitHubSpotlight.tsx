import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { GITHUB_SPOTLIGHT_REPOS } from '@/data/github-spotlight';
import { PROFILE } from '@/data/profile';

const cardStyle = {
  borderColor: 'rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
} as const;

export default function SimpleGitHubSpotlight() {
  return (
    <div className="rounded-xl border px-4 py-4 sm:px-5 sm:py-5" style={cardStyle}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-[15px] font-semibold tracking-[-0.01em]" style={{ color: 'rgba(255,255,255,0.88)' }}>
            GitHub spotlight
          </h3>
          <p className="mt-1 max-w-[520px] text-[13px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.48)' }}>
            Personal repos and lead contributions — start here before team hackathon repos.
          </p>
        </div>
        <a
          href={PROFILE.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-[12.5px] font-semibold"
          style={{ color: '#c7d9ff' }}
        >
          {PROFILE.githubDisplay}
          <ArrowUpRight size={12} aria-hidden="true" />
        </a>
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {GITHUB_SPOTLIGHT_REPOS.map((repo) => (
          <li
            key={repo.id}
            className="rounded-lg border px-3 py-3"
            style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
          >
            <p className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.84)' }}>
              {repo.name}
            </p>
            <p className="mt-1 text-[11.5px] font-medium" style={{ color: 'rgba(255,255,255,0.38)' }}>
              {repo.proof}
            </p>
            <p className="mt-2 text-[12.5px] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.52)' }}>
              {repo.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[12px] font-semibold"
                style={{ color: '#c7d9ff' }}
              >
                Repo
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
              {repo.projectId ? (
                <Link
                  href={`/projects/${repo.projectId}`}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold"
                  style={{ color: '#c7d9ff' }}
                >
                  Case study
                  <ArrowUpRight size={12} aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
