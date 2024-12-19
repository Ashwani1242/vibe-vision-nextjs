'use client';

import { useState } from 'react';
import { WorkspaceLayout } from './workspace-layout';
import { EditorPanel } from './editor-panel';
import { PreviewPanel } from './preview-panel';
import { useTextCustomization } from '@/hooks/use-text-customization';
import { useMemeHistory } from '@/hooks/use-meme-history';
import { MemeHistory } from '@/types/meme';
import { MemeText } from '@/types/types'; // Importing the correct MemeText type
import { generateId } from '@/lib/utils/id-generator';

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
    updateText(meme.text as MemeText); // Ensuring text is of type MemeText
  };

  const handleSave = () => {
    if (!generatedImage) return;
    
    const meme: MemeHistory = {
      id: generateId(),
      imageUrl: generatedImage,
      prompt: '',
      text: text as MemeText, // Ensuring text is of type MemeText
      createdAt: Date.now()
    };
    
    addToHistory(meme);
  };

  return (
    <WorkspaceLayout>
      <EditorPanel
        onImageGenerated={handleImageGenerated}
        text={text as MemeText} // Ensuring text is of type MemeText
        onTextChange={updateText}
        onSave={handleSave}
        showTextCustomizer={!!generatedImage}
      />
      <PreviewPanel
        imageUrl={generatedImage}
        text={text as MemeText} // Ensuring text is of type MemeText
        history={history}
        onHistorySelect={handleHistorySelect}
        onClearHistory={clearHistory}
      />
    </WorkspaceLayout>
  );
}