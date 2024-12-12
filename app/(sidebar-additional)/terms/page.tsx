import { LegalDocument } from "@/components/legal/legal-document";
import { termsOfService } from "@/lib/data/terms";
import { Layout } from "@/components/layout/layout";

export default function TermsPage() {
  return (
    <Layout>
      <LegalDocument title="Terms of Service" sections={termsOfService} />;
    </Layout>
  );
}
