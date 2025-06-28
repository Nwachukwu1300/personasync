// ElevenLabs API integration for text-to-speech
// You'll need to add your ElevenLabs API key to your environment variables

export interface ElevenLabsConfig {
  apiKey: string;
  voiceId?: string;
  modelId?: string;
}

export async function generateSpeech(
  text: string,
  config: ElevenLabsConfig
): Promise<ArrayBuffer> {
  const voiceId = config.voiceId || '1SM7GgM6IMuvQlz2BwM3'; // Default voice ID (Conversational)
  const modelId = config.modelId || 'eleven_monolingual_v1';

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': config.apiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
  }

  return await response.arrayBuffer();
}

export function createAudioBlob(arrayBuffer: ArrayBuffer): Blob {
  return new Blob([arrayBuffer], { type: 'audio/mpeg' });
}

export function createAudioUrl(blob: Blob): string {
  return URL.createObjectURL(blob);
}

// Available voice IDs (you can change these)
export const VOICE_IDS = {
  CONVERSATIONAL: '1SM7GgM6IMuvQlz2BwM3', // New conversational voice
  RACHEL: '21m00Tcm4TlvDq8ikWAM',
  DOMI: 'AZnzlk1XvdvUeBnXmlld',
  BELLA: 'EXAVITQu4vr4xnSDxMaL',
  ANTONI: 'ErXwobaYiN019PkySvjV',
  THOMAS: 'GBv7mTt0atIp3Br8iCZE',
  JOSH: 'TxGEqnHWrfWFTfGW9XjX',
  ARNOLD: 'VR6AewLTigWG4xSOukaG',
  ADAM: 'pNInz6obpgDQGcFmaJgB',
  SAM: 'yoZ06aMxZJJ28mfd3POQ',
};

// Available model IDs
export const MODEL_IDS = {
  ELEVEN_MONOLINGUAL_V1: 'eleven_monolingual_v1',
  ELEVEN_MULTILINGUAL_V1: 'eleven_multilingual_v1',
  ELEVEN_MULTILINGUAL_V2: 'eleven_multilingual_v2',
}; 