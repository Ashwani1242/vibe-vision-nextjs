// pages/api/generate-content.ts or your backend route handler
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';

// Disable bodyParser to handle multipart form data
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ message: 'File upload error' });
        }

        try {
            // Extract parameters from fields
            const platform = fields.platform as string;
            const tone = fields.tone as string;
            const description = fields.description as string;
            const numberOfHashtags = parseInt(fields.numberOfHashtags as string);
            const captionLength = fields.captionLength as string;

            // Read the uploaded image file
            const imageFile = files.image as formidable.File;
            const imageBuffer = fs.readFileSync(imageFile.filepath);
            const base64Image = imageBuffer.toString('base64');

            // Call OpenAI Vision API
            const visionResponse = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-4-vision-preview",
                    messages: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: `Analyze this image and generate a social media post for ${platform}. 
                         Use a ${tone.toLowerCase()} tone. 
                         ${description ? `Additional context: ${description}` : ''}
                         Generate ${numberOfHashtags} relevant hashtags.
                         Caption length should be ${captionLength}.`
                                },
                                {
                                    type: "image_url",
                                    image_url: {
                                        url: `data:image/jpeg;base64,${base64Image}`
                                    }
                                }
                            ]
                        }
                    ],
                    max_tokens: 300
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Parse the response
            const generatedContent = visionResponse.data.choices[0].message.content;

            // Extract captions and hashtags (you might need to implement custom parsing)
            const captions = [generatedContent]; // Modify as needed
            const hashtags = generatedContent.match(/#\w+/g)?.map(tag => tag.slice(1)) || [];

            return res.status(200).json({
                imageAnalysis: 'Image analyzed successfully',
                captions,
                hashtags: hashtags.slice(0, numberOfHashtags)
            });
        } catch (error) {
            console.error('Content generation error:', error);
            return res.status(500).json({ message: 'Failed to generate content' });
        }
    });
}