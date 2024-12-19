import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Eraser, Lightbulb, Keyboard } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export function PromptInput({ value, onChange, disabled, onKeyDown }: PromptInputProps) {
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  const handleClear = () => {
    onChange('');
  };

  const getRandomIdea = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            role: "system",
            content: "You are a creative meme idea generator. Generate one random, funny, and creative meme idea."
          }],
          max_tokens: 50,
          temperature: 0.9
        })
      });

      const data = await response.json();
      const idea = data.choices[0].message.content;
      onChange(idea);
    } catch (error) {
      // Fallback to static ideas if API call fails
      const fallbackIdeas = [
        "A cat in a business suit giving a PowerPoint presentation",
        "A dog trying to solve complex math equations", 
        "A confused robot attempting to understand human memes",
        "Dinosaurs using modern technology",
        "Aliens discovering social media for the first time"
      ];
      onChange(fallbackIdeas[Math.floor(Math.random() * fallbackIdeas.length)]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-muted-foreground">
          Describe your meme idea and we'll generate the perfect image for you.
        </label>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleClear}
                  disabled={disabled || !value}
                >
                  <Eraser className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear input</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={getRandomIdea}
                  disabled={disabled}
                >
                  <Lightbulb className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Get random idea</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="relative">
        <Textarea
          placeholder="Describe your meme idea... (e.g., 'A cat wearing sunglasses while coding on a laptop')"
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= maxChars) {
              onChange(e.target.value);
            }
          }}
          onKeyDown={onKeyDown}
          disabled={disabled}
          className="h-32 bg-background/50 border-muted pr-20"
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {charCount}/{maxChars}
          </span>
          <Keyboard className="h-4 w-4 text-muted-foreground opacity-50" />
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Try to be specific with details like setting, emotions, and style.
      </div>
    </div>
  );
}