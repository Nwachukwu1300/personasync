import { NextResponse } from 'next/server';

const ELEVEN_LABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
const ELEVEN_LABS_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel voice ID
const ELEVEN_LABS_MODEL_ID = 'eleven_monolingual_v1';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!ELEVEN_LABS_API_KEY) {
      console.error('Eleven Labs API key not configured');
      return NextResponse.json(
        { error: 'Eleven Labs API key not configured' },
        { status: 500 }
      );
    }

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }


    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_LABS_VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVEN_LABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: ELEVEN_LABS_MODEL_ID,
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Eleven Labs API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      return NextResponse.json(
        { error: `Eleven Labs API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });

  } catch (error) {
    console.error('Text-to-speech error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 