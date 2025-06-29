'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Users, Mic, Star, ArrowRight, Play, Zap, Gift } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Enhanced background with subtle pattern */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        
        <div className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo and Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6 tracking-tight">
                PersonaSync
              </h1>
              <p className="text-2xl md:text-3xl text-gray-800 font-medium tracking-tight">
                Discover Your True Self Through Voice-Powered Personality Surveys
              </p>
            </motion.div>

            {/* Enhanced Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Join thousands of Gen Z users exploring their unique personality traits, 
              creating digital avatars, and building meaningful connections through 
              <span className="text-purple-600 font-semibold"> voice-powered self-discovery</span>.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 font-semibold px-10 py-6 rounded-2xl transform hover:scale-105 transition-all duration-300 text-lg"
              >
                <Link href="/surveys" className="flex items-center gap-3">
                  <Target className="w-6 h-6" />
                  Browse Surveys
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How PersonaSync Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your journey to self-discovery in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className="h-full border-0 shadow-2xl bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl transform group-hover:scale-105 transition-all duration-300">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 transform group-hover:rotate-6 transition-all duration-300">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Fun Surveys</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Take engaging, emoji-enhanced personality quizzes designed specifically for Gen Z. 
                  No boring forms - just fun questions that reveal your true self! ✨
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
            className="group"
          >
            <Card className="h-full border-0 shadow-2xl bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl transform group-hover:scale-105 transition-all duration-300">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 transform group-hover:rotate-6 transition-all duration-300">
                  <Mic className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hear Your Voice</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Experience your personality come to life with AI-generated voice summaries 
                  that tell your unique story using ElevenLabs technology. 🎭
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl transform hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-16 text-white">
              <h3 className="text-4xl font-bold mb-6">Ready to Discover Your True Self?</h3>
              <p className="text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Join the community of self-explorers and unlock your unique personality today!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-100 px-10 l py-6 text-xl font-semibold transform hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link href="/signup" className="flex items-center gap-3">
                    <Play className="w-6 h-6" />
                    Start Discovery
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-black px-10 py-6 text-xl font-semibold"
                  asChild
                >
                  <Link href="/rewards" className="flex items-center text-black gap-3">
                    <Gift className="w-6 h-6" />
                    View Rewards
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              PersonaSync
            </span>
          </div>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Discover your true self through voice-powered personality exploration
          </p>
        </div>
      </footer>
    </div>
  );
}
