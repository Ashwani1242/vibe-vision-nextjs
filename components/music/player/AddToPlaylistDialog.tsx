'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, ListMusic } from 'lucide-react';
import { UserPlaylist, Song } from '@/types/music';
import CreatePlaylistDialog from '../playlist/CreatePlaylistDialog';

interface AddToPlaylistDialogProps {
  song: Song;
  playlists?: UserPlaylist[];
  onAddToPlaylist?: (playlistId: string, songId: string) => void;
  onCreatePlaylist?: (playlist: Omit<UserPlaylist, 'id' | 'createdAt'>) => void;
}

export default function AddToPlaylistDialog({
  song,
  playlists = [],
  onAddToPlaylist,
  onCreatePlaylist
}: AddToPlaylistDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleAddToPlaylist = (playlistId: string) => {
    onAddToPlaylist?.(playlistId, song.id);
    setIsOpen(false);
  };

  const handleCreatePlaylist = (playlist: Omit<UserPlaylist, 'id' | 'createdAt'>) => {
    onCreatePlaylist?.(playlist);
    setShowCreateDialog(false);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
            <PlusCircle size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-dark-800 text-white">
          <DialogHeader>
            <DialogTitle>Add to Playlist</DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <Button
              variant="ghost"
              className="w-full justify-start mb-4"
              onClick={() => setShowCreateDialog(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Playlist
            </Button>
            
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {playlists.map((playlist) => (
                  <Button
                    key={playlist.id}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleAddToPlaylist(playlist.id)}
                  >
                    <ListMusic className="mr-2 h-4 w-4" />
                    {playlist.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[425px] bg-dark-800 text-white">
          <CreatePlaylistDialog onCreatePlaylist={handleCreatePlaylist} />
        </DialogContent>
      </Dialog>
    </>
  );
}