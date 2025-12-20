'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { SimliClient } from 'simli-client';

interface SimliAvatarProps {
  isPlaying?: boolean;
  audioData?: Uint8Array;
  simliApiKey: string;
  faceId: string; // Your custom avatar face ID from Simli dashboard
  onReady?: () => void;
  onError?: (error: Error) => void;
}

export default function SimliAvatar({
  isPlaying = false,
  audioData,
  simliApiKey,
  faceId,
  onReady,
  onError,
}: SimliAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const simliClientRef = useRef<SimliClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Simli client
  useEffect(() => {
    if (!simliApiKey || !faceId) {
      console.warn('[Simli] Missing API key or face ID');
      return;
    }

    // Wait for refs to be available
    if (!videoRef.current || !audioRef.current) {
      return;
    }

    const initSimli = async () => {
      try {
        setIsLoading(true);

        // First, get session token from our server-side API (avoids CORS)
        console.log('[Simli] Getting session token...');
        const sessionResponse = await fetch('/api/simli-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ faceId }),
        });

        if (!sessionResponse.ok) {
          throw new Error('Failed to get Simli session token');
        }

        const sessionData = await sessionResponse.json();
        console.log('[Simli] Session token received:', sessionData);

        // Create Simli client
        const simliClient = new SimliClient();

        // Initialize with config - pass the actual elements and session token
        simliClient.Initialize({
          apiKey: simliApiKey,
          faceID: faceId,
          handleSilence: true,
          videoRef: videoRef.current!,
          audioRef: audioRef.current!,
          maxSessionLength: 3600, // 1 hour max
          maxIdleTime: 300, // 5 min idle timeout
          session_token: sessionData.session_token || sessionData.sessionToken || '',
          SimliURL: 'https://api.simli.ai',
          maxRetryAttempts: 3,
          retryDelay_ms: 2000,
          videoReceivedTimeout: 15000,
          enableSFU: true,
          model: 'fasttalk',
          enableConsoleLogs: true,
        });

        simliClientRef.current = simliClient;

        // Start the connection
        await simliClient.start();

        setIsConnected(true);
        setIsLoading(false);
        onReady?.();

        console.log('[Simli] Connected and ready');
      } catch (error) {
        console.error('[Simli] Initialization error:', error);
        setIsLoading(false);
        onError?.(error as Error);
      }
    };

    initSimli();

    // Cleanup on unmount
    return () => {
      if (simliClientRef.current) {
        simliClientRef.current.close();
        simliClientRef.current = null;
      }
    };
  }, [simliApiKey, faceId, onReady, onError]);

  // Send audio data when it changes
  useEffect(() => {
    if (!simliClientRef.current || !audioData || !isConnected) return;

    try {
      // Send audio data to Simli
      // Audio should be PCM16, 16KHz, mono
      simliClientRef.current.sendAudioData(audioData);
    } catch (error) {
      console.error('[Simli] Error sending audio:', error);
    }
  }, [audioData, isConnected]);

  // Handle speaking state changes
  useEffect(() => {
    if (!simliClientRef.current || !isConnected) return;

    // Could trigger idle animations when not speaking
    console.log('[Simli] Speaking state:', isPlaying);
  }, [isPlaying, isConnected]);

  return (
    <div className="relative w-full h-full">
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full z-20">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-2" />
            <p className="text-gold-400 text-sm">Awakening...</p>
          </div>
        </div>
      )}

      {/* Video output from Simli */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={false}
        className={`w-full h-full object-cover rounded-full ${
          isConnected ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500`}
      />

      {/* Audio output (hidden) */}
      <audio ref={audioRef} autoPlay className="hidden" />

      {/* Glow effect when speaking */}
      {isPlaying && isConnected && (
        <div className="absolute inset-0 rounded-full animate-[speaking-glow_1.5s_ease-in-out_infinite] pointer-events-none" />
      )}
    </div>
  );
}
