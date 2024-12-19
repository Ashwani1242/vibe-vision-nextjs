import { MemeText } from '../types';

export async function processImageWithText(imageUrl: string, text: MemeText): Promise<string> {
  // For now, return the original image URL
  // In a production environment, you would process this server-side
  // or use a cloud function for image manipulation
  return imageUrl;
}