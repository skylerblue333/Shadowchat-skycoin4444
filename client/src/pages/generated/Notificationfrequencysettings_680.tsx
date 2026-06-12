// AUTO-GENERATED DRAFT SCREEN: NotificationFrequencySettings

import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup
import { toast } from 'sonner'; // Assuming a toast notification library like Sonner

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  frequency: 'realtime' | 'daily' | 'weekly';
}

const NotificationFrequencySettings: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.user.getNotificationSettings.useQuery();
  const updateSettingsMutation = trpc.user.updateNotificationSettings.useMutation();

  const [settings, setSettings] = useState<NotificationSettings>(data || {
    emailNotifications: false,
    pushNotifications: false,
    frequency: 'daily',
  });

  React.useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  if (isLoading) {
    return <div className="p-4 text-center">Loading notification settings...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Error: {error?.message || 'Failed to load settings'}</div>;
  }

  const handleSettingChange = async (key: keyof NotificationSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    try {
      await updateSettingsMutation.mutateAsync(newSettings);
      toast.success('Notification settings updated successfully!');
    } catch (err) {
      toast.error('Failed to update settings. Please try again.');
      console.error('Failed to update notification settings:', err);
      // Revert to previous settings on error
      setSettings(settings);
    }
  };

  return (
    <div className="space-y-6 p-6 dark:bg-gray-900 dark:text-gray-50">
      <h2 className="text-2xl font-bold tracking-tight">Notification Frequency</h2>
      <p className="text-gray-500 dark:text-gray-400">Manage how and when you receive notifications.</p>

      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
          <span>Email Notifications</span>
          <span className="font-normal leading-snug text-gray-500 dark:text-gray-400">
            Receive notifications via email.
          </span>
        </Label>
        <Switch
          id="email-notifications"
          checked={settings.emailNotifications}
          onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
          aria-label="Toggle email notifications"
        />
      </div>

      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
          <span>Push Notifications</span>
          <span className="font-normal leading-snug text-gray-500 dark:text-gray-400">
            Receive notifications on your device.
          </span>
        </Label>
        <Switch
          id="push-notifications"
          checked={settings.pushNotifications}
          onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
          aria-label="Toggle push notifications"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <Label htmlFor="notification-frequency">Notification Frequency</Label>
        <p className="text-gray-500 dark:text-gray-400">How often you want to receive notifications.</p>
        <Select
          value={settings.frequency}
          onValueChange={(value: 'realtime' | 'daily' | 'weekly') => handleSettingChange('frequency', value)}
          aria-label="Select notification frequency"
        >
          <SelectTrigger id="notification-frequency" className="w-[180px]">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="realtime">Real-time</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default NotificationFrequencySettings;
