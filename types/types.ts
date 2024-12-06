// Genre and Story-related Types
export type Genre = {
  value: string;
  icon: string;
  theme: string;
  description: string;
};

export type StorySettings = {
  tone: string;
  ageGroup: string;
  pacing: string;
  duration: number;
  complexity: string;
};

export type GeneratedStory = {
  id: string;
  title: string;
  content: string;
  genre: string;
  prompt: string;
  settings: StorySettings;
  createdAt: string;
  likes: number;
};

export interface StoryHistoryItem extends GeneratedStory {
  summary: string;
  characters: string[];
}

// Pricing and Plan-related Types
export interface PlanDetails {
  name: string;
  price: string;
  billingType: string;
  features: string[];
  basePrice: string;
  addons?: Addon[];
}

export interface Addon {
  name: string;
  price: number;
  description: string;
}

// Form and User-related Types
export interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  formData: FormData;
}

export interface PaymentStatus {
  success: boolean;
  formData: FormData | null;
}

// Comedy and Script-related Types
export type ComedyType = 'standup' | 'sketch' | 'roast' | 'musical' | 'improv' | 'sitcom';
export type TargetAudience = 'everyone' | 'kids' | 'teens' | 'adults' | 'seniors' | 'corporate' | 'family';
export type ToneSetting = 'funny' | 'sarcastic' | 'witty' | 'balanced';
export type VoiceSetting = 'natural' | 'casual' | 'formal';
export type Language = 'en' | 'es' | 'fr' | 'de';
export type CharacterArchetype = 'protagonist' | 'sidekick' | 'antagonist' | 'mentor' | 'comic-relief';

export interface ScriptFormData {
  comedyType: ComedyType;
  targetAudience: TargetAudience;
  duration: string;
  context: string;
  image: File | null;
}

export interface ScriptSettings {
  tone: ToneSetting;
  voice: VoiceSetting;
  language: Language;
  creativityLevel: number;
  useAICharacters: boolean;
  enableSceneAnalysis: boolean;
  collaborativeMode: boolean;
}

export interface GenerateScriptParams {
  formData: ScriptFormData;
  settings: ScriptSettings;
}

export interface ScriptAnalysis {
  pacing: number;
  comedyDensity: number;
  audienceEngagement: number;
  characterDevelopment: number;
  suggestions: string[];
}

// Media and Post-related Types
export interface Media {
  id?: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnail?: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
}

export interface PostStats {
  likes: number;
  dislikes: number;
  comments: number;
  shares: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  likes: number;
  replies: Comment[];
}

export interface Post {
  [x: string]: string;
  id: string;
  title: string;
  userId?: string;
  url?: string;
  createdAt: string;
  likes?: number;
  comments?: number;
  media?: Media[];
  content: string;
  author?: {
    id: string;
    username: string;
    avatar?: string;
  };
}

// NextAuth Session Extension
import { DefaultSession } from "next-auth";

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}