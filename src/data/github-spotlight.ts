export interface GitHubSpotlightRepo {
  id: string;
  name: string;
  description: string;
  href: string;
  proof: string;
  projectId?: string;
}

/** Personal and lead repos recruiters should see first — complements team-project cards. */
export const GITHUB_SPOTLIGHT_REPOS: GitHubSpotlightRepo[] = [
  {
    id: 'saynario',
    name: 'Saynario',
    description: 'Voice-first language practice with adaptive roleplay — shipped with demo video and public repo.',
    href: 'https://github.com/jwrightd/Saynario',
    proof: 'HackPrinceton · ElevenLabs',
    projectId: 'saynario',
  },
  {
    id: 'chessengine',
    name: 'chessengine',
    description: 'Python + C++ chess engine with alpha-beta search, transposition tables, and ~1500 Elo self-play rating.',
    href: 'https://github.com/jwrightd/chessengine',
    proof: 'Search & pruning',
    projectId: 'chessengine',
  },
  {
    id: 'fake-news',
    name: 'FakeNewsDetection',
    description: 'BERT fine-tuning on WELFake (~72K articles) — 99.5% accuracy vs classical embedding baselines.',
    href: 'https://github.com/8301Joseph/FakeNewsDetection',
    proof: '99.5% · course NLP',
    projectId: 'fake-news-detection',
  },
];
