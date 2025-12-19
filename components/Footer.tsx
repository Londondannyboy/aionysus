'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-stone-50 border-t border-stone-100 py-12 mt-auto">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Link href="/" className="inline-flex items-center gap-2 justify-center">
          {/* Dionysus portrait icon */}
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-wine-200 shadow-sm">
            <img
              src="/aionysus.jpg"
              alt="Aionysus"
              className="w-full h-full object-cover object-[center_15%]"
            />
          </div>
          <span className="font-serif font-bold text-xl text-wine-700">Aionysus</span>
        </Link>
        <p className="text-stone-500 italic text-sm mt-2 mb-6">Where there is no wine, there is no love</p>

        {/* Navigation Links */}
        <nav className="flex justify-center gap-6 mb-6">
          <Link href="/wines" className="text-stone-600 hover:text-wine-600 transition-colors text-sm">
            Wines
          </Link>
          <Link href="/cart" className="text-stone-600 hover:text-wine-600 transition-colors text-sm">
            Cart
          </Link>
          <a href="mailto:hello@aionysus.wine" className="text-stone-600 hover:text-wine-600 transition-colors text-sm">
            Contact
          </a>
        </nav>

        <div className="border-t border-stone-200 pt-6">
          <p className="text-stone-400 text-xs">
            © {new Date().getFullYear()} Aionysus • BETA<br />
            <a href="mailto:hello@aionysus.wine" className="hover:text-wine-600 transition-colors">hello@aionysus.wine</a>
          </p>
          <p className="text-stone-400 text-xs mt-4">Drink responsibly.</p>
        </div>
      </div>
    </footer>
  )
}
