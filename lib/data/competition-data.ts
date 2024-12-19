import { Competition, LeaderboardEntry } from '@/types/competition';

export const competitions: Competition[] = [
  {
    id: 'ai-music-challenge',
    title: 'AI Music Generation Challenge',
    description: 'Create innovative AI models for generating original music compositions.',
    category: 'Music Generation',
    startDate: '2024-03-01',
    endDate: '2024-04-30',
    prize: '$10,000',
    participants: 256,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
    rules: [
      'Submissions must be original work',
      'Models must be trained on legally obtained data',
      'Generated music must be at least 2 minutes long'
    ],
    requirements: [
      'Experience with music generation models',
      'Proficiency in Python/TensorFlow/PyTorch',
      'Understanding of music theory'
    ]
  },
  {
    id: 'nlp-challenge',
    title: 'Natural Language Understanding Challenge',
    description: 'Develop advanced NLP models for complex language understanding tasks.',
    category: 'Natural Language Processing',
    startDate: '2024-04-01',
    endDate: '2024-05-31',
    prize: '$15,000',
    participants: 342,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d',
    rules: [
      'Models must be transformer-based',
      'Use provided test dataset only',
      'Maximum response time of 500ms'
    ],
    requirements: [
      'Advanced NLP knowledge',
      'Experience with large language models',
      'Strong programming skills'
    ]
  }
];

export const leaderboardData: Record<string, LeaderboardEntry[]> = {
  'ai-music-challenge': [
    {
      rank: 1,
      userId: '1',
      username: 'AIComposer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      score: 98.5,
      submissionDate: '2024-03-25'
    },
    {
      rank: 2,
      userId: '2',
      username: 'MusicMaster',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      score: 97.2,
      submissionDate: '2024-03-24'
    }
  ]
};