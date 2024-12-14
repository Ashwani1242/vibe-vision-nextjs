"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Music, 
  Laugh, 
  Video, 
  Settings, 
  Award, 
  Users 
} from "lucide-react";

export const helpCategories = [
  {
    title: "Music Creation",
    description: "Tools and resources for musicians and producers",
    icon: Music,
    color: "text-blue-400"
  },
  {
    title: "Comedy Tools",
    description: "Stand-up and comedy content creation",
    icon: Laugh,
    color: "text-green-400"
  },
  {
    title: "Content Strategy",
    description: "Marketing and growth strategies",
    icon: Video,
    color: "text-purple-400"
  },
  {
    title: "Platform Settings",
    description: "Account and platform configuration",
    icon: Settings,
    color: "text-orange-400"
  },
  {
    title: "Competitions",
    description: "Ongoing and upcoming creator challenges",
    icon: Award,
    color: "text-red-400"
  },
  {
    title: "Community",
    description: "Networking and collaboration spaces",
    icon: Users,
    color: "text-indigo-400"
  }
];

export function HelpCategories() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
        Browse Help Categories
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {helpCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 300
            }}
          >
            <Card className="h-full hover:shadow-2xl transition-all group bg-background/60 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <category.icon 
                  className={`w-10 h-10 mb-4 ${category.color} group-hover:rotate-6 transition-transform`} 
                />
                <CardTitle className="group-hover:text-primary transition-colors">
                  {category.title}
                </CardTitle>
                <CardDescription>
                  {category.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}