export interface Competition {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  prize: string;
  participants: number;
  status: 'upcoming' | 'active' | 'ended';
  image: string;
  rules: string[];
  requirements: string[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  score: number;
  submissionDate: string;
}