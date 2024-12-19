'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Type, Save } from 'lucide-react';
import { FontControls } from './font-controls';
import { TextInputs } from './text-inputs';
import { MemeText } from '@/types/types';

interface TextCustomizerProps {
  text: MemeText;
  onTextChange: (updates: Partial<MemeText>) => void;
  onSave: () => void;
}

export function TextCustomizer({ text, onTextChange, onSave }: TextCustomizerProps) {
  return (
    <Card className="glass-card p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
      <div className="relative">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Type className="w-5 h-5 text-purple-400" />
          Customize Text
        </h3>
        <div className="space-y-6">
          <TextInputs text={text} onUpdate={onTextChange} />
          <FontControls text={text} onUpdate={onTextChange} />
          <Button 
            onClick={onSave}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Meme
          </Button>
        </div>
      </div>
    </Card>
  );
}