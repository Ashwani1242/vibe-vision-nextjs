"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Chart } from "@/components/ui/chart";
import { Brain, TrendingUp } from "lucide-react";

export function AINewsAnalytics() {
  const sentimentData = [
    { name: "Positive", value: 65 },
    { name: "Neutral", value: 25 },
    { name: "Negative", value: 10 },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Brain className="h-5 w-5" />
        AI-Powered Analytics
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Sentiment Analysis</h4>
          <div className="space-y-2">
            {sentimentData.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm text-muted-foreground">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}