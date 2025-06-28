import { Reward, Community } from './types';

// Available rewards
export const REWARDS: Reward[] = [
  // Badges
  {
    id: 'first-survey',
    name: 'First Steps',
    description: 'Completed your first personality survey',
    emoji: '🌟',
    category: 'badge',
    xpCost: 0,
    unlocked: false
  },
  {
    id: 'personality-master',
    name: 'Personality Master',
    description: 'Completed 5 personality surveys',
    emoji: '👑',
    category: 'badge',
    xpCost: 0,
    unlocked: false
  },
  {
    id: 'voice-explorer',
    name: 'Voice Explorer',
    description: 'Listened to 10 avatar voice summaries',
    emoji: '🎙️',
    category: 'badge',
    xpCost: 0,
    unlocked: false
  },
  
  // Titles
  {
    id: 'creative-soul',
    name: 'Creative Soul',
    description: 'Unlock this unique title for your avatar',
    emoji: '🎨',
    category: 'title',
    xpCost: 50,
    unlocked: false
  },
  {
    id: 'digital-nomad',
    name: 'Digital Nomad',
    description: 'Unlock this unique title for your avatar',
    emoji: '💻',
    category: 'title',
    xpCost: 75,
    unlocked: false
  },
  {
    id: 'peaceful-warrior',
    name: 'Peaceful Warrior',
    description: 'Unlock this unique title for your avatar',
    emoji: '⚔️',
    category: 'title',
    xpCost: 100,
    unlocked: false
  },
  
  // Voice tones
  {
    id: 'energetic-voice',
    name: 'Energetic Voice',
    description: 'Unlock a more energetic voice tone for your avatar',
    emoji: '⚡',
    category: 'voice',
    xpCost: 150,
    unlocked: false
  },
  {
    id: 'calm-voice',
    name: 'Calm Voice',
    description: 'Unlock a more calming voice tone for your avatar',
    emoji: '🧘',
    category: 'voice',
    xpCost: 150,
    unlocked: false
  },
  {
    id: 'mysterious-voice',
    name: 'Mysterious Voice',
    description: 'Unlock a mysterious voice tone for your avatar',
    emoji: '🔮',
    category: 'voice',
    xpCost: 200,
    unlocked: false
  },
  
  // Avatar customizations
  {
    id: 'gradient-avatar',
    name: 'Gradient Avatar',
    description: 'Unlock gradient visual style for your avatar',
    emoji: '🌈',
    category: 'avatar',
    xpCost: 100,
    unlocked: false
  },
  {
    id: 'animated-avatar',
    name: 'Animated Avatar',
    description: 'Unlock animated visual style for your avatar',
    emoji: '✨',
    category: 'avatar',
    xpCost: 200,
    unlocked: false
  }
];

// Communities based on personality types
export const COMMUNITIES: Community[] = [
  {
    id: 'creative-visionaries',
    name: 'Creative Visionaries',
    description: 'Artists, dreamers, and imaginative souls who see the world through a creative lens',
    emoji: '🎨',
    traits: ['Creative', 'Innovative', 'Authentic'],
    memberCount: 1247,
    color: 'from-pink-400 to-purple-500'
  },
  {
    id: 'strategic-thinkers',
    name: 'Strategic Thinkers',
    description: 'Analytical minds who love solving puzzles and thinking through complex problems',
    emoji: '🧠',
    traits: ['Analytical', 'Innovative', 'Ambitious'],
    memberCount: 892,
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'dynamic-forces',
    name: 'Dynamic Forces',
    description: 'Energetic individuals who bring passion and enthusiasm to everything they do',
    emoji: '⚡',
    traits: ['Energetic', 'Adventurous', 'Extroverted'],
    memberCount: 1563,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'peaceful-sages',
    name: 'Peaceful Sages',
    description: 'Calm and balanced souls who seek harmony and inner peace',
    emoji: '🧘',
    traits: ['Calm', 'Balanced', 'Introverted'],
    memberCount: 734,
    color: 'from-green-400 to-teal-500'
  },
  {
    id: 'tech-enthusiasts',
    name: 'Tech Enthusiasts',
    description: 'Digital natives who embrace technology and innovation',
    emoji: '💻',
    traits: ['Tech-Savvy', 'Innovative', 'Gamer'],
    memberCount: 2103,
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'nature-connectors',
    name: 'Nature Connectors',
    description: 'Souls who feel most alive when connected to the natural world',
    emoji: '🌿',
    traits: ['Nature-Lover', 'Balanced', 'Adventurous'],
    memberCount: 567,
    color: 'from-emerald-400 to-green-500'
  },
  {
    id: 'social-leaders',
    name: 'Social Leaders',
    description: 'Natural leaders who inspire and motivate others',
    emoji: '👑',
    traits: ['Leader', 'Extroverted', 'Caring'],
    memberCount: 445,
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'collaborative-spirits',
    name: 'Collaborative Spirits',
    description: 'Team players who believe in the power of working together',
    emoji: '🤝',
    traits: ['Collaborator', 'Caring', 'Balanced'],
    memberCount: 678,
    color: 'from-indigo-400 to-purple-500'
  }
];

// XP level system
export const XP_LEVELS = [
  { level: 1, xpRequired: 0, title: 'New Explorer' },
  { level: 2, xpRequired: 100, title: 'Curious Mind' },
  { level: 3, xpRequired: 250, title: 'Personality Seeker' },
  { level: 4, xpRequired: 450, title: 'Self-Discoverer' },
  { level: 5, xpRequired: 700, title: 'Identity Shaper' },
  { level: 6, xpRequired: 1000, title: 'Voice Finder' },
  { level: 7, xpRequired: 1350, title: 'Community Builder' },
  { level: 8, xpRequired: 1750, title: 'Personality Master' },
  { level: 9, xpRequired: 2200, title: 'Authentic Self' },
  { level: 10, xpRequired: 2700, title: 'PersonaSync Legend' }
];

// Calculate user level based on XP
export function calculateLevel(xp: number): { level: number; title: string; progress: number } {
  const currentLevel = XP_LEVELS.find(level => xp < level.xpRequired) || XP_LEVELS[XP_LEVELS.length - 1];
  const previousLevel = XP_LEVELS.find(level => level.level === currentLevel.level - 1);
  
  const levelIndex = XP_LEVELS.findIndex(level => level.level === currentLevel.level);
  const actualLevel = levelIndex === -1 ? XP_LEVELS[XP_LEVELS.length - 1] : XP_LEVELS[levelIndex - 1];
  
  const xpForCurrentLevel = previousLevel ? previousLevel.xpRequired : 0;
  const xpForNextLevel = currentLevel.xpRequired;
  const progress = ((xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;
  
  return {
    level: actualLevel.level,
    title: actualLevel.title,
    progress: Math.min(100, Math.max(0, progress))
  };
}

// Check if user can unlock a reward
export function canUnlockReward(reward: Reward, userXP: number): boolean {
  return userXP >= reward.xpCost;
}

// Get recommended community based on avatar traits
export function getRecommendedCommunity(traits: string[]): Community {
  // Find community with most matching traits
  let bestMatch = COMMUNITIES[0];
  let maxMatches = 0;
  
  for (const community of COMMUNITIES) {
    const matches = community.traits.filter(trait => traits.includes(trait)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = community;
    }
  }
  
  return bestMatch;
} 