import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { stackServerApp } from '@/stack/server'

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user from Stack Auth
    const user = await stackServerApp.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch user profile from Neon
    const userProfile = await sql`
      SELECT
        id,
        email,
        first_name,
        wine_experience_level,
        preferred_wine_types,
        price_preference,
        neon_auth_id
      FROM users
      WHERE neon_auth_id = ${user.id}
      LIMIT 1
    `

    if (userProfile.length === 0) {
      // Return minimal profile if user not in database yet
      return NextResponse.json({
        displayName: user.displayName || user.primaryEmail?.split('@')[0] || 'Friend',
        email: user.primaryEmail,
        wineExperienceLevel: 'not_specified',
        preferredWineTypes: [],
        pricePreference: 'premium',
        isNewUser: true,
      })
    }

    const profile = userProfile[0]

    return NextResponse.json({
      displayName: profile.first_name || user.displayName || 'Friend',
      email: profile.email,
      wineExperienceLevel: profile.wine_experience_level || 'enthusiast',
      preferredWineTypes: profile.preferred_wine_types?.join(', ') || 'all styles',
      pricePreference: profile.price_preference || 'premium',
      isNewUser: false,
    })
  } catch (error) {
    console.error('[User Profile API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}
