'use client'

import Link from 'next/link'
import { useUser } from '@stackframe/stack'
import { useState, useEffect } from 'react'

export function NavBar() {
  const user = useUser()
  const [showMenu, setShowMenu] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  // Get cart count from localStorage (works for both Shopify and demo mode)
  useEffect(() => {
    function updateCartCount() {
      // Check Shopify cart first
      const shopifyCartId = localStorage.getItem('sommelier-shopify-cart-id')
      if (shopifyCartId) {
        // For Shopify, we'd need to fetch the cart - for now, check local storage
        const localCart = JSON.parse(localStorage.getItem('sommelier-cart') || '[]')
        const count = localCart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0)
        setCartCount(count)
      } else {
        // Demo mode cart
        const localCart = JSON.parse(localStorage.getItem('sommelier-cart') || '[]')
        const count = localCart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0)
        setCartCount(count)
      }
    }

    updateCartCount()

    // Listen for storage changes
    window.addEventListener('storage', updateCartCount)

    // Also listen for custom cart update events
    const handleCartUpdate = () => updateCartCount()
    window.addEventListener('cart-updated', handleCartUpdate)

    return () => {
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('cart-updated', handleCartUpdate)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* Wine glass icon */}
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="wine-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9f1239"/>
                  <stop offset="100%" stopColor="#7f1d1d"/>
                </linearGradient>
              </defs>
              <path d="M8 6 C8 6 7 14 10 17 C12 19 14 20 16 20 C18 20 20 19 22 17 C25 14 24 6 24 6 Z" fill="url(#wine-gradient)" opacity="0.9"/>
              <rect x="15" y="20" width="2" height="6" fill="#78716c"/>
              <ellipse cx="16" cy="28" rx="5" ry="2" fill="#78716c"/>
              <circle cx="10" cy="4" r="2" fill="#9f1239" opacity="0.6"/>
              <circle cx="14" cy="3" r="1.5" fill="#9f1239" opacity="0.5"/>
              <circle cx="7" cy="6" r="1.5" fill="#9f1239" opacity="0.4"/>
              <ellipse cx="11" cy="10" rx="1.5" ry="3" fill="white" opacity="0.3"/>
            </svg>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-2xl text-wine-700">
                Aionysus
              </span>
              <span className="text-[10px] text-wine-500 italic -mt-1 hidden sm:block">
                Where there is no wine, there is no love
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/wines"
              className="text-stone-600 hover:text-wine-600 transition-colors font-medium"
            >
              Wines
            </Link>
          </nav>

          {/* Right Section: Cart & Auth */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-stone-50 rounded-full transition-colors"
              aria-label="Shopping cart"
            >
              <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-wine-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  aria-label="User menu"
                >
                  {user.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt={user.displayName || 'User'}
                      width="36"
                      height="36"
                      className="w-9 h-9 rounded-full object-cover border border-wine-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-wine-600 flex items-center justify-center text-white text-sm font-bold border border-wine-200">
                      {user.displayName?.[0] || user.primaryEmail?.[0] || 'U'}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-stone-200 py-1 z-50">
                      <div className="px-4 py-2 border-b border-stone-100">
                        <p className="text-sm font-medium text-stone-900">{user.displayName || 'User'}</p>
                        <p className="text-xs text-stone-500 truncate">{user.primaryEmail}</p>
                      </div>
                      <button
                        onClick={() => {
                          user.signOut()
                          setShowMenu(false)
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/handler/sign-up"
                className="bg-wine-600 text-white font-medium px-4 py-2 rounded-full hover:bg-wine-700 transition-colors text-sm"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
