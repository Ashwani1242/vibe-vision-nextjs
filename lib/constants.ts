export const USERNAMES = [
  "johndoe",
  "janedoe",
  "techguru",
  "designpro",
  "musiclover"
];

export const MEDIA_TYPES = ['text', 'image', 'video', 'audio'] as const;

export const MEDIA_RESOURCES = {
  image: [
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d',
    'https://images.unsplash.com/photo-1579546929662-711aa81148cf',
    'https://images.unsplash.com/photo-1480506132646-4a11f1d8a280',
  ],
  video: [
    'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  ],
  audio: [
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  ],
  text: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
  ],
};

export const CATEGORIES = [
  'technology',
  'science',
  'entertainment',
  'sports',
  'lifestyle',
] as const;

export const MEME_SUGGESTIONS = [
  "Cat vibing to music with RGB lights",
  "Surprised Pikachu but it's a corporate meeting",
  "Gamer rage quit moment but make it aesthetic",
  "POV: When the WiFi drops during online class"
] as const;

export const IMAGE_GENERATION_CONFIG = {
  width: 512,
  height: 512,
  quality: "standard",
  timeout: 2000,
} as const;

export const MEME_TEXT_CONFIG = {
  maxLength: 100,
  defaultFont: "Impact",
  maxFontSize: 48,
  minFontSize: 12,
} as const;