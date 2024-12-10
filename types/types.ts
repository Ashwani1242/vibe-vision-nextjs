/**
 * Type Definitions for Application
 * Organized into logical modules with clear separation of concerns
 */

// Common Utility Types
export type MediaType = 'image' | 'video' | 'audio' | 'text';
export type BillingType = 'monthly' | 'yearly';

// User-related Types
export interface User {
  id: string;
  username: string;
  avatar: string;
  createdAt: string;
  bio?: string;
  location?: string;
  website?: string;
  social?: {
    twitter?: string;
    github?: string;
  };
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

// Media Types
export interface Media {
  type: MediaType;
  url: string;
  thumbnail?: string;
  alt?: string;
  duration?: number;
  content?: string;
}

// Content Interaction Types
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
  parentCommentId?: string;
}

// Post-related Types
export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  category: string;
  tags: string[];
  media: Media[];
  stats: PostStats;
  type: MediaType;
}

// Story Generation Types
export interface Genre {
  value: string;
  icon: string;
  theme: string;
  description: string;
}

export interface StorySettings {
  tone: string;
  ageGroup: string;
  pacing: string;
  duration: number;
  complexity: string;
}

export interface GeneratedStory {
  id: string;
  title: string;
  content: string;
  genre: string;
  prompt: string;
  settings: StorySettings;
  createdAt: string;
  likes: number;
}

export interface StoryHistoryItem extends GeneratedStory {
  summary: string;
  characters: string[];
}

// Comedy and Script Types
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

// Pricing and Subscription Types
export interface Addon {
  name: string;
  price: number;
  description: string;
}

export interface PlanDetails {
  name: string;
  price: string;
  billingType: BillingType;
  features: string[];
  basePrice: string;
  addons?: Addon[];
}

// Form and User Registration Types
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

// NextAuth Session Extension
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}