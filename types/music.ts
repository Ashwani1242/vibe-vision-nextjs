export interface Song {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  lyrics: string[];
}

export interface Genre {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  songs: string[]; // Array of song IDs
  createdAt: Date;
  userId?: string;
}

export interface UserPlaylist extends Playlist {
  isPublic: boolean;
}