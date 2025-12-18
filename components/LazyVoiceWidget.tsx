'use client'

import dynamic from 'next/dynamic'

// Lazy load VoiceWidget - heavy component with Hume SDK
const VoiceWidget = dynamic(
  () => import('@/components/VoiceWidget').then(mod => mod.VoiceWidget),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <div className="w-30 h-30 rounded-full bg-stone-200 animate-pulse border-4 border-stone-300" />
        </div>
        <div className="mb-4">
          <p className="text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Aionysus
          </p>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-20 h-20 rounded-full bg-stone-200 animate-pulse" />
          <div className="flex items-center gap-[2px] h-12 w-64">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-stone-200"
                style={{ height: `${20 + Math.sin(i * 0.5) * 15}%` }}
              />
            ))}
          </div>
        </div>
        <p className="text-stone-500 text-lg mb-8">Loading voice assistant...</p>
      </div>
    ),
  }
)

export function LazyVoiceWidget() {
  return <VoiceWidget />
}
