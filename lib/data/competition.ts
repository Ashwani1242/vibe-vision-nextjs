// Types for competition data
export interface Competition {
  id: string;
  title: string;
  category: "Photography" | "Video" | "Design" | "All";
  description: string;
  deadline: Date;
  prizes: string[];
  organizer: string;
  coverImage: string;
  participantCount: number;
}

// Mock data for competitions
export const allCompetitions: Competition[] = [
  {
    id: "photo-1",
    title: "Global Landscape Photography Challenge",
    category: "Photography",
    description:
      "Capture the most breathtaking landscapes from around the world.",
    deadline: new Date("2024-08-15"),
    prizes: ["$5000 Grand Prize", "$1000 Runner-up", "$500 Third Place"],
    organizer: "World Photography Association",
    coverImage: "/api/placeholder/400/300",
    participantCount: 248,
  },
  {
    id: "video-1",
    title: "Urban Stories Short Film Competition",
    category: "Video",
    description:
      "Tell a compelling story about urban life in 5 minutes or less.",
    deadline: new Date("2024-09-30"),
    prizes: ["$7500 Grand Prize", "$2000 Runner-up", "$1000 Third Place"],
    organizer: "City Narratives Film Festival",
    coverImage: "/api/placeholder/400/300",
    participantCount: 172,
  },
  {
    id: "design-1",
    title: "Sustainable Design Innovation Award",
    category: "Design",
    description:
      "Create design solutions that address environmental challenges.",
    deadline: new Date("2024-07-22"),
    prizes: ["$10000 Grand Prize", "$3000 Runner-up", "$1500 Third Place"],
    organizer: "Green Design Institute",
    coverImage: "/api/placeholder/400/300",
    participantCount: 136,
  },
];
