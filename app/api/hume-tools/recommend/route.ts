import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// Hume Tool: Get wine recommendations based on use case
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { use_case, budget } = body

    let wines: any[]

    // Use case specific filtering with tagged template literals
    if (use_case === 'investment') {
      // Investment wines: higher price, good critic scores, aging potential
      wines = await sql`
        SELECT
          id, name, winery, region, country, grape_variety, vintage,
          wine_type, style, price_retail, price_trade, tasting_notes,
          critic_scores, drinking_window, image_url, food_pairings
        FROM wines
        WHERE is_active = true AND price_retail >= 50
        ORDER BY price_retail DESC
        LIMIT 3
      `
    } else if (use_case === 'corporate_event' || use_case === 'event') {
      // Events: good value, crowd pleasers
      if (budget) {
        wines = await sql`
          SELECT
            id, name, winery, region, country, grape_variety, vintage,
            wine_type, style, price_retail, price_trade, tasting_notes,
            critic_scores, drinking_window, image_url, food_pairings
          FROM wines
          WHERE is_active = true AND price_retail <= ${budget}
          ORDER BY price_retail ASC
          LIMIT 3
        `
      } else {
        wines = await sql`
          SELECT
            id, name, winery, region, country, grape_variety, vintage,
            wine_type, style, price_retail, price_trade, tasting_notes,
            critic_scores, drinking_window, image_url, food_pairings
          FROM wines
          WHERE is_active = true
          ORDER BY price_retail ASC
          LIMIT 3
        `
      }
    } else if (use_case === 'fine_dining' || use_case === 'personal') {
      // Fine dining: quality focus
      wines = await sql`
        SELECT
          id, name, winery, region, country, grape_variety, vintage,
          wine_type, style, price_retail, price_trade, tasting_notes,
          critic_scores, drinking_window, image_url, food_pairings
        FROM wines
        WHERE is_active = true
        ORDER BY price_retail DESC
        LIMIT 3
      `
    } else if (use_case === 'restaurant_program') {
      // Restaurant: variety of price points
      wines = await sql`
        SELECT
          id, name, winery, region, country, grape_variety, vintage,
          wine_type, style, price_retail, price_trade, tasting_notes,
          critic_scores, drinking_window, image_url, food_pairings
        FROM wines
        WHERE is_active = true
        ORDER BY wine_type, price_retail ASC
        LIMIT 3
      `
    } else {
      // Default: mix of options
      wines = await sql`
        SELECT
          id, name, winery, region, country, grape_variety, vintage,
          wine_type, style, price_retail, price_trade, tasting_notes,
          critic_scores, drinking_window, image_url, food_pairings
        FROM wines
        WHERE is_active = true
        ORDER BY price_retail ASC
        LIMIT 3
      `
    }

    // Format recommendations with context
    const recommendations = wines.map((wine: any, index: number) => ({
      rank: index + 1,
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
      tasting_notes: wine.tasting_notes,
      critic_scores: wine.critic_scores,
      drinking_window: wine.drinking_window,
      food_pairings: wine.food_pairings,
      image_url: wine.image_url,
      // Add recommendation reason
      recommendation_reason: use_case === 'investment'
        ? 'Strong investment potential with aging capability'
        : use_case === 'event'
        ? 'Excellent value for group settings'
        : use_case === 'fine_dining'
        ? 'Premium selection for special occasions'
        : 'Quality selection from our database'
    }))

    return NextResponse.json({
      success: true,
      use_case: use_case || 'general',
      count: recommendations.length,
      recommendations,
      message: recommendations.length > 0
        ? `Here are ${recommendations.length} recommendations from our database for ${use_case || 'your needs'}`
        : 'No matching wines found for those criteria'
    })

  } catch (error) {
    console.error('[Hume Tool] recommend error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get recommendations' },
      { status: 500 }
    )
  }
}
