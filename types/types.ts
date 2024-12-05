type Genre = {
    value: string;
    icon: string;
    theme: string;
    description: string;
  };
  
  type StorySettings = {
    tone: string;
    ageGroup: string;
    pacing: string;
    duration: number
    complexity: string;
  };
  
  type GeneratedStory = {
    id: string;
    title: string;
    content: string;
    genre: string;
    prompt: string;
    settings: StorySettings;
    createdAt: string;
    likes: number;
  };
  
  interface StoryHistoryItem extends GeneratedStory {
    summary: string;
    characters: string[];
  }

  // types.ts
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

import { DefaultSession } from "next-auth";

declare module 'next-auth' {
  interface Session {
      user: {
          id: string;
      } & DefaultSession['user'];
  }
}

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