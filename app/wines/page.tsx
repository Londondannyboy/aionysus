'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SaveWineButton } from '@/components/SaveWineButton'

interface Wine {
  id: number
  name: string
  slug: string | null
  winery: string
  region: string
  wine_type: string
  color: string | null
  price_retail: number | null
  image_url: string
  vintage: number | null
}

// Format price with proper currency
function formatPrice(price: number | null): string {
  if (!price) return 'Price on request'
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Placeholder image for wines without images
const PLACEHOLDER_IMAGE = '/wine-placeholder.svg'

export default function WinesPage() {
  const [wines, setWines] = useState<Wine[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    async function fetchWines() {
      try {
        const response = await fetch('/api/wines')
        if (response.ok) {
          const data = await response.json()
          setWines(data)
        }
      } catch (error) {
        console.error('Error fetching wines:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchWines()
  }, [])

  // Filter wines by wine_type and search query
  const filteredWines = wines.filter(w => {
    // Type filter
    const matchesType = filter === 'all' ||
      (w.wine_type || '').toLowerCase() === filter ||
      (w.color || '').toLowerCase() === filter

    // Search filter (name, winery, region)
    const query = searchQuery.toLowerCase().trim()
    const matchesSearch = !query ||
      (w.name || '').toLowerCase().includes(query) ||
      (w.winery || '').toLowerCase().includes(query) ||
      (w.region || '').toLowerCase().includes(query)

    return matchesType && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-stone-950 to-black">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,165,10,0.1)_0%,transparent_50%)]" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 pt-28">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold-500/60 text-sm tracking-[0.3em] uppercase">✦ The Collection ✦</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 bg-clip-text text-transparent">
            Wine Collection
          </h1>
          <p className="text-gold-200/60 mt-3">Curated wines recommended by your divine sommelier</p>
        </div>

        {/* Search Input */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wines, wineries, regions..."
              className="w-full px-5 py-3 pl-12 rounded-full bg-stone-900/50 border border-gold-700/30 text-gold-100 placeholder:text-gold-400/40 focus:outline-none focus:border-gold-500 focus:shadow-[0_0_20px_rgba(212,165,10,0.2)] transition-all"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-400/60 hover:text-gold-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filters - Golden themed */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {['all', 'red', 'white', 'rose', 'sparkling', 'dessert'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === type
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black shadow-[0_0_20px_rgba(212,165,10,0.4)]'
                  : 'bg-stone-900/50 text-gold-300/80 border border-gold-700/30 hover:border-gold-500/50 hover:text-gold-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-2 border-gold-700/30 border-t-gold-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredWines.map((wine) => (
              <Link
                key={wine.id}
                href={`/wines/${wine.slug || wine.id}`}
                className="bg-gradient-to-b from-stone-900/80 to-stone-950/90 rounded-xl border border-gold-700/20 overflow-hidden hover:border-gold-500/40 hover:shadow-[0_0_30px_rgba(212,165,10,0.15)] transition-all group"
              >
                <div className="aspect-[3/4] relative bg-stone-900">
                  <Image
                    src={wine.image_url || PLACEHOLDER_IMAGE}
                    alt={wine.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Save button */}
                  <div className="absolute top-2 right-2 z-10">
                    <SaveWineButton wineId={wine.id} size="sm" />
                  </div>
                </div>
                <div className="p-4">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${
                    (wine.wine_type || '').toLowerCase() === 'red' ? 'bg-red-900/50 text-red-300 border border-red-700/30' :
                    (wine.wine_type || '').toLowerCase() === 'white' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/30' :
                    (wine.wine_type || '').toLowerCase() === 'rose' ? 'bg-pink-900/50 text-pink-300 border border-pink-700/30' :
                    (wine.wine_type || '').toLowerCase() === 'sparkling' ? 'bg-amber-900/50 text-amber-300 border border-amber-700/30' :
                    (wine.wine_type || '').toLowerCase() === 'dessert' ? 'bg-orange-900/50 text-orange-300 border border-orange-700/30' :
                    'bg-purple-900/50 text-purple-300 border border-purple-700/30'
                  }`}>
                    {(wine.wine_type || 'Wine').charAt(0).toUpperCase() + (wine.wine_type || 'Wine').slice(1)}
                  </span>
                  <h3 className="font-semibold text-gold-100 mb-1 line-clamp-2 group-hover:text-gold-300 transition-colors">{wine.name}</h3>
                  <p className="text-sm text-gold-400/60 mb-2">{wine.region}</p>
                  <p className="font-bold text-gold-400">{formatPrice(wine.price_retail)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Wine count */}
        {!loading && (
          <p className="text-center text-gold-500/40 text-sm mt-12">
            Showing {filteredWines.length} of {wines.length} wines
          </p>
        )}
      </main>
    </div>
  )
}
