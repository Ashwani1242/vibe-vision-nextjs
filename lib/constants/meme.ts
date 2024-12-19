export const MEME_DEFAULTS = {
  fontSize: 48,
  color: '#FFFFFF',
  position: { x: 0.5, y: 0.1 }
} as const;

export const FONT_SIZE_LIMITS = {
  min: 12,
  max: 72,
  step: 1
} as const;

export const HISTORY_LIMITS = {
  maxItems: 10,
  thumbnailSize: 150
} as const;

export const MEME_FONTS = [
  { value: 'Comic Sans MS', label: 'Comic Sans' },
  { value: 'Impact', label: 'Classic Meme' },
  { value: 'Lobster', label: 'Funky' },
  { value: 'Permanent Marker', label: 'Marker' },
  { value: 'Anton', label: 'Bold Impact' },
  { value: 'Press Start 2P', label: 'Pixel Art' },
  { value: 'VT323', label: 'Retro Gaming' },
  { value: 'Oswald', label: 'Modern Bold' },
];

export const MEME_TEXT_SUGGESTIONS = [
  "When the code finally compiles after 100 attempts",
  "My code before vs after code review",
  "Expectation vs Reality in software development", 
  "How I explain my code vs How it actually works",
  "When someone asks me to explain my code from 6 months ago",
  "My commit messages at the start vs end of the day",
  "Frontend vs Backend developers",
  "What the client wants vs What they can afford",
  "My code quality before and after coffee",
  "When the bug appears in production but works fine locally",
  "Documentation writers vs Documentation readers",
  "Coding on Friday vs Coding on Monday",
  "My code organization in development vs production",
  "When Stack Overflow is down for maintenance",
  "The code I wrote vs The code I inherited"
];