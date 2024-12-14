"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Sparkles, 
  Send, 
  MessageCircle, 
  HelpCircle 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Existing imports from previous components
import { HelpCategories } from "@/components/help/help-categories";
import { PopularArticles } from "@/components/help/popular-articles";
import { ArtAllyModal } from "@/components/help/ai-assistant-modal";
import { FAQSection } from "@/components/help/faq-section";

// Enhanced help center component
export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  // Search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search Initiated",
        description: `Searching for: ${searchQuery}`,
        variant: "default"
      });
      // TODO: Implement actual search functionality
    }
  };

  // Contact form submission handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // TODO: Implement actual email/message sending logic
    toast({
      title: "Message Sent",
      description: "Your message has been submitted successfully",
      variant: "default"
    });

    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  // Update contact form state
  const handleContactFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof contactForm
  ) => {
    setContactForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
          Welcome to VibeVision Help Center
        </h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative flex items-center">
          <Search className="absolute left-3 z-10 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-20 bg-background/60 backdrop-blur-sm"
          />
          <Button 
            type="submit" 
            size="sm" 
            variant="outline" 
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            Search
          </Button>
        </form>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <Button 
            variant="secondary" 
            className="flex items-center"
            onClick={() => setIsAIAssistantOpen(true)}
          >
            <Sparkles className="mr-2 h-4 w-4" /> 
            Ask AI Assistant
          </Button>
          
          {/* Contact Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <HelpCircle className="mr-2 h-6 w-6 text-primary" />
                  Contact Support
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => handleContactFormChange(e, "name")}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => handleContactFormChange(e, "email")}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) => handleContactFormChange(e, "subject")}
                    placeholder="Brief subject description"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => handleContactFormChange(e, "message")}
                    placeholder="Describe your issue or question in detail"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
      
      {/* Existing Components */}
      <HelpCategories />
      <PopularArticles />
      <FAQSection />

      {/* AI Assistant Modal */}
      <ArtAllyModal 
        isOpen={isAIAssistantOpen} 
        onClose={() => setIsAIAssistantOpen(false)} 
      />
    </div>
  );
}