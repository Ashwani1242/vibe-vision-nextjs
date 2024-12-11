'use client';

import { motion } from 'framer-motion';
import { UserPlaylist } from '@/types/music';
import CreatePlaylistDialog from './CreatePlaylistDialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ListMusic, Trash2 } from 'lucide-react';

interface PlaylistSidebarProps {
  playlists: UserPlaylist[];
  onCreatePlaylist: (playlist: Omit<UserPlaylist, 'id' | 'createdAt'>) => void;
  onDeletePlaylist: (id: string) => void;
  onSelectPlaylist: (playlist: UserPlaylist) => void;
  selectedPlaylistId?: string;
}

export default function PlaylistSidebar({
  playlists,
  onCreatePlaylist,
  onDeletePlaylist,
  onSelectPlaylist,
  selectedPlaylistId
}: PlaylistSidebarProps) {
  return (
    <div className="w-64 bg-dark-800/50 border-r border-white/10 p-4">
      <div className="mb-4">
        <CreatePlaylistDialog onCreatePlaylist={onCreatePlaylist} />
      </div>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-1">
          {playlists.map((playlist) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`
                flex items-center justify-between
                p-2 rounded-lg cursor-pointer
                ${selectedPlaylistId === playlist.id 
                  ? 'bg-cyan-500/20 text-cyan-500' 
                  : 'hover:bg-white/5 text-white/60 hover:text-white'
                }
              `}
              onClick={() => onSelectPlaylist(playlist)}
            >
              <div className="flex items-center space-x-3">
                <ListMusic size={18} />
                <span className="truncate">{playlist.name}</span>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePlaylist(playlist.id);
                }}
              >
                <Trash2 size={16} />
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}