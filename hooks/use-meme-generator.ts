'use client';

import { useState } from 'react';
import { GeneratedImage } from '@/lib/types';
import { generateMeme } from '@/lib/services/meme-generator';
import { handleError } from '@/lib/utils/error-handler';

export function useMemeGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (prompt: string): Promise<GeneratedImage | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateMeme(prompt);
      return result;
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generate,
    isGenerating,
    error,
  };
}