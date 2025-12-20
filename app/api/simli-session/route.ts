import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { faceId } = await req.json();

    const apiKey = process.env.NEXT_PUBLIC_SIMLI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Simli API key not configured' }, { status: 500 });
    }

    // Create session token from Simli API
    const response = await fetch('https://api.simli.ai/startAudioToVideoSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        faceId: faceId,
        apiKey: apiKey,
        isJPG: false,
        syncAudio: true,
        handleSilence: true,
        maxSessionLength: 3600,
        maxIdleTime: 300,
        model: 'fasttalk',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Simli] Session creation failed:', errorText);
      return NextResponse.json({ error: 'Failed to create Simli session' }, { status: response.status });
    }

    const data = await response.json();
    console.log('[Simli] Session created:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('[Simli] Error creating session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
