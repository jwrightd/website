export interface HeroPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export const HERO_PHOTOS: HeroPhoto[] = [
  {
    id: 'times-square',
    src: '/photos/hero-times-square.png',
    alt: 'James Wright in Times Square at night',
    caption: 'Times Square',
  },
  {
    id: 'cameron-indoor',
    src: '/photos/hero-cameron-indoor.png',
    alt: 'James Wright at a Duke basketball game in Cameron Indoor Stadium',
    caption: 'Cameron Indoor',
  },
  {
    id: 'duke-festival',
    src: '/photos/hero-duke-festival.png',
    alt: 'James Wright at a Duke campus festival',
    caption: 'Duke campus',
  },
  {
    id: 'lotte-world',
    src: '/photos/hero-lotte-world.png',
    alt: 'James Wright at Lotte World in Seoul',
    caption: 'Seoul',
  },
  {
    id: 'dining-seoul',
    src: '/photos/hero-dining-seoul.png',
    alt: 'James Wright dining in Seoul',
    caption: 'Seoul',
  },
  {
    id: 'upside-down',
    src: '/photos/hero-upside-down.png',
    alt: 'James Wright in an upside-down room installation',
    caption: 'Upside-down room',
  },
  {
    id: 'night-street',
    src: '/photos/hero-night-street.png',
    alt: 'James Wright on a city street at night',
    caption: 'Night walk',
  },
  {
    id: 'dinner',
    src: '/photos/hero-dinner.png',
    alt: 'James Wright at dinner',
    caption: 'Dinner out',
  },
  {
    id: 'childhood',
    src: '/photos/hero-childhood.png',
    alt: 'James Wright as a child in an oversized Steelers jersey',
    caption: 'Throwback',
  },
];
