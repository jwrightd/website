import { LEETCODE } from '@/data/leetcode';
import { NEETCODE_150, NEETCODE_150_TOTAL } from '@/data/neetcode-150';
import type { LeetCodeProgress, LeetCodeTopicProgress } from '@/types';

const GITHUB_TREE_URL = `https://api.github.com/repos/${LEETCODE.repoOwner}/${LEETCODE.repoName}/git/trees/master?recursive=1`;
const GITHUB_REPO_URL = `https://api.github.com/repos/${LEETCODE.repoOwner}/${LEETCODE.repoName}`;
const FOLDER_SLUG_RE = /^\d{4}-([^/]+)\//;

interface GitHubTreeResponse {
  tree: Array<{ path: string; type: string }>;
}

interface GitHubRepoResponse {
  pushed_at: string;
}

function parseRepoSlugs(tree: GitHubTreeResponse['tree']): Set<string> {
  const slugs = new Set<string>();
  for (const entry of tree) {
    const match = entry.path.match(FOLDER_SLUG_RE);
    if (match) slugs.add(match[1]);
  }
  return slugs;
}

function buildProgress(repoSlugs: Set<string>, lastSynced: string | null): LeetCodeProgress {
  const solvedNeetcode = NEETCODE_150.filter((problem) => repoSlugs.has(problem.slug));
  const topicMap = new Map<string, LeetCodeTopicProgress>();

  for (const problem of NEETCODE_150) {
    const current = topicMap.get(problem.topic) ?? { topic: problem.topic, solved: 0, total: 0 };
    current.total += 1;
    if (repoSlugs.has(problem.slug)) current.solved += 1;
    topicMap.set(problem.topic, current);
  }

  const byTopic = [...topicMap.values()]
    .filter((entry) => entry.solved > 0)
    .sort((a, b) => b.solved / b.total - a.solved / a.total || b.solved - a.solved)
    .slice(0, 6);

  const byDifficulty = { Easy: 0, Medium: 0, Hard: 0 } as LeetCodeProgress['byDifficulty'];
  for (const problem of solvedNeetcode) {
    byDifficulty[problem.difficulty] += 1;
  }

  const neetcodeSolved = solvedNeetcode.length;

  return {
    totalRepoSolved: repoSlugs.size,
    neetcodeSolved,
    neetcodeTotal: NEETCODE_150_TOTAL,
    percent: Math.round((neetcodeSolved / NEETCODE_150_TOTAL) * 100),
    byTopic,
    byDifficulty,
    lastSynced,
  };
}

export async function fetchLeetCodeProgress(): Promise<LeetCodeProgress> {
  try {
    const [treeRes, repoRes] = await Promise.all([
      fetch(GITHUB_TREE_URL, {
        next: { revalidate: 900 },
        headers: { Accept: 'application/vnd.github+json' },
      }),
      fetch(GITHUB_REPO_URL, {
        next: { revalidate: 900 },
        headers: { Accept: 'application/vnd.github+json' },
      }),
    ]);

    if (!treeRes.ok) throw new Error(`GitHub tree ${treeRes.status}`);

    const tree = (await treeRes.json()) as GitHubTreeResponse;
    const repoSlugs = parseRepoSlugs(tree.tree);

    let lastSynced: string | null = null;
    if (repoRes.ok) {
      const repo = (await repoRes.json()) as GitHubRepoResponse;
      lastSynced = repo.pushed_at;
    }

    return buildProgress(repoSlugs, lastSynced);
  } catch {
    return buildProgress(new Set(), null);
  }
}
