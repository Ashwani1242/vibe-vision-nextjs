export interface Competition {
  id: number;
  title: string;
  description: string;
  category: string;
  status: "Active" | "Coming Soon" | "Ended";
  prize: string;
  deadline: string;
  participants: number;
  rules: string[];
  requirements: string[];
}