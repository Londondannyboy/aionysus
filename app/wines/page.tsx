'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Wine {
  id: number
  name: string
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

  // Filter wines by wine_type (red, white, rose, sparkling, dessert)
  const filteredWines = filter === 'all'
    ? wines
    : wines.filter(w => {
        const wineType = (w.wine_type || '').toLowerCase()
        const color = (w.color || '').toLowerCase()
        // Match against both wine_type and color fields
        return wineType === filter || color === filter
      })

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <main className="max-w-6xl mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">
          Wine Collection
        </h1>
        <p className="text-stone-500 mb-8">Curated wines recommended by Sommelier AI</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['all', 'red', 'white', 'rose', 'sparkling', 'dessert'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === type
                  ? 'bg-gold-600 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-gold-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-stone-200 border-t-gold-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredWines.map((wine) => (
              <Link
                key={wine.id}
                href={`/wines/${wine.id}`}
                className="bg-white rounded-xl border border-stone-100 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-[3/4] relative bg-stone-50">
                  <Image
                    src={wine.image_url || PLACEHOLDER_IMAGE}
                    alt={wine.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${
                    (wine.color || wine.wine_type || '').toLowerCase() === 'red' ? 'bg-red-100 text-red-800' :
                    (wine.color || wine.wine_type || '').toLowerCase() === 'white' ? 'bg-yellow-100 text-yellow-800' :
                    (wine.color || wine.wine_type || '').toLowerCase() === 'rose' ? 'bg-pink-100 text-pink-800' :
                    (wine.color || wine.wine_type || '').toLowerCase() === 'sparkling' ? 'bg-amber-100 text-amber-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {wine.color || wine.wine_type || 'Wine'}
                  </span>
                  <h3 className="font-semibold text-stone-900 mb-1 line-clamp-2">{wine.name}</h3>
                  <p className="text-sm text-stone-500 mb-2">{wine.region}</p>
                  <p className="font-bold text-gold-500">{formatPrice(wine.price_retail)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
