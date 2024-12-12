"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I get started with creating content?",
    answer: "Getting started is easy! First, create your account and complete your profile. Then, explore our creation tools and tutorials. We recommend starting with our 'Beginner's Guide to Content Creation' in the Resource Library."
  },
  {
    question: "What are the requirements for participating in competitions?",
    answer: "To participate in competitions, you need to have a verified account and agree to our competition rules. Each competition has specific requirements regarding file formats, sizes, and submission guidelines."
  },
  {
    question: "How does the ranking system work?",
    answer: "Our ranking system is based on various factors including competition participation, community engagement, and content quality. Points are awarded for winning competitions, receiving likes, and contributing to discussions."
  },
  {
    question: "Can I monetize my content?",
    answer: "Yes! Once you reach certain milestones in your creator journey, you'll unlock monetization features. This includes sponsored content opportunities, premium subscriptions, and direct support from your audience."
  }
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}