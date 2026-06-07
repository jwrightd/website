import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/data/projects';

const SITE_URL = 'https://jameswright.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.id}`,
    lastModified: new Date('2026-06-07'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date('2026-06-07'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectEntries,
  ];
}
