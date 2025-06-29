'use client';

import React, { useState, useRef, useEffect } from 'react';
import { VoiceAgent, ConversationMessage, SurveyData } from '../../lib/voice-agent';
import { Play, Pause, Send, Volume2 } from 'lucide-react';

export default function VoiceSurveyPage() {
  const [voiceAgent] = useState(() => new VoiceAgent());
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [surveyData, setSurveyData] = useState<SurveyData>({});
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Start conversation with greeting
  const startConversation = async () => {
    setIsLoading(true);
    try {
      const greeting = voiceAgent.getGreeting();
      const greetingAudio = await voiceAgent.getGreetingAudio();
      
      setConversation([{
        role: 'assistant',
        content: greeting
      }]);
      setCurrentAudio(greetingAudio);
      setHasStarted(true);
    } catch (error) {
      console.error('Error starting conversation:', error);
      alert('Error starting conversation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user input
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    setIsLoading(true);
    const input = userInput.trim();
    setUserInput('');

    try {
      // Add user message to conversation
      setConversation(prev => [...prev, { role: 'user', content: input }]);

      // Get response from voice agent
      const response = await voiceAgent.generateResponse(input);
      
      // Add AI response to conversation
      setConversation(prev => [...prev, { role: 'assistant', content: response.text }]);
      
      // Update survey data and completion status
      setSurveyData(response.surveyData);
      setIsComplete(response.isComplete);
      
      // Set new audio
      setCurrentAudio(response.audioUrl);

    } catch (error) {
      console.error('Error processing response:', error);
      alert('Error processing response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Audio controls
  const playAudio = () => {
    if (audioRef.current && currentAudio) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  // Auto-play when new audio is available
  useEffect(() => {
    if (currentAudio && audioRef.current) {
      audioRef.current.load();
      playAudio();
    }
  }, [currentAudio]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Chat with Nova 🎙️
          </h1>
          <p className="text-gray-600">
            A casual conversation to learn about your personality
          </p>
        </div>

        {/* Start Button */}
        {!hasStarted && (
          <div className="text-center mb-8">
            <button
              onClick={startConversation}
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold text-lg hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? 'Starting...' : 'Start Conversation with Nova'}
            </button>
          </div>
        )}

        {hasStarted && (
          <>
            {/* Audio Player */}
            {currentAudio && (
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={isPlaying ? pauseAudio : playAudio}
                    className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-purple-600" />
                    ) : (
                      <Play className="w-6 h-6 text-purple-600" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-5 h-5 text-white" />
                      <span className="text-white font-medium">
                        {isPlaying ? 'Nova is speaking...' : 'Click to hear Nova'}
                      </span>
                    </div>
                  </div>
                </div>

                <audio
                  ref={audioRef}
                  onEnded={handleAudioEnded}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  {currentAudio && <source src={currentAudio} type="audio/mpeg" />}
                </audio>
              </div>
            )}

            {/* Conversation Display */}
            <div className="mb-6 h-64 overflow-y-auto bg-white rounded-lg shadow-lg p-4 space-y-4">
              {conversation.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="text-xs text-purple-600 mb-1 font-semibold">Nova</div>
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-100 text-gray-800">
                    <div className="text-xs text-purple-600 mb-1 font-semibold">Nova</div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            {!isComplete && (
              <form onSubmit={handleSubmit} className="flex space-x-2 mb-6">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your response..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !userInput.trim()}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}

            {/* Survey Results */}
            {isComplete && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  🎉 Conversation Complete!
                </h3>
                <p className="text-gray-600 mb-4">
                  Here's what Nova learned about you:
                </p>
                
                <div className="space-y-2">
                  {Object.entries(surveyData).map(([key, value]) => (
                    value && (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium text-gray-700">
                          {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                        </span>
                        <span className="text-purple-600 font-semibold">
                          {value}
                        </span>
                      </div>
                    )
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90"
                  >
                    Start New Conversation
                  </button>
                </div>
              </div>
            )}

            {/* Progress Indicator */}
            <div className="text-center text-sm text-gray-500">
              Personality insights collected: {Object.values(surveyData).filter(v => v !== null && v !== undefined).length}/4
            </div>
          </>
        )}
      </div>
    </div>
  );
} 