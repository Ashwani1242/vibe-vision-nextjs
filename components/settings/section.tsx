"use client";

import { cn } from "@/lib/utils";

interface SettingsSectionProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export function SettingsSection({ 
  title, 
  description,
  className,
  children 
}: SettingsSectionProps) {
  return (
    <section className={cn("space-y-6", className)}>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}