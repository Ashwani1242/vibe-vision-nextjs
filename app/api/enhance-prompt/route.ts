// /app/api/enhance-prompt/route.ts

import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// System prompt providing clear instructions for the AI
const SYSTEM_PROMPT = `
You are an expert at creating detailed, imaginative, and high-quality prompts for image generation.
Your task is to enhance user descriptions into professional, vivid prompts similar to those used in advanced AI art models.
Focus on:
- Artistic style (e.g., Pixar 3D, surrealism, impressionism)
- Scene and subject details (e.g., characters, objects, actions)
- Setting and atmosphere (e.g., lighting, mood, surroundings)
- Colors and textures (e.g., pastel tones, glossy surfaces, intricate patterns)
- Composition and perspective (e.g., camera angles, focus, scale)
Keep the output clear, cohesive, and structured as a single paragraph.
Use a tone that matches professional image generation prompts.
Avoid unnecessary verbosity or negative phrasing.
Include advanced modifiers for AI art tools, such as versioning or stylization settings, where relevant.
`;

/**
 * Handles the POST request to enhance an image description into a detailed prompt.
 * @param req - Incoming request object
 * @returns Enhanced prompt in JSON format or an error response
 */
export async function POST(req: Request) {
  try {
    // Parse the request body
    const { description, imageStyle, purpose, colorScheme } = await req.json();

    // Validate input
    if (!description || !imageStyle || !purpose || !colorScheme) {
      return NextResponse.json(
        { error: "Missing required fields: description." },
        { status: 400 }
      );
    }

    // Construct the user prompt for the AI
    const userPrompt = `
Please enhance this image description into a detailed prompt.
Description: ${description}
    `;

    // Generate the enhanced prompt using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7, // Balances creativity and focus
      max_tokens: 500, // Limits the length of the generated response
    });

    // Extract the enhanced prompt from the AI response
    const enhancedPrompt = completion.choices[0].message.content;

    // Return the enhanced prompt as JSON
    return NextResponse.json({ enhancedPrompt });
  } catch (error: any) {
    console.error("Error enhancing prompt:", error);

    // Return an error response with appropriate status code and message
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred while enhancing the prompt.",
      },
      { status: 500 }
    );
  }
}
