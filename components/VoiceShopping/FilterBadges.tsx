'use client'

import { useMemo } from 'react'

export interface ActiveFilters {
  region?: string
  wine_type?: string
  color?: string
  max_price?: number
  min_price?: number
  country?: string
  grape_variety?: string
  vintage?: number
}

interface FilterBadgesProps {
  filters: ActiveFilters
}

interface Badge {
  type: 'region' | 'country' | 'type' | 'color' | 'price' | 'grape' | 'vintage'
  label: string
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function FilterBadges({ filters }: FilterBadgesProps) {
  const badges = useMemo(() => {
    const result: Badge[] = []

    if (filters.region) {
      result.push({ type: 'region', label: filters.region })
    }
    if (filters.country) {
      result.push({ type: 'country', label: filters.country })
    }
    if (filters.wine_type) {
      result.push({ type: 'type', label: capitalize(filters.wine_type) })
    }
    if (filters.color) {
      result.push({ type: 'color', label: capitalize(filters.color) })
    }
    if (filters.grape_variety) {
      result.push({ type: 'grape', label: filters.grape_variety })
    }
    if (filters.vintage) {
      result.push({ type: 'vintage', label: filters.vintage.toString() })
    }
    // Price range
    if (filters.min_price && filters.max_price) {
      result.push({ type: 'price', label: `£${filters.min_price} - £${filters.max_price}` })
    } else if (filters.max_price) {
      result.push({ type: 'price', label: `Under £${filters.max_price}` })
    } else if (filters.min_price) {
      result.push({ type: 'price', label: `From £${filters.min_price}` })
    }

    return result
  }, [filters])

  if (badges.length === 0) {
    return null
  }

  const getBadgeStyles = (type: Badge['type']) => {
    switch (type) {
      case 'region':
      case 'country':
        return 'bg-gold-900/60 text-gold-300 border-gold-600/40'
      case 'type':
      case 'color':
        return 'bg-wine-900/60 text-wine-300 border-wine-600/40'
      case 'price':
        return 'bg-emerald-900/60 text-emerald-300 border-emerald-600/40'
      case 'grape':
        return 'bg-purple-900/60 text-purple-300 border-purple-600/40'
      case 'vintage':
        return 'bg-amber-900/60 text-amber-300 border-amber-600/40'
      default:
        return 'bg-stone-800/60 text-stone-300 border-stone-600/40'
    }
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
      {badges.map((badge, index) => (
        <span
          key={`${badge.type}-${badge.label}`}
          className={`
            inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium
            border backdrop-blur-sm
            animate-[badge-enter_0.3s_ease-out_forwards]
            ${getBadgeStyles(badge.type)}
          `}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {badge.type === 'price' && (
            <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {(badge.type === 'region' || badge.type === 'country') && (
            <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
          {badge.label}
        </span>
      ))}
    </div>
  )
}
