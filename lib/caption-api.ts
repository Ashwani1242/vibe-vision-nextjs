import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { image, platform, tone, additionalContext, hashtags } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: `You are a social media caption generator. Generate a caption for the image based on:
            - Platform: ${platform}
            - Tone: ${tone}
            - Additional Context: ${additionalContext || 'None'}
            - Number of Hashtags: ${hashtags}
            Ensure the caption is engaging and appropriate for the platform.`
        },
        {
          role: "user",
          content: [
            { 
              type: "image_url", 
              image_url: { url: image } 
            },
            { 
              type: "text", 
              text: "Generate a creative caption for this image" 
            }
          ]
        }
      ],
      max_tokens: 300
    });

    const caption = response.choices[0].message.content;
    res.status(200).json({ caption });
  } catch (error) {
    console.error('Caption generation error:', error);
    res.status(500).json({ message: 'Error generating caption' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb'
    }
  }
};
