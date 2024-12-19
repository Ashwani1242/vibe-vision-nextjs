'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { WandSparkles, AlertCircle, History } from 'lucide-react';
import { PromptSuggestions } from './components/prompt-suggestions';
import { PromptInput } from './components/prompt-input';
import { GenerateButton } from './components/generate-button';
import { useMemeGenerator } from '@/hooks/use-meme-generator';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface MemeCreatorProps {
  onImageGenerated: (imageUrl: string) => void;
}

export function MemeCreator({ onImageGenerated }: MemeCreatorProps) {
  const [description, setDescription] = useState('');
  const [recentPrompts, setRecentPrompts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { generate, isGenerating, error } = useMemeGenerator();

  // Load recent prompts from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recentPrompts');
    if (saved) {
      setRecentPrompts(JSON.parse(saved));
    }
  }, []);

  // Save prompt to recent history
  const saveToHistory = useCallback((prompt: string) => {
    setRecentPrompts(prev => {
      const updated = [prompt, ...prev.slice(0, 4)]; // Keep last 5 prompts
      localStorage.setItem('recentPrompts', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      const result = await generate(description);
      if (result) {
        onImageGenerated(result.url);
        saveToHistory(description);
        toast({
          title: "Success!",
          description: "Your meme has been generated successfully.",
          variant: "default",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to generate meme. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleGenerate();
    }
  };

  return (
    <Card className="glass-card p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 backdrop-blur-sm" />
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <WandSparkles className="w-5 h-5 text-purple-400" />
            Create Your Meme
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toast({
                    title: "Recent Prompts",
                    description: (
                      <ul className="list-disc pl-4">
                        {recentPrompts.map((prompt, i) => (
                          <li key={i} className="text-sm">{prompt}</li>
                        ))}
                      </ul>
                    ),
                  })}
                >
                  <History className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                View Recent Prompts
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="space-y-6">
          <PromptInput
            value={description}
            onChange={setDescription}
            disabled={isGenerating || isLoading}
            onKeyDown={handleKeyPress}
          />
          <PromptSuggestions onSelect={setDescription} />
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-500">
              <AlertCircle className="w-4 h-4" />
              <p>{error}</p>
            </div>
          )}
          <GenerateButton
            onClick={handleGenerate}
            disabled={!description || isGenerating || isLoading}
            isGenerating={isGenerating || isLoading}
          />
          <p className="text-xs text-muted-foreground text-center">
            Pro tip: Press Ctrl + Enter to generate quickly
          </p>
        </div>
      </div>
    </Card>
  );
}