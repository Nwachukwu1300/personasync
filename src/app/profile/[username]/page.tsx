'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Calendar, 
  Trophy, 
  Users, 
  Zap, 
  Star,
  MapPin,
  Share2,
  Settings,
  Crown,
  TrendingUp,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { COMMUNITIES } from '@/lib/rewards';
import mockUsers from '@/lib/mock-users';

interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: string;
  gender: string;
  location: string;
  bio: string;
  interests: string[];
  personalityGoals: string[];
  profileVisibility: 'public' | 'friends' | 'private';
  createdAt: string;
  profilePicture: string;
  xp: number;
  level: number;
}

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

// Map personality types from mock data to community IDs
const PERSONALITY_TO_COMMUNITY: Record<string, string> = {
  'Creative Owl': 'creative-visionaries',
  'Chill Explorer': 'peaceful-sages',
  'Bold Visionary': 'dynamic-forces',
  'Focused Strategist': 'strategic-thinkers',
  'Social Spark': 'social-leaders',
  'Tech Enthusiast': 'tech-enthusiasts',
  'Nature Connector': 'nature-connectors',
  'Collaborative Spirit': 'collaborative-spirits'
};

// Function to get user's community based on personality type
function getUserCommunity(username: string) {
  // Find user in mock data by username
  const mockUser = mockUsers.find(user => 
    user.name.toLowerCase().replace(' ', '') === username.toLowerCase() ||
    user.email.split('@')[0] === username.toLowerCase()
  );
  
  if (mockUser && mockUser.personalityType) {
    const communityId = PERSONALITY_TO_COMMUNITY[mockUser.personalityType];
    return COMMUNITIES.find(community => community.id === communityId);
  }
  
  return null;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  
  return <ProfileContent username={username} />;
}

function ProfileContent({ username }: { username: string }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load user from localStorage
    const storedUser = localStorage.getItem(`personasync_user_${username}`);
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } else {
      // Also check for old format
      const oldStoredUser = localStorage.getItem('currentUser');
      if (oldStoredUser) {
        const userData = JSON.parse(oldStoredUser);
        if (userData.username === username) {
          setUser(userData);
        }
      }
    }
    setLoading(false);
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h2>
            <p className="text-gray-600 mb-6">The profile you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentLevel = Math.floor(user.xp / 100) + 1;
  const xpInCurrentLevel = user.xp % 100;
  const xpToNextLevel = 100 - xpInCurrentLevel;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <CardContent className="p-6 relative">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar */}
                <div className="relative -mt-16 md:-mt-16">
                  <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {user.firstName} {user.lastName}
                      </h1>
                      <p className="text-gray-600">@{user.username}</p>
                      {user.location && (
                        <p className="text-gray-500 flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {user.location}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>

                  {user.bio && (
                    <p className="text-gray-700 mt-3 max-w-2xl">{user.bio}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Level</p>
                    <p className="text-2xl font-bold text-purple-600">{currentLevel}</p>
                  </div>
                  <Crown className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>XP Progress</span>
                    <span>{xpInCurrentLevel}/100</span>
                  </div>
                  <Progress value={xpInCurrentLevel} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">{xpToNextLevel} XP to next level</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total XP</p>
                    <p className="text-2xl font-bold text-blue-600">{user.xp}</p>
                  </div>
                  <Zap className="w-8 h-8 text-blue-500" />
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-500">
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>


        </div>



        {/* Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {(() => {
            const userCommunity = getUserCommunity(username);
            if (userCommunity) {
              return (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-purple-500" />
                      Your Community
                    </h3>
                    <div className={`p-6 rounded-lg bg-gradient-to-r ${userCommunity.color} text-white mb-4`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center mb-2">
                            <span className="text-3xl mr-3">{userCommunity.emoji}</span>
                            <h4 className="text-xl font-bold">{userCommunity.name}</h4>
                          </div>
                          <p className="text-white/90 mb-3">{userCommunity.description}</p>
                          <div className="flex items-center text-sm text-white/80">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{userCommunity.memberCount.toLocaleString()} members</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {userCommunity.traits.map((trait) => (
                        <span
                          key={trait}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/communities">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          <Users className="w-4 h-4 mr-2" />
                          Explore Communities
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            } else {
              return (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-purple-500" />
                      Discover Your Community
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Explore our vibrant personality-based communities and find where you belong!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/communities">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          <Users className="w-4 h-4 mr-2" />
                          Explore Communities
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            }
          })()}
        </motion.div>
      </div>
    </div>
  );
} 