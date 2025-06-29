'use client';

import React, { useState } from 'react';

export default function TestVoicePage() {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testAPIs = async () => {
    setIsLoading(true);
    try {
      // Test OpenAI
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: 'Say hello in one word' }],
          max_tokens: 10
        })
      });

      if (openaiResponse.ok) {
        setResult(prev => prev + '✅ OpenAI API: Working\n');
      } else {
        setResult(prev => prev + '❌ OpenAI API: Failed\n');
      }

      // Test ElevenLabs
      const elevenlabsResponse = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
        method: 'POST',
        headers: {
          'xi-api-key': process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: 'Hello test',
          model_id: 'eleven_monolingual_v1'
        })
      });

      if (elevenlabsResponse.ok) {
        setResult(prev => prev + '✅ ElevenLabs API: Working\n');
      } else {
        setResult(prev => prev + '❌ ElevenLabs API: Failed\n');
      }

    } catch (error) {
      setResult(prev => prev + `❌ Error: ${error}\n`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      <button 
        onClick={testAPIs}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {isLoading ? 'Testing...' : 'Test APIs'}
      </button>

      <pre className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">
        {result || 'Click "Test APIs" to check if your API keys are working'}
      </pre>
    </div>
  );
} 