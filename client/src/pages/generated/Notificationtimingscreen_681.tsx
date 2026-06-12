// AUTO-GENERATED DRAFT SCREEN: NotificationTimingScreen
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

const NotificationTimingScreen: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.notification.getSettings.useQuery();
  const updateSettingsMutation = trpc.notification.updateSettings.useMutation();

  const [settings, setSettings] = useState<NotificationSettings>(data || {
    emailNotifications: false,
    smsNotifications: false,
    pushNotifications: false,
  });

  React.useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    try {
      await updateSettingsMutation.mutateAsync(settings);
      toast({
        title: 'Settings saved!',
        description: 'Your notification preferences have been updated.',
      });
    } catch (err) {
      toast({
        title: 'Error saving settings',
        description: err instanceof Error ? err.message : 'An unknown error occurred.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading notification settings...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Notification Timing</h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications" className="text-lg">
            Email Notifications
          </Label>
          <Switch
            id="email-notifications"
            checked={settings.emailNotifications}
            onCheckedChange={() => handleToggle('emailNotifications')}
            aria-label="Toggle email notifications"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="sms-notifications" className="text-lg">
            SMS Notifications
          </Label>
          <Switch
            id="sms-notifications"
            checked={settings.smsNotifications}
            onCheckedChange={() => handleToggle('smsNotifications')}
            aria-label="Toggle SMS notifications"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications" className="text-lg">
            Push Notifications
          </Label>
          <Switch
            id="push-notifications"
            checked={settings.pushNotifications}
            onCheckedChange={() => handleToggle('pushNotifications')}
            aria-label="Toggle push notifications"
          />
        </div>
      </div>

      <Button onClick={handleSave} className="mt-8 w-full">
        Save Changes
      </Button>
    </div>
  );
};

export default NotificationTimingScreen;
