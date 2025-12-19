'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Wine {
  id: number
  name: string
  winery: string
  region: string
  country: string
  grape_variety: string
  vintage: number | null
  wine_type: string
  style: string
  color: string | null
  price_retail: number | null
  tasting_notes: string
  food_pairings: string[]
  image_url: string
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

export default function WineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [wine, setWine] = useState<Wine | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (!resolvedParams) return
    const wineId = resolvedParams.id

    async function fetchWine() {
      try {
        const response = await fetch(`/api/wines/${wineId}`)
        if (response.ok) {
          const data = await response.json()
          setWine(data)
        }
      } catch (error) {
        console.error('Error fetching wine:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchWine()
  }, [resolvedParams])

  const handleAddToCart = () => {
    if (!wine) return

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('sommelier-cart') || '[]')

    // Check if wine already in cart
    const existingIndex = existingCart.findIndex((item: { id: number }) => item.id === wine.id)

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += quantity
    } else {
      existingCart.push({
        id: wine.id,
        name: wine.name,
        winery: wine.winery,
        price: wine.price_retail || 0,
        quantity,
        image_url: wine.image_url,
      })
    }

    localStorage.setItem('sommelier-cart', JSON.stringify(existingCart))

    // Dispatch custom event to update cart count in NavBar
    window.dispatchEvent(new Event('cart-updated'))

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-stone-200 border-t-wine-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!wine) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex flex-col items-center justify-center">
        <p className="text-stone-500 mb-4">Wine not found</p>
        <Link href="/" className="text-wine-600 hover:underline">Back to home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 pt-20">
        <nav className="text-sm text-stone-500">
          <Link href="/" className="hover:text-wine-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/wines" className="hover:text-wine-600">Wines</Link>
          <span className="mx-2">/</span>
          <span className="text-stone-900">{wine.name}</span>
        </nav>
      </div>

      {/* Wine Detail */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Wine Image */}
          <div className="bg-white rounded-2xl p-8 flex items-center justify-center border border-stone-100">
            <div className="relative w-48 h-72">
              <Image
                src={wine.image_url || PLACEHOLDER_IMAGE}
                alt={wine.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Wine Info */}
          <div>
            <div className="mb-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                wine.wine_type === 'red' ? 'bg-red-100 text-red-800' :
                wine.wine_type === 'white' ? 'bg-yellow-100 text-yellow-800' :
                wine.wine_type === 'rose' ? 'bg-pink-100 text-pink-800' :
                wine.wine_type === 'sparkling' ? 'bg-amber-100 text-amber-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {wine.wine_type.charAt(0).toUpperCase() + wine.wine_type.slice(1)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">
              {wine.name}
            </h1>

            <p className="text-lg text-stone-500 mb-4">
              {wine.winery} · {wine.region}, {wine.country}
            </p>

            {wine.vintage && (
              <p className="text-stone-600 mb-4">Vintage: {wine.vintage}</p>
            )}

            <p className="text-3xl font-bold text-wine-600 mb-6">
              {formatPrice(wine.price_retail)}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-stone-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-wine-600 text-white hover:bg-wine-700'
                }`}
              >
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>

            {/* Tasting Notes */}
            <div className="bg-white rounded-xl p-6 border border-stone-100 mb-6">
              <h2 className="font-bold text-stone-900 mb-3">Tasting Notes</h2>
              <p className="text-stone-600 leading-relaxed">{wine.tasting_notes}</p>
            </div>

            {/* Details */}
            <div className="bg-white rounded-xl p-6 border border-stone-100 mb-6">
              <h2 className="font-bold text-stone-900 mb-3">Details</h2>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-stone-500">Grape Variety</dt>
                  <dd className="text-stone-900 font-medium">{wine.grape_variety}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Style</dt>
                  <dd className="text-stone-900 font-medium">{wine.style}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Region</dt>
                  <dd className="text-stone-900 font-medium">{wine.region}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Country</dt>
                  <dd className="text-stone-900 font-medium">{wine.country}</dd>
                </div>
              </dl>
            </div>

            {/* Food Pairings */}
            {wine.food_pairings && wine.food_pairings.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-stone-100">
                <h2 className="font-bold text-stone-900 mb-3">Food Pairings</h2>
                <div className="flex flex-wrap gap-2">
                  {wine.food_pairings.map((pairing, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm"
                    >
                      {pairing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
