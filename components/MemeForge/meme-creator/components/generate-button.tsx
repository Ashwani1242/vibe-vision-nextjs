import { Button } from '@/components/ui/button';
import { Wand2, RefreshCw, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isGenerating: boolean;
}

export function GenerateButton({ onClick, disabled, isGenerating }: GenerateButtonProps) {
  const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 });
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setSparklePosition({
          x: Math.random() * 100,
          y: Math.random() * 100
        });
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 500);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  return (
    <div className="relative">
      <Button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "w-full relative overflow-hidden transition-all duration-300",
          "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500",
          "hover:from-purple-600 hover:via-pink-600 hover:to-purple-600",
          "border border-white/20 shadow-lg",
          isGenerating && "animate-shimmer bg-[length:200%_100%]",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="flex items-center justify-center gap-2">
          {isGenerating ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" />
              <div className="flex items-center gap-1">
                <span className="animate-bounce delay-0">G</span>
                <span className="animate-bounce delay-100">e</span>
                <span className="animate-bounce delay-200">n</span>
                <span className="animate-bounce delay-300">e</span>
                <span className="animate-bounce delay-400">r</span>
                <span className="animate-bounce delay-500">a</span>
                <span className="animate-bounce delay-600">t</span>
                <span className="animate-bounce delay-700">i</span>
                <span className="animate-bounce delay-800">n</span>
                <span className="animate-bounce delay-900">g</span>
              </div>
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5 animate-pulse" />
              <span>Generate Meme</span>
            </>
          )}
        </div>

        {showSparkle && (
          <Sparkles
            className="absolute w-4 h-4 text-yellow-300 animate-ping"
            style={{
              left: `${sparklePosition.x}%`,
              top: `${sparklePosition.y}%`
            }}
          />
        )}
      </Button>

      {isGenerating && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
      )}
    </div>
  );
}