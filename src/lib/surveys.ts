import { Survey, SurveyQuestion, AvatarTrait, Avatar } from './types';

// Available avatar traits
export const AVATAR_TRAITS: AvatarTrait[] = [
  // Personality traits
  { name: 'Creative', emoji: '🎨', description: 'Imaginative and artistic', category: 'personality', strength: 8 },
  { name: 'Analytical', emoji: '🧠', description: 'Logical and thoughtful', category: 'personality', strength: 7 },
  { name: 'Energetic', emoji: '⚡', description: 'Dynamic and enthusiastic', category: 'personality', strength: 9 },
  { name: 'Calm', emoji: '🧘', description: 'Peaceful and composed', category: 'personality', strength: 6 },
  { name: 'Adventurous', emoji: '🏔️', description: 'Bold and explorative', category: 'personality', strength: 8 },
  { name: 'Caring', emoji: '💝', description: 'Compassionate and nurturing', category: 'personality', strength: 7 },
  
  // Interest traits
  { name: 'Tech-Savvy', emoji: '💻', description: 'Digital native and tech enthusiast', category: 'interests', strength: 8 },
  { name: 'Nature-Lover', emoji: '🌿', description: 'Connected to the natural world', category: 'interests', strength: 7 },
  { name: 'Music-Enthusiast', emoji: '🎵', description: 'Passionate about music and rhythm', category: 'interests', strength: 8 },
  { name: 'Fitness-Focused', emoji: '💪', description: 'Health and wellness oriented', category: 'interests', strength: 6 },
  { name: 'Foodie', emoji: '🍕', description: 'Culinary explorer and taste adventurer', category: 'interests', strength: 7 },
  { name: 'Gamer', emoji: '🎮', description: 'Gaming enthusiast and strategist', category: 'interests', strength: 8 },
  
  // Value traits
  { name: 'Authentic', emoji: '✨', description: 'True to yourself and genuine', category: 'values', strength: 9 },
  { name: 'Ambitious', emoji: '🎯', description: 'Goal-oriented and driven', category: 'values', strength: 8 },
  { name: 'Balanced', emoji: '⚖️', description: 'Harmony seeker and peacemaker', category: 'values', strength: 6 },
  { name: 'Innovative', emoji: '🚀', description: 'Forward-thinking and inventive', category: 'values', strength: 8 },
  
  // Social traits
  { name: 'Extroverted', emoji: '🌟', description: 'Outgoing and social butterfly', category: 'social', strength: 8 },
  { name: 'Introverted', emoji: '🕯️', description: 'Thoughtful and reflective', category: 'social', strength: 7 },
  { name: 'Leader', emoji: '👑', description: 'Natural leader and motivator', category: 'social', strength: 8 },
  { name: 'Collaborator', emoji: '🤝', description: 'Team player and connector', category: 'social', strength: 7 },
];

