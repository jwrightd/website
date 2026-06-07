import type { MetadataRoute } from 'next';

const SITE_URL = 'https://jameswright.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date('2026-06-06'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
