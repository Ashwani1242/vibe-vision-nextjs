// Types for competition data
export interface Competition {
  id: string;
  title: string;
  description: string;
  category: 'Photography' | 'Video' | 'Design' | 'All';
  status: 'Open' | 'Closed' | 'Upcoming';
  prize: string;
  deadline: string;
  participants: number;
  coverImage?: string;
  organizerName: string;
  requirements?: string[];
  fullDescription?: string;
}

// Utility function to format date and calculate days remaining
export function formatCompetitionDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `${diffDays} days left`;
  } else if (diffDays === 0) {
    return 'Ending today';
  } else {
    return 'Closed';
  }
}