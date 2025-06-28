'use client';

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  Target, 
  Users, 
  Mic, 
  ArrowRight, 
  ArrowLeft, 
  Play,
  Star,
  Heart,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const steps = [
    {
      title: "Welcome to PersonaSync! ✨",
      subtitle: "Your journey to self-discovery starts here",
      description: "Discover your unique personality through fun, voice-powered surveys designed specifically for Gen Z. No boring forms - just authentic self-expression!",
      emoji: "🌟",
      color: "from-purple-500 to-pink-500",
      icon: Sparkles,
      features: [
        { text: "Fun, gamified surveys", emoji: "🎯" },
        { text: "AI-powered voice summaries", emoji: "🎙️" },
        { text: "Unique personality avatars", emoji: "👤" },
        { text: "Community connections", emoji: "🤝" }
      ]
    },
    {
      title: "Step 1: Complete Fun Surveys 🎯",
      subtitle: "Answer engaging questions that reveal your true self",
      description: "Our personality surveys are designed to be fun and engaging. Each question helps us understand your unique traits, interests, and values.",
      emoji: "🎯",
      color: "from-pink-500 to-orange-500",
      icon: Target,
      features: [
        { text: "Emoji-enhanced questions", emoji: "😊" },
        { text: "No right or wrong answers", emoji: "✅" },
        { text: "Quick and engaging", emoji: "⚡" },
        { text: "Progress tracking", emoji: "📊" }
      ]
    },
    {
      title: "Step 2: Unlock Your Avatar 🧍‍♂️",
      subtitle: "Discover your unique personality-based digital self",
      description: "Based on your survey responses, we'll generate a unique avatar that reflects your personality traits, interests, and values.",
      emoji: "👤",
      color: "from-orange-500 to-yellow-500",
      icon: Users,
      features: [
        { text: "Personalized traits", emoji: "🎨" },
        { text: "Custom titles", emoji: "👑" },
        { text: "Visual styles", emoji: "🌈" },
        { text: "Unique descriptions", emoji: "📝" }
      ]
    },
    {
      title: "Step 3: Hear Your Voice 🎙️",
      subtitle: "Experience your personality come to life",
      description: "Listen to your avatar speak with AI-generated voice summaries that tell your unique story using ElevenLabs technology.",
      emoji: "🎙️",
      color: "from-yellow-500 to-green-500",
      icon: Mic,
      features: [
        { text: "AI voice generation", emoji: "🤖" },
        { text: "Personalized summaries", emoji: "📖" },
        { text: "Natural speech", emoji: "🗣️" },
        { text: "Shareable content", emoji: "📤" }
      ]
    },
    {
      title: "Ready to Begin? 🚀",
      subtitle: "Your personality journey awaits",
      description: "Join thousands of Gen Z users who have already discovered their true selves through PersonaSync. Start your journey today!",
      emoji: "🚀",
      color: "from-green-500 to-blue-500",
      icon: Star,
      features: [
        { text: "Earn XP and rewards", emoji: "🏆" },
        { text: "Join communities", emoji: "👥" },
        { text: "Unlock achievements", emoji: "🎖️" },
        { text: "Share your story", emoji: "💬" }
      ]
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleSkip = () => {
    setCurrentStep(steps.length - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Step Content */}
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  {/* Header */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                  >
                    <div className={`inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-r ${currentStepData.color} rounded-3xl shadow-lg`}>
                      <currentStepData.icon className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {currentStepData.title}
                    </h1>
                    <p className="text-lg text-gray-600 font-medium">
                      {currentStepData.subtitle}
                    </p>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-600 mb-8 text-lg leading-relaxed"
                  >
                    {currentStepData.description}
                  </motion.p>

                  {/* Features Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="grid grid-cols-2 gap-4 mb-8"
                  >
                    {currentStepData.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl"
                      >
                        <span className="text-2xl">{feature.emoji}</span>
                        <span className="text-sm font-medium text-gray-700">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Navigation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  >
                    {currentStep > 0 && (
                      <Button
                        onClick={handlePrevious}
                        variant="outline"
                        className="w-full sm:w-auto border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold px-8 py-3 rounded-2xl"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                    )}
                    
                    {currentStep < steps.length - 1 ? (
                      <Button
                        onClick={handleNext}
                        className={`w-full sm:w-auto bg-gradient-to-r ${currentStepData.color} hover:opacity-90 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all`}
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button asChild className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
                        <Link href="/surveys" className="flex items-center">
                          <Play className="w-4 h-4 mr-2" />
                          Start Your Journey
                        </Link>
                      </Button>
                    )}
                  </motion.div>

                  {/* Skip Option */}
                  {currentStep < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="mt-6"
                    >
                      <Button
                        onClick={handleSkip}
                        variant="ghost"
                        className="text-gray-500 hover:text-gray-700 text-sm"
                      >
                        Skip to end
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6">
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">PersonaSync</span>
        </div>
      </div>
    </div>
  );
} 