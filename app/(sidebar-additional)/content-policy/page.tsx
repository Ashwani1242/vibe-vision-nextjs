import { Layout } from "@/components/layout/layout";
import { LegalDocument } from "@/components/legal/legal-document";
import { contentPolicy } from "@/lib/data/legal";

export default function ContentPolicyPage() {
  return (
    <Layout>
      <LegalDocument title="Content Policy" sections={contentPolicy} />
    </Layout>
  );
}
