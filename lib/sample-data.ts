export const trendingSongs = [
  {
    id: '1',
    title: 'Chasing Stars',
    artist: 'Code Infinity',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 213,
    lyrics: [
      "Verse 1:",
      "Chasing stars across the night",
      "Following dreams that burn so bright",
      "Every step into the unknown",
      "Making this journey on our own"
    ]
  },
  {
    id: '2',
    title: 'In the Moment',
    artist: 'Mr. Swap',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 184,
    lyrics: [
      "Verse 1:",
      "Living in the moment",
      "Time stands still",
      "Nothing else matters",
      "Just what we feel"
    ]
  }
];

export const genres = [
  {
    id: '1',
    name: 'Pop',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80'
  },
  {
    id: '2',
    name: 'Pop Ballad',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80'
  },
  {
    id: '3',
    name: 'Indie Pop',
    imageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80'
  },
  {
    id: '4',
    name: 'Inspirational Pop',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80'
  },
  {
    id: '5',
    name: 'Rock',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80'
  }
];

export const trendingPlaylists = [
  {
    id: '1',
    name: 'Feel Good',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    description: 'Start your day with these uplifting tunes'
  },
  {
    id: '2',
    name: 'Himalaya',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&q=80',
    description: 'Peaceful mountain vibes'
  },
  {
    id: '3',
    name: 'Hindi Songs',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    description: 'Top Bollywood hits'
  }
];

// Generate 50 sample songs for infinite scrolling
export const newSongs = Array.from({ length: 50 }, (_, i) => ({
  id: `new-${i + 1}`,
  title: [
    'Eternal Light',
    'Midnight Dreams',
    'Ocean Waves',
    'Mountain Echo',
    'City Lights',
    'Desert Wind',
    'Forest Rain',
    'River Flow',
    'Sunset Melody',
    'Morning Dew'
  ][i % 10] + ` ${Math.floor(i / 10) + 1}`,
  artist: [
    'Luna Echo',
    'The Dreamers',
    'Cosmic Sound',
    'Nature\'s Voice',
    'Urban Beat',
    'Desert Storm',
    'Forest Whispers',
    'River Songs',
    'Sunset Collective',
    'Morning Birds'
  ][i % 10],
  imageUrl: [
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80'
  ][i % 5],
  audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  duration: 180 + Math.floor(Math.random() * 120),
  lyrics: [
    "Verse 1:",
    "In the depths of night",
    "Stars shine so bright",
    "Guiding our way",
    "Through the darkest day",
    "",
    "Chorus:",
    "We rise and fall",
    "Standing tall",
    "Through it all",
    "We hear the call"
  ]
}));