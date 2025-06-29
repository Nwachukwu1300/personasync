'use client';

import React, { useState } from 'react';
import { COMMUNITIES } from '@/lib/rewards';
import mockUsers from '@/lib/mock-users';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Users, Globe, TrendingUp } from 'lucide-react';

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

export default function CommunitiesPage() {
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>(['creative-visionaries']);

  // Group mock users by community
  const usersByCommunity = mockUsers.reduce((acc, user) => {
    const communityId = PERSONALITY_TO_COMMUNITY[user.personalityType];
    if (communityId) {
      if (!acc[communityId]) acc[communityId] = [];
      acc[communityId].push(user);
    }
    return acc;
  }, {} as Record<string, typeof mockUsers>);

  // Update communities with real member counts and top performers
  const enrichedCommunities = COMMUNITIES.map(community => {
    const members = usersByCommunity[community.id] || [];
    const topPerformers = members
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 3);
    
    return {
      ...community,
      memberCount: members.length,
      topPerformers,
      members
    };
  });

  const handleJoinCommunity = (communityId: string) => {
    if (!joinedCommunities.includes(communityId)) {
      setJoinedCommunities([...joinedCommunities, communityId]);
    }
  };

  const handleLeaveCommunity = (communityId: string) => {
    setJoinedCommunities(joinedCommunities.filter(id => id !== communityId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌟 Personality Communities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with people who share your personality type, compete in leaderboards, 
            and grow together in supportive communities.
          </p>
        </div>

        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="explore">
              <Globe className="w-4 h-4 mr-2" />
              Explore Communities
            </TabsTrigger>
            <TabsTrigger value="joined">
              <Users className="w-4 h-4 mr-2" />
              My Communities ({joinedCommunities.length})
            </TabsTrigger>
            <TabsTrigger value="leaderboard">
              <Trophy className="w-4 h-4 mr-2" />
              Global Leaderboard
            </TabsTrigger>
          </TabsList>

          {/* Explore Communities Tab */}
          <TabsContent value="explore">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrichedCommunities.map((community) => (
                <Card key={community.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${community.color} flex items-center justify-center text-2xl`}>
                          {community.emoji}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{community.name}</CardTitle>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Users className="w-4 h-4" />
                            <span>{community.memberCount} members</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {community.description}
                    </CardDescription>
                    
                    {/* Traits */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {community.traits.map((trait) => (
                        <Badge key={trait} variant="secondary" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>

                    {/* Top Performers */}
                    {community.topPerformers.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Top Performers:</p>
                        <div className="flex space-x-2">
                          {community.topPerformers.map((user, index) => (
                            <div key={user.id} className="flex items-center space-x-1">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={user.avatarUrl} />
                                <AvatarFallback className="text-xs">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-600">
                                {user.name.split(' ')[0]} ({user.xp} XP)
                              </span>
                              {index === 0 && <Trophy className="w-3 h-3 text-yellow-500" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Join/Leave Button */}
                    {joinedCommunities.includes(community.id) ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleLeaveCommunity(community.id)}
                        className="w-full"
                      >
                        Leave Community
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        onClick={() => handleJoinCommunity(community.id)}
                        className="w-full"
                      >
                        Join Community
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Communities Tab */}
          <TabsContent value="joined">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrichedCommunities
                .filter(community => joinedCommunities.includes(community.id))
                .map((community) => (
                  <Card key={community.id} className="border-2 border-purple-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${community.color} flex items-center justify-center text-xl`}>
                            {community.emoji}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{community.name}</CardTitle>
                            <p className="text-sm text-gray-500">{community.memberCount} members</p>
                          </div>
                        </div>
                        <Badge variant="default">Joined</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Community Stats */}
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-2">Community Activity</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Your Rank</p>
                              <p className="font-semibold">#{Math.floor(Math.random() * 10) + 1}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Weekly Growth</p>
                              <p className="font-semibold text-green-600">+12 XP</p>
                            </div>
                          </div>
                        </div>

                        {/* Recent Members */}
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Recent Members</p>
                          <div className="flex space-x-2">
                            {community.members.slice(0, 4).map((user) => (
                              <Avatar key={user.id} className="w-8 h-8">
                                <AvatarImage src={user.avatarUrl} />
                                <AvatarFallback className="text-xs">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Global Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span>Global Leaderboard</span>
                </CardTitle>
                <CardDescription>
                  Top performers across all personality communities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockUsers
                    .sort((a, b) => b.xp - a.xp)
                    .slice(0, 10)
                    .map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <span className={`font-bold text-lg ${
                              index === 0 ? 'text-yellow-500' : 
                              index === 1 ? 'text-gray-400' : 
                              index === 2 ? 'text-amber-600' : 'text-gray-600'
                            }`}>
                              #{index + 1}
                            </span>
                            {index < 3 && <Trophy className={`w-4 h-4 ${
                              index === 0 ? 'text-yellow-500' : 
                              index === 1 ? 'text-gray-400' : 'text-amber-600'
                            }`} />}
                          </div>
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.personalityType}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-purple-600">{user.xp} XP</p>
                          <p className="text-xs text-gray-500">{user.region}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 