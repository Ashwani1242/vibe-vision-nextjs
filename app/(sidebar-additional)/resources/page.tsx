import { ResourceGrid } from "@/components/resources/resource-grid";
import { PageHeader } from "@/components/common/page-header";
import { Layout } from "@/components/layout/layout";
export default function ResourcesPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Resources"
        description="Discover helpful resources and guides to make the most of our platform"
      />
        <ResourceGrid />
      </div>
    </Layout>
  );
}
