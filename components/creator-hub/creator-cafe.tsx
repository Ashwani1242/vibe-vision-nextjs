"use client";

import { motion } from "framer-motion";
import { MessageSquare, Users, Coffee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function CreatorCafe() {
  const features = [
    {
      icon: MessageSquare,
      title: "Live Discussions",
      description: "Join real-time conversations with fellow creators"
    },
    {
      icon: Users,
      title: "Networking Events",
      description: "Connect with creators in your field"
    },
    {
      icon: Coffee,
      title: "Creative Workshops",
      description: "Learn new skills from industry experts"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Creator Café</h2>
          <p className="text-muted-foreground">Your daily dose of inspiration and connection</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}