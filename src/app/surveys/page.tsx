'use client';

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  Target, 
  Clock, 
  Star, 
  ArrowRight, 
  Search,
  Filter,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { SURVEYS } from "@/lib/surveys";
import { UserSession } from "@/lib/user-session";

export default function SurveysPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [completedSurveys, setCompletedSurveys] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Load completed surveys for current user
    const currentUser = UserSession.getCurrentUser();
    if (currentUser && currentUser.completedSurveys) {
      setCompletedSurveys(currentUser.completedSurveys);
    }
  }, []);

  const categories = [
    { id: 'all', name: 'All Surveys', emoji: '🌟', count: SURVEYS.length },
    { id: 'personality', name: 'Personality', emoji: '🧠', count: SURVEYS.filter(s => s.category === 'personality').length },
    { id: 'lifestyle', name: 'Lifestyle', emoji: '💫', count: SURVEYS.filter(s => s.category === 'lifestyle').length },
    { id: 'career', name: 'Career', emoji: '💼', count: SURVEYS.filter(s => s.category === 'career').length },
    { id: 'social', name: 'Social', emoji: '🤝', count: SURVEYS.filter(s => s.category === 'social').length },
  ];

  const filteredSurveys = SURVEYS.filter(survey => {
    const matchesCategory = selectedCategory === 'all' || survey.category === selectedCategory;
    const matchesSearch = survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         survey.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Personality Surveys</h1>
              <p className="text-gray-600">Discover yourself through fun, engaging surveys</p>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <span className="text-sm font-medium text-purple-600">PersonaSync</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search surveys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="text-lg">{category.emoji}</span>
                  <span className="font-medium">{category.name}</span>
                  <span className="text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {filteredSurveys.length} survey{filteredSurveys.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <TrendingUp className="w-4 h-4" />
              <span>Most popular first</span>
            </div>
          </div>
        </div>

        {/* Surveys Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSurveys.map((survey, index) => {
            const isCompleted = completedSurveys.includes(survey.id);
            
            return (
            <motion.div
              key={survey.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${isCompleted ? 'ring-2 ring-green-200' : ''}`}>
                <CardContent className="p-6 relative">
                  {/* Completion Badge */}
                  {isCompleted && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      COMPLETED
                    </div>
                  )}

                  {/* Survey Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl">
                      {survey.emoji}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>

                  {/* Survey Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{survey.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {survey.description}
                    </p>
                  </div>

                  {/* Survey Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{survey.questions.length} questions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{survey.estimatedTime} min</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">{survey.xpReward} XP</div>
                      <div className="text-xs text-gray-500">Reward</div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      survey.category === 'personality' ? 'bg-purple-100 text-purple-700' :
                      survey.category === 'lifestyle' ? 'bg-pink-100 text-pink-700' :
                      survey.category === 'career' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {survey.category.charAt(0).toUpperCase() + survey.category.slice(1)}
                    </span>
                  </div>

                  {/* CTA Button */}
                  {isCompleted ? (
                    <Button asChild className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-2xl shadow-lg">
                      <Link href={`/survey/${survey.id}/conversational`} className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Retake Survey
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
                      <Link href={`/survey/${survey.id}/conversational`} className="flex items-center justify-center gap-2">
                        Start Survey
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSurveys.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No surveys found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              variant="outline"
              className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl">
            <CardContent className="p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Discover More?</h3>
              <p className="text-xl mb-8 opacity-90">
                Complete surveys to unlock your unique personality avatar and earn XP rewards!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-2xl shadow-lg">
                  <Link href="/onboarding" className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Learn More
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-2xl shadow-lg">
                  <Link href="/profile/mmesoma" className="flex items-center gap-2">
                    View Profile
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 