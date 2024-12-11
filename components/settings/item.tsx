"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronRight } from "lucide-react";

interface SettingsItemProps {
  label: string;
  description?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function SettingsItem({ 
  label, 
  description, 
  children, 
  onClick 
}: SettingsItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="space-y-0.5">
        <Label className="text-base">{label}</Label>
        {description && (
          <div className="text-sm text-muted-foreground">
            {description}
          </div>
        )}
      </div>
      {children || (
        <Button variant="ghost" size="icon" onClick={onClick}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}