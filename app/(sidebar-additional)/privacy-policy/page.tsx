import { LegalDocument } from "@/components/legal/legal-document";
import { communityGuidelines } from "@/lib/data/legal";
import { Layout } from "@/components/layout/layout";
export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <LegalDocument title="Privacy Policy" sections={communityGuidelines} />;
    </Layout>
  );
}
