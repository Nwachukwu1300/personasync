// OpenAI API integration for AI conversations
// You'll need to add your OpenAI API key to your environment variables

export interface OpenAIConfig {
  apiKey: string;
  model?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function generateResponse(
  messages: ChatMessage[],
  config: OpenAIConfig
): Promise<string> {
  const model = config.model || 'gpt-3.5-turbo';
  
  const response = await fetch(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error('Invalid response from OpenAI API');
  }

  return data.choices[0].message.content;
}

export async function startConversation(
  userMessage: string,
  config: OpenAIConfig
): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: 'You are a friendly AI learning assistant helping to personalize a user\'s learning experience. Be conversational, engaging, and ask thoughtful questions about their interests, learning goals, and motivations.'
    },
    {
      role: 'user',
      content: userMessage
    }
  ];

  return await generateResponse(messages, config);
}

export async function continueConversation(
  conversationHistory: ChatMessage[],
  userMessage: string,
  config: OpenAIConfig
): Promise<string> {
  const messages = [...conversationHistory, {
    role: 'user',
    content: userMessage
  }];

  const response = await generateResponse(messages, config);
  
  return response;
} 