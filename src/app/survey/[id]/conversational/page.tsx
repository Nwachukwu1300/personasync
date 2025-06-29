'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Star,
  Target,
  Clock,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';
import { SURVEYS } from '@/lib/surveys';
import { generateAvatar } from '@/lib/surveys';
import { calculateXP } from '@/lib/surveys';
import { AvatarTrait } from '@/lib/types';

export default function ConversationalSurveyPage() {
  const params = useParams();
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<string[]>([]);
  const [selectedTraits, setSelectedTraits] = React.useState<AvatarTrait[]>([]);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [earnedXP, setEarnedXP] = React.useState(0);
  const [avatar, setAvatar] = React.useState<any>(null);

  // Find the current survey
  const survey = SURVEYS.find(s => s.id === params.id);

  // Handle invalid survey ID
  if (!survey) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="text-2xl font-bold text-red-500 mb-4">Survey Not Found</div>
            <p className="text-gray-600 mb-6">
              The survey you're looking for doesn't exist. Please try another one.
            </p>
            <Button
              onClick={() => router.push('/surveys')}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              Back to Surveys
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = survey.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / survey.questions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    const answer = currentQuestion.options[optionIndex];
    const newAnswers = [...selectedAnswers, answer.text];
    
    // Only spread traits if they exist
    const newTraits = answer.traits 
      ? [...selectedTraits, ...answer.traits]
      : selectedTraits;
    
    setSelectedAnswers(newAnswers);
    setSelectedTraits(newTraits);

    if (currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Survey completed
      const xp = calculateXP(survey, newAnswers);
      const generatedAvatar = generateAvatar(newTraits);
      setEarnedXP(xp);
      setAvatar(generatedAvatar);
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              {/* Completion Header */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse opacity-50"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Survey Completed!
                </h2>
                <p className="text-gray-600 text-lg">
                  Thanks for sharing your thoughts! Here's what we discovered about you.
                </p>
              </motion.div>

              {/* Avatar Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 mb-8 border border-purple-100"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">{survey.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      {avatar.title}
                    </div>
                    <p className="text-gray-600 text-lg mb-4">
                      {avatar.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {avatar.traits.map((trait: AvatarTrait, index: number) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white shadow-md text-purple-600 border border-purple-100"
                        >
                          <span className="text-xl mr-2">{trait.emoji}</span>
                          <span>{trait.name}</span>
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* XP and Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              >
                {/* XP Card */}
                <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-0 rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-lg font-bold text-yellow-700">XP Earned</div>
                      <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="text-xl font-bold text-yellow-700">+{earnedXP}</span>
                      </div>
                    </div>
                    <Progress value={100} className="bg-yellow-200 h-3 mb-2" />
                    <p className="text-yellow-600 text-sm">Great job! Keep going to level up!</p>
                  </CardContent>
                </Card>

                {/* Survey Stats */}
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="text-lg font-bold text-purple-700 mb-3">Survey Stats</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-600">Questions Answered</span>
                        <span className="font-medium text-purple-700">{survey.questions.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-600">Time Spent</span>
                        <span className="font-medium text-purple-700">~{survey.estimatedTime} min</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-600">Category</span>
                        <span className="font-medium text-purple-700">{survey.category}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={() => router.push('/profile/mmesoma')}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
                >
                  <div className="flex flex-col items-center mx-2 my-2">
                    <span className="text-lg">View Your Profile</span>
                    <span className="text-sm opacity-90">See your complete personality insights</span>
                  </div>
                </Button>
                <Button
                  onClick={() => router.push('/surveys')}
                  variant="outline"
                  className="flex-1 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold py-6 rounded-2xl transform hover:scale-105 transition-all"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-lg">Take Another Survey</span>
                    <span className="text-sm opacity-90">Continue your journey</span>
                  </div>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/surveys')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-500" />
              <span className="font-medium text-gray-900">
                Question {currentQuestionIndex + 1} of {survey.questions.length}
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Survey Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className="border-0 shadow-xl bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-purple-600 font-medium mb-2">PersonaSync asks:</div>
                      <div className="text-xl font-bold text-black-900">
                        {currentQuestion.text}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="w-full bg-white hover:bg-purple-50 border-2 border-purple-100 text-left normal-case font-normal p-4 h-auto text-black"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{option.emoji}</div>
                          <div className="flex-1 text-black">{option.text}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>~{survey.estimatedTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>{survey.xpReward} XP Reward</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
