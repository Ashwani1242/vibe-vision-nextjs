"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/common/page-header";

export function CookieSettings() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false
  });

  const handleSave = () => {
    // Save cookie preferences
    console.log("Saving preferences:", preferences);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Cookie Settings"
        description="Manage your cookie preferences and privacy settings"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Card>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Necessary Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Required for the website to function properly
                  </p>
                </div>
                <Switch
                  checked={preferences.necessary}
                  disabled
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Functional Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable personalized features and preferences
                  </p>
                </div>
                <Switch
                  checked={preferences.functional}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({ ...prev, functional: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Analytics Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Help us improve by collecting anonymous usage data
                  </p>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({ ...prev, analytics: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Marketing Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable personalized advertisements
                  </p>
                </div>
                <Switch
                  checked={preferences.marketing}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({ ...prev, marketing: checked }))
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setPreferences({
                  necessary: true,
                  functional: false,
                  analytics: false,
                  marketing: false
                })}
              >
                Reset to Defaults
              </Button>
              <Button onClick={handleSave}>
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}