"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { upcomingEvents } from "@/lib/data/cafe";

export function CafeEvents() {
  return (
    <div className="space-y-4">
      {upcomingEvents.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>
              <Button size="sm" className="w-full">RSVP</Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}