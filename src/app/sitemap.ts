import { MetadataRoute } from 'next';
import { NEXT_PUBLIC_SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: NEXT_PUBLIC_SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1, // Highest priority for index
    },
    {
      url: `${NEXT_PUBLIC_SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8, // Secondary page (will appear as a Sitelink in Google)
    },
    // When you have a database of projects in the future, you would fetch them here and map over them to return dynamic project[id] routes!
  ];
}
