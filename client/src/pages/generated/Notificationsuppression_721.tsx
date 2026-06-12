// AUTO-GENERATED DRAFT SCREEN: NotificationSuppression
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Switch } from './components/ui/switch'; // shadcn/ui Switch
import { Label } from './components/ui/label'; // shadcn/ui Label
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'; // shadcn/ui Card
import { toast } from './components/ui/use-toast'; // shadcn/ui Toast

interface NotificationSettings {
  suppressAll: boolean;
  suppressMarketing: boolean;
  suppressSystem: boolean;
}

const NotificationSuppression: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings | null>(null);

  // Fetch notification settings
  const { data, isLoading, isError, error } = trpc.notification.getSettings.useQuery();

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  // Mutation to update notification settings
  const updateSettingsMutation = trpc.notification.updateSettings.useMutation({
    onSuccess: () => {
      toast({
        title: 'Settings updated!',
        description: 'Your notification preferences have been saved.',
      });
    },
    onError: (err) => {
      toast({
        title: 'Update failed.',
        description: `Error: ${err.message}`,
        variant: 'destructive',
      });
    },
  });

  const handleToggle = (key: keyof NotificationSettings) => {
    if (settings) {
      const newSettings = { ...settings, [key]: !settings[key] };
      setSettings(newSettings);
      updateSettingsMutation.mutate(newSettings);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading notification settings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
            <CardDescription>Failed to load notification settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">{error?.message || 'An unknown error occurred.'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!settings) {
    return null; // Or a placeholder if settings are null after loading
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg dark:bg-gray-900 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold dark:text-white">Notification Suppression</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Manage your email and in-app notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="suppress-all" className="text-base dark:text-white">
              Suppress All Notifications
            </Label>
            <Switch
              id="suppress-all"
              checked={settings.suppressAll}
              onCheckedChange={() => handleToggle('suppressAll')}
              aria-label="Toggle all notifications suppression"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="suppress-marketing" className="text-base dark:text-white">
              Suppress Marketing Notifications
            </Label>
            <Switch
              id="suppress-marketing"
              checked={settings.suppressMarketing}
              onCheckedChange={() => handleToggle('suppressMarketing')}
              disabled={settings.suppressAll} // Disable if all are suppressed
              aria-label="Toggle marketing notifications suppression"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="suppress-system" className="text-base dark:text-white">
              Suppress System Notifications
            </Label>
            <Switch
              id="suppress-system"
              checked={settings.suppressSystem}
              onCheckedChange={() => handleToggle('suppressSystem')}
              disabled={settings.suppressAll} // Disable if all are suppressed
              aria-label="Toggle system notifications suppression"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSuppression;
