'use client';

import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MemeText } from '@/types/types';
import { FONT_SIZE_LIMITS, MEME_FONTS } from '@/lib/constants/meme';

interface FontControlsProps {
  text: MemeText & {
    fontSize?: number;
    color?: string;
    fontFamily?: string;
  };
  onUpdate: (updates: Partial<MemeText & {
    fontSize?: number;
    color?: string;
    fontFamily?: string;
  }>) => void;
}

export function FontControls({ text, onUpdate }: FontControlsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Font Family</Label>
          <Select
            value={text.fontFamily}
            onValueChange={(value) => onUpdate({ fontFamily: value })}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {MEME_FONTS.map((font) => (
                <SelectItem
                  key={font.value}
                  value={font.value}
                  style={{ fontFamily: font.value }}
                >
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Text Color</Label>
          <Input
            type="color"
            value={text.color}
            onChange={(e) => onUpdate({ color: e.target.value })}
            className="h-10 px-2 mt-2"
          />
        </div>
      </div>

      <div>
        <Label>Font Size</Label>
        <Slider
          value={[text.fontSize || FONT_SIZE_LIMITS.min]}
          min={FONT_SIZE_LIMITS.min}
          max={FONT_SIZE_LIMITS.max}
          step={FONT_SIZE_LIMITS.step}
          onValueChange={([value]) => onUpdate({ fontSize: value })}
          className="mt-2"
        />
      </div>
    </div>
  );
}