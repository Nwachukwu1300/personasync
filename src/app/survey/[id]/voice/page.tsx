'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { VoiceAgent, SurveyData } from '../../../../lib/voice-agent';
import { SURVEYS } from '../../../../lib/surveys';
import { generateAvatar, calculateXP } from '../../../../lib/surveys';
import { UserSession } from '../../../../lib/user-session';
import { Play, Pause, Send, Volume2, ArrowLeft, Mic, MicOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function VoiceSurveyPage() {
  const params = useParams();
  const router = useRouter();
  const [voiceAgent, setVoiceAgent] = useState<VoiceAgent | null>(null);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [surveyData, setSurveyData] = useState<SurveyData>({});
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [avatar, setAvatar] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Find the current survey
  const survey = SURVEYS.find(s => s.id === params.id);

  // Initialize voice agent when survey is found
  useEffect(() => {
    if (survey && !voiceAgent) {
      const agent = new VoiceAgent(survey);
      setVoiceAgent(agent);
    }
  }, [survey, voiceAgent]);

  // Handle invalid survey ID
  if (!survey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="text-2xl font-bold text-red-500 mb-4">Survey Not Found</div>
            <p className="text-gray-600 mb-6">
              The survey you're looking for doesn't exist. Let's get you back to the surveys page.
            </p>
            <Button
              onClick={() => router.push('/surveys')}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Surveys
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const startConversation = async () => {
    if (!voiceAgent) return;
    
    setIsLoading(true);
    try {
      const greeting = await voiceAgent.startConversation();
      const audioUrl = await voiceAgent.generateVoice(greeting);
      
      setConversation([{
        role: 'assistant',
        content: greeting,
        timestamp: new Date()
      }]);
      
      setCurrentAudio(audioUrl);
      setHasStarted(true);
      
      // Auto-play the greeting
      setTimeout(() => {
        playAudio(audioUrl);
      }, 500);
      
    } catch (error) {
      console.error('Error starting conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim() || !voiceAgent || isLoading) return;

    const userMessage = userInput.trim();
    setUserInput('');
    setIsLoading(true);

    // Add user message to conversation
    const newConversation = [...conversation, {
      role: 'user' as const,
      content: userMessage,
      timestamp: new Date()
    }];
    setConversation(newConversation);

    try {
      const response = await voiceAgent.processResponse(userMessage);
      
      // Add assistant response to conversation
      const updatedConversation = [...newConversation, {
        role: 'assistant' as const,
        content: response.reply,
        timestamp: new Date()
      }];
      setConversation(updatedConversation);

      // Update survey data
      setSurveyData(response.surveyData);

      // Generate and play voice response
      const audioUrl = await voiceAgent.generateVoice(response.reply);
      setCurrentAudio(audioUrl);
      
      // Auto-play the response
      setTimeout(() => {
        playAudio(audioUrl);
      }, 500);

      // Check if survey is complete
      if (response.isComplete) {
        handleSurveyComplete(response.surveyData);
      }

    } catch (error) {
      console.error('Error processing response:', error);
      // Add error message to conversation
      setConversation(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I had trouble understanding that. Could you try again?",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSurveyComplete = (finalSurveyData: SurveyData) => {
    // Generate avatar from survey data (convert to traits)
    const traits = Object.values(finalSurveyData).map(value => 
      // Simple mapping - in real app, this would be more sophisticated
      ({ name: String(value), emoji: '✨', description: '', category: 'personality', strength: 7 })
    );
    
    const generatedAvatar = generateAvatar(traits);
    const xp = calculateXP(survey, Object.values(finalSurveyData).map(String));
    
    // Save to user session
    let earnedXP = xp;
    if (UserSession.isLoggedIn()) {
      const result = UserSession.completeSurvey(survey.id, xp);
      earnedXP = result.xpEarned;
    }
    
    setAvatar(generatedAvatar);
    setEarnedXP(earnedXP);
    setIsComplete(true);
  };

  const playAudio = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{survey.emoji}</span>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Chat Complete! 🎉
                </h2>
                <p className="text-gray-600 text-lg">
                  Thanks for the amazing conversation! Here's what I learned about you:
                </p>
              </div>

              {/* Survey Results */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 mb-8">
                <h3 className="text-xl font-bold text-purple-600 mb-4">Your Profile</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(surveyData).map(([key, value]) => (
                    <div key={key} className="bg-white rounded-lg p-3">
                      <div className="font-semibold text-gray-700 capitalize">
                        {key.replace('_', ' ')}
                      </div>
                      <div className="text-purple-600 capitalize">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* XP Earned */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-yellow-700">XP Earned</div>
                    <div className="text-yellow-600">Great conversation!</div>
                  </div>
                  <div className="text-3xl font-bold text-yellow-700">+{earnedXP}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => router.push('/surveys')}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  More Surveys
                </Button>
                <Button
                  onClick={() => router.push('/profile/mmesoma')}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/surveys')}
              className="text-gray-600 hover:text-purple-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-xl">{survey.emoji}</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">Chat with Nova</h1>
                <p className="text-sm text-gray-600">{survey.title}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-purple-600">+{survey.xpReward} XP</div>
            <div className="text-xs text-gray-500">Reward</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {!hasStarted ? (
          /* Welcome Screen */
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl max-w-md w-full">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Volume2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Chat with Nova? 
                </h2>
                <p className="text-gray-600 mb-6">
                  I'm going to ask about your day and then we'll have a natural conversation about {survey.title.toLowerCase()}. It'll be fun! 
                </p>
                <Button
                  onClick={startConversation}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-2xl shadow-lg"
                >
                  {isLoading ? 'Starting...' : 'Start Chatting 🎙️'}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Chat Interface */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversation */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl">
                <CardContent className="p-6">
                  <div className="h-96 overflow-y-auto mb-6 space-y-4">
                    <AnimatePresence>
                      {conversation.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] p-4 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm font-medium mb-1">
                              {message.role === 'user' ? 'You' : 'Nova'}
                            </p>
                            <p>{message.content}</p>
                            <p className="text-xs opacity-70 mt-2">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-4 rounded-2xl">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Area */}
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your response..."
                        className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows={2}
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      onClick={sendMessage}
                      disabled={!userInput.trim() || isLoading}
                      className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-2xl"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Audio Controls */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Volume2 className="w-5 h-5" />
                    Nova's Voice
                  </h3>
                  <div className="space-y-3">
                    <Button
                      onClick={togglePlayPause}
                      disabled={!currentAudio}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isPlaying ? 'Pause' : 'Play Last Message'}
                    </Button>
                    <audio
                      ref={audioRef}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Progress */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Chat Progress</h3>
                  <div className="space-y-3">
                    <Progress value={(Object.keys(surveyData).length / 5) * 100} className="h-3" />
                    <p className="text-sm text-gray-600">
                      {Object.keys(surveyData).length} insights collected
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Current Insights */}
              {Object.keys(surveyData).length > 0 && (
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4">What I've Learned</h3>
                    <div className="space-y-2">
                      {Object.entries(surveyData).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <span className="font-medium text-gray-700 capitalize">
                            {key.replace('_', ' ')}: 
                          </span>
                          <span className="text-purple-600 ml-1 capitalize">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 