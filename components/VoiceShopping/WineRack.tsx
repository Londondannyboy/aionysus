'use client'

import { FeaturedWine } from './FeaturedWine'
import { WineShelf } from './WineShelf'
import { FilterBadges, ActiveFilters } from './FilterBadges'

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

interface WineRackProps {
  featuredWine: Wine | null
  discussedWines: Wine[]
  activeFilters: ActiveFilters
  onAddToCart: (wine: Wine) => void
  isConnected: boolean
  cartWineIds: number[]
}

function EmptyRackState({ isConnected }: { isConnected: boolean }) {
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-8">
        <div className="text-gold-500/30 text-6xl mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <p className="text-stone-400 text-lg font-medium">
          Your discoveries will appear here...
        </p>
        <p className="text-stone-500 text-sm mt-2">
          Commune with the Goddess to begin
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-8">
      <div className="w-12 h-12 border-2 border-gold-500/20 border-t-gold-500/60 rounded-full animate-spin mb-4" />
      <p className="text-stone-400">
        The Goddess is preparing her recommendations...
      </p>
    </div>
  )
}

export function WineRack({
  featuredWine,
  discussedWines,
  activeFilters,
  onAddToCart,
  isConnected,
  cartWineIds
}: WineRackProps) {
  const hasFilters = Object.values(activeFilters).some(v => v !== undefined && v !== null)
  const hasContent = featuredWine || discussedWines.length > 0 || hasFilters

  // Wines for the shelf (exclude the featured wine)
  const shelfWines = featuredWine
    ? discussedWines.filter(w => w.id !== featuredWine.id)
    : discussedWines

  const handleSelectWine = (wine: Wine) => {
    // Could promote to featured, or navigate to product page
    // For now, clicking navigates via the Link in WineShelf
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-stone-900/50 to-stone-950/80 rounded-2xl border border-gold-700/20 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gold-700/20 bg-stone-900/50">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <h2 className="text-gold-300 font-semibold text-sm">Wine Rack</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {!hasContent ? (
          <EmptyRackState isConnected={isConnected} />
        ) : (
          <div className="space-y-4">
            {/* Filter Badges */}
            {hasFilters && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <FilterBadges filters={activeFilters} />
              </div>
            )}

            {/* Featured Wine */}
            {featuredWine && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-gold-400 text-xs font-medium mb-3 text-center md:text-left">
                  The Goddess Recommends
                </p>
                <FeaturedWine
                  wine={featuredWine}
                  onAddToCart={() => onAddToCart(featuredWine)}
                  isInCart={cartWineIds.includes(featuredWine.id)}
                />
              </div>
            )}

            {/* Wine Shelf */}
            {shelfWines.length > 0 && (
              <WineShelf
                wines={shelfWines}
                onSelectWine={handleSelectWine}
                onAddToCart={onAddToCart}
                cartWineIds={cartWineIds}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
