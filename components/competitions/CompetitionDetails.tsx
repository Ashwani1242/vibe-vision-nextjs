"use client";

import { Competition } from "@/types/competition";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

interface CompetitionDetailsProps {
  competition: Competition;
}

export function CompetitionDetails({ competition }: CompetitionDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="overflow-hidden">
        <div className="aspect-video relative">
          <img
            src={competition.image}
            alt={competition.title}
            className="object-cover w-full h-full"
          />
          <Badge className="absolute top-4 left-4">{competition.category}</Badge>
        </div>
        
        <div className="p-6 lg:p-8">
          <div className="flex items-center gap-4 mb-6">
            <Trophy className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">{competition.title}</h1>
              <p className="text-muted-foreground">{competition.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Prize Pool</p>
                  <p className="font-bold">{competition.prize}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-bold">{formatDate(competition.endDate)}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p className="font-bold">{competition.participants}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Rules</h2>
              <ul className="space-y-2">
                {competition.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {competition.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button size="lg" className="w-full" disabled={competition.status === 'ended'}>
            {competition.status === 'upcoming' ? 'Register Now' :
             competition.status === 'active' ? 'Submit Entry' :
             'Competition Ended'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}