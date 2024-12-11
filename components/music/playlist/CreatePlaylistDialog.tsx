'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PlusCircle } from 'lucide-react';
import { UserPlaylist } from '@/types/music';

interface CreatePlaylistDialogProps {
  onCreatePlaylist: (playlist: Omit<UserPlaylist, 'id' | 'createdAt'>) => void;
}

export default function CreatePlaylistDialog({ onCreatePlaylist }: CreatePlaylistDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onCreatePlaylist({
      name,
      description,
      isPublic,
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', // Default image
      songs: [],
    });

    setName('');
    setDescription('');
    setIsPublic(true);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Playlist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-dark-800 text-white">
        <DialogHeader>
          <DialogTitle>Create New Playlist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Playlist Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-dark-700 border-dark-600"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-dark-700 border-dark-600"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="public">Make Playlist Public</Label>
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>
          <Button type="submit" className="w-full">
            Create Playlist
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}