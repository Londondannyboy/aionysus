import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// Hume Tool: Search wines in database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { country, region, wine_type, max_price, min_price, style, grape_variety } = body

    // Build dynamic query
    let query = `
      SELECT
        id, name, winery, region, country, grape_variety, vintage,
        wine_type, style, price_retail, price_trade, bottle_size,
        tasting_notes, critic_scores, drinking_window, image_url, supplier
      FROM wines
      WHERE is_active = true
    `
    const conditions: string[] = []
    const params: any[] = []
    let paramIndex = 1

    if (country) {
      conditions.push(`LOWER(country) LIKE LOWER($${paramIndex})`)
      params.push(`%${country}%`)
      paramIndex++
    }

    if (region) {
      conditions.push(`LOWER(region) LIKE LOWER($${paramIndex})`)
      params.push(`%${region}%`)
      paramIndex++
    }

    if (wine_type) {
      conditions.push(`LOWER(wine_type) = LOWER($${paramIndex})`)
      params.push(wine_type)
      paramIndex++
    }

    if (max_price) {
      conditions.push(`price_retail <= $${paramIndex}`)
      params.push(max_price)
      paramIndex++
    }

    if (min_price) {
      conditions.push(`price_retail >= $${paramIndex}`)
      params.push(min_price)
      paramIndex++
    }

    if (style) {
      conditions.push(`LOWER(style) LIKE LOWER($${paramIndex})`)
      params.push(`%${style}%`)
      paramIndex++
    }

    if (grape_variety) {
      conditions.push(`LOWER(grape_variety) LIKE LOWER($${paramIndex})`)
      params.push(`%${grape_variety}%`)
      paramIndex++
    }

    if (conditions.length > 0) {
      query += ' AND ' + conditions.join(' AND ')
    }

    query += ' ORDER BY price_retail ASC LIMIT 5'

    const wines = await sql(query, params)

    // Format for Hume voice response
    const formattedWines = wines.map((wine: any) => ({
      id: wine.id,
      name: wine.name,
      winery: wine.winery,
      region: wine.region,
      country: wine.country,
      grape_variety: wine.grape_variety,
      vintage: wine.vintage,
      wine_type: wine.wine_type,
      style: wine.style,
      price_retail: wine.price_retail ? `£${wine.price_retail}` : null,
      price_trade: wine.price_trade ? `£${wine.price_trade}` : null,
      bottle_size: wine.bottle_size,
      tasting_notes: wine.tasting_notes,
      critic_scores: wine.critic_scores,
      drinking_window: wine.drinking_window,
      image_url: wine.image_url,
      supplier: wine.supplier,
    }))

    return NextResponse.json({
      success: true,
      count: formattedWines.length,
      wines: formattedWines,
      message: formattedWines.length > 0
        ? `Found ${formattedWines.length} wines in our database`
        : 'No wines found matching those criteria in our database'
    })

  } catch (error) {
    console.error('[Hume Tool] search-wines error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to search wines' },
      { status: 500 }
    )
  }
}
