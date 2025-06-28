'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Clock, Sparkles, Radio } from "lucide-react";
import Image from "next/image";
import { generateSpeech, createAudioBlob, createAudioUrl, VOICE_IDS } from '@/lib/elevenlabs';
import { startConversation, continueConversation, ChatMessage } from '@/lib/openai';

export default function VoicePage() {
  const [isListening, setIsListening] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = React.useState<ChatMessage[]>([]);
  const [aiResponse, setAiResponse] = React.useState("");
  const [userTranscript, setUserTranscript] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [voiceAnimation, setVoiceAnimation] = React.useState(false);
  const [showWelcome, setShowWelcome] = React.useState(true);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const recognitionRef = React.useRef<any>(null);

  // Initialize speech recognition
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserTranscript(transcript);
        handleVoiceInput(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Initialize conversation
  React.useEffect(() => {
    if (!showWelcome && conversationHistory.length === 0) {
      initializeConversation();
    }
  }, [showWelcome]);

  const initializeConversation = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      
      if (!apiKey) {
        throw new Error('OpenAI API key not found. Please add NEXT_PUBLIC_OPENAI_API_KEY to your environment variables.');
      }

      const initialPrompt = "Hi! I'm your AI learning assistant. I'm excited to have a voice conversation with you! Tell me about yourself - what are your interests, learning goals, and what motivates you?";
      
      const response = await startConversation(initialPrompt, { apiKey });
      
      setConversationHistory([
        { role: 'user' as const, content: initialPrompt },
        { role: 'assistant' as const, content: response }
      ]);
      setAiResponse(response);
      
      // Generate and play voice response
      await generateAndPlayVoice(response);
    } catch (error) {
      console.error('Error initializing conversation:', error);
      setAiResponse("Hi! I'm your AI learning assistant. I'm excited to have a voice conversation with you! Tell me about yourself - what are your interests, learning goals, and what motivates you?");
    }
  };

  const handleVoiceInput = async (transcript: string) => {
    if (!transcript.trim()) return;

    setIsProcessing(true);
    setUserTranscript(transcript);

    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      
      if (!apiKey) {
        throw new Error('OpenAI API key not found.');
      }

      const newHistory = [
        ...conversationHistory,
        { role: 'user' as const, content: transcript }
      ];

      const response = await continueConversation(conversationHistory, transcript, { apiKey });
      
      const updatedHistory = [
        ...newHistory,
        { role: 'assistant' as const, content: response }
      ];

      setConversationHistory(updatedHistory);
      setAiResponse(response);
      
      // Generate and play voice response
      await generateAndPlayVoice(response);
    } catch (error) {
      console.error('Error processing voice input:', error);
      setAiResponse("I'm having trouble processing that right now. Let's try again!");
    } finally {
      setIsProcessing(false);
    }
  };

  const generateAndPlayVoice = async (text: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
      
      if (!apiKey) {
        throw new Error('ElevenLabs API key not found.');
      }

      // Generate speech using ElevenLabs
      const audioBuffer = await generateSpeech(text, {
        apiKey,
        voiceId: VOICE_IDS.RACHEL,
      });

      // Create audio blob and URL
      const audioBlob = createAudioBlob(audioBuffer);
      const url = createAudioUrl(audioBlob);
      setAudioUrl(url);

      // Set the audio source and play
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
        setIsPlaying(true);
        setVoiceAnimation(true);
      }
    } catch (error) {
      console.error('Error generating voice:', error);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening && !isPlaying) {
      recognitionRef.current.start();
      setIsListening(true);
      setUserTranscript("");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setVoiceAnimation(false);
  };

  const handleSkipWelcome = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center px-4 py-8">
        <div className="mb-6 w-full max-w-md mx-auto text-center">
          <h1 className="text-3xl font-extrabold text-purple-500 mb-2">Voice Conversation</h1>
          <div className="text-purple-400 font-semibold mt-2 animate-pulse">Speak with your AI assistant!</div>
        </div>
        
        <Card className="w-full max-w-md mx-auto rounded-3xl shadow-xl bg-white/90 border border-purple-200">
          <CardContent className="p-8 flex flex-col items-center">
            {/* Avatar with voice animation */}
            <div className="mb-6 relative">
              <div className={`w-32 h-32 bg-purple-500 rounded-full flex items-center justify-center shadow-lg ${voiceAnimation ? 'animate-pulse' : ''}`}>
                <Radio className="w-12 h-12 text-white" />
              </div>
              {voiceAnimation && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
              )}
            </div>
            
            <div className="text-lg font-bold text-gray-900 mb-4 text-center">
              Ready to have a voice conversation with your AI learning assistant?
            </div>
            
            <div className="text-gray-600 mb-6 text-center">
              Click the microphone button to start speaking. Your AI assistant will respond with voice!
            </div>
            
            <Button
              onClick={handleSkipWelcome}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-full shadow transition"
            >
              Start Voice Chat
            </Button>
          </CardContent>
        </Card>
        
        <div className="text-gray-400 text-xs mt-8">© 2024 PersonaSync</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="mb-6 w-full max-w-md mx-auto text-center">
        <h1 className="text-3xl font-extrabold text-purple-500 mb-2">Voice Conversation</h1>
        <div className="text-purple-400 font-semibold mt-2 animate-pulse">Speak with your AI assistant!</div>
      </div>
      
      <Card className="w-full max-w-md mx-auto rounded-3xl shadow-xl bg-white/90 border border-purple-200">
        <CardContent className="p-6">
          {/* AI Response */}
          <div className="mb-4 p-4 bg-purple-50 rounded-2xl">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center ${voiceAnimation ? 'animate-pulse' : ''}`}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-purple-600 font-medium mb-1">AI Assistant</div>
                <div className="text-gray-800">
                  {isProcessing ? "Processing..." : aiResponse}
                </div>
              </div>
            </div>
          </div>

          {/* User Transcript */}
          {userTranscript && (
            <div className="mb-4 p-4 bg-blue-50 rounded-2xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-blue-600 font-medium mb-1">You</div>
                  <div className="text-gray-800">{userTranscript}</div>
                </div>
              </div>
            </div>
          )}

          {/* Voice Controls */}
          <div className="flex flex-col items-center gap-4">
            {/* Main Voice Button */}
            <Button
              onClick={isListening ? stopListening : startListening}
              disabled={isPlaying || isProcessing}
              className={`w-20 h-20 rounded-full shadow-lg transition-all ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-purple-500 hover:bg-purple-600'
              }`}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 text-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </Button>

            {/* Status Text */}
            <div className="text-center">
              {isListening && (
                <div className="text-purple-600 font-medium animate-pulse">Listening...</div>
              )}
              {isProcessing && (
                <div className="text-purple-600 font-medium">Processing your message...</div>
              )}
              {isPlaying && (
                <div className="text-purple-600 font-medium flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  AI is speaking...
                </div>
              )}
              {!isListening && !isProcessing && !isPlaying && (
                <div className="text-gray-500">Tap to speak</div>
              )}
            </div>

            {/* Audio Controls */}
            {audioUrl && (
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    if (audioRef.current) {
                      if (isPlaying) {
                        audioRef.current.pause();
                        setIsPlaying(false);
                        setVoiceAnimation(false);
                      } else {
                        audioRef.current.play();
                        setIsPlaying(true);
                        setVoiceAnimation(true);
                      }
                    }
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full"
                >
                  {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  {isPlaying ? 'Pause' : 'Replay'}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="text-gray-400 text-xs mt-8">© 2024 PersonaSync</div>

      {/* Audio element for ElevenLabs integration */}
      <audio 
        ref={audioRef} 
        onEnded={handleAudioEnded}
        style={{ display: 'none' }} 
      />
    </div>
  );
} 