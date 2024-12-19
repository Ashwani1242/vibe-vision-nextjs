import { ArticleContent } from "@/components/article/ArticleContent";
import { ArticleSidebar } from "@/components/article/ArticleSidebar";
import { NotFound } from "@/components/article/NotFound";
import { getArticleById, getArticleIds } from "@/lib/data/article";
import { Layout } from "@/components/layout/layout";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  const ids = getArticleIds();
  return ids.map((id) => ({
    id: id,
  }));
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleById(params.id);

  if (!article) {
    return <NotFound />;
  }

  return (
    <Layout>
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ArticleContent article={article} />
            </div>
            <div>
              <ArticleSidebar article={article} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}