'use client';

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { History, Trash2 } from 'lucide-react';
import { MemeHistory } from '@/types/meme';
import { HistoryItem } from './history-item';
import { toast } from '@/hooks/use-toast';

interface HistoryPanelProps {
  history: MemeHistory[];
  onSelect: (meme: MemeHistory) => void;
  onClear: () => void;
}

export function HistoryPanel({ history, onSelect, onClear }: HistoryPanelProps) {
  const handleDelete = async (_id: string) => {
    // Implement delete functionality
    // This should be connected to your state management
    toast({
      title: "Meme deleted",
      description: "The meme has been removed from your history.",
    });
  };

  const handleDownload = async (meme: MemeHistory) => {
    try {
      const response = await fetch(meme.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `meme-${meme.id}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download started",
        description: "Your meme is being downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading your meme.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (meme: MemeHistory) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out my meme!',
          text: 'Created with MemeForge',
          url: meme.imageUrl,
        });
      } else {
        await navigator.clipboard.writeText(meme.imageUrl);
        toast({
          title: "Link copied",
          description: "Meme URL copied to clipboard!",
        });
      }
    } catch (error) {
      toast({
        title: "Share failed",
        description: "There was an error sharing your meme.",
        variant: "destructive",
      });
    }
  };

  const handleMakePublic = async (_meme: MemeHistory) => {
    // Implement public functionality
    // This should connect to your backend
    toast({
      title: "Made public",
      description: "Your meme is now publicly visible.",
    });
  };

  if (history.length === 0) {
    return (
      <Card className="p-4 text-center text-muted-foreground">
        <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No memes in history yet</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Memes</h3>
        <Button
          variant="destructive"
          size="sm"
          onClick={onClear}
          className="hover:bg-destructive/90"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="grid grid-cols-2 gap-4">
          {history.map((meme) => (
            <HistoryItem
              key={meme.id}
              meme={meme}
              onSelect={onSelect}
              onDelete={handleDelete}
              onShare={handleShare}
              onDownload={handleDownload}
              onMakePublic={handleMakePublic}
            />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}