// Sample surveys
export const SURVEYS: Survey[] = [
  {
    id: 'personality-discovery',
    title: 'Personality Discovery',
    description: 'Uncover your unique personality traits and discover what makes you special!',
    emoji: '🔍',
    category: 'personality',
    xpReward: 100,
    estimatedTime: 3,
    questions: [
      {
        id: 'q1',
        text: 'How do you prefer to spend your free time?',
        category: 'personality',
        options: [
          {
            text: 'Creating something new',
            emoji: '🎨',
            traits: [AVATAR_TRAITS[0]], // Creative
            points: 10
          },
          {
            text: 'Solving puzzles and problems',
            emoji: '🧩',
            traits: [AVATAR_TRAITS[1]], // Analytical
            points: 10
          },
          {
            text: 'Being active and energetic',
            emoji: '⚡',
            traits: [AVATAR_TRAITS[2]], // Energetic
            points: 10
          },
          {
            text: 'Relaxing and reflecting',
            emoji: '🧘',
            traits: [AVATAR_TRAITS[3]], // Calm
            points: 10
          }
        ]
      },
      {
        id: 'q2',
        text: 'When faced with a challenge, you usually...',
        category: 'personality',
        options: [
          {
            text: 'Jump in headfirst',
            emoji: '🏃',
            traits: [AVATAR_TRAITS[4]], // Adventurous
            points: 10
          },
          {
            text: 'Think it through carefully',
            emoji: '🤔',
            traits: [AVATAR_TRAITS[1]], // Analytical
            points: 10
          },
          {
            text: 'Ask others for help',
            emoji: '🤝',
            traits: [AVATAR_TRAITS[19]], // Collaborator
            points: 10
          },
          {
            text: 'Trust your instincts',
            emoji: '✨',
            traits: [AVATAR_TRAITS[12]], // Authentic
            points: 10
          }
        ]
      },
      {
        id: 'q3',
        text: 'What motivates you most?',
        category: 'values',
        options: [
          {
            text: 'Helping others succeed',
            emoji: '💝',
            traits: [AVATAR_TRAITS[5]], // Caring
            points: 10
          },
          {
            text: 'Achieving your goals',
            emoji: '🎯',
            traits: [AVATAR_TRAITS[13]], // Ambitious
            points: 10
          },
          {
            text: 'Learning new things',
            emoji: '📚',
            traits: [AVATAR_TRAITS[15]], // Innovative
            points: 10
          },
          {
            text: 'Finding inner peace',
            emoji: '⚖️',
            traits: [AVATAR_TRAITS[14]], // Balanced
            points: 10
          }
        ]
      }
    ]
  },
  {
    id: 'digital-lifestyle',
    title: 'Digital Lifestyle',
    description: 'Explore your relationship with technology and digital culture!',
    emoji: '💻',
    category: 'lifestyle',
    xpReward: 80,
    estimatedTime: 2,
    questions: [
      {
        id: 'q1',
        text: 'How do you use social media?',
        category: 'social',
        options: [
          {
            text: 'Share everything with everyone',
            emoji: '🌟',
            traits: [AVATAR_TRAITS[16]], // Extroverted
            points: 10
          },
          {
            text: 'Connect with close friends only',
            emoji: '🕯️',
            traits: [AVATAR_TRAITS[17]], // Introverted
            points: 10
          },
          {
            text: 'Build communities and lead discussions',
            emoji: '👑',
            traits: [AVATAR_TRAITS[18]], // Leader
            points: 10
          },
          {
            text: 'Stay updated and informed',
            emoji: '📱',
            traits: [AVATAR_TRAITS[6]], // Tech-Savvy
            points: 10
          }
        ]
      },
      {
        id: 'q2',
        text: 'Your ideal weekend involves...',
        category: 'interests',
        options: [
          {
            text: 'Gaming with friends',
            emoji: '🎮',
            traits: [AVATAR_TRAITS[11]], // Gamer
            points: 10
          },
          {
            text: 'Exploring new music',
            emoji: '🎵',
            traits: [AVATAR_TRAITS[8]], // Music-Enthusiast
            points: 10
          },
          {
            text: 'Outdoor adventures',
            emoji: '🌿',
            traits: [AVATAR_TRAITS[7]], // Nature-Lover
            points: 10
          },
          {
            text: 'Trying new restaurants',
            emoji: '🍕',
            traits: [AVATAR_TRAITS[10]], // Foodie
            points: 10
          }
        ]
      }
    ]
  },
  {
    id: 'career-compass',
    title: 'Career Compass',
    description: 'Discover your professional strengths and ideal work environment!',
    emoji: '🧭',
    category: 'career',
    xpReward: 120,
    estimatedTime: 5,
    questions: [
      {
        id: 'c1',
        text: 'In a team project, which role do you naturally take on?',
        category: 'social',
        options: [
          {
            text: 'Taking charge and delegating tasks',
            emoji: '👑',
            traits: [AVATAR_TRAITS[18]], // Leader
            points: 15
          },
          {
            text: 'Contributing ideas and creative solutions',
            emoji: '💡',
            traits: [AVATAR_TRAITS[0]], // Creative
            points: 15
          },
          {
            text: 'Analyzing data and solving problems',
            emoji: '📊',
            traits: [AVATAR_TRAITS[1]], // Analytical
            points: 15
          },
          {
            text: 'Supporting team members and maintaining harmony',
            emoji: '🤝',
            traits: [AVATAR_TRAITS[19]], // Collaborator
            points: 15
          }
        ]
      },
      {
        id: 'c2',
        text: 'What energizes you most at work?',
        category: 'personality',
        options: [
          {
            text: 'Learning new technologies and tools',
            emoji: '💻',
            traits: [AVATAR_TRAITS[6]], // Tech-Savvy
            points: 15
          },
          {
            text: 'Setting and achieving ambitious goals',
            emoji: '🎯',
            traits: [AVATAR_TRAITS[13]], // Ambitious
            points: 15
          },
          {
            text: 'Coming up with innovative solutions',
            emoji: '🚀',
            traits: [AVATAR_TRAITS[15]], // Innovative
            points: 15
          },
          {
            text: 'Building meaningful relationships',
            emoji: '💝',
            traits: [AVATAR_TRAITS[5]], // Caring
            points: 15
          }
        ]
      },
      {
        id: 'c3',
        text: 'How do you prefer to work?',
        category: 'personality',
        options: [
          {
            text: 'In a fast-paced, dynamic environment',
            emoji: '⚡',
            traits: [AVATAR_TRAITS[2]], // Energetic
            points: 15
          },
          {
            text: 'In a quiet, focused space',
            emoji: '🧘',
            traits: [AVATAR_TRAITS[3]], // Calm
            points: 15
          },
          {
            text: 'With a mix of collaboration and solo work',
            emoji: '⚖️',
            traits: [AVATAR_TRAITS[14]], // Balanced
            points: 15
          },
          {
            text: 'In an environment that encourages experimentation',
            emoji: '🔬',
            traits: [AVATAR_TRAITS[4]], // Adventurous
            points: 15
          }
        ]
      },
      {
        id: 'c4',
        text: "What's your approach to professional growth?",
        category: 'values',
        options: [
          {
            text: 'Constantly seeking new challenges',
            emoji: '📈',
            traits: [AVATAR_TRAITS[13]], // Ambitious
            points: 15
          },
          {
            text: 'Developing deep expertise in your field',
            emoji: '📚',
            traits: [AVATAR_TRAITS[1]], // Analytical
            points: 15
          },
          {
            text: 'Building a strong professional network',
            emoji: '🌐',
            traits: [AVATAR_TRAITS[16]], // Extroverted
            points: 15
          },
          {
            text: 'Finding work-life balance',
            emoji: '🎭',
            traits: [AVATAR_TRAITS[14]], // Balanced
            points: 15
          }
        ]
      },
      {
        id: 'c5',
        text: 'When facing a work challenge, you typically:',
        category: 'personality',
        options: [
          {
            text: 'Break it down into smaller tasks',
            emoji: '📋',
            traits: [AVATAR_TRAITS[1]], // Analytical
            points: 15
          },
          {
            text: 'Brainstorm creative solutions',
            emoji: '🎨',
            traits: [AVATAR_TRAITS[0]], // Creative
            points: 15
          },
          {
            text: 'Seek advice from colleagues',
            emoji: '💭',
            traits: [AVATAR_TRAITS[19]], // Collaborator
            points: 15
          },
          {
            text: 'Trust your experience and intuition',
            emoji: '✨',
            traits: [AVATAR_TRAITS[12]], // Authentic
            points: 15
          }
        ]
      }
    ]
  }
];

// Avatar generation logic
export function generateAvatar(selectedTraits: AvatarTrait[]): Avatar {
  // Sort traits by strength and category
  const personalityTraits = selectedTraits.filter(t => t.category === 'personality');
  const interestTraits = selectedTraits.filter(t => t.category === 'interests');
  const valueTraits = selectedTraits.filter(t => t.category === 'values');
  const socialTraits = selectedTraits.filter(t => t.category === 'social');

  // Generate personality description
  const primaryTrait = personalityTraits[0] || selectedTraits[0];
  const secondaryTrait = interestTraits[0] || valueTraits[0] || socialTraits[0];
  
  const personality = `${primaryTrait.name} ${secondaryTrait.name}`;
  
  // Generate title based on dominant traits
  let title = '';
  if (personalityTraits.some(t => t.name === 'Creative')) {
    title = 'The Creative Visionary';
  } else if (personalityTraits.some(t => t.name === 'Analytical')) {
    title = 'The Strategic Thinker';
  } else if (personalityTraits.some(t => t.name === 'Energetic')) {
    title = 'The Dynamic Force';
  } else if (personalityTraits.some(t => t.name === 'Calm')) {
    title = 'The Peaceful Sage';
  } else {
    title = 'The Unique Individual';
  }

  // Generate description
  const descriptions = [
    `A ${primaryTrait.name.toLowerCase()} soul with a passion for ${secondaryTrait.name.toLowerCase()} experiences.`,
    `Balancing ${primaryTrait.name.toLowerCase()} energy with ${secondaryTrait.name.toLowerCase()} wisdom.`,
    `Where ${primaryTrait.name.toLowerCase()} meets ${secondaryTrait.name.toLowerCase()} in perfect harmony.`,
    `A ${primaryTrait.name.toLowerCase()} spirit exploring the world through ${secondaryTrait.name.toLowerCase()} eyes.`
  ];
  
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];

  return {
    traits: selectedTraits,
    personality,
    voiceId: '21m00Tcm4TlvDq8ikWAM', // Rachel voice
    visualStyle: 'emoji',
    title,
    description
  };
}

// XP calculation
export function calculateXP(survey: Survey, answers: string[]): number {
  let baseXP = survey.xpReward;
  let bonusXP = 0;
  
  // Bonus for completing quickly
  bonusXP += 20;
  
  // Bonus for consistent answers
  if (answers.length > 1) {
    bonusXP += 10;
  }
  
  return baseXP + bonusXP;
} 