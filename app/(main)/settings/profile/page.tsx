"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, Edit, ImagePlus, Link, Shield, User, Trash2, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function ProfileSettingsPage() {
  const [showCommunities, setShowCommunities] = useState(true);
  const [isNSFW, setIsNSFW] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [tempDisplayName, setTempDisplayName] = useState("");
  const [aboutDescription, setAboutDescription] = useState("");
  const [tempAboutDescription, setTempAboutDescription] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<{platform: string, url: string}[]>([]);
  const [tempSocialLinks, setTempSocialLinks] = useState<{platform: string, url: string}[]>([]);

  // Constants for image validation
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  const validateImageFile = (file: File): boolean => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setImageUploadError("Image size must be less than 5MB");
      return false;
    }

    // Check file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setImageUploadError("Only JPEG, PNG, GIF, and WebP images are allowed");
      return false;
    }

    // Clear any previous errors
    setImageUploadError(null);
    return true;
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // Validate the file first
      if (!validateImageFile(file)) {
        // Reset the file input
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // Create an image to validate dimensions
        const img = new Image();
        img.onload = () => {
          // Optional: Add dimension checks if needed
          // For example, enforce a minimum avatar size
          if (img.width < 100 || img.height < 100) {
            setImageUploadError("Image must be at least 100x100 pixels");
            event.target.value = '';
            return;
          }

          // If all validations pass, set the avatar
          setAvatar(reader.result as string);
          setImageUploadError(null);
        };
        img.src = reader.result as string;
      };

      reader.onerror = () => {
        setImageUploadError("Error reading file. Please try again.");
        event.target.value = '';
      };

      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // Validate the file first
      if (!validateImageFile(file)) {
        // Reset the file input
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // Create an image to validate dimensions
        const img = new Image();
        img.onload = () => {
          // Optional: Add dimension checks for banner
          // For example, enforce a minimum banner size and aspect ratio
          const aspectRatio = img.width / img.height;
          if (img.width < 600 || aspectRatio < 3) {
            setImageUploadError("Banner must be at least 600px wide and have a wider aspect ratio");
            event.target.value = '';
            return;
          }

          // If all validations pass, set the banner
          setBanner(reader.result as string);
          setImageUploadError(null);
        };
        img.src = reader.result as string;
      };

      reader.onerror = () => {
        setImageUploadError("Error reading file. Please try again.");
        event.target.value = '';
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  const handleRemoveBanner = () => {
    setBanner(null);
  }

  const addSocialLink = () => {
    const newLinks = [...tempSocialLinks, { platform: "", url: "" }];
    setTempSocialLinks(newLinks);
  };

  const updateSocialLink = (index: number, platform: string, url: string) => {
    const newLinks = [...tempSocialLinks];
    newLinks[index] = { platform, url };
    setTempSocialLinks(newLinks);
  };

  const removeSocialLink = (index: number) => {
    const newLinks = tempSocialLinks.filter((_, i) => i !== index);
    setTempSocialLinks(newLinks);
  };

  const saveSocialLinks = () => {
    // Validate links before saving
    const validLinks = tempSocialLinks.filter(link => 
      link.platform.trim() !== "" && link.url.trim() !== ""
    );
    setSocialLinks(validLinks);
  };

  const handleDisplayNameSave = () => {
    setDisplayName(tempDisplayName);
  };

  const handleAboutDescriptionSave = () => {
    setAboutDescription(tempAboutDescription);
  };

  const resetProfileSettings = () => {
    setDisplayName("");
    setAboutDescription("");
    setAvatar(null);
    setBanner(null);
    setSocialLinks([]);
    setShowCommunities(true);
    setIsNSFW(false);
  };

  return (
    <div className="space-y-6">
      {/* Add image upload error alert if there's an error */}
      {imageUploadError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Image Upload Error</AlertTitle>
          <AlertDescription>{imageUploadError}</AlertDescription>
        </Alert>
      )}

      {/* Add sections for avatar and banner upload */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Profile Image</h2>
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="p-4 flex items-center space-x-4">
            {avatar ? (
              <div className="relative">
                <img 
                  src={avatar} 
                  alt="Profile Avatar" 
                  className="w-24 h-24 rounded-full object-cover"
                />
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute bottom-0 right-0"
                  onClick={handleRemoveAvatar}
                >
                  ✕
                </Button>
              </div>
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-500" />
              </div>
            )}
            <div>
              <input 
                type="file" 
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleAvatarUpload}
                className="hidden" 
                id="avatar-upload"
              />
              <Label 
                htmlFor="avatar-upload" 
                className="cursor-pointer flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded"
              >
                <ImagePlus className="w-4 h-4" />
                Upload Avatar
              </Label>
              <p className="text-sm text-muted-foreground mt-2">
                JPG, PNG, GIF, WebP. Max 5MB. Recommended 300x300px.
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Profile Banner</h2>
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="p-4">
            {banner ? (
              <div className="relative">
                <img 
                  src={banner} 
                  alt="Profile Banner" 
                  className="w-full h-48 object-cover rounded"
                />
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2"
                  onClick={handleRemoveBanner}
                >
                  ✕
                </Button>
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
                <ImagePlus className="w-12 h-12 text-gray-500" />
              </div>
            )}
            <div className="mt-4">
              <input 
                type="file" 
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleBannerUpload}
                className="hidden" 
                id="banner-upload"
              />
              <Label 
                htmlFor="banner-upload" 
                className="cursor-pointer flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded"
              >
                <ImagePlus className="w-4 h-4" />
                Upload Banner
              </Label>
              <p className="text-sm text-muted-foreground mt-2">
                JPG, PNG, GIF, WebP. Max 5MB. Recommended width 1200px, 3:1 aspect ratio.
              </p>
            </div>
          </div>
        </Card>
        <h2 className="text-2xl font-semibold m-4">General</h2>
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-500/20 transition-colors">
                  <div className="space-y-0.5 flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-base">Display name</Label>
                      <div className="text-sm text-muted-foreground">
                        {displayName || "Set your display name"}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Display Name</DialogTitle>
                </DialogHeader>
                <Input 
                  value={tempDisplayName}
                  onChange={(e) => setTempDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                />
                <DialogFooter>
                  <Button variant="outline" onClick={() => setTempDisplayName(displayName)}>
                    Cancel
                  </Button>
                  <Button onClick={handleDisplayNameSave}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-500/20 transition-colors">
                  <div className="space-y-0.5 flex items-center gap-3">
                    <Edit className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-base">About description</Label>
                      <div className="text-sm text-muted-foreground">
                        {aboutDescription || "Tell others about yourself"}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit About Description</DialogTitle>
                </DialogHeader>
                <Textarea
                  value={tempAboutDescription}
                  onChange={(e) => setTempAboutDescription(e.target.value)}
                  placeholder="Write a brief description about yourself"
                  rows={4}
                />
                <DialogFooter>
                  <Button variant="outline" onClick={() => setTempAboutDescription(aboutDescription)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAboutDescriptionSave}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-500/20 transition-colors">
                  <div className="space-y-0.5 flex items-center gap-3">
                    <Link className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-base">Social links</Label>
                      <div className="text-sm text-muted-foreground">
                        {socialLinks.length > 0 
                          ? `${socialLinks.length} link${socialLinks.length !== 1 ? 's' : ''} added` 
                          : "Add links to your social media profiles"}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent className="max-h-[500px] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Manage Social Links</DialogTitle>
                  <DialogDescription>
                    Add links to your social media profiles or personal websites.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {tempSocialLinks.map((link, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input 
                        placeholder="Platform (e.g., Twitter)" 
                        value={link.platform}
                        onChange={(e) => updateSocialLink(index, e.target.value, link.url)}
                        className="flex-1"
                      />
                      <Input 
                        placeholder="URL" 
                        value={link.url}
                        onChange={(e) => updateSocialLink(index, link.platform, e.target.value)}
                        className="flex-2"
                      />
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => removeSocialLink(index)}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addSocialLink}>Add Social Link</Button>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setTempSocialLinks(socialLinks)}>
                    Cancel
                  </Button>
                  <Button onClick={saveSocialLinks}>Save Links</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5 flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label className="text-base">Mark as mature (18+)</Label>
                  <div className="text-sm text-muted-foreground">
                    Label your profile as Not Safe for Work (NSFW)
                  </div>
                </div>
              </div>
              <Switch
                checked={isNSFW}
                onCheckedChange={setIsNSFW}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5 flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label className="text-base">Show active communities</Label>
                  <div className="text-sm text-muted-foreground">
                    Display communities you're most active in
                  </div>
                </div>
              </div>
              <Switch
                checked={showCommunities}
                onCheckedChange={setShowCommunities}
              />
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Advanced</h2>
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-500/20 transition-colors">
                  <div className="space-y-0.5 flex items-center gap-3">
                    <Trash2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-base">Reset Profile</Label>
                      <div className="text-sm text-muted-foreground">
                        Reset all profile settings to default
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset Profile Settings</DialogTitle>
                  <DialogDescription>
                    This will clear all your profile information and reset to default settings.
                  </DialogDescription>
                </DialogHeader>
                <Alert variant="destructive">
                  <Trash2 className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    This action cannot be undone. All your current profile settings will be cleared.
                  </AlertDescription>
                </Alert>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive" onClick={resetProfileSettings}>
                    Reset Profile
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </section>
    </div>
  );
}