// AUTO-GENERATED DRAFT SCREEN: SettingsNotificationChannels
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery, useMutation } from '@tanstack/react-query'; // Placeholder for tRPC hooks

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
}

const fetchNotificationSettings = async (): Promise<NotificationSettings> => {
  // Simulate API call
  return new Promise((resolve) =>
    setTimeout(() =>
      resolve({
        email: true,
        sms: false,
        push: true,
      }),
    500)
  );
};

const updateNotificationSettings = async (settings: NotificationSettings): Promise<NotificationSettings> => {
  // Simulate API call
  return new Promise((resolve) =>
    setTimeout(() => resolve(settings), 500)
  );
};

const SettingsNotificationChannels: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<NotificationSettings, Error>({
    queryKey: ['notificationSettings'],
    queryFn: fetchNotificationSettings,
  });

  const mutation = useMutation<NotificationSettings, Error, NotificationSettings>({
    mutationFn: updateNotificationSettings,
    onSuccess: () => {
      // Invalidate and refetch after a successful update
      // queryClient.invalidateQueries(['notificationSettings']);
    },
  });

  const handleToggle = (channel: keyof NotificationSettings) => {
    if (data) {
      const updatedSettings = { ...data, [channel]: !data[channel] };
      mutation.mutate(updatedSettings);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading notification settings...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Error: {error?.message || 'Failed to load settings'}</div>;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Notification Channels</CardTitle>
        <CardDescription>Manage how you receive notifications.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="email-notifications">Email Notifications</Label>
          <Switch
            id="email-notifications"
            checked={data?.email}
            onCheckedChange={() => handleToggle('email')}
            disabled={mutation.isPending}
            aria-label="Toggle email notifications"
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="sms-notifications">SMS Notifications</Label>
          <Switch
            id="sms-notifications"
            checked={data?.sms}
            onCheckedChange={() => handleToggle('sms')}
            disabled={mutation.isPending}
            aria-label="Toggle SMS notifications"
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="push-notifications">Push Notifications</Label>
          <Switch
            id="push-notifications"
            checked={data?.push}
            onCheckedChange={() => handleToggle('push')}
            disabled={mutation.isPending}
            aria-label="Toggle push notifications"
          />
        </div>
        {mutation.isPending && <div className="text-center text-sm text-gray-500">Saving changes...</div>}
        {mutation.isError && <div className="text-center text-sm text-red-500">Failed to save: {mutation.error?.message}</div>}
        {mutation.isSuccess && <div className="text-center text-sm text-green-500">Settings saved!</div>}
      </CardContent>
    </Card>
  );
};

export default SettingsNotificationChannels;
