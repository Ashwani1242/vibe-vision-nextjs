'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { MemeText } from '@/types/types';
import { MEME_TEXT_SUGGESTIONS } from '@/lib/constants/meme';

interface TextInputsProps {
  text: MemeText;
  onUpdate: (updates: Partial<MemeText>) => void;
}

export function TextInputs({ text, onUpdate }: TextInputsProps) {
  const generateAIText = async () => {
    // In production, this would call your AI service
    const randomSuggestion = MEME_TEXT_SUGGESTIONS[
      Math.floor(Math.random() * MEME_TEXT_SUGGESTIONS.length)
    ];
    onUpdate({ 
      top: randomSuggestion,
      bottom: "Bottom text goes here"
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label className="text-muted-foreground">Top Text</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={generateAIText}
            className="h-8"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Suggest
          </Button>
        </div>
        <Input
          value={text.top}
          onChange={(e) => onUpdate({ top: e.target.value })}
          placeholder="Enter top text"
          className="bg-background/50 border-muted"
        />
      </div>
      <div>
        <Label className="text-muted-foreground">Bottom Text</Label>
        <Input
          value={text.bottom}
          onChange={(e) => onUpdate({ bottom: e.target.value })}
          placeholder="Enter bottom text"
          className="bg-background/50 border-muted"
        />
      </div>
    </div>
  );
}