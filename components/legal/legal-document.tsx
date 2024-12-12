"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/page-header";
import type { LegalSection } from "@/types/legal";

interface LegalDocumentProps {
  title: string;
  sections: LegalSection[];
}

export function LegalDocument({ title, sections }: LegalDocumentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title={title} />
      <motion.div 
        className="max-w-3xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {sections.map((section, index) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="prose prose-gray max-w-none"
          >
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            {section.content.map((paragraph, pIndex) => (
              <p key={pIndex} className="text-muted-foreground mb-4">
                {paragraph}
              </p>
            ))}
          </motion.section>
        ))}
      </motion.div>
    </div>
  );
}