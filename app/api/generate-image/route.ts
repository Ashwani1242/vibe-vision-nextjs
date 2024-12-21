import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  getStylePrompt,
  getColorSchemePrompt,
  getPurposePrompt,
} from "@/lib/image-generation";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert at creating detailed, high-quality image generation prompts.
Your task is to enhance user descriptions into detailed prompts that will generate amazing images.
Focus on adding specific details about:
- Artistic style and technique
- Lighting and atmosphere
- Color schemes and mood
- Composition and perspective
- Textures and materials
Keep the enhanced prompt clear and coherent.
Don't include any negative prompts or things to avoid.
Format the output as a single, well-structured paragraph.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      description,
      imageStyle,
      colorScheme,
      purpose,
      numberOfImages,
      resolution,
      transparency,
    } = body;

    // Enhance the prompt directly using OpenAI instead of making a separate HTTP request
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { 
          role: "user", 
          content: `Please enhance this image description into a detailed prompt.
Description: ${description}
Style: ${imageStyle}
Purpose: ${purpose}
Color Scheme: ${colorScheme}`
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const enhancedPrompt = completion.choices[0].message.content;

    // Construct final prompt with enhanced description and additional specifications
    const stylePrompt = getStylePrompt(imageStyle);
    const colorPrompt = getColorSchemePrompt(colorScheme);
    const purposePrompt = getPurposePrompt(purpose);

    const finalPrompt = [
      enhancedPrompt,
      `Style: ${stylePrompt}`,
      `Purpose: ${purposePrompt}`,
      `Color Scheme: ${colorPrompt}`,
      transparency ? "Ensure the background is transparent." : "",
    ]
      .filter(Boolean)
      .join("\n");

    // Generate image with DALL-E using the enhanced prompt
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: finalPrompt,
      n: numberOfImages,
      size: resolution as "1024x1024" | "1792x1024" | "1024x1792",
      quality: "standard",
      style: imageStyle === "realistic" ? "natural" : "vivid",
    });

    return NextResponse.json({ images: response.data });
  } catch (error: any) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate image" },
      { status: 500 }
    );
  }
}