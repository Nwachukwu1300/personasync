'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Gift, 
  Ticket, 
  Coins, 
  Calendar, 
  Users, 
  Crown, 
  Star,
  Lock,
  Check,
  Zap,
  Trophy,
  Coffee,
  ShoppingBag,
  Music,
  Gamepad2,
  Headphones,
  UserPlus,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { UserSession } from '@/lib/user-session';

interface Reward {
  id: string;
  title: string;
  description: string;
  type: 'voucher' | 'event' | 'loyalty' | 'exclusive' | 'merchandise';
  xpRequired: number;
  value: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  expiresAt?: string;
}

const REWARDS: Reward[] = [
  // Vouchers
  {
    id: 'coffee-voucher',
    title: 'Coffee Shop Voucher',
    description: 'Get a free drink at your favorite coffee shop',
    type: 'voucher',
    xpRequired: 100,
    value: '£5 OFF',
    icon: <Coffee className="w-6 h-6" />,
    expiresAt: '30 days',
    rarity: 'common'
  },
  {
    id: 'retail-voucher',
    title: 'Retail Therapy',
    description: 'Discount on fashion and lifestyle products',
    type: 'voucher',
    xpRequired: 300,
    value: '15% OFF',
    icon: <ShoppingBag className="w-6 h-6" />,
    expiresAt: '60 days',
    rarity: 'rare'
  },
  {
    id: 'dining-voucher',
    title: 'Restaurant Voucher',
    description: 'Enjoy a meal at partner restaurants',
    type: 'voucher',
    xpRequired: 500,
    value: '£25 OFF',
    icon: <Gift className="w-6 h-6" />,
    rarity: 'rare'
  },
  {
    id: 'tech-voucher',
    title: 'Tech Store Credit',
    description: 'Credit towards electronics and gadgets',
    type: 'voucher',
    xpRequired: 800,
    value: '£50 OFF',
    icon: <Gamepad2 className="w-6 h-6" />,
    rarity: 'epic'
  },
  {
    id: 'spa-voucher',
    title: 'Wellness Spa Day',
    description: 'Relaxing spa treatment and wellness session',
    type: 'voucher',
    xpRequired: 1200,
    value: '£75 OFF',
    icon: <Star className="w-6 h-6" />,
    rarity: 'epic'
  },

  // Events
  {
    id: 'personality-webinar',
    title: 'Personality Development Webinar',
    description: 'Join exclusive online sessions with psychology experts',
    type: 'event',
    xpRequired: 250,
    value: 'FREE ACCESS',
    icon: <Users className="w-6 h-6" />,
    rarity: 'common'
  },
  {
    id: 'community-meetup',
    title: 'PersonaSync Community Meetup',
    description: 'Meet other users and share personality insights',
    type: 'event',
    xpRequired: 400,
    value: 'VIP INVITE',
    icon: <Calendar className="w-6 h-6" />,
    rarity: 'rare'
  },
  {
    id: 'workshop-access',
    title: 'Personal Growth Workshop',
    description: 'Interactive workshop on self-discovery and development',
    type: 'event',
    xpRequired: 600,
    value: 'PREMIUM ACCESS',
    icon: <Trophy className="w-6 h-6" />,
    rarity: 'rare'
  },
  {
    id: 'conference-ticket',
    title: 'Annual PersonaSync Conference',
    description: 'Full access to our yearly personality psychology conference',
    type: 'event',
    xpRequired: 1000,
    value: '£200 VALUE',
    icon: <Crown className="w-6 h-6" />,
    rarity: 'epic'
  },
  {
    id: 'exclusive-retreat',
    title: 'Exclusive Personality Retreat',
    description: 'Weekend retreat with top psychology experts',
    type: 'event',
    xpRequired: 1500,
    value: '£500 VALUE',
    icon: <Sparkles className="w-6 h-6" />,
    rarity: 'legendary'
  },

  // Premium Services
  {
    id: 'music-streaming',
    title: 'Music Streaming Premium',
    description: '3 months of premium music streaming service',
    type: 'exclusive',
    xpRequired: 1500,
    value: '£30 VALUE',
    icon: <Music className="w-6 h-6" />,
    rarity: 'epic'
  },
  {
    id: 'coaching-session',
    title: 'Personal Development Coaching',
    description: 'One-on-one session with certified life coach',
    type: 'exclusive',
    xpRequired: 2000,
    value: '£150 VALUE',
    icon: <Users className="w-6 h-6" />,
    rarity: 'legendary'
  },
  {
    id: 'premium-headphones',
    title: 'Premium Wireless Headphones',
    description: 'High-quality headphones for your audio content',
    type: 'merchandise',
    xpRequired: 2500,
    value: '£200 VALUE',
    icon: <Headphones className="w-6 h-6" />,
    rarity: 'legendary'
  }
];

