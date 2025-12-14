'use client'

import { useState, useCallback, useEffect } from 'react'
import { VoiceProvider, useVoice } from '@humeai/voice-react'
import { useUser } from '@stackframe/stack'
import Link from 'next/link'

const SOMMELIER_PROMPT = `You are Sofia, an expert sommelier and wine advisor. Your role is to help people discover wines they'll love, understand food pairings, and learn about wine in an approachable, friendly way.

Key behaviors:
- Greet warmly and ask what brings them to you today
- Ask about their preferences (red/white/rosé, sweet/dry, budget range)
- Consider the occasion (dinner party, casual evening, special celebration, gift)
- Suggest food pairings when relevant
- Explain wine terms in accessible language
- Be enthusiastic and passionate about wine, but never pretentious
- Share interesting stories about wines and regions

When recommending wines:
- Suggest 2-3 specific wines by name when possible
- Explain WHY each wine suits their needs
- Describe tasting notes they can expect (fruits, spices, oak, tannins)
- Mention the region and grape variety
- Give approximate price ranges ($15-25, $30-50, etc.)

Your wine knowledge includes all major regions: Bordeaux, Burgundy, Champagne, Tuscany, Piedmont, Rioja, Napa Valley, and many more.

Start by warmly greeting the user and asking how you can help them with wine today.`

function WineGlassButton({ isConnected, isConnecting, onClick }: {
  isConnected: boolean
  isConnecting: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={isConnecting}
      className="relative group focus:outline-none"
      aria-label={isConnected ? "Stop talking to sommelier" : "Start talking to sommelier"}
    >
      {/* Wine Glass SVG */}
      <svg
        width="200"
        height="280"
        viewBox="0 0 200 280"
        className={`transition-all duration-500 ${isConnecting ? 'opacity-60' : 'opacity-100'} ${!isConnecting && !isConnected ? 'group-hover:scale-105' : ''}`}
        role="img"
        aria-label="Wine glass voice interface - tap to speak with your AI sommelier"
      >
        {/* Glow effect when active */}
        {isConnected && (
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        )}

        {/* Glass bowl */}
        <ellipse
          cx="100"
          cy="90"
          rx="70"
          ry="85"
          fill="none"
          stroke={isConnected ? "#be185d" : "#7f1d1d"}
          strokeWidth="3"
          className="transition-colors duration-300"
          filter={isConnected ? "url(#glow)" : ""}
        />

        {/* Wine in glass */}
        <ellipse
          cx="100"
          cy="100"
          rx={isConnected ? "58" : "55"}
          ry={isConnected ? "65" : "60"}
          className={`transition-all duration-500 ${isConnected ? 'fill-wine-600' : 'fill-wine-800'}`}
        >
          {isConnected && (
            <animate attributeName="ry" values="60;65;60" dur="2s" repeatCount="indefinite" />
          )}
        </ellipse>

        {/* Wine surface shimmer */}
        <ellipse
          cx="100"
          cy="55"
          rx="45"
          ry="12"
          className={`transition-all duration-300 ${isConnected ? 'fill-wine-400 opacity-60' : 'fill-wine-600 opacity-40'}`}
        />

        {/* Stem */}
        <rect
          x="95"
          y="175"
          width="10"
          height="60"
          fill={isConnected ? "#be185d" : "#7f1d1d"}
          className="transition-colors duration-300"
        />

        {/* Base */}
        <ellipse
          cx="100"
          cy="250"
          rx="45"
          ry="12"
          fill={isConnected ? "#be185d" : "#7f1d1d"}
          className="transition-colors duration-300"
        />

        {/* Microphone icon in center of wine */}
        <g transform="translate(100, 95)" className="text-white">
          {isConnecting ? (
            <circle r="20" fill="none" stroke="white" strokeWidth="3" strokeDasharray="20" className="animate-spin origin-center">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1s" repeatCount="indefinite"/>
            </circle>
          ) : isConnected ? (
            <>
              {/* Sound waves */}
              <circle r="8" fill="white" className="animate-pulse" />
              <circle r="18" fill="none" stroke="white" strokeWidth="2" opacity="0.6" className="animate-ping" />
              <circle r="28" fill="none" stroke="white" strokeWidth="1" opacity="0.3" className="animate-ping" style={{ animationDelay: '0.2s' }} />
            </>
          ) : (
            <>
              {/* Microphone */}
              <rect x="-8" y="-20" width="16" height="28" rx="8" fill="white" opacity="0.9" />
              <path d="M-15 0 Q-15 18 0 18 Q15 18 15 0" fill="none" stroke="white" strokeWidth="3" opacity="0.9" />
              <line x1="0" y1="18" x2="0" y2="28" stroke="white" strokeWidth="3" opacity="0.9" />
            </>
          )}
        </g>
      </svg>

      {/* Pulse rings when active */}
      {isConnected && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 rounded-full border-2 border-wine-400 animate-ping opacity-20" style={{ animationDuration: '2s' }} />
        </div>
      )}
    </button>
  )
}

function VoiceInterface({ accessToken, userId }: { accessToken: string; userId?: string }) {
  const { connect, disconnect, status, messages } = useVoice()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = useCallback(async () => {
    setIsConnecting(true)
    try {
      await connect({
        auth: { type: 'accessToken', value: accessToken },
        configId: '606a18be-4c8e-4877-8fb4-52665831b33d',
        sessionSettings: {
          type: 'session_settings',
          systemPrompt: SOMMELIER_PROMPT,
          ...(userId && { variables: { user_id: userId } }),
        },
      })
    } catch (error) {
      console.error('Failed to connect:', error)
    }
    setIsConnecting(false)
  }, [connect, accessToken, userId])

  const handleDisconnect = useCallback(() => {
    disconnect()
  }, [disconnect])

  const isConnected = status.value === 'connected'
  const isError = status.value === 'error'

  return (
    <div className="flex flex-col items-center">
      {/* Wine Glass Voice Button */}
      <WineGlassButton
        isConnected={isConnected}
        isConnecting={isConnecting}
        onClick={isConnected ? handleDisconnect : handleConnect}
      />

      {/* Status */}
      <div className="text-center mt-4 mb-8">
        <p className={`text-xl font-semibold ${isError ? 'text-red-600' : 'text-wine-800'}`}>
          {isConnecting && 'Connecting to Sofia...'}
          {isConnected && 'Sofia is listening...'}
          {isError && 'Connection error. Please try again.'}
          {!isConnecting && !isConnected && !isError && 'Tap the glass to speak'}
        </p>
        <p className="text-wine-500 text-sm mt-1">
          {isConnected ? 'Ask about wines, pairings, or get recommendations' : 'Your AI sommelier awaits'}
        </p>
      </div>

      {/* Conversation */}
      {messages.length > 0 && (
        <div className="w-full max-w-2xl bg-gradient-to-b from-stone-50 to-white rounded-2xl p-6 max-h-72 overflow-y-auto border border-stone-200 shadow-inner mb-8">
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user_message' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    msg.type === 'user_message'
                      ? 'bg-wine-700 text-white rounded-br-sm'
                      : 'bg-white border border-stone-200 text-stone-700 rounded-bl-sm shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">
                    {msg.type === 'user_message' && msg.message?.content}
                    {msg.type === 'assistant_message' && msg.message?.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {messages.length === 0 && !isConnected && (
        <div className="w-full max-w-xl">
          <p className="text-xs font-medium text-wine-400 uppercase tracking-wider mb-3 text-center">Try asking Sofia</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              "What wine pairs with steak?",
              "Recommend a wine under $30",
              "Tell me about Burgundy wines",
              "Best wine for a dinner party?",
            ].map((question, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur border border-wine-100 rounded-xl px-3 py-2.5 text-sm text-wine-600 text-center hover:bg-white hover:border-wine-200 transition-colors"
              >
                {question}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  const user = useUser()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getAccessToken() {
      try {
        const response = await fetch('/api/hume-token')
        if (!response.ok) throw new Error('Failed to get access token')
        const data = await response.json()
        setAccessToken(data.accessToken)
      } catch (err) {
        setError('Voice service unavailable. Please try again later.')
        console.error('Error getting Hume token:', err)
      }
    }
    getAccessToken()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Hero with Wine Glass */}
      <section className="relative pt-8 pb-16" aria-labelledby="hero-heading">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 id="hero-heading" className="text-4xl sm:text-5xl font-bold text-wine-900 mb-3">
              Sommelier AI
            </h1>
            <p className="text-lg text-wine-600 max-w-xl mx-auto">
              Your personal AI wine expert. Get instant recommendations, perfect food pairings, and expand your wine knowledge.
            </p>

            {!user && (
              <div className="mt-4">
                <Link
                  href="/handler/sign-in"
                  className="inline-flex items-center text-sm text-wine-500 hover:text-wine-700 transition-colors"
                >
                  Sign in to save your preferences →
                </Link>
              </div>
            )}

            {user && (
              <p className="text-wine-500 text-sm mt-4">
                Welcome back, {user.displayName || user.primaryEmail}
              </p>
            )}
          </header>

          {/* Voice Interface Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-stone-100">
            {error ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4" role="img" aria-label="Error icon">
                  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-stone-600">{error}</p>
              </div>
            ) : !accessToken ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 border-3 border-wine-100 border-t-wine-600 rounded-full animate-spin mx-auto mb-4" role="status" aria-label="Loading" />
                <p className="text-wine-600">Preparing your sommelier...</p>
              </div>
            ) : (
              <VoiceProvider>
                <VoiceInterface accessToken={accessToken} userId={user?.id} />
              </VoiceProvider>
            )}
          </div>
        </div>
      </section>

      {/* What is Sommelier AI - SEO Content */}
      <section className="bg-wine-50/50 py-20" aria-labelledby="about-heading">
        <div className="max-w-4xl mx-auto px-4">
          <header className="text-center mb-12">
            <h2 id="about-heading" className="text-3xl font-bold text-wine-900 mb-4">
              What is Sommelier AI?
            </h2>
            <p className="text-lg text-wine-700 max-w-2xl mx-auto leading-relaxed">
              Sommelier AI is an artificial intelligence-powered wine advisor that provides expert-level wine recommendations through natural voice conversation. Like having a professional sommelier in your pocket, available 24/7.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <div className="w-14 h-14 bg-gradient-to-br from-wine-100 to-wine-50 rounded-2xl flex items-center justify-center mb-4" role="img" aria-label="Wine glass icon representing personalized recommendations">
                <span className="text-3xl" aria-hidden="true">&#127863;</span>
              </div>
              <h3 className="font-semibold text-wine-900 text-lg mb-2">Personalized Recommendations</h3>
              <p className="text-wine-600 text-sm leading-relaxed">
                Our AI sommelier learns your taste preferences to suggest wines you&apos;ll love. From budget-friendly everyday wines to special occasion bottles, get recommendations tailored to your palate.
              </p>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <div className="w-14 h-14 bg-gradient-to-br from-wine-100 to-wine-50 rounded-2xl flex items-center justify-center mb-4" role="img" aria-label="Fork and knife icon representing food and wine pairing">
                <span className="text-3xl" aria-hidden="true">&#127860;</span>
              </div>
              <h3 className="font-semibold text-wine-900 text-lg mb-2">Expert Food Pairings</h3>
              <p className="text-wine-600 text-sm leading-relaxed">
                Never wonder which wine to serve again. Sommelier AI provides expert food and wine pairing suggestions for any dish, from casual weeknight dinners to elaborate dinner parties.
              </p>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <div className="w-14 h-14 bg-gradient-to-br from-wine-100 to-wine-50 rounded-2xl flex items-center justify-center mb-4" role="img" aria-label="Globe icon representing wine regions">
                <span className="text-3xl" aria-hidden="true">&#127758;</span>
              </div>
              <h3 className="font-semibold text-wine-900 text-lg mb-2">Wine Education</h3>
              <p className="text-wine-600 text-sm leading-relaxed">
                Expand your wine knowledge effortlessly. Learn about wine regions from Bordeaux to Napa Valley, grape varieties, tasting notes, and wine terminology in simple, accessible language.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" aria-labelledby="how-it-works-heading">
        <div className="max-w-4xl mx-auto px-4">
          <header className="text-center mb-12">
            <h2 id="how-it-works-heading" className="text-3xl font-bold text-wine-900 mb-4">
              How Sommelier AI Works
            </h2>
            <p className="text-wine-600">
              Getting expert wine advice has never been easier
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Tap the Glass", description: "Click or tap the wine glass to start a voice conversation with Sofia, your AI sommelier." },
              { step: "2", title: "Ask Anything", description: "Ask about wine recommendations, food pairings, regions, or any wine-related question." },
              { step: "3", title: "Get Expert Advice", description: "Receive personalized recommendations with tasting notes, price ranges, and pairing suggestions." }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-wine-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold" aria-hidden="true">
                  {item.step}
                </div>
                <h3 className="font-semibold text-wine-900 mb-2">{item.title}</h3>
                <p className="text-wine-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Businesses */}
      <section className="bg-gradient-to-br from-wine-900 to-wine-950 text-white py-20" aria-labelledby="business-heading">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 id="business-heading" className="text-3xl font-bold mb-4">
            Sommelier AI for Business
          </h2>
          <p className="text-wine-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Are you a restaurant, wine retailer, or hospitality business? Integrate Sommelier AI into your customer experience. Provide your guests with instant, expert wine recommendations that complement your menu and inventory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:hello@sommelier.ai?subject=Sommelier AI for Business Inquiry"
              className="inline-flex items-center gap-2 bg-white text-wine-800 font-semibold px-8 py-3 rounded-full hover:bg-wine-50 transition-colors"
            >
              Contact Us for Enterprise Solutions
            </a>
          </div>
          <div className="mt-12 grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-wine-200">24/7</p>
              <p className="text-wine-300 text-sm">Always Available</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-wine-200">1000s</p>
              <p className="text-wine-300 text-sm">Wines in Database</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-wine-200">API</p>
              <p className="text-wine-300 text-sm">Easy Integration</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / SEO Content */}
      <section className="py-20" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4">
          <h2 id="faq-heading" className="text-3xl font-bold text-wine-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <article className="bg-white rounded-xl p-6 border border-stone-100">
              <h3 className="font-semibold text-wine-900 mb-2">What is an AI sommelier?</h3>
              <p className="text-wine-600 text-sm leading-relaxed">
                An AI sommelier is an artificial intelligence system trained on extensive wine knowledge, capable of providing personalized wine recommendations, food pairing suggestions, and wine education through natural conversation. Sommelier AI uses advanced voice technology to make this expertise accessible to everyone.
              </p>
            </article>

            <article className="bg-white rounded-xl p-6 border border-stone-100">
              <h3 className="font-semibold text-wine-900 mb-2">How accurate are the wine recommendations?</h3>
              <p className="text-wine-600 text-sm leading-relaxed">
                Sommelier AI is trained on professional sommelier knowledge covering thousands of wines from regions worldwide. Our recommendations consider your taste preferences, budget, occasion, and food pairings to provide relevant, expert-level suggestions.
              </p>
            </article>

            <article className="bg-white rounded-xl p-6 border border-stone-100">
              <h3 className="font-semibold text-wine-900 mb-2">Is Sommelier AI free to use?</h3>
              <p className="text-wine-600 text-sm leading-relaxed">
                Yes, you can start using Sommelier AI immediately at no cost. Simply tap the wine glass and start asking questions. Sign in to save your preferences and get even more personalized recommendations over time.
              </p>
            </article>

            <article className="bg-white rounded-xl p-6 border border-stone-100">
              <h3 className="font-semibold text-wine-900 mb-2">Can businesses use Sommelier AI?</h3>
              <p className="text-wine-600 text-sm leading-relaxed">
                Absolutely. Restaurants, wine bars, retailers, and hospitality businesses can integrate Sommelier AI to enhance their customer experience. Contact us for enterprise solutions, API access, and custom integrations tailored to your business needs.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-wine-950 text-wine-200 py-12" role="contentinfo">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-2xl font-bold text-white mb-2">Sommelier AI</p>
            <p className="text-wine-300">Your personal AI wine expert</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-wine-400 mb-8">
            <span>Wine Recommendations</span>
            <span aria-hidden="true">•</span>
            <span>Food Pairings</span>
            <span aria-hidden="true">•</span>
            <span>Wine Education</span>
            <span aria-hidden="true">•</span>
            <span>Enterprise Solutions</span>
          </div>

          <div className="text-center text-wine-500 text-xs">
            <p>© {new Date().getFullYear()} Sommelier AI. All rights reserved.</p>
            <p className="mt-2">Drink responsibly. Must be of legal drinking age in your jurisdiction.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
