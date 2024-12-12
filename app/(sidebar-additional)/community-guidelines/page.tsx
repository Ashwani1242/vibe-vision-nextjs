import { Layout } from "@/components/layout/layout";
import { LegalDocument } from "@/components/legal/legal-document";
import { communityGuidelines } from "@/lib/data/legal";

export default function CommunityGuidelinesPage() {
  return (
    <Layout>
      <LegalDocument title="Community Guidelines" sections={communityGuidelines} />
    </Layout>
  );
}
