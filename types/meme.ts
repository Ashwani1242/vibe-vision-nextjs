export interface MemeText {
  top: string;
  bottom: string;
  fontSize?: number;
  color?: string;
  position?: {
    x: number;
    y: number;
  };
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}

export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  tags: string[];
}

export interface MemeHistory {
  id: string;
  imageUrl: string;
  prompt: string;
  text: MemeText;
  createdAt: number;
}