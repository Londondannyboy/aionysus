'use client'

import { WineRack } from './WineRack'
import { ActiveFilters } from './FilterBadges'

interface Wine {
  id: number
  name: string
  slug?: string
  winery: string
  region: string
  country: string
  wine_type: string
  price_retail: string | number
  image_url: string
  vintage?: number
  grape_variety?: string
}

interface VoiceShoppingLayoutProps {
  children: React.ReactNode
  featuredWine: Wine | null
  discussedWines: Wine[]
  activeFilters: ActiveFilters
  onAddToCart: (wine: Wine) => void
  isConnected: boolean
  cartWineIds: number[]
}

export function VoiceShoppingLayout({
  children,
  featuredWine,
  discussedWines,
  activeFilters,
  onAddToCart,
  isConnected,
  cartWineIds
}: VoiceShoppingLayoutProps) {
  const hasWines = featuredWine || discussedWines.length > 0
  const hasFilters = Object.values(activeFilters).some(v => v !== undefined && v !== null)
  const showRack = hasWines || hasFilters || isConnected

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Desktop: Side-by-side layout */}
      <div className={`
        flex flex-col-reverse md:flex-row gap-6 md:gap-8
        transition-all duration-500 ease-out
        ${showRack ? 'md:items-start' : 'md:items-center md:justify-center'}
      `}>
        {/* Voice Widget Container - Left side on desktop, bottom on mobile */}
        <div className={`
          w-full transition-all duration-500 ease-out
          ${showRack
            ? 'md:w-[420px] lg:w-[480px] md:flex-shrink-0'
            : 'md:max-w-2xl'
          }
        `}>
          {children}
        </div>

        {/* Wine Rack Container - Right side on desktop, top on mobile */}
        {showRack && (
          <div className={`
            w-full md:flex-1 min-h-[300px] md:min-h-[500px]
            animate-in fade-in slide-in-from-right-4 duration-500
          `}>
            <WineRack
              featuredWine={featuredWine}
              discussedWines={discussedWines}
              activeFilters={activeFilters}
              onAddToCart={onAddToCart}
              isConnected={isConnected}
              cartWineIds={cartWineIds}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// Re-export types
export type { ActiveFilters }
