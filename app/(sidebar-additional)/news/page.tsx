"use client";

import { Layout } from "@/components/layout/layout";
import { NewsGrid } from "@/components/news/news-grid";
import { PageHeader } from "@/components/common/page-header";

export default function NewsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="News & Updates"
        description="Stay informed with the latest from our community"
      />
        <NewsGrid />
      </div>
    </Layout>
  );
}
