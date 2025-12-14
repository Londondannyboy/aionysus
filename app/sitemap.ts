import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sommelier.quest'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/wines`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
  ]

  // Dynamic wine pages - fetch wine IDs from database
  let winePages: MetadataRoute.Sitemap = []
  try {
    const response = await fetch(`${baseUrl}/api/wines`, { cache: 'no-store' })
    if (response.ok) {
      const wines = await response.json()
      winePages = wines.map((wine: { id: number }) => ({
        url: `${baseUrl}/wines/${wine.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    }
  } catch (error) {
    console.error('Error fetching wines for sitemap:', error)
  }

  return [...staticPages, ...winePages]
}
