/**
 * Audio utilities for converting between Hume and Simli formats
 * Hume outputs: 48kHz
 * Simli needs: 16kHz PCM16 mono
 */

/**
 * Convert Float32Array audio to PCM16 Int16Array
 */
export function floatTo16BitPCM(float32Array: Float32Array): Int16Array {
  const int16Array = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return int16Array;
}

/**
 * Downsample audio from source sample rate to target sample rate
 */
export function downsample(
  audioData: Float32Array,
  sourceSampleRate: number,
  targetSampleRate: number
): Float32Array {
  if (sourceSampleRate === targetSampleRate) {
    return audioData;
  }

  const ratio = sourceSampleRate / targetSampleRate;
  const newLength = Math.round(audioData.length / ratio);
  const result = new Float32Array(newLength);

  for (let i = 0; i < newLength; i++) {
    const sourceIndex = Math.round(i * ratio);
    result[i] = audioData[sourceIndex] || 0;
  }

  return result;
}

/**
 * Convert Hume audio (48kHz) to Simli format (16kHz PCM16)
 */
export function convertHumeToSimli(
  audioData: Float32Array,
  sourceSampleRate: number = 48000
): Uint8Array {
  // Downsample from 48kHz to 16kHz
  const downsampled = downsample(audioData, sourceSampleRate, 16000);

  // Convert to PCM16
  const pcm16 = floatTo16BitPCM(downsampled);

  // Return as Uint8Array (what Simli expects)
  return new Uint8Array(pcm16.buffer);
}

/**
 * Decode base64 audio to Float32Array
 * Hume sends audio as base64 encoded data
 */
export async function decodeBase64Audio(
  base64Audio: string,
  sampleRate: number = 48000
): Promise<Float32Array> {
  // Decode base64 to array buffer
  const binaryString = atob(base64Audio);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Create audio context for decoding
  const audioContext = new AudioContext({ sampleRate });

  try {
    const audioBuffer = await audioContext.decodeAudioData(bytes.buffer);
    return audioBuffer.getChannelData(0); // Get mono channel
  } catch (error) {
    console.error('Error decoding audio:', error);
    // Return empty array on error
    return new Float32Array(0);
  } finally {
    audioContext.close();
  }
}

/**
 * Convert raw PCM bytes to Float32Array
 */
export function pcmBytesToFloat32(pcmData: Uint8Array): Float32Array {
  const int16Array = new Int16Array(pcmData.buffer);
  const float32Array = new Float32Array(int16Array.length);

  for (let i = 0; i < int16Array.length; i++) {
    float32Array[i] = int16Array[i] / 0x8000;
  }

  return float32Array;
}
