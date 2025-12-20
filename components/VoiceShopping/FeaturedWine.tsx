'use client'

import { useState } from 'react'
import Link from 'next/link'

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

interface FeaturedWineProps {
  wine: Wine
  onAddToCart: () => void
  isInCart: boolean
}

export function FeaturedWine({ wine, onAddToCart, isInCart }: FeaturedWineProps) {
  const [showSparkle, setShowSparkle] = useState(false)
  const price = typeof wine.price_retail === 'string' ? parseFloat(wine.price_retail) : wine.price_retail
  const displayPrice = price ? `£${price.toLocaleString('en-GB', { minimumFractionDigits: 2 })}` : 'Price on request'

  const handleAddToCart = () => {
    if (isInCart) return
    setShowSparkle(true)
    onAddToCart()
    setTimeout(() => setShowSparkle(false), 1500)
  }

  return (
    <div className="wine-reveal wine-displayed bg-gradient-to-b from-stone-900/95 to-stone-950/95 rounded-2xl border border-gold-700/30 overflow-hidden backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
        {/* Wine Image */}
        <Link
          href={`/wines/${wine.slug || wine.id}`}
          className="relative w-full sm:w-32 md:w-40 flex-shrink-0 group"
        >
          <div className="aspect-[3/4] relative overflow-hidden rounded-xl bg-stone-800">
            <img
              src={wine.image_url || '/wine-placeholder.svg'}
              alt={wine.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Subtle glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gold-500/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </Link>

        {/* Wine Details */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <Link
              href={`/wines/${wine.slug || wine.id}`}
              className="block group"
            >
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-gold-400 transition-colors line-clamp-2">
                {wine.name}
              </h3>
            </Link>
            <p className="text-stone-400 text-sm mt-1">
              {wine.winery}
            </p>
            <p className="text-stone-500 text-xs mt-1">
              {wine.region}{wine.vintage ? ` · ${wine.vintage}` : ''}
            </p>
            {wine.grape_variety && (
              <p className="text-stone-500 text-xs mt-0.5">
                {wine.grape_variety}
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Price */}
            <span className="text-2xl font-bold text-gold-400">
              {displayPrice}
            </span>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`
                relative px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300
                ${isInCart
                  ? 'bg-green-600/80 text-white cursor-default'
                  : 'bg-gradient-to-r from-gold-500 to-gold-600 text-black hover:from-gold-400 hover:to-gold-500 hover:shadow-[0_0_20px_rgba(212,165,10,0.5)]'
                }
              `}
            >
              {/* Sparkle container */}
              {showSparkle && (
                <div className="sparkle-container">
                  <div className="sparkle"></div>
                  <div className="sparkle"></div>
                  <div className="sparkle"></div>
                  <div className="sparkle"></div>
                  <div className="sparkle"></div>
                  <div className="sparkle"></div>
                  <div className="sparkle"></div>
                  <div className="sparkle"></div>
                </div>
              )}

              {/* Button shimmer */}
              {!isInCart && (
                <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </span>
              )}

              <span className="relative flex items-center gap-2">
                {isInCart ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    In Your Selection
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
