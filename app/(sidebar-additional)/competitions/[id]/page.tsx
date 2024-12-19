import { CompetitionDetails } from "@/components/competitions/CompetitionDetails";
import { CompetitionLeaderboard } from "@/components/competitions/CompetitionLeaderboard";
import { competitions, leaderboardData } from "@/lib/data/competition-data";
import { NotFound } from "@/components/article/NotFound";
import { Layout } from "@/components/layout/layout";

interface CompetitionPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return competitions.map((competition) => ({
    id: competition.id,
  }));
}

export default function CompetitionPage({ params }: CompetitionPageProps) {
  const competition = competitions.find((c) => c.id === params.id);
  const leaderboard = leaderboardData[params.id] || [];

  if (!competition) {
    return <NotFound />;
  }

  return (
    <Layout>
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CompetitionDetails competition={competition} />
            </div>
            <div>
              <CompetitionLeaderboard entries={leaderboard} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
