"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronRight, Mail, User, MapPin, AppleIcon, ShieldCheck, Smartphone, RotateCcw, Trash2 } from "lucide-react";
import { Google } from "@/components/ui/icons";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AccountSettingsPage() {
    const [email, setEmail] = useState("johndoe@example.com");
    const [tempEmail, setTempEmail] = useState("johndoe@example.com");
    const [gender, setGender] = useState("Male");
    const [tempGender, setTempGender] = useState("Male");
    const [useLocation, setUseLocation] = useState(true);
    const [isGoogleConnected, setIsGoogleConnected] = useState(false);
    const [isAppleConnected, setIsAppleConnected] = useState(false);
    const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
    const [devices, setDevices] = useState([
        { id: 1, name: "iPhone 13", lastActive: "2 days ago" },
        { id: 2, name: "MacBook Pro", lastActive: "1 hour ago" }
    ]);

    const handleEmailSave = () => {
        setEmail(tempEmail);
    };

    const handleGenderSave = () => {
        setGender(tempGender);
    };

    const toggleGoogleConnection = () => {
        setIsGoogleConnected(!isGoogleConnected);
    };

    const toggleAppleConnection = () => {
        setIsAppleConnected(!isAppleConnected);
    };

    const toggleTwoFactor = () => {
        setIsTwoFactorEnabled(!isTwoFactorEnabled);
    };

    const removeDevice = (id: number) => {
        setDevices(devices.filter(device => device.id !== id));
    };

    return (
        <div className="space-y-6">
            <section>
                <h2 className="text-2xl font-semibold mb-4">General</h2>
                <Card className="bg-zinc-500/50 border border-zinc-500/50">
                    <div className="divide-y">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-500/20 transition-colors">
                                    <div className="space-y-0.5 flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <Label className="text-base">Email address</Label>
                                            <div className="text-sm text-muted-foreground">{email}</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Change Email Address</DialogTitle>
                                </DialogHeader>
                                <Input 
                                    value={tempEmail}
                                    onChange={(e) => setTempEmail(e.target.value)}
                                    placeholder="Enter new email address"
                                    type="email"
                                />
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setTempEmail(email)}>Cancel</Button>
                                    <Button onClick={handleEmailSave}>Save</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-500/20 transition-colors">
                                    <div className="space-y-0.5 flex items-center gap-3">
                                        <User className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <Label className="text-base">Gender</Label>
                                            <div className="text-sm text-muted-foreground">{gender}</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Select Gender</DialogTitle>
                                </DialogHeader>
                                <Select 
                                    value={tempGender}
                                    onValueChange={setTempGender}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Non-Binary">Non-Binary</SelectItem>
                                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                    </SelectContent>
                                </Select>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setTempGender(gender)}>Cancel</Button>
                                    <Button onClick={handleGenderSave}>Save</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <div className="flex items-center justify-between p-4">
                            <div className="space-y-0.5 flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <Label className="text-base">Location customization</Label>
                                    <div className="text-sm text-muted-foreground">
                                        Use approximate location (based on IP)
                                    </div>
                                </div>
                            </div>
                            <Switch
                                checked={useLocation}
                                onCheckedChange={setUseLocation}
                            />
                        </div>
                    </div>
                </Card>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Devices</h2>
                <Card className="bg-zinc-500/50 border border-zinc-500/50">
                    <div className="divide-y">
                        {devices.map((device) => (
                            <div key={device.id} className="flex items-center justify-between p-4">
                                <div className="space-y-0.5 flex items-center gap-3">
                                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <Label className="text-base">{device.name}</Label>
                                        <div className="text-sm text-muted-foreground">
                                            Last active: {device.lastActive}
                                        </div>
                                    </div>
                                </div>
                                <Button 
                                    variant="destructive" 
                                    size="sm" 
                                    onClick={() => removeDevice(device.id)}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>
                </Card>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Account Authorization</h2>
                <Card className="bg-zinc-500/50 border border-zinc-500/50">
                    <div className="divide-y">
                        <div className="flex items-center justify-between p-4">
                            <div className="space-y-0.5 flex items-center gap-3">
                                <Google className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <Label className="text-base">Google</Label>
                                    <div className="text-sm text-muted-foreground">
                                        Connect to log in with your Google account
                                    </div>
                                </div>
                            </div>
                            <Button 
                                variant={isGoogleConnected ? "destructive" : "outline"}
                                onClick={toggleGoogleConnection}
                            >
                                {isGoogleConnected ? "Disconnect" : "Connect"}
                            </Button>
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div className="space-y-0.5 flex items-center gap-3">
                                <AppleIcon className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <Label className="text-base">Apple</Label>
                                    <div className="text-sm text-muted-foreground">
                                        Connect to log in with your Apple account
                                    </div>
                                </div>
                            </div>
                            <Button 
                                variant={isAppleConnected ? "destructive" : "outline"}
                                onClick={toggleAppleConnection}
                            >
                                {isAppleConnected ? "Disconnect" : "Connect"}
                            </Button>
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div className="space-y-0.5 flex items-center gap-3">
                                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <Label className="text-base">Two-factor authentication</Label>
                                    <div className="text-sm text-muted-foreground">
                                        Add an extra layer of security to your account
                                    </div>
                                </div>
                            </div>
                            <Button 
                                variant={isTwoFactorEnabled ? "destructive" : "outline"}
                                onClick={toggleTwoFactor}
                            >
                                {isTwoFactorEnabled ? "Disable" : "Enable"}
                            </Button>
                        </div>
                    </div>
                </Card>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Reset & Delete Account</h2>
                <Card className="bg-zinc-500/50 border border-zinc-500/50">
                    <div className="divide-y">
                        <div className="flex items-center justify-between p-4">
                            <div className="space-y-0.5 flex items-center gap-3">
                                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <Label className="text-base">Reset Account</Label>
                                    <div className="text-sm text-muted-foreground">
                                        Reset your account settings to default
                                    </div>
                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Reset</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Reset Account</DialogTitle>
                                        <DialogDescription>
                                            This will reset all your account settings to default. Are you sure?
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Alert variant="destructive">
                                        <Trash2 className="h-4 w-4" />
                                        <AlertTitle>Warning</AlertTitle>
                                        <AlertDescription>
                                            This action cannot be undone. All your current settings will be lost.
                                        </AlertDescription>
                                    </Alert>
                                    <DialogFooter>
                                        <Button variant="outline">Cancel</Button>
                                        <Button variant="destructive">Reset Account</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div className="space-y-0.5 flex items-center gap-3">
                                <Trash2 className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <Label className="text-base">Delete Account</Label>
                                    <div className="text-sm text-muted-foreground">
                                        Permanently delete your account and data
                                    </div>
                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="destructive">Delete</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Delete Account</DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to delete your account? This action cannot be undone.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Alert variant="destructive">
                                        <Trash2 className="h-4 w-4" />
                                        <AlertTitle>Permanent Deletion</AlertTitle>
                                        <AlertDescription>
                                            All your data, settings, and account information will be permanently deleted.
                                        </AlertDescription>
                                    </Alert>
                                    <DialogFooter>
                                        <Button variant="outline">Cancel</Button>
                                        <Button variant="destructive">Delete Account</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </Card>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Subscriptions</h2>
                <Card className="bg-zinc-500/50 border border-zinc-500/50">
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Get Premium</Label>
                                <div className="text-sm text-muted-foreground">
                                    Unlock exclusive features and benefits
                                </div>
                            </div>
                            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </Card>
            </section>
        </div>
    );
}