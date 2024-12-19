'use client';

import Image from 'next/image';
import { MemeHistory } from '@/types/meme';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal, Download, Share2, Trash2, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface HistoryItemProps {
  meme: MemeHistory;
  onSelect: (meme: MemeHistory) => void;
  onDelete?: (id: string) => void;
  onShare?: (meme: MemeHistory) => void;
  onDownload?: (meme: MemeHistory) => void;
  onMakePublic?: (meme: MemeHistory) => void;
}

export function HistoryItem({ 
  meme, 
  onSelect, 
  onDelete,
  onShare,
  onDownload,
  onMakePublic 
}: HistoryItemProps) {
  const timeAgo = formatDistanceToNow(meme.createdAt, { addSuffix: true });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="group relative aspect-square cursor-pointer rounded-md overflow-hidden"
      onClick={() => onSelect(meme)}
    >
      <Image
        src={meme.imageUrl}
        alt="Historical meme"
        fill
        className="object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute top-2 right-2" onClick={handleClick}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-black/20"
              >
                <MoreHorizontal className="h-4 w-4 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => onMakePublic?.(meme)}>
                <Globe className="mr-2 h-4 w-4" />
                Make Public
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDownload?.(meme)}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onShare?.(meme)}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(meme.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className="text-xs text-white">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}