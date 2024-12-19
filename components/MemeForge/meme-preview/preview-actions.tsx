'use client';

import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';

interface PreviewActionsProps {
  onDownload: () => void;
  onShare: () => void;
  disabled: boolean;
}

export function PreviewActions({ onDownload, onShare, disabled }: PreviewActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        onClick={onDownload}
        disabled={disabled}
      >
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      <Button
        variant="secondary"
        className="bg-secondary/50 hover:bg-secondary"
        onClick={onShare}
        disabled={disabled}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
}