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
    id: "product-preferences",
    title: "Product Preferences Survey",
    description: "Help us understand your product preferences and shopping habits to improve our recommendations.",
    category: "consumer",
    emoji: "🛍️",
    estimatedTime: 5,
    xpReward: 150,
    questions: [
      {
        id: "purchaseFrequency",
        text: "How often do you purchase new products in this category?",
        options: [
          { text: "Every 1-2 years", emoji: "📅" },
          { text: "When new model releases", emoji: "🆕" },
          { text: "Every 3-4 years", emoji: "⏳" },
          { text: "Only when necessary", emoji: "✨" }
        ]
      },
      {
        id: "decisionFactors",
        text: "What's your primary factor in purchase decisions?",
        options: [
          { text: "Features and specifications", emoji: "📋" },
          { text: "Brand reputation", emoji: "⭐" },
          { text: "Price to performance ratio", emoji: "💰" },
          { text: "User reviews", emoji: "👥" }
        ]
      },
      {
        id: "priceRange",
        text: "Which price segment do you typically shop in?",
        options: [
          { text: "Premium segment", emoji: "👑" },
          { text: "High-end", emoji: "💎" },
          { text: "Mid-range", emoji: "⚖️" },
          { text: "Budget", emoji: "💡" }
        ]
      },
      {
        id: "researchHabits",
        text: "How do you research products before purchasing?",
        options: [
          { text: "Detailed research", emoji: "🔍" },
          { text: "Reviews and recommendations", emoji: "📱" },
          { text: "Price comparisons", emoji: "📊" },
          { text: "Quick overview", emoji: "👀" }
        ]
      },
      {
        id: "brandLoyalty",
        text: "How would you describe your brand loyalty?",
        options: [
          { text: "Somewhat loyal", emoji: "🤝" },
          { text: "Very loyal", emoji: "❤️" },
          { text: "Not loyal", emoji: "🔄" },
          { text: "Depends on product", emoji: "🤔" }
        ]
      }
    ]
  },
  {
    id: "product-satisfaction",
    title: "Product Satisfaction Survey",
    description: "Share your experience with our products to help us improve and better serve your needs.",
    category: "feedback",
    emoji: "⭐",
    estimatedTime: 7,
    xpReward: 200,
    questions: [
      {
        id: "usageFrequency",
        text: "How often do you use our product?",
        options: [
          { text: "Daily", emoji: "📅" },
          { text: "Several times a week", emoji: "🗓️" },
          { text: "Weekly", emoji: "📆" },
          { text: "Occasionally", emoji: "⌚" }
        ]
      },
      {
        id: "satisfactionLevel",
        text: "How satisfied are you with the product quality?",
        options: [
          { text: "Very satisfied", emoji: "😍" },
          { text: "Satisfied", emoji: "😊" },
          { text: "Neutral", emoji: "😐" },
          { text: "Dissatisfied", emoji: "😕" }
        ]
      },
      {
        id: "featureUsage",
        text: "Which features do you use most frequently?",
        options: [
          { text: "Core features", emoji: "⚡" },
          { text: "Advanced features", emoji: "🚀" },
          { text: "Integration features", emoji: "🔄" },
          { text: "Customization options", emoji: "🎨" }
        ]
      },
      {
        id: "improvements",
        text: "What aspect of the product needs most improvement?",
        options: [
          { text: "Performance", emoji: "⚡" },
          { text: "User interface", emoji: "🖥️" },
          { text: "Features", emoji: "✨" },
          { text: "Reliability", emoji: "🛡️" }
        ]
      },
      {
        id: "recommendation",
        text: "How likely are you to recommend our product?",
        options: [
          { text: "Very likely", emoji: "🌟" },
          { text: "Likely", emoji: "👍" },
          { text: "Unlikely", emoji: "👎" },
          { text: "Not at all", emoji: "❌" }
        ]
      }
    ]
  },
  {
    id: "feature-requests",
    title: "Feature Request Survey",
    description: "Tell us what features you'd like to see in our future product releases.",
    category: "feature",
    emoji: "💡",
    estimatedTime: 6,
    xpReward: 180,
    questions: [
      {
        id: "missingFeatures",
        text: "What features do you wish our product had?",
        options: [
          { text: "Advanced analytics", emoji: "📊" },
          { text: "Better integrations", emoji: "🔄" },
          { text: "More customization", emoji: "🎨" },
          { text: "Improved automation", emoji: "🤖" }
        ]
      },
      {
        id: "competitorFeatures",
        text: "Which competitor features do you admire?",
        options: [
          { text: "User interface", emoji: "🖥️" },
          { text: "Performance", emoji: "⚡" },
          { text: "Unique features", emoji: "✨" },
          { text: "Price point", emoji: "💰" }
        ]
      },
      {
        id: "priorityFeatures",
        text: "What type of features should we prioritize?",
        options: [
          { text: "Productivity features", emoji: "⚡" },
          { text: "Integration capabilities", emoji: "🔄" },
          { text: "User experience", emoji: "👥" },
          { text: "Performance optimization", emoji: "🚀" }
        ]
      },
      {
        id: "usageScenarios",
        text: "In what scenarios do you use our product most?",
        options: [
          { text: "Professional work", emoji: "💼" },
          { text: "Personal projects", emoji: "🏠" },
          { text: "Team collaboration", emoji: "👥" },
          { text: "Learning/Education", emoji: "📚" }
        ]
      },
      {
        id: "futureNeeds",
        text: "What future needs should our product address?",
        options: [
          { text: "Mobile capabilities", emoji: "📱" },
          { text: "Cloud integration", emoji: "☁️" },
          { text: "AI/ML features", emoji: "🤖" },
          { text: "Security enhancements", emoji: "🔒" }
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

  // Generate personality description with fallbacks
  const primaryTrait = personalityTraits[0] || selectedTraits[0] || { name: 'Unique', emoji: '✨', category: 'personality', strength: 5 };
  const secondaryTrait = interestTraits[0] || valueTraits[0] || socialTraits[0] || { name: 'Individual', emoji: '🌟', category: 'interests', strength: 5 };
  
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

  // Generate description with fallback
  const descriptions = [
    `A ${primaryTrait.name.toLowerCase()} soul with a passion for ${secondaryTrait.name.toLowerCase()} experiences.`,
    `Balancing ${primaryTrait.name.toLowerCase()} energy with ${secondaryTrait.name.toLowerCase()} wisdom.`,
    `Where ${primaryTrait.name.toLowerCase()} meets ${secondaryTrait.name.toLowerCase()} in perfect harmony.`,
    `A ${primaryTrait.name.toLowerCase()} spirit exploring the world through ${secondaryTrait.name.toLowerCase()} eyes.`
  ];

  return {
    traits: selectedTraits,
    personality,
    voiceId: 'default',
    visualStyle: 'emoji',
    title,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    characterDescription: `A ${primaryTrait.name.toLowerCase()} individual with ${secondaryTrait.name.toLowerCase()} tendencies.`
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