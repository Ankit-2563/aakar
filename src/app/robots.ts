import { MetadataRoute } from 'next';
import { NEXT_PUBLIC_SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'], // Blocks system from crawling internal routes
    },
    sitemap: `${NEXT_PUBLIC_SITE_URL}/sitemap.xml`, // Directly points all bots to the sitemap
  };
}
