'use client';

import { useState } from 'react';
import { MemeCreator } from './meme-creator/meme-creator';
import { MemePreview } from './meme-preview/meme-preview';
import { TextCustomizer } from './text-customizer/text-customizer';
import { HistoryPanel } from './meme-history/history-panel';
import { useTextCustomization } from '@/hooks/use-text-customization';
import { useMemeHistory } from '@/hooks/use-meme-history';
import { MemeHistory } from '@/types/meme';
import { v4 as uuidv4 } from 'uuid';

export function MemeWorkspace() {
  const [generatedImage, setGeneratedImage] = useState('');
  const { text, updateText, resetText } = useTextCustomization();
  const { history, addToHistory, clearHistory } = useMemeHistory();

  const handleImageGenerated = (imageUrl: string) => {
    setGeneratedImage(imageUrl);
    resetText();
  };

  const handleHistorySelect = (meme: MemeHistory) => {
    setGeneratedImage(meme.imageUrl);
    updateText(meme.text);
  };

  const handleSave = () => {
    if (!generatedImage) return;

    const meme: MemeHistory = {
      id: uuidv4(),
      imageUrl: generatedImage,
      prompt: '', // Store the original prompt if needed
      text,
      createdAt: Date.now()
    };

    addToHistory(meme);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <MemeCreator onImageGenerated={handleImageGenerated} />
        <HistoryPanel
          history={history}
          onSelect={handleHistorySelect}
          onClear={clearHistory}
        />
      </div>
      <div className="space-y-6">
        <MemePreview
          imageUrl={generatedImage}
          text={text}
        />
        {generatedImage && (
          <TextCustomizer
            text={text}
            onTextChange={updateText}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
}