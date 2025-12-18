import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// Hume Tool: List all wines in database (summary)
export async function POST(request: NextRequest) {
  try {
    const wines = await sql`
      SELECT
        id, name, winery, region, country, wine_type, vintage,
        price_retail, grape_variety, style
      FROM wines
      WHERE is_active = true
      ORDER BY country, region, name
    `

    // Group by country for easier voice navigation
    const byCountry: Record<string, any[]> = {}
    wines.forEach((wine: any) => {
      const country = wine.country || 'Other'
      if (!byCountry[country]) {
        byCountry[country] = []
      }
      byCountry[country].push({
        id: wine.id,
        name: wine.name,
        winery: wine.winery,
        region: wine.region,
        wine_type: wine.wine_type,
        vintage: wine.vintage,
        price: wine.price_retail ? `£${wine.price_retail}` : null,
        grape: wine.grape_variety,
        style: wine.style,
      })
    })

    // Create summary for voice
    const countrySummary = Object.entries(byCountry).map(([country, wines]) => ({
      country,
      count: wines.length,
      wines: wines,
    }))

    return NextResponse.json({
      success: true,
      total_wines: wines.length,
      countries: Object.keys(byCountry),
      by_country: countrySummary,
      message: `Our database contains ${wines.length} wines from ${Object.keys(byCountry).length} countries: ${Object.keys(byCountry).join(', ')}`
    })

  } catch (error) {
    console.error('[Hume Tool] list-wines error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to list wines' },
      { status: 500 }
    )
  }
}
