import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sommelier.quest'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/handler/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
