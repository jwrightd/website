import type { AchievementEntry } from '@/types';

export const ACHIEVEMENTS: AchievementEntry[] = [
  {
    id: 'mingl-preprint',
    label: 'MINGL preprint',
    detail: 'Named co-author on a bioRxiv preprint through the Hickey Lab.',
  },
  {
    id: 'uscf-cm',
    label: 'USCF Candidate Master',
    detail: 'Peaked at #41 nationally for age 18 (June 2025). Three-time National Team Champion and two-time National Team Runner-Up.',
  },
  {
    id: 'chess-online',
    label: 'Online chess rankings',
    detail: 'Peaked at rank 100 in rapid worldwide on Lichess.org (rating 2538) and top 0.04% of Chess.com blitz players.',
    href: 'https://lichess.org/@/jamesw112106/perf/rapid',
    hrefLabel: 'Lichess profile',
    proofImage: {
      src: '/proof/lichess-top100.png',
      alt: 'Lichess rapid statistics showing rating 2538 and worldwide rank 100',
      caption: 'Lichess rapid at peak · rank 100 worldwide',
    },
  },
  {
    id: 'chess-virginia-college',
    label: 'Virginia College State Champion',
    detail: 'Won the Virginia College State Championship in March 2026. Six-time Virginia state champion across team and individual events.',
  },
  {
    id: 'chess-scholastic',
    label: 'Scholastic & open chess',
    detail: 'Won the Cherry Blossom Classic U2000 with a perfect 9/9 score. Featured in The Washington Times for a Round 1 upset over an International Master at the 2023 North American Junior U20.',
  },
];
