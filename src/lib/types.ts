// Core types for PersonaSync

export interface SurveyQuestion {
  id: string;
  text: string;
  options: SurveyOption[];
  category: 'personality' | 'interests' | 'values' | 'social';
}

export interface SurveyOption {
  text: string;
  emoji: string;
  traits: AvatarTrait[];
  points: number;
}

export interface AvatarTrait {
  name: string;
  emoji: string;
  description: string;
  category: 'personality' | 'interests' | 'values' | 'social';
  strength: number; // 1-10
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface ProfileStats {
  totalSurveys: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  joinDate: Date;
  lastActive: Date;
}

export interface AvatarAppearance {
  hairStyle: string;
  hairColor: string;
  skinTone: string;
  outfit: string;
  accessories: string[];
  pose: string;
  background: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  bio?: string;
  avatar: Avatar;
  appearance: AvatarAppearance;
  xp: number;
  level: number;
  completedSurveys: string[];
  unlockedRewards: string[];
  achievements: Achievement[];
  communities: string[];
  stats: ProfileStats;
  joinDate: Date;
  isPublic: boolean;
}

export interface Avatar {
  traits: AvatarTrait[];
  personality: string;
  voiceId: string;
  visualStyle: 'emoji' | 'icon' | 'gradient' | 'character';
  title: string;
  description: string;
  characterDescription: string; // For 3D character-style description
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  emoji: string;
  questions: SurveyQuestion[];
  category: 'personality' | 'lifestyle' | 'career' | 'social';
  xpReward: number;
  estimatedTime: number; // in minutes
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'badge' | 'title' | 'voice' | 'avatar';
  xpCost: number;
  unlocked: boolean;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  emoji: string;
  traits: string[];
  memberCount: number;
  color: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
  gender: string;
  location?: string;
  bio?: string;
  personalityGoals: string[];
  profileVisibility: 'public' | 'private';
  xp: number;
  createdAt: string;
} 