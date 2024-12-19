import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true 
});

export async function generateImagePrompt(description: string): Promise<string> {
  try {
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      console.warn('OpenAI API key is missing');
      return description;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system", 
          content: "You are an expert at creating detailed image generation prompts. Convert casual meme descriptions into detailed prompts that will generate high-quality, meme-worthy images."
        },
        {
          role: "user",
          content: description
        }
      ],
      max_tokens: 150
    });

    return completion.choices[0].message.content || description;
  } catch (error) {
    console.error('Error generating image prompt:', error);
    return description;
  }
}

export async function generateImage(prompt: string) {
  try {
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is required to generate images');
    }

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard", 
      response_format: "url",
    });

    return response.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

interface MemeTextResponse {
  topText: string;
  bottomText: string;
}

export async function generateMemeText(description: string): Promise<MemeTextResponse> {
  try {
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is missing');
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a meme text generator. Create a funny meme by generating:
          1. A catchy top text that sets up the joke
          2. A bottom text that delivers the punchline
          Keep each line under 50 characters and make it humorous.
          Format response as JSON with 'topText' and 'bottomText'.
          Example: {"topText": "When you fix a bug at 3 AM...", "bottomText": "...and create 3 new ones 🐛"}`,
        },
        {
          role: "user",
          content: `Generate meme text for: ${description}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    const response = JSON.parse(content);
    console.log('Generated meme text:', response); // Debug log

    return {
      topText: response.topText,
      bottomText: response.bottomText
    };
  } catch (error) {
    console.error('Error in generateMemeText:', error);
    // Return default text that indicates an error occurred
    return {
      topText: "Error generating text",
      bottomText: "Please try again"
    };
  }
}