'use client'

import dynamic from 'next/dynamic'

// Lazy load VoiceShoppingWidget - heavy component with Hume SDK and shopping UI
const VoiceShoppingWidget = dynamic(
  () => import('@/components/VoiceShoppingWidget').then(mod => mod.VoiceShoppingWidget),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Voice Widget Skeleton - Left side */}
          <div className="w-full md:w-[420px] lg:w-[480px] md:flex-shrink-0">
            <div className="flex flex-col items-center">
              {/* Goddess avatar placeholder */}
              <div className="mb-6">
                <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-stone-800/50 animate-pulse border-4 border-gold-700/30" />
              </div>

              {/* Button placeholder */}
              <div className="mb-4">
                <div className="w-48 h-10 rounded-full bg-gold-900/30 animate-pulse" />
              </div>

              {/* Waveform placeholder */}
              <div className="flex items-center gap-[2px] h-10 w-48 mb-4">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[2px] rounded-full bg-gold-800/30"
                    style={{ height: `${20 + Math.sin(i * 0.5) * 15}%` }}
                  />
                ))}
              </div>

              {/* Status text placeholder */}
              <div className="w-40 h-5 rounded bg-gold-900/20 animate-pulse mb-4" />
            </div>
          </div>

          {/* Wine Rack Skeleton - Right side (hidden on initial load) */}
          <div className="hidden md:block w-full md:flex-1 min-h-[500px]">
            <div className="h-full bg-stone-900/30 rounded-2xl border border-gold-700/20 p-4">
              {/* Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gold-700/20">
                <div className="w-5 h-5 rounded bg-gold-800/30" />
                <div className="w-20 h-4 rounded bg-gold-800/30" />
              </div>

              {/* Empty state */}
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <div className="w-16 h-16 rounded-full bg-gold-800/20 mb-4" />
                <div className="w-48 h-4 rounded bg-stone-700/30 mb-2" />
                <div className="w-32 h-3 rounded bg-stone-700/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <p className="text-stone-500 text-sm text-center mt-8 animate-pulse">
          Loading voice shopping experience...
        </p>
      </div>
    ),
  }
)

export function LazyVoiceShoppingWidget() {
  return <VoiceShoppingWidget />
}
