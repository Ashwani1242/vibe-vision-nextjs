'use client';

import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (value: number) => void;
  onToggleMute: () => void;
  size?: 'sm' | 'lg';
}

export default function VolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
  size = 'sm'
}: VolumeControlProps) {
  return (
    <div className="flex items-center space-x-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggleMute}
        className="text-gray-400 hover:text-white"
      >
        {isMuted ? (
          <VolumeX size={size === 'lg' ? 24 : 20} />
        ) : (
          <Volume2 size={size === 'lg' ? 24 : 20} />
        )}
      </motion.button>
      
      <div className={cn("w-24", size === 'lg' && "w-32")}>
        <Slider
          value={[isMuted ? 0 : volume * 100]}
          max={100}
          step={1}
          onValueChange={(value) => onVolumeChange(value[0] / 100)}
          className={size === 'lg' ? 'h-2' : 'h-1'}
        />
      </div>
    </div>
  );
}