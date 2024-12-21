import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
  dangerouslyAllowBrowser: true,
});

interface GenerateImageParams {
  description: string;
  imageStyle: string;
  colorScheme: string;
  purpose: string;
  n?: number;
  size?: string;
}

export async function generateImage({
  description,
  imageStyle,
  colorScheme,
  purpose,
  n = 4,  // Default to 4 images
  size = "1024x1024",
}: GenerateImageParams): Promise<string[]> {
  try {
    // Validate API key
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured");
    }

    // Validate parameters
    if (!description) {
      throw new Error("Description is required");
    }

    // Combine all prompts
    const stylePrompt = getStylePrompt(imageStyle);
    const colorPrompt = getColorSchemePrompt(colorScheme);
    const purposePrompt = getPurposePrompt(purpose);
    
    const finalPrompt = `${stylePrompt}, ${colorPrompt}, ${purposePrompt} of: ${description}`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: finalPrompt,
      n: Math.min(n, 4), // DALL-E 3 has a max of 4 images per request
      size: size as "1024x1024" | "1792x1024" | "1024x1792",
      quality: "standard",
      style: "vivid",
    });

    if (!response.data || response.data.length === 0) {
      throw new Error("No images were generated");
    }

    return response.data.map((item) => item.url || "");
  } catch (error: any) {
    console.error("DALL-E API Error:", error.message || error);
    throw new Error(error.message || "Failed to generate image");
  }
}

export const getStylePrompt = (style: string): string => {
  const stylePrompts = {
    realistic:"Create a photorealistic image with natural lighting and textures",
    artistic: "Create an artistic interpretation with creative expression",
    minimal: "Create a clean, minimalist design with simple elements",
    vintage: "Create a retro-inspired image with nostalgic elements",
    futuristic: "Create a modern, cutting-edge design with futuristic elements",
  };
  return stylePrompts[style] || stylePrompts.realistic;
};

export const getColorSchemePrompt = (scheme: string): string => {
  const schemePrompts = {
    vibrant: "using bold, vibrant colors",
    pastel: "using soft, pastel colors",
    monochrome: "using black, white, and grayscale tones",
    warm: "using warm, inviting colors",
    cool: "using cool, calming colors",
  };
  return schemePrompts[scheme] || schemePrompts.vibrant;
};

export const getPurposePrompt = (purpose: string): string => {
  const purposePrompts = {
    social: "optimized for social media sharing with engaging composition",
    tshirt: "suitable for t-shirt printing with clear focal points",
    website: "web-friendly design with balanced layout",
    marketing: "attention-grabbing marketing visual",
    art: "artistic composition with creative elements",
    content: "content-focused illustration",
    custom: "custom-designed visual",
  };
  return purposePrompts[purpose] || purposePrompts.custom;
};
