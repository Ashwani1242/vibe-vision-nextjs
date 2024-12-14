"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, ThumbsUp } from "lucide-react";
import { liveDiscussions } from "@/lib/data/cafe";

export function CafeDiscussions() {
  return (
    <div className="space-y-4">
      {liveDiscussions.map((discussion, index) => (
        <motion.div
          key={discussion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-start gap-4">
              <Avatar>
                <AvatarImage src={discussion.host.avatar} />
                <AvatarFallback>{discussion.host.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{discussion.title}</h3>
                  <Badge variant={discussion.isLive ? "default" : "secondary"}>
                    {discussion.isLive ? "Live Now" : "Starting Soon"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Hosted by {discussion.host.name}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {discussion.description}
              </p>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{discussion.participants}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{discussion.messages}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{discussion.likes}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}