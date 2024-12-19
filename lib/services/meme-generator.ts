import { generateImagePrompt, generateImage } from './openai';
import { MemeText } from '../types';
import { processImageWithText } from './image-processor';

export async function generateMeme(description: string) {
  try {
    // Generate an optimized prompt using GPT-4
    const refinedPrompt = await generateImagePrompt(description);
    
    // Generate the image using DALL-E
    const imageUrl = await generateImage(refinedPrompt);
    
    return {
      url: imageUrl,
      prompt: refinedPrompt,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Error generating meme:', error);
    throw error;
  }
}

export async function addTextToMeme(imageUrl: string, text: MemeText) {
  try {
    return await processImageWithText(imageUrl, text);
  } catch (error) {
    console.error('Error adding text to meme:', error);
    throw error;
  }
}