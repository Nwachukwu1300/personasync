// Enhanced Voice Agent - Natural Conversation for Surveys
import axios from 'axios';

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface SurveyData {
  productivity_time?: string;
  work_style?: string;
  energy_level?: string;
  communication_style?: string;
  product_preferences?: string;
  satisfaction_level?: string;
  feature_requests?: string;
  user_mood?: string;
  day_quality?: string;
  [key: string]: any;
}

export interface Survey {
  id: string;
  title: string;
  category: string;
  questions: any[];
  estimatedTime: number;
  xpReward: number;
}

export class VoiceAgent {
  private openaiKey: string;
  private elevenlabsKey: string;
  private conversationHistory: ConversationMessage[] = [];
  private surveyData: SurveyData = {};
  private currentSurvey: Survey | null = null;
  private questionCount = 0;
  private maxQuestions = 4;
  private hasAskedAboutDay = false;

  constructor(survey?: Survey) {
    this.openaiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY!;
    this.elevenlabsKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY!;
    this.currentSurvey = survey || null;
    
    // Customize the system prompt based on survey type
    const surveyContext = this.getSurveyContext();
    
    this.conversationHistory = [{
      role: 'system',
      content: `You're Nova, a super friendly and energetic voice agent who loves getting to know people! You're like that friend who genuinely cares about how someone's day is going.

${surveyContext}

CONVERSATION FLOW:
1. ALWAYS start by asking genuinely about their day/mood ("Hey! How's your day going so far?" or "What's the vibe today?")
2. Listen and respond naturally to their day/mood
3. THEN naturally transition into the survey topic with casual questions
4. Keep everything conversational - NO formal survey vibes
5. Ask ONE question at a time, show genuine interest in their answers
6. Use tons of expressions like "That's so cool!", "Oh interesting!", "I feel you on that!"
7. After 3-4 natural questions about the survey topic, wrap up warmly

PERSONALITY:
- Super energetic and genuine
- Use Gen Z language but stay accessible  
- Be expressive: "Ooh that's fascinating!", "No way, really?", "I totally get that!"
- Show curiosity: "Tell me more about that!", "What's that like for you?"
- Validate their feelings: "That makes total sense!", "I can see why you'd feel that way!"

Remember: This should feel like chatting with a friend who's genuinely interested in getting to know them, NOT like a survey!`
    }];
  }

  private getSurveyContext(): string {
    if (!this.currentSurvey) {
      return "You're just having a casual conversation to get to know someone better. Focus on their personality, work style, and preferences.";
    }

    switch (this.currentSurvey.category) {
      case 'consumer':
        return `You're casually learning about their product preferences and shopping habits. After asking about their day, naturally steer toward topics like:
- What kind of products they usually buy
- Their shopping style (online vs in-store, brand loyal vs explorer)
- What influences their purchase decisions
- Their experience with product recommendations`;

      case 'feedback':
        return `You're casually learning about their experience with products/services. After asking about their day, naturally steer toward:
- Their recent experiences with products or services
- What makes them satisfied vs frustrated
- How they like to give feedback
- What improvements they'd want to see`;

      case 'feature':
        return `You're casually learning about what features they'd love to see in products. After asking about their day, naturally steer toward:
- What frustrates them about current tools/apps
- Features they wish existed
- Their workflow and pain points
- Dream improvements they'd make`;

      default:
        return `You're learning about their personality and work style. After asking about their day, naturally steer toward:
- When they feel most productive
- How they like to work (alone vs with others)
- Their energy patterns
- Communication preferences`;
    }
  }

  async startConversation(): Promise<string> {
    // Start with asking about their day
    const greetings = [
      "Hey there! How's your day treating you so far? 😊",
      "Hi! What's the vibe today - good day or one of those days? 🌟",
      "Hey! Quick check-in - how are you feeling today? ✨",
      "Hi there! Tell me, what's been the highlight of your day so far? 🎉"
    ];
    
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    this.conversationHistory.push({ role: 'assistant', content: greeting });
    
    return greeting;
  }

