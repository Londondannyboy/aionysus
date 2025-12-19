'use client'

export function ScrollToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="inline-block bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold px-8 py-4 rounded-full hover:from-gold-400 hover:to-gold-500 transition-all shadow-[0_0_30px_rgba(212,165,10,0.4)] hover:shadow-[0_0_50px_rgba(212,165,10,0.6)]"
    >
      Talk to Aionysus
    </button>
  )
}