export default function RewardsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user data and ensure XP is initialized
    const user = UserSession.getCurrentUser();
    if (user) {
      // Make sure XP is properly initialized
      if (typeof user.xp === 'undefined') {
        user.xp = 0;
        UserSession.setXP(0);
      }
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading rewards...</p>
        </div>
      </div>
    );
  }

  if (!UserSession.isLoggedIn()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Up to View Rewards</h2>
            <p className="text-gray-600 mb-6">
              Create an account to start earning XP and unlock amazing rewards!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/signup">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Initialize XP to 0 if undefined
  const userXP = currentUser?.xp ?? 0;
  const currentLevel = Math.floor(userXP / 100) + 1;
  const xpInCurrentLevel = userXP % 100;
  const xpToNextLevel = 100 - xpInCurrentLevel;

  // Filter rewards based on XP
  const eligibleRewards = REWARDS.filter(reward => userXP >= reward.xpRequired);
  const futureRewards = REWARDS.filter(reward => userXP < reward.xpRequired);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'voucher': return <Gift className="w-4 h-4" />;
      case 'event': return <Ticket className="w-4 h-4" />;
      case 'loyalty': return <Coins className="w-4 h-4" />;
      case 'exclusive': return <Crown className="w-4 h-4" />;
      case 'merchandise': return <ShoppingBag className="w-4 h-4" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Zap className="w-8 h-8 text-purple-600 inline mr-2" />
            Rewards Center
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Earn XP through personality discovery and unlock amazing rewards!
          </p>
          
          {/* User XP Display */}
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Your XP</span>
              <span className="text-2xl font-bold text-purple-600">{userXP}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>Level {currentLevel}</span>
              <span>Next: {xpToNextLevel} XP</span>
            </div>
            <Progress 
              value={xpInCurrentLevel} 
              className="h-2"
            />
            {currentUser && (
              <p className="text-xs text-gray-500 mt-2">
                Welcome back, {currentUser.firstName}!
              </p>
            )}
          </div>
        </motion.div>

        {/* Eligible Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Check className="w-6 h-6 text-green-600 mr-2" />
            Available Rewards ({eligibleRewards.length})
          </h2>
          
          {eligibleRewards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eligibleRewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg text-green-600">
                            {reward.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{reward.title}</CardTitle>
                            <Badge className={`text-xs ${getRarityColor(reward.rarity)}`}>
                              {reward.rarity.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {getTypeIcon(reward.type)}
                          <span className="ml-1 capitalize">{reward.type}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-purple-600">{reward.value}</span>
                        <span className="text-xs text-gray-500">{reward.xpRequired} XP</span>
                      </div>
                      {reward.expiresAt && (
                        <p className="text-xs text-orange-600 mb-3">⏰ Expires in {reward.expiresAt}</p>
                      )}
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Claim Reward
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="text-center py-8">
              <CardContent>
                <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Rewards Available Yet</h3>
                <p className="text-gray-600 mb-4">Start earning XP to unlock your first rewards!</p>
                <Button asChild>
                  <Link href="/surveys">Take a Survey</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Future Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Lock className="w-6 h-6 text-gray-500 mr-2" />
            Upcoming Rewards ({futureRewards.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureRewards.map((reward, index) => {
              const xpNeeded = reward.xpRequired - userXP;
              const progressPercent = Math.max(0, (userXP / reward.xpRequired) * 100);
              
              return (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-gray-300 opacity-75">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                            {reward.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg text-gray-700">{reward.title}</CardTitle>
                            <Badge className={`text-xs ${getRarityColor(reward.rarity)}`}>
                              {reward.rarity.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {getTypeIcon(reward.type)}
                          <span className="ml-1 capitalize">{reward.type}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-gray-600">{reward.value}</span>
                        <span className="text-xs text-gray-500">{reward.xpRequired} XP</span>
                      </div>
                      
                      {/* Progress to unlock */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{xpNeeded} XP needed</span>
                        </div>
                        <Progress value={progressPercent} className="h-2" />
                      </div>
                      
                      <Button variant="outline" className="w-full" disabled>
                        <Lock className="w-4 h-4 mr-2" />
                        Locked
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Back to Profile */}
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 