"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Twitter, Linkedin } from "lucide-react";

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    bio: "Passionate about empowering creators worldwide",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#"
    }
  },
  {
    name: "Michael Rivera",
    role: "Head of Product",
    bio: "Building tools that inspire creativity",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#"
    }
  },
  {
    name: "Emma Thompson",
    role: "Community Lead",
    bio: "Fostering meaningful connections in our creator community",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#"
    }
  }
];

export function AboutTeam() {
  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals driving our mission forward
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-4">
                    <a href={member.social.twitter} className="text-muted-foreground hover:text-primary">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href={member.social.github} className="text-muted-foreground hover:text-primary">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary">
                      <Linkedin className="w-5 h-5" />
                    </a>
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