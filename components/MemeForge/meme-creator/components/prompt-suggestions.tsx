'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface PromptSuggestionsProps {
  onSelect: (suggestion: string) => void;
}

export function PromptSuggestions({ onSelect }: PromptSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateSuggestions = async () => {
      try {
        const response = await fetch('/api/suggestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: "Generate 5 creative and funny meme ideas. Return them as a JSON array of strings. Make them concise and specific. Each idea should be unique and engaging."
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }

        const data = await response.json();
        setSuggestions(data.suggestions);
      } catch (error) {
        // Fallback suggestions if API fails
        setSuggestions([
          "Cat wearing VR headset in space",
          "Dog filing taxes with confusion",
          "Robot learning to dance salsa",
          "Time-traveling dinosaur with smartphone",
          "Penguin giving TED talk"
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    generateSuggestions();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="h-3 w-3 animate-spin" />
        Loading suggestions...
      </div>
    );
  }

  return (
    <div className="mt-2">
      <p className="text-xs text-muted-foreground mb-2">Need inspiration? Try these:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion}
            variant="secondary"
            size="sm"
            className="text-xs bg-secondary/50 hover:bg-secondary"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}