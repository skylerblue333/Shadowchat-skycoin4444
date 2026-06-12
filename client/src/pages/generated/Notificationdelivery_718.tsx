// AUTO-GENERATED DRAFT SCREEN: NotificationDelivery
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner'; // Using sonner for toast notifications
import { trpc } from '@/trpc';

type NotificationSettings = {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  emailAddress: string;
};

const NotificationDelivery: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: true,
    emailAddress: '',
  });

  const { data, isLoading, error } = trpc.getNotificationSettings.useQuery();
  const saveSettingsMutation = trpc.saveNotificationSettings.useMutation();

  useEffect(() => {
    if (data) {
      setSettings(data);
      toast.success('Settings loaded', {
        description: 'Your notification settings have been loaded.',
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error', {
        description: `Failed to load settings: ${error.message}`,
      });
    }
  }, [error]);

  const handleSave = async () => {
    try {
      await saveSettingsMutation.mutateAsync(settings);
      toast.success('Settings saved', {
        description: 'Your notification settings have been updated.',
      });
    } catch (err: any) {
      toast.error('Error', {
        description: `Failed to save settings: ${err.message}`,
      });
    }
  };

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      emailAddress: e.target.value,
    }));
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading settings...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Notification Delivery</CardTitle>
          <CardDescription>Manage how you receive notifications from SKYCOIN4444.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={settings.emailEnabled}
              onCheckedChange={() => handleToggle('emailEnabled')}
            />
          </div>

          {settings.emailEnabled && (
            <div className="space-y-2">
              <Label htmlFor="email-address">Email Address</Label>
              <Input
                id="email-address"
                type="email"
                value={settings.emailAddress}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notifications" className="text-base">SMS Notifications</Label>
            <Switch
              id="sms-notifications"
              checked={settings.smsEnabled}
              onCheckedChange={() => handleToggle('smsEnabled')}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
            <Switch
              id="push-notifications"
              checked={settings.pushEnabled}
              onCheckedChange={() => handleToggle('pushEnabled')}
            />
          </div>

          <Button onClick={handleSave} disabled={saveSettingsMutation.isLoading} className="w-full">
            {saveSettingsMutation.isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationDelivery;