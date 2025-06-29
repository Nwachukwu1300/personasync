import type { SurveyResponse, PersonaRank, TraitInsight, DailyStats, Insight } from './types';

// Mock data types
export interface DailyCompletion {
  date: string;
  count: number;
}

export interface ResponseDistribution {
  response: string;
  count: number;
  percentage: number;
}

export interface ProductCategory {
  rank: number;
  category: string;
  percentage: number;
  emoji: string;
}

export interface QuestionAnalytics {
  question: string;
  topResponse: string;
  emoji: string;
  distribution: {
    response: string;
    percentage: number;
  }[];
}

// Mock survey responses
export const surveyResponses: SurveyResponse[] = [
  {
    id: '1',
    userId: 'user1',
    surveyId: 'survey1',
    completedAt: '2024-03-20T10:00:00Z',
    xpGained: 150,
    responses: [
      { questionId: 'q1', answer: 'Premium segment' },
      { questionId: 'q2', answer: 'Feature-driven' }
    ]
  },
  {
    id: '2',
    userId: 'user2',
    surveyId: 'survey1',
    completedAt: '2024-03-20T11:30:00Z',
    xpGained: 120,
    responses: [
      { questionId: 'q1', answer: 'Mid-range' },
      { questionId: 'q2', answer: 'Price-sensitive' }
    ]
  }
];

// Mock daily completion data
export const dailyCompletions: DailyStats[] = [
  { date: '2025-06-27', completions: 120 },
  { date: '2025-06-28', completions: 150 },
  { date: '2025-06-29', completions: 180 },
  { date: '2025-06-30', completions: 200 },
  { date: '2025-06-30', completions: 220 },
  { date: '2025-07-01', completions: 250 }
];

// Mock response distribution data
export const responseDistributions: ResponseDistribution[] = [
  { response: 'Premium segment', count: 45 },
  { response: 'Mid-range', count: 30 },
  { response: 'High-end', count: 15 },
  { response: 'Budget', count: 10 }
];

// Mock product category rankings
export const productCategories: ProductCategory[] = [
  { rank: 1, category: "Software", percentage: 40, emoji: "💻" },
  { rank: 2, category: "Electronics", percentage: 30, emoji: "📱" },
  { rank: 3, category: "Gaming", percentage: 20, emoji: "🎮" },
  { rank: 4, category: "Smart Home", percentage: 10, emoji: "🏠" }
];

// Mock question analytics
export const questionAnalytics: QuestionAnalytics[] = [
  {
    question: 'Product Preferences',
    engagement: 85,
    completion: 95
  },
  {
    question: 'Usage Patterns',
    engagement: 75,
    completion: 90
  },
  {
    question: 'Feature Priorities',
    engagement: 90,
    completion: 85
  }
];

// Generated insights based on product survey responses
export const insights: Insight[] = [
  {
    title: "Engagement Trend",
    description: "User engagement has increased by 25% in the last month"
  },
  {
    title: "Conversion Success",
    description: "Premium conversion rate is up 15% after gamification"
  },
  {
    title: "User Satisfaction",
    description: "95% of users report positive experience with the new format"
  }
];

// Top personas leaderboard
export const personaRankings: PersonaRank[] = [
  { rank: 1, persona: 'Tech Enthusiast', percentage: 40, emoji: '🚀', count: 400 },
  { rank: 2, persona: 'Value Seeker', percentage: 30, emoji: '💡', count: 300 },
  { rank: 3, persona: 'Luxury Buyer', percentage: 20, emoji: '✨', count: 200 }
];

// Mock trait insights
export const traitInsights: TraitInsight[] = [
  {
    trait: "Creative Owl",
    count: 4,
    description: "Imaginative and introspective individuals who thrive in calm, creative environments",
    color: "#8B5CF6" // Purple
  },
  {
    trait: "Chill Explorer",
    count: 2,
    description: "Adaptable and easy-going personalities who value flexibility and new experiences",
    color: "#EC4899" // Pink
  },
  {
    trait: "Dynamic Eagle",
    count: 2,
    description: "Energetic and ambitious individuals who excel in fast-paced environments",
    color: "#3B82F6" // Blue
  },
  {
    trait: "Focused Bear",
    count: 2,
    description: "Methodical and determined people who prefer structured approaches",
    color: "#10B981" // Green
  }
];

// Mock survey responses
export const mockSurveyResponses: SurveyResponse[] = [
  {
    id: '1',
    userId: 'user1',
    timestamp: new Date('2024-03-10T10:00:00Z').toISOString(),
    completed: true,
    responses: [
      { questionId: 'q1', answer: 'Strongly Agree' },
      { questionId: 'q2', answer: 'Disagree' },
      { questionId: 'q3', answer: 'Neutral' }
    ]
  },
  {
    id: '2',
    userId: 'user2',
    timestamp: new Date('2024-03-10T11:30:00Z').toISOString(),
    completed: true,
    responses: [
      { questionId: 'q1', answer: 'Agree' },
      { questionId: 'q2', answer: 'Strongly Agree' },
      { questionId: 'q3', answer: 'Agree' }
    ]
  },
  // Add more mock responses...
]

// Mock trait insights
export const mockTraitInsights: TraitInsight[] = [
  {
    trait: 'Openness',
    score: 85,
    distribution: {
      high: 45,
      medium: 35,
      low: 20
    },
    trend: [
      { date: '2024-03-01', value: 80 },
      { date: '2024-03-02', value: 82 },
      { date: '2024-03-03', value: 85 }
    ]
  },
  {
    trait: 'Conscientiousness',
    score: 75,
    distribution: {
      high: 35,
      medium: 45,
      low: 20
    },
    trend: [
      { date: '2024-03-01', value: 73 },
      { date: '2024-03-02', value: 74 },
      { date: '2024-03-03', value: 75 }
    ]
  },
  {
    trait: 'Extraversion',
    score: 65,
    distribution: {
      high: 30,
      medium: 40,
      low: 30
    },
    trend: [
      { date: '2024-03-01', value: 63 },
      { date: '2024-03-02', value: 64 },
      { date: '2024-03-03', value: 65 }
    ]
  }
]

// Mock daily completion stats
export const mockDailyStats: DailyStats[] = [
  {
    date: '2024-03-01',
    totalResponses: 150,
    completionRate: 0.85,
    averageTime: 420 // in seconds
  },
  {
    date: '2024-03-02',
    totalResponses: 165,
    completionRate: 0.88,
    averageTime: 405
  },
  {
    date: '2024-03-03',
    totalResponses: 180,
    completionRate: 0.90,
    averageTime: 395
  }
]

// Mock generated insights
export const mockInsights = [
  {
    id: '1',
    title: 'High Openness Trend',
    description: 'Users show increasing openness to new experiences, particularly in creative scenarios.',
    category: 'trait',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Completion Rate Improvement',
    description: 'Survey completion rates have improved by 5% over the past week.',
    category: 'engagement',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Response Time Optimization',
    description: 'Average response time has decreased by 25 seconds, indicating better survey flow.',
    category: 'performance',
    priority: 'low'
  }
]

// Helper function to get aggregated stats
export const getAggregatedStats = () => {
  const totalResponses = mockSurveyResponses.length
  const completedResponses = mockSurveyResponses.filter(r => r.completed).length
  const averageCompletionRate = completedResponses / totalResponses
  
  return {
    totalResponses,
    completedResponses,
    averageCompletionRate,
    totalUniqueUsers: new Set(mockSurveyResponses.map(r => r.userId)).size
  }
}

// Helper function to get top traits
export const getTopTraits = () => {
  return mockTraitInsights
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

// Helper function to get recent insights
export const getRecentInsights = () => {
  return mockInsights.sort((a, b) => 
    a.priority === 'high' ? -1 : b.priority === 'high' ? 1 : 0
  )
} 