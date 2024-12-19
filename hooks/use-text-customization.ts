'use client';

import { useState } from 'react';
import { MemeText } from '@/types/meme';
import { MEME_DEFAULTS } from '@/lib/constants/meme';

const DEFAULT_TEXT: MemeText = {
  top: '',
  bottom: '',
  fontSize: MEME_DEFAULTS.fontSize,
  color: MEME_DEFAULTS.color,
  position: MEME_DEFAULTS.position
};

export function useTextCustomization() {
  const [text, setText] = useState<MemeText>(DEFAULT_TEXT);

  const updateText = (updates: Partial<MemeText>) => {
    setText(prev => ({ ...prev, ...updates }));
  };

  const resetText = () => {
    setText(DEFAULT_TEXT);
  };

  return {
    text,
    updateText,
    resetText
  };
}