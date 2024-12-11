'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { SettingsSection } from '@/components/settings/section';
import { SectionHeader } from '@/components/settings/section-header';
import { SettingsSwitchItem } from '@/components/settings/switch-item';
import { SettingsDialog } from '@/components/settings/dialog';
import { LanguageSelector } from '@/components/settings/language-selector';
import { Button } from '@/components/ui/button';
import { Trash2, LogOut, AlertCircle, Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function SettingsPage() {
  // Original state
  const [originalState, setOriginalState] = useState({
    notifications: true,
    language: 'en',
    privacyMode: false,
    theme: 'system' // Assuming a default theme
  });

  // Current state
  const [notifications, setNotifications] = useState(originalState.notifications);
  const [language, setLanguage] = useState(originalState.language);
  const [privacyMode, setPrivacyMode] = useState(originalState.privacyMode);
  const [theme, setTheme] = useState(originalState.theme);

  // Track changes
  const [hasChanges, setHasChanges] = useState(true);

  // Effect to detect changes
  useEffect(() => {
    const changes = 
      notifications !== originalState.notifications ||
      language !== originalState.language ||
      privacyMode !== originalState.privacyMode ||
      theme !== originalState.theme;
    
    setHasChanges(changes);
  }, [notifications, language, privacyMode, theme, originalState]);

  // Save changes handler
  const handleSaveChanges = useCallback(() => {
    // Update original state with current state
    setOriginalState({
      notifications,
      language,
      privacyMode,
      theme
    });

    // Perform actual save logic (e.g., API calls)
    toast({
      title: "Settings Saved",
      description: "Your changes have been successfully saved.",
      variant: "default"
    });

    setHasChanges(false);
  }, [notifications, language, privacyMode, theme]);

  // Cancel changes handler
  const handleCancelChanges = useCallback(() => {
    // Revert to original state
    setNotifications(originalState.notifications);
    setLanguage(originalState.language);
    setPrivacyMode(originalState.privacyMode);
    setTheme(originalState.theme);

    toast({
      title: "Changes Canceled",
      description: "All changes have been discarded.",
      variant: "default"
    });
  }, [originalState]);

  // Language change handler
  const handleLanguageChange = useCallback((newLanguage: string) => {
    setLanguage(newLanguage);
  }, []);

  // Theme change handler
  const handleThemeChange = useCallback((newTheme: string) => {
    setTheme(newTheme);
  }, []);

  // Logout handler
  const handleLogout = useCallback(() => {
    // Implement actual logout logic here
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "destructive"
    });
  }, []);

  // Account deletion handler
  const handleAccountDeletion = useCallback(() => {
    // Implement account deletion logic here
    toast({
      title: "Account Deletion",
      description: "Your account deletion request is being processed.",
      variant: "destructive"
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Save and Cancel Buttons */}
      {hasChanges && (
        <div className="fixed top-4 right-4 z-50 flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleCancelChanges}
            className="bg-white shadow-md"
          >
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button 
            onClick={handleSaveChanges}
            className="bg-purple-600 text-white hover:bg-purple-700 shadow-md"
          >
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      )}

      {/* Account Management Section */}
      <SettingsSection 
        title="Account" 
        description="Manage your account settings"
        className="bg-purple-50/10 border border-purple-100 rounded-lg p-4"
      >
        <SettingsDialog 
          title="Language Preferences" 
          description="Choose your preferred language"
          triggerLabel="Language"
        >
          <div className="p-4">
            <LanguageSelector 
              value={language}
              onValueChange={handleLanguageChange}
              label="Select your language"
            />
          </div>
        </SettingsDialog>

        <SettingsDialog 
          title="Notification Settings" 
          description="Manage how you receive updates"
          triggerLabel="Notifications"
        >
          <div className="space-y-4 p-4">
            <SettingsSwitchItem 
              label="Enable Notifications" 
              description="Receive updates and alerts"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
        </SettingsDialog>

        <SettingsDialog 
          title="Privacy Controls" 
          description="Protect your personal information"
          triggerLabel="Privacy"
        >
          <div className="space-y-4 p-4">
            <SettingsSwitchItem 
              label="Privacy Mode" 
              description="Hide sensitive information"
              checked={privacyMode}
              onCheckedChange={setPrivacyMode}
            />
          </div>
        </SettingsDialog>
      </SettingsSection>

      {/* Danger Zone Section */}
      <SettingsSection 
        title="Danger Zone" 
        description="Proceed with caution"
        className="bg-red-50/20 border border-red-200 rounded-lg p-4"
      >
        <SettingsDialog 
          title="Delete Account" 
          description="Permanently remove your account and data"
          triggerLabel="Delete Account"
        >
          <div className="p-4 space-y-4">
            <p className="text-destructive flex items-center">
              <AlertCircle className="mr-2 text-red-600" />
              Warning: This action cannot be undone. All your data will be permanently deleted.
            </p>
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={handleAccountDeletion}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Permanently Delete Account
            </Button>
          </div>
        </SettingsDialog>

        <SettingsDialog 
          title="Logout" 
          description="Sign out of your account on this device"
          triggerLabel="Logout"
        >
          <div className="p-4 space-y-4">
            <p className="flex items-center">
              <AlertCircle className="mr-2 text-purple-600" />
              Are you sure you want to log out?
            </p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Confirm Logout
            </Button>
          </div>
        </SettingsDialog>
      </SettingsSection>
    </div>
  );
}

export default SettingsPage;