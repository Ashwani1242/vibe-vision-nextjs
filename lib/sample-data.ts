import { audioSamples } from './data/audio-samples';
import { genreLyrics } from './data/lyrics-data';
import { songTitles } from './data/song-titles';

// Sample artists data
const artists = [
  { name: 'Luna Echo', genre: 'Electronic' },
  { name: 'The Dreamers', genre: 'Indie Pop' },
  { name: 'Cosmic Sound', genre: 'Ambient' },
  { name: 'Nature\'s Voice', genre: 'World Music' },
  { name: 'Urban Beat', genre: 'Hip Hop' }
];

// Sample images for different moods
const moodImages = [
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
  'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80'
];

// Generate lyrics based on genre
function generateLyrics(genre: string): string[] {
  return genreLyrics[genre as keyof typeof genreLyrics] || genreLyrics.Electronic;
}

// Generate a large set of songs
function generateSongs(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const artist = artists[i % artists.length];
    const genre = artist.genre;
    const titles = songTitles[genre as keyof typeof songTitles] || songTitles.Electronic;
    
    return {
      id: `song-${i + 1}`,
      title: `${titles[i % titles.length]} ${Math.floor(i / titles.length) + 1}`,
      artist: artist.name,
      genre,
      imageUrl: moodImages[i % moodImages.length],
      audioUrl: audioSamples[i % audioSamples.length],
      duration: 180 + Math.floor(Math.random() * 120),
      lyrics: generateLyrics(genre)
    };
  });
}

// Generate sample data
export const allSongs = generateSongs(100);
export const trendingSongs = allSongs.slice(0, 10);
export const newSongs = allSongs.slice(10, 60);

// Genre categories
export const genres = [
  {
    id: '1',
    name: 'Electronic',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80'
  },
  {
    id: '2',
    name: 'Indie Pop',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80'
  },
  {
    id: '3',
    name: 'Ambient',
    imageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80'
  },
  {
    id: '4',
    name: 'World Music',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80'
  },
  {
    id: '5',
    name: 'Hip Hop',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80'
  }
];

// Create playlists with songs grouped by genre
export const trendingPlaylists = genres.map((genre, index) => ({
  id: `playlist-${index + 1}`,
  name: `Best of ${genre.name}`,
  imageUrl: genre.imageUrl,
  description: `Top ${genre.name} tracks curated just for you`,
  songs: allSongs.filter(song => song.genre === genre.name).slice(0, 20)
}));