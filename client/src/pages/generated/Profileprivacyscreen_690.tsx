// AUTO-GENERATED DRAFT SCREEN: ProfilePrivacyScreen
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

// Mock tRPC hook for fetching and updating privacy settings
const usePrivacySettings = () => {
  const [settings, setSettings] = useState({
    showProfile: true,
    allowMessages: false,
    publicActivity: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      try {
        // In a real app, fetch from tRPC
        // const data = await trpc.privacy.getSettings.useQuery();
        setSettings({
          showProfile: true,
          allowMessages: false,
          publicActivity: true,
        });
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load privacy settings.');
        setIsLoading(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const updateSetting = async (key: keyof typeof settings, value: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, use tRPC mutation
      // await trpc.privacy.updateSetting.useMutation({ key, value });
      setSettings((prev) => ({ ...prev, [key]: value }));
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(`Failed to update ${key}.`);
      setIsLoading(false);
      return false;
    }
  };

  return { settings, isLoading, error, updateSetting };
};

const ProfilePrivacyScreen: React.FC = () => {
  const { toast } = useToast();
  const { settings, isLoading, error, updateSetting } = usePrivacySettings();

  const handleToggle = async (key: keyof typeof settings, checked: boolean) => {
    const success = await updateSetting(key, checked);
    if (success) {
      toast({
        title: 'Settings Updated',
        description: `Your privacy setting for ${key} has been updated.`, 
      });
    } else {
      toast({
        title: 'Update Failed',
        description: error || 'Could not update setting.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading privacy settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg dark:bg-gray-900 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold dark:text-white">Profile Privacy</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Manage who can see your profile and interact with you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="show-profile" className="text-base dark:text-gray-200">
              Show my profile to everyone
            </Label>
            <Switch
              id="show-profile"
              checked={settings.showProfile}
              onCheckedChange={(checked) => handleToggle('showProfile', checked)}
              aria-label="Toggle visibility of your profile"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="allow-messages" className="text-base dark:text-gray-200">
              Allow direct messages from other users
            </Label>
            <Switch
              id="allow-messages"
              checked={settings.allowMessages}
              onCheckedChange={(checked) => handleToggle('allowMessages', checked)}
              aria-label="Toggle allowing direct messages"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="public-activity" className="text-base dark:text-gray-200">
              Make my activity public
            </Label>
            <Switch
              id="public-activity"
              checked={settings.publicActivity}
              onCheckedChange={(checked) => handleToggle('publicActivity', checked)}
              aria-label="Toggle public visibility of your activity"
            />
          </div>

          <Button className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePrivacyScreen;
