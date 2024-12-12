import { BookOpen, HelpCircle, Users, FileText, Shield, Mail } from "lucide-react";

export const resourceCategories = [
  {
    title: "Help Center",
    description: "Find answers to common questions and learn how to use our platform",
    icon: HelpCircle,
    href: "/help"
  },
  {
    title: "Blog",
    description: "Stay updated with the latest news, tips, and community stories",
    icon: BookOpen,
    href: "/blog"
  },
  {
    title: "Community Guidelines",
    description: "Learn about our community standards and best practices",
    icon: Users,
    href: "/community-guidelines"
  },
  {
    title: "Content Policy",
    description: "Understand our content rules and posting guidelines",
    icon: FileText,
    href: "/content-policy"
  },
  {
    title: "Privacy & Terms",
    description: "Review our privacy policy and terms of service",
    icon: Shield,
    href: "/privacy-policy"
  },
  {
    title: "Contact Support",
    description: "Get in touch with our support team for assistance",
    icon: Mail,
    href: "/contact"
  }
];