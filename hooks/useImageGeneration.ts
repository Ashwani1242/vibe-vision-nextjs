import { useState } from "react";
import { FormValues } from "@/types/types";

export function useImageGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateImages = async (values: FormValues) => {
    setIsGenerating(true);
    setError(null);
    try {
      // Implement your actual image generation API call here
      const response = await mockImageGeneration(values);
      setImages(response);
    } catch (err) {
      setError("Failed to generate images. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    images,
    error,
    generateImages,
  };
}

// Mock function - replace with actual API call
async function mockImageGeneration(values: FormValues): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Array(values.numberOfImages)
    .fill(null)
    .map(
      (_, i) =>
        `https://source.unsplash.com/random/1024x1024?${values.imageStyle},${i}`
    );
}
