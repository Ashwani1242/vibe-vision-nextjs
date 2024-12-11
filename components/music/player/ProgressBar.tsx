'use client';

import { Slider } from '@/components/ui/slider';
import { formatTime } from '@/lib/format';

interface ProgressBarProps {
  progress: number;
  duration: number;
  currentTime: number;
  onSeek: (value: number) => void;
  showTime?: boolean;
  size?: 'sm' | 'lg';
}

export default function ProgressBar({
  progress,
  duration,
  currentTime,
  onSeek,
  showTime = true,
  size = 'sm'
}: ProgressBarProps) {
  // Ensure progress is a finite number
  const safeProgress = isFinite(progress) ? progress : 0;
  
  const handleSeek = (values: number[]) => {
    const value = values[0];
    if (isFinite(value)) {
      onSeek(value);
    }
  };

  return (
    <div className="space-y-2 w-full">
      <Slider
        value={[safeProgress]}
        max={100}
        step={0.1}
        onValueChange={handleSeek}
        className={size === 'lg' ? 'h-2' : 'h-1'}
      />
      
      {showTime && (
        <div className="flex justify-between text-sm text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      )}
    </div>
  );
}