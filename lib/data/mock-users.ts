import type { User } from "@/lib/types";

export const MOCK_USERS: Record<string, User> = {
  johndoe: {
    id: "1",
    username: "johndoe",
    displayName: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&h=256&fit=crop&crop=faces",
    banner: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&h=400&fit=crop",
    createdAt: new Date("2023-01-01").toISOString(),
    bio: "Software developer and tech enthusiast. Building cool stuff on the web.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    social: {
      twitter: "johndoe",
      github: "johndoe",
    },
    stats: {
      postKarma: 1234,
      commentKarma: 5678,
      followers: 42,
      following: 24,
    },
    achievements: [
      { id: "1", name: "First Post", description: "Made your first post" },
      { id: "2", name: "Popular Post", description: "Got 100+ upvotes" },
      { id: "3", name: "Verified Email", description: "Verified email address" },
    ],
  },
  janedoe: {
    id: "2",
    username: "janedoe",
    displayName: "Jane Doe",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&crop=faces",
    banner: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&h=400&fit=crop",
    createdAt: new Date("2023-02-01").toISOString(),
    bio: "UX designer and creative thinker. Making the web beautiful.",
    location: "New York, NY",
    website: "https://janedoe.design",
    social: {
      twitter: "janedoe",
      github: "janedoe",
    },
    stats: {
      postKarma: 5678,
      commentKarma: 1234,
      followers: 84,
      following: 42,
    },
    achievements: [
      { id: "1", name: "First Post", description: "Made your first post" },
      { id: "4", name: "Design Star", description: "Created a trending design post" },
    ],
  },
  techguru: {
    id: "3",
    username: "techguru",
    displayName: "Tech Guru",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&h=256&fit=crop&crop=faces",
    banner: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=1920&h=400&fit=crop",
    createdAt: new Date("2023-03-01").toISOString(),
    bio: "Technology consultant and speaker. Sharing insights about the latest tech trends.",
    location: "London, UK",
    website: "https://techguru.blog",
    social: {
      twitter: "techguru",
      github: "techguru",
    },
    stats: {
      postKarma: 9876,
      commentKarma: 5432,
      followers: 156,
      following: 89,
    },
    achievements: [
      { id: "1", name: "First Post", description: "Made your first post" },
      { id: "5", name: "Tech Expert", description: "Contributed valuable tech insights" },
    ],
  },
};