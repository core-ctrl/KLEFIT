import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://efit.kluniversity.edu.in'; // Replace with actual domain if different

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/portal/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
