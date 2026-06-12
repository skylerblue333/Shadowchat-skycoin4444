// AUTO-GENERATED DRAFT SCREEN: NotificationPreferences

import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming trpc client is configured

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

const NotificationPreferences: React.FC = () => {
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
    setSettings(prevSettings => {
      const newSettings = { ...prevSettings, [key]: !prevSettings[key] };
      updateSettingsMutation.mutate(newSettings);
      return newSettings;
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading preferences...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error?.message}</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Notification Preferences</CardTitle>
          <CardDescription>Manage how you receive notifications from SKYCOIN4444.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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

          {updateSettingsMutation.isPending && (
            <p className="text-sm text-gray-500 dark:text-gray-400">Saving changes...</p>
          )}
          {updateSettingsMutation.isError && (
            <p className="text-sm text-red-500">Failed to save: {updateSettingsMutation.error?.message}</p>
          )}
          {updateSettingsMutation.isSuccess && (
            <p className="text-sm text-green-500">Preferences saved!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationPreferences;
