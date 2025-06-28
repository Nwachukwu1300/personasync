'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Users, Mic, Star, ArrowRight, Play, Zap, Gift } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        
        <div className="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo and Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                PersonaSync
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 font-medium">
                Discover Your True Self Through Voice-Powered Personality Surveys
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of Gen Z users exploring their unique personality traits, 
              creating digital avatars, and building meaningful connections through voice-powered self-discovery.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl transform hover:scale-105 transition-all">
                <Link href="/onboarding" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Start Your Journey
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 font-semibold px-8 py-4 rounded-2xl">
                <Link href="/surveys" className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Browse Surveys
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">50+</div>
                <div className="text-gray-600">Personality Surveys</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-gray-600">Unique Avatars</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How PersonaSync Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your journey to self-discovery in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Fun Surveys</h3>
                <p className="text-gray-600">
                  Take engaging, emoji-enhanced personality quizzes designed specifically for Gen Z. 
                  No boring forms - just fun questions that reveal your true self!
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-0 shadow-xl bg-gradient-to-br from-pink-50 to-blue-50 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Unlock Your Avatar</h3>
                <p className="text-gray-600">
                  Discover your unique personality-based digital avatar with custom traits, 
                  titles, and visual styles that reflect who you truly are.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hear Your Voice</h3>
                <p className="text-gray-600">
                  Experience your personality come to life with AI-generated voice summaries 
                  that tell your unique story using ElevenLabs technology.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl">
            <CardContent className="p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Discover Your True Self?</h3>
              <p className="text-xl mb-8 opacity-90">
                Join the community of self-explorers and unlock your unique personality today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button 
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
                  asChild
                >
                  <Link href="/signup">Start Discovery</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg"
                  asChild
                >
                  <Link href="/rewards">View Rewards</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold">PersonaSync</span>
          </div>
          <p className="text-gray-400">
            Discover your true self through voice-powered personality exploration
          </p>
        </div>
      </footer>
    </div>
  );
}
