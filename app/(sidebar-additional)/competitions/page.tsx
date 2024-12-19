import { CompetitionsList } from "@/components/competitions/CompetitionsList";
import { CompetitionsHeader } from "@/components/competitions/CompetitionsHeader";
import { competitions } from "@/lib/data/competition-data";
import { Layout } from "@/components/layout/layout";

export default function CompetitionsPage() {
  return (
    <Layout>
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CompetitionsHeader />
          <CompetitionsList competitions={competitions} />
        </div>
      </main>
    </Layout>
  );
}