  async processResponse(userResponse: string): Promise<{
    reply: string;
    isComplete: boolean;
    surveyData: SurveyData;
  }> {
    this.conversationHistory.push({ role: 'user', content: userResponse });

    // If this is their first response, they're answering about their day
    if (!this.hasAskedAboutDay) {
      this.hasAskedAboutDay = true;
      this.surveyData.user_mood = userResponse;
      this.surveyData.day_quality = this.extractDayQuality(userResponse);
    }

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        ...this.conversationHistory,
        {
          role: 'system',
          content: `Current conversation count: ${this.questionCount}/4. 
          Survey data collected so far: ${JSON.stringify(this.surveyData)}
          
          If this is after they shared about their day (first exchange), naturally transition to the survey topic.
          If you've asked 3-4 questions about the survey topic, start wrapping up warmly.
          
          Extract relevant data from their response and continue the natural conversation.`
        }
      ],
      max_tokens: 150,
      temperature: 0.8,
    }, {
      headers: {
        'Authorization': `Bearer ${this.openaiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const reply = response.data.choices[0].message.content;
    this.conversationHistory.push({ role: 'assistant', content: reply });

    // Extract survey data from the user's response
    this.extractSurveyData(userResponse);
    this.questionCount++;

    const isComplete = this.questionCount >= this.maxQuestions;

    return {
      reply,
      isComplete,
      surveyData: this.surveyData,
    };
  }

  private extractDayQuality(response: string): string {
    const positive = /good|great|amazing|awesome|fantastic|excellent|wonderful|perfect|happy|excited/i;
    const negative = /bad|terrible|awful|rough|tough|difficult|stressful|tired|exhausted/i;
    const neutral = /okay|fine|alright|decent|normal|regular/i;

    if (positive.test(response)) return 'positive';
    if (negative.test(response)) return 'negative';
    if (neutral.test(response)) return 'neutral';
    return 'mixed';
  }

  private extractSurveyData(response: string): void {
    const lowerResponse = response.toLowerCase();

    // Time-based preferences
    if (lowerResponse.includes('morning') || lowerResponse.includes('early')) {
      this.surveyData.productivity_time = 'morning';
    } else if (lowerResponse.includes('night') || lowerResponse.includes('evening') || lowerResponse.includes('late')) {
      this.surveyData.productivity_time = 'night';
    } else if (lowerResponse.includes('afternoon')) {
      this.surveyData.productivity_time = 'afternoon';
    }

    // Work style
    if (lowerResponse.includes('alone') || lowerResponse.includes('solo') || lowerResponse.includes('independent')) {
      this.surveyData.work_style = 'independent';
    } else if (lowerResponse.includes('team') || lowerResponse.includes('group') || lowerResponse.includes('collaborate')) {
      this.surveyData.work_style = 'collaborative';
    }

    // Product preferences (for consumer surveys)
    if (lowerResponse.includes('online') || lowerResponse.includes('e-commerce')) {
      this.surveyData.shopping_preference = 'online';
    } else if (lowerResponse.includes('store') || lowerResponse.includes('in-person')) {
      this.surveyData.shopping_preference = 'in-store';
    }

    // Communication style
    if (lowerResponse.includes('direct') || lowerResponse.includes('straight')) {
      this.surveyData.communication_style = 'direct';
    } else if (lowerResponse.includes('casual') || lowerResponse.includes('friendly')) {
      this.surveyData.communication_style = 'casual';
    }

    // Energy levels
    if (lowerResponse.includes('high energy') || lowerResponse.includes('energetic')) {
      this.surveyData.energy_level = 'high';
    } else if (lowerResponse.includes('low energy') || lowerResponse.includes('tired')) {
      this.surveyData.energy_level = 'low';
    } else if (lowerResponse.includes('balanced') || lowerResponse.includes('moderate')) {
      this.surveyData.energy_level = 'moderate';
    }
  }

  async generateVoice(text: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', // Rachel voice
        {
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.3,
            similarity_boost: 0.8,
            style: 0.4,
            use_speaker_boost: true
          }
        },
        {
          headers: {
            'Accept': 'audio/mpeg',
            'xi-api-key': this.elevenlabsKey,
            'Content-Type': 'application/json'
          },
          responseType: 'arraybuffer'
        }
      );

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('ElevenLabs TTS Error:', error);
      throw new Error('Failed to generate voice');
    }
  }
} 