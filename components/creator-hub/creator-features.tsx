"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Palette, 
  Trophy, 
  Users, 
  Zap,
  TrendingUp,
  Shield
} from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Palette,
    title: "Creative Tools",
    description: "Access professional-grade tools for content creation"
  },
  {
    icon: Trophy,
    title: "Competitions",
    description: "Participate in challenges and win exciting prizes"
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with fellow creators and grow together"
  },
  {
    icon: Zap,
    title: "Fast Growth",
    description: "Accelerate your journey with targeted resources"
  },
  {
    icon: TrendingUp,
    title: "Analytics",
    description: "Track your performance with detailed insights"
  },
  {
    icon: Shield,
    title: "Creator Support",
    description: "Get dedicated support for your creative journey"
  }
];

export function CreatorFeatures() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, grow, and monetize your content
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-lg mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}