'use client'

import { useState, useCallback, useEffect } from 'react'
import { VoiceProvider, useVoice } from '@humeai/voice-react'
import { useUser } from '@stackframe/stack'

const SOMMELIER_PROMPT = `You are Sofia, an expert sommelier and wine advisor. Your role is to help people discover wines they'll love, understand food pairings, and learn about wine in an approachable, friendly way.

Key behaviors:
- Greet warmly and ask what brings them to you today
- Ask about their preferences (red/white/rosé, sweet/dry, budget range)
- Consider the occasion (dinner party, casual evening, special celebration, gift)
- Suggest food pairings when relevant
- Explain wine terms in accessible language
- Be enthusiastic and passionate about wine, but never pretentious

When recommending wines:
- Suggest 2-3 specific wines by name when possible
- Explain WHY each wine suits their needs
- Describe tasting notes they can expect
- Mention the region and grape variety
- Give approximate price ranges

Start by warmly greeting the user and asking how you can help them with wine today.`

function VoiceInterface({ accessToken, userId }: { accessToken: string; userId?: string }) {
  const { connect, disconnect, status, messages } = useVoice()
  const [isConnecting, setIsConnecting] = useState(false)
  const [waveHeights, setWaveHeights] = useState<number[]>([])

  useEffect(() => {
    if (status.value === 'connected') {
      const interval = setInterval(() => {
        setWaveHeights([...Array(40)].map(() => 20 + Math.random() * 80))
      }, 150)
      return () => clearInterval(interval)
    } else {
      setWaveHeights([...Array(40)].map((_, i) => 20 + Math.sin(i * 0.5) * 15))
    }
  }, [status.value])

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
      <div className="mb-8">
        <p className="text-8xl md:text-9xl font-serif font-bold text-stone-900 tracking-tight">
          Sofia
        </p>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={isConnected ? handleDisconnect : handleConnect}
          disabled={isConnecting}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            isConnected
              ? 'bg-wine-600 hover:bg-wine-700'
              : 'bg-stone-900 hover:bg-stone-800'
          } ${isConnecting ? 'opacity-50' : ''}`}
          aria-label={isConnected ? "Stop Sommelier AI conversation" : "Start Sommelier AI conversation"}
        >
          {isConnecting ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isConnected ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex items-center gap-[2px] h-12 w-64">
          {waveHeights.map((height, i) => (
            <div
              key={i}
              className={`w-[3px] rounded-full transition-all duration-100 ${
                isConnected ? 'bg-wine-400' : 'bg-stone-300'
              }`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      <p className="text-stone-500 text-lg mb-8">
        {isConnected
          ? "Sommelier AI is listening — ask about wine."
          : isError
          ? "Connection error — tap to try again."
          : "Want wine advice? Hit play — Sommelier AI will help."}
      </p>

      {messages.length > 0 && (
        <div className="w-full max-w-2xl bg-stone-50 rounded-2xl p-6 max-h-64 overflow-y-auto mb-8">
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user_message' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    msg.type === 'user_message'
                      ? 'bg-wine-600 text-white'
                      : 'bg-white border border-stone-200 text-stone-700'
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
    </div>
  )
}

export function VoiceWidget() {
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

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500">{error}</p>
      </div>
    )
  }

  if (!accessToken) {
    return (
      <div className="text-center py-20">
        <div className="w-10 h-10 border-2 border-stone-200 border-t-wine-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-500">Loading Sommelier AI...</p>
      </div>
    )
  }

  return (
    <VoiceProvider>
      <VoiceInterface accessToken={accessToken} userId={user?.id} />
    </VoiceProvider>
  )
}
