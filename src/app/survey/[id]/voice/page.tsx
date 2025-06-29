'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { VoiceAgent, SurveyData } from '../../../../lib/voice-agent';
import { SURVEYS } from '../../../../lib/surveys';
import { generateAvatar } from '../../../../lib/surveys';
import { UserSession } from '../../../../lib/user-session';
import { Play, Pause, Send, Volume2, ArrowLeft, Mic, MicOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

// Extend Window interface for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

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
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [completedTranscript, setCompletedTranscript] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<any>(null);

  // Find the current survey
  const survey = SURVEYS.find(s => s.id === params.id);

  // Initialize voice agent when survey is found
  useEffect(() => {
    if (survey && !voiceAgent) {
      const agent = new VoiceAgent(survey);
      setVoiceAgent(agent);
    }
  }, [survey, voiceAgent]);

  // Stable function for sending messages
  const sendMessageWithText = useCallback(async (message: string) => {
    console.log('sendMessageWithText called with:', message);
    if (!message.trim() || !voiceAgent || isLoading) {
      console.log('Skipping message send - conditions not met:', {
        hasMessage: !!message.trim(),
        hasVoiceAgent: !!voiceAgent,
        isLoading
      });
      return;
    }

    const userMessage = message.trim();
    console.log('Processing message:', userMessage);
    setIsLoading(true);

    // Add user message to conversation (for tracking, but won't display text)
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
  }, [voiceAgent, isLoading, conversation]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;

        let fullTranscript = '';

        recognition.onstart = () => {
          setIsListening(true);
          setIsRecording(true);
          setCurrentTranscript('');
          fullTranscript = '';
        };

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          // Update the full transcript with final results
          if (finalTranscript) {
            fullTranscript += finalTranscript;
          }

          // Update visual feedback with current transcript (final + interim)
          setCurrentTranscript(fullTranscript + interimTranscript);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          setIsRecording(false);
          setCurrentTranscript('');
        };

        recognition.onend = () => {
          setIsListening(false);
          setIsRecording(false);
          
          // Store the completed transcript in state for processing
          if (fullTranscript.trim()) {
            console.log('Speech ended, transcript:', fullTranscript.trim());
            setCompletedTranscript(fullTranscript.trim());
          } else {
            console.log('No transcript captured');
          }
          
          setCurrentTranscript('');
          fullTranscript = '';
        };

        recognitionRef.current = recognition;
      } else {
        setSpeechSupported(false);
        console.warn('Speech recognition not supported in this browser');
      }
    }
  }, []);

  // Handle completed transcript (send message when speech ends)
  useEffect(() => {
    if (completedTranscript && voiceAgent && !isLoading) {
      console.log('Processing completed transcript:', completedTranscript);
      setUserInput(completedTranscript);
      sendMessageWithText(completedTranscript);
      setCompletedTranscript(''); // Clear after sending
    }
  }, [completedTranscript, voiceAgent, isLoading, sendMessageWithText]);

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
    await sendMessageWithText(userInput);
    setUserInput('');
  };

  const handleSurveyComplete = (finalSurveyData: SurveyData) => {
    // Generate avatar from survey data (convert to traits)
    const traits = Object.values(finalSurveyData).map(value => 
      // Simple mapping - in real app, this would be more sophisticated
      ({ name: String(value), emoji: '✨', description: '', category: 'personality' as const, strength: 7 })
    );
    
    const generatedAvatar = generateAvatar(traits);
    const xp = survey.xpReward; // Use the survey's predefined XP reward
    
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

  const startVoiceRecording = () => {
    if (recognitionRef.current && speechSupported && !isRecording) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting voice recording:', error);
      }
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
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
                  This is a voice-only conversation! I'll ask about your day and we'll chat naturally about {survey.title.toLowerCase()}. Tap the microphone to start speaking, then tap it again when you're done! 
                </p>
                {!speechSupported && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-yellow-700">
                      Voice input not supported in this browser. You can still type responses.
                    </p>
                  </div>
                )}
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
            {/* Voice Interface */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="mb-8">
                      <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                        {isPlaying ? (
                          <Volume2 className="w-16 h-16 text-white animate-pulse" />
                        ) : isListening ? (
                          <div className="relative">
                            <Mic className="w-16 h-16 text-white" />
                            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                          </div>
                        ) : (
                          <span className="text-4xl">{survey.emoji}</span>
                        )}
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {isLoading ? 'Nova is thinking...' : 
                         isListening ? 'Listening...' : 
                         isPlaying ? 'Nova is speaking' : 
                         'Ready to chat with Nova'}
                      </h2>
                      
                      <p className="text-gray-600">
                        {isLoading ? 'Processing your response' : 
                         isListening ? 'Speak now, tap mic again when done!' : 
                         isPlaying ? 'Listen to Nova\'s response' : 
                         'Tap the microphone to start speaking'}
                      </p>
                      
                      {/* Real-time transcript display */}
                      {isListening && currentTranscript && (
                        <div className="mt-4 p-4 bg-purple-50 rounded-2xl border-2 border-purple-200">
                          <p className="text-sm text-purple-600 font-medium mb-1">What I'm hearing:</p>
                          <p className="text-purple-800 italic">{currentTranscript}</p>
                        </div>
                      )}
                    </div>

                    {/* Voice Controls */}
                    <div className="flex justify-center gap-4 mb-8">
                      {speechSupported ? (
                        <div className="text-center">
                          <Button
                            onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                            disabled={isLoading || isPlaying}
                            className={`w-20 h-20 rounded-full text-white font-semibold transition-all ${
                              isRecording 
                                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                            }`}
                          >
                            {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                          </Button>
                          <p className="text-xs text-gray-500 mt-2">
                            {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4 w-full max-w-md">
                          <textarea
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Voice not supported. Type your response..."
                            className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            rows={3}
                            disabled={isLoading}
                          />
                          <Button
                            onClick={sendMessage}
                            disabled={!userInput.trim() || isLoading}
                            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Send Response
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Audio Controls */}
                    <div className="flex justify-center">
                      <Button
                        onClick={togglePlayPause}
                        disabled={!currentAudio}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isPlaying ? 'Pause Nova' : 'Replay Last Message'}
                      </Button>
                    </div>

                    <audio
                      ref={audioRef}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Voice Status */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Mic className="w-5 h-5" />
                    Voice Status
                  </h3>
                  <div className="space-y-3">
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${
                      speechSupported 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        speechSupported ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="text-sm font-medium">
                        {speechSupported ? 'Voice input ready' : 'Voice not supported'}
                      </span>
                    </div>
                    
                    {isListening && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-50 text-purple-700">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">Listening... (tap mic to stop)</span>
                        </div>
                        {currentTranscript && (
                          <div className="p-2 bg-gray-50 rounded text-xs text-gray-600 max-h-16 overflow-y-auto">
                            <div className="font-medium mb-1">Current:</div>
                            <div className="italic">{currentTranscript}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Hidden Progress - Data collection continues but UI is hidden */}
              <div className="hidden">
                <Progress value={(Object.keys(surveyData).length / 5) * 100} className="h-3" />
                <p className="text-sm text-gray-600">
                  {Object.keys(surveyData).length} insights collected
                </p>
              </div>

              {/* Hidden Insights - Data collection continues but UI is hidden */}
              <div className="hidden">
                {Object.keys(surveyData).length > 0 && (
                  <div>
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
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 