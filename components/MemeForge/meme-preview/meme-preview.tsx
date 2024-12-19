'use client';

import { Card } from '@/components/ui/card';
import { MemeText } from '@/types/types';
import { PreviewImage } from './preview-image';
import { PreviewActions } from './preview-actions';
import { useCallback } from 'react';

interface MemePreviewProps {
  imageUrl: string;
  text: MemeText;
}

export function MemePreview({ imageUrl, text }: MemePreviewProps) {
  const handleDownload = useCallback(async () => {
    if (!imageUrl) return;
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'meme.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  }, [imageUrl]);

  const handleShare = useCallback(async () => {
    if (!imageUrl) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out my meme!',
          text: 'Created with MemeForge',
          url: imageUrl,
        });
      } else {
        await navigator.clipboard.writeText(imageUrl);
        // TODO: Show toast notification
      }
    } catch (error) {
      console.error('Failed to share:', error);
    }
  }, [imageUrl]);

  if (!imageUrl) {
    return (
      <Card className="aspect-square flex items-center justify-center bg-muted/20 glass-card">
        <p className="text-muted-foreground">Your meme will appear here ✨</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden glass-card">
        <PreviewImage imageUrl={imageUrl} text={text} />
      </Card>
      <PreviewActions
        onDownload={handleDownload}
        onShare={handleShare}
        disabled={!imageUrl}
      />
    </div>
  );
}