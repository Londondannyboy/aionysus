'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@stackframe/stack'

interface SaveWineButtonProps {
  wineId: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SaveWineButton({ wineId, size = 'md', className = '' }: SaveWineButtonProps) {
  const user = useUser()
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Check if wine is saved on mount
  useEffect(() => {
    if (!user) return

    async function checkSaved() {
      try {
        const response = await fetch('/api/saved-wines')
        if (response.ok) {
          const data = await response.json()
          setIsSaved(data.savedWineIds?.includes(wineId) || false)
        }
      } catch (error) {
        console.error('Error checking saved status:', error)
      }
    }

    checkSaved()
  }, [user, wineId])

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      // Redirect to sign in
      window.location.href = '/handler/sign-in'
      return
    }

    setIsLoading(true)

    try {
      if (isSaved) {
        // Remove from saved
        const response = await fetch(`/api/saved-wines?wineId=${wineId}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setIsSaved(false)
        }
      } else {
        // Add to saved
        const response = await fetch('/api/saved-wines', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wineId }),
        })
        if (response.ok) {
          setIsSaved(true)
        }
      }
    } catch (error) {
      console.error('Error toggling save:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`${sizeClasses[size]} flex items-center justify-center rounded-full transition-all ${
        isSaved
          ? 'bg-gold-500/20 text-gold-400 hover:bg-gold-500/30'
          : 'bg-stone-800/80 text-gold-400/50 hover:text-gold-400 hover:bg-stone-700/80'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      title={user ? (isSaved ? 'Remove from saved' : 'Save wine') : 'Sign in to save wines'}
    >
      {isLoading ? (
        <div className={`${iconSizes[size]} border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin`} />
      ) : (
        <svg
          className={iconSizes[size]}
          fill={isSaved ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  )
}
