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

export interface UserProfile {
  id: string;
  name?: string;
  avatar: Avatar;
  xp: number;
  level: number;
  completedSurveys: string[];
  unlockedRewards: string[];
  joinDate: Date;
}

export interface Avatar {
  traits: AvatarTrait[];
  personality: string;
  voiceId: string;
  visualStyle: 'emoji' | 'icon' | 'gradient';
  title: string;
  description: string;
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