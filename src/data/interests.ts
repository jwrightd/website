import type { PersonalInterest } from '@/types';

export const PERSONAL_INTERESTS: PersonalInterest[] = [
  {
    id: 'chess',
    name: 'Chess',
    category: 'Personal interest',
    status: 'Active',
    overview:
      "I started learning the Royal Game when I was 4 or 5. I think the beauty created on the chessboard is like no other, and I have continued to explore it over the past decade.",
    recognition: [
      'USCF Candidate Master',
      '6x State Champion (team and individual)',
      '3x National Team Champion',
      'Top 100 rapid players globally on Lichess.org',
      'Top 0.04% of Chess.com blitz players',
      'Peaked at #41 for age 18 in June 2025',
      'Virginia College State Champion (March 2026)',
      '2x National Team Runner-Up',
      'Won the 10th Cherry Blossom Classic U2000 with a perfect 9/9 score, featured in The Washington Times.',
      'Featured again in The Washington Times for a Round 1 upset over an International Master at the 2023 North American Junior U20.',
      '12th out of 243 individually at SuperNationals VIII',
      '12th individually in the 2024 National 12th Grade Championship',
      'Fourth-place individual finish at the 2024 Virginia State Championship',
      'Sixth-place individual finish at the 2025 Virginia State Championship',
    ],
    links: [
      {
        label: 'Washington Times on Cherry Blossom Classic',
        href: 'https://www.washingtontimes.com/news/2023/may/30/big-guns-in-chess-bring-firepower-at-strong-cherry/',
        kind: 'article',
      },
      {
        label: 'Washington Times on North American Junior U20 upset win',
        href: 'https://www.washingtontimes.com/news/2024/jan/2/ringing-in-new-year-with-some-nice-chess-wins-from/',
        kind: 'article',
      },
    ],
    accent: '#f59e0b',
  },
  {
    id: 'wrestling',
    name: 'Wrestling',
    category: 'Personal interest',
    status: 'Active',
    overview:
      'For over 10 years, wrestling and martial arts have been a major part of my life.',
    recognition: [
      'Varsity Wrestling',
      'Liberty District Champion',
      'State Qualifier',
    ],
    accent: '#32d74b',
  },
];
