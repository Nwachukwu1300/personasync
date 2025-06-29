'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { Settings, Bell, Shield, Palette, Globe, Database } from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Mock settings state
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      weekly: true,
      responses: true
    },
    privacy: {
      dataSharing: 'anonymous',
      publicProfile: true
    },
    appearance: {
      theme: 'system',
      density: 'comfortable'
    },
    language: 'en',
    dataRetention: '90'
  });

  // Handle settings update
  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Settings Updated",
        description: "Your preferences have been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Settings</h1>

        {/* Notifications */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="email"
                checked={settings.notifications.email}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, email: checked as boolean }
                  })
                }
              />
              <Label htmlFor="email">Email notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="push"
                checked={settings.notifications.push}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, push: checked as boolean }
                  })
                }
              />
              <Label htmlFor="push">Push notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="weekly"
                checked={settings.notifications.weekly}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, weekly: checked as boolean }
                  })
                }
              />
              <Label htmlFor="weekly">Weekly digest</Label>
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <CardTitle>Privacy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Data Sharing</Label>
              <RadioGroup
                value={settings.privacy.dataSharing}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, dataSharing: value }
                  })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="anonymous" id="anonymous" />
                  <Label htmlFor="anonymous">Anonymous</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="limited" id="limited" />
                  <Label htmlFor="limited">Limited</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full">Full</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              <CardTitle>Appearance</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select
                value={settings.appearance.theme}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    appearance: { ...settings.appearance, theme: value }
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <CardTitle>Language</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Display Language</Label>
              <Select
                value={settings.language}
                onValueChange={(value) =>
                  setSettings({ ...settings, language: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              <CardTitle>Data Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Data Retention (days)</Label>
              <Select
                value={settings.dataRetention}
                onValueChange={(value) =>
                  setSettings({ ...settings, dataRetention: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
} 