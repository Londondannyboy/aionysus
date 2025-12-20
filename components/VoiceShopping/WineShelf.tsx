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
}

interface WineShelfProps {
  wines: Wine[]
  onSelectWine: (wine: Wine) => void
  onAddToCart: (wine: Wine) => void
  cartWineIds: number[]
}

function ShelfWineCard({
  wine,
  onSelect,
  onAddToCart,
  isInCart,
  index
}: {
  wine: Wine
  onSelect: () => void
  onAddToCart: () => void
  isInCart: boolean
  index: number
}) {
  const [added, setAdded] = useState(false)
  const price = typeof wine.price_retail === 'string' ? parseFloat(wine.price_retail) : wine.price_retail
  const displayPrice = price ? `£${price.toLocaleString('en-GB', { minimumFractionDigits: 0 })}` : 'POA'

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInCart) return
    onAddToCart()
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div
      className="flex-shrink-0 w-28 sm:w-32 animate-[wine-to-shelf_0.3s_ease-out_forwards] group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link
        href={`/wines/${wine.slug || wine.id}`}
        className="block bg-gradient-to-b from-stone-900 to-stone-950 rounded-lg border border-gold-700/20 overflow-hidden hover:border-gold-500/50 transition-all"
      >
        {/* Wine Image */}
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={wine.image_url || '/wine-placeholder.svg'}
            alt={wine.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Quick add button overlay */}
          <button
            onClick={handleAdd}
            className={`
              absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center
              transition-all duration-200 opacity-0 group-hover:opacity-100
              ${isInCart || added
                ? 'bg-green-600 text-white'
                : 'bg-gold-500 text-black hover:bg-gold-400'
              }
            `}
          >
            {isInCart || added ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          </button>
        </div>

        {/* Wine Details */}
        <div className="p-2">
          <p className="text-white text-xs font-medium line-clamp-2 leading-tight mb-1">{wine.name}</p>
          <p className="text-gold-400 text-xs font-bold">{displayPrice}</p>
        </div>
      </Link>
    </div>
  )
}

export function WineShelf({ wines, onSelectWine, onAddToCart, cartWineIds }: WineShelfProps) {
  if (wines.length === 0) {
    return null
  }

  return (
    <div className="mt-4">
      <p className="text-gold-500/60 text-xs font-medium mb-3">Also Discussed</p>
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-3 pb-2">
          {wines.map((wine, index) => (
            <ShelfWineCard
              key={wine.id}
              wine={wine}
              onSelect={() => onSelectWine(wine)}
              onAddToCart={() => onAddToCart(wine)}
              isInCart={cartWineIds.includes(wine.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
