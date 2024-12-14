"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  // Creators Section
  {
    question: "How do I monetize my content on VibeVision?",
    answer: "VibeVision offers multiple monetization paths including sponsored content, premium subscriptions, direct audience support, and revenue sharing. Creators can unlock these features by reaching specific engagement milestones and maintaining high-quality content.",
    category: "Creators"
  },
  {
    question: "What are the requirements to become a monetized creator?",
    answer: "To become a monetized creator, you need to: 1) Have at least 500 active followers, 2) Consistently post high-quality content, 3) Maintain a positive community rating, and 4) Engage with your audience regularly.",
    category: "Creators"
  },
  {
    question: "How often can I expect payouts?",
    answer: "Payouts are processed monthly. Once you reach the minimum withdrawal threshold of $50, you can request a payout via PayPal, bank transfer, or cryptocurrency.",
    category: "Creators"
  },

  // Content Section
  {
    question: "What types of content are supported?",
    answer: "We support diverse creative expressions including music creation, comedy performances, tutorials, live streams, podcasts, collaborative projects, and interactive workshops. Our platform is designed to be versatile and inclusive.",
    category: "Content"
  },
  {
    question: "Are there content guidelines I should follow?",
    answer: "Yes, we have comprehensive content guidelines. Content must be original, respectful, and appropriate. We prohibit hate speech, explicit content, and copyright infringement. Creators are encouraged to review our full Community Standards document.",
    category: "Content"
  },
  {
    question: "Can I collaborate with other creators?",
    answer: "Absolutely! VibeVision has a built-in collaboration feature that allows you to connect with creators, propose joint projects, and co-create content across different domains like music and comedy.",
    category: "Content"
  },

  // Technology Section
  {
    question: "How does the AI-powered creation tool work?",
    answer: "Our AI assists creators by providing real-time feedback, suggesting improvements, generating backing tracks, helping with comedic timing, and offering composition recommendations. It learns from your style and provides personalized suggestions.",
    category: "Technology"
  },
  {
    question: "Is the AI tool free to use?",
    answer: "Basic AI features are included with all accounts. Advanced AI capabilities like detailed music composition assistance and comedy script optimization are available in our Pro and Enterprise plans.",
    category: "Technology"
  },
  {
    question: "How accurate is the AI feedback?",
    answer: "Our AI is trained on millions of successful content pieces and uses advanced machine learning algorithms. While it provides valuable insights, it's designed to augment human creativity, not replace it.",
    category: "Technology"
  },

  // Community Section
  {
    question: "Are there competitions I can join?",
    answer: "VibeVision hosts monthly competitions in music, comedy, and emerging content categories. Prizes include cash rewards, platform promotion, professional mentorship, and exclusive collaboration opportunities.",
    category: "Community"
  },
  {
    question: "How can I network with other creators?",
    answer: "We offer multiple networking opportunities: 1) Community forums, 2) Live virtual meetups, 3) Collaboration matching system, 4) Regional creator groups, and 5) Annual VibeVision Creator Conference.",
    category: "Community"
  },
  {
    question: "What support is available for new creators?",
    answer: "New creators receive: 1) Comprehensive onboarding tutorials, 2) Personalized AI-driven growth recommendations, 3) Bi-weekly webinars, 4) Dedicated creator support team, and 5) Resource library with expert insights.",
    category: "Community"
  },

  // Platform Settings
  {
    question: "How do I customize my creator profile?",
    answer: "You can customize your profile by adding a profile picture, banner, bio, linking social media, showcasing your best content, and setting up custom tags that represent your creative niche.",
    category: "Platform Settings"
  },
  {
    question: "Can I manage my privacy settings?",
    answer: "Yes, VibeVision offers granular privacy controls. You can set content visibility, control audience interactions, manage data sharing preferences, and customize notification settings.",
    category: "Platform Settings"
  }
];

export function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const categories = [...new Set(faqs.map(faq => faq.category))];
  const filteredFAQs = selectedCategory 
    ? faqs.filter(faq => faq.category === selectedCategory)
    : faqs;

  // Paginate to show only 5 FAQs at a time
  const itemsPerPage = 5;
  const paginatedFAQs = filteredFAQs.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(filteredFAQs.length / itemsPerPage);

  return (
    <Card className="max-w-4xl mx-auto my-12 shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 flex items-center justify-center">
          <HelpCircle className="mr-3 h-8 w-8" /> 
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Category Filters */}
        <div className="flex justify-center space-x-2 mb-6 flex-wrap">
          <Button 
            variant={selectedCategory === null ? "default" : "secondary"}
            onClick={() => {
              setSelectedCategory(null);
              setCurrentPage(0);
            }}
            className="m-1"
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(0);
              }}
              className="m-1"
            >
              {category}
            </Button>
          ))}
        </div>
  
        <Accordion type="single" collapsible className="space-y-4">
          <AnimatePresence>
            {paginatedFAQs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="border rounded-lg px-4 bg-background/60 backdrop-blur-sm border-primary/20"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </Accordion>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-2">
          <Button 
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button 
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}