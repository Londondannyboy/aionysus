'use client'

import { useState } from 'react'
import { LazyVoiceWidget } from './LazyVoiceWidget'

export function FloatingVoiceWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen
            ? 'bg-stone-800 text-white'
            : 'bg-wine-600 text-white'
        }`}
        aria-label={isOpen ? 'Close Aionysus' : 'Talk to Aionysus'}
      >
        {isOpen ? (
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        )}
      </button>

      {/* Voice widget panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
          <div className="p-4 border-b border-stone-100 bg-gradient-to-r from-wine-50 to-stone-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-wine-700">Aionysus</h3>
                <p className="text-xs text-stone-500 italic">Your AI Sommelier</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-stone-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-4 max-h-[500px] overflow-y-auto">
            <LazyVoiceWidget />
          </div>
        </div>
      )}
    </>
  )
}
