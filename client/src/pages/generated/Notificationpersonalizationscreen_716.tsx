// AUTO-GENERATED DRAFT SCREEN: NotificationPersonalizationScreen
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation } from '@tanstack/react-query'; // Placeholder for tRPC hooks

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
}

// Placeholder for tRPC API calls
const fetchNotificationSettings = async (): Promise<NotificationSettings> => {
  // Simulate API call
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          emailNotifications: true,
          smsNotifications: false,
          pushNotifications: true,
          marketingEmails: true,
        }),
      1000
    )
  );
};

const updateNotificationSettings = async (settings: NotificationSettings): Promise<NotificationSettings> => {
  // Simulate API call
  return new Promise((resolve) => setTimeout(() => resolve(settings), 1000));
};

const NotificationPersonalizationScreen: React.FC = () => {
  const { data: settings, isLoading, isError, error } = useQuery<NotificationSettings>({
    queryKey: ['notificationSettings'],
    queryFn: fetchNotificationSettings,
  });

  const mutation = useMutation<NotificationSettings, Error, NotificationSettings>({
    mutationFn: updateNotificationSettings,
    onSuccess: () => {
      // Invalidate and refetch after a successful update
      // queryClient.invalidateQueries(['notificationSettings']);
      alert('Settings updated successfully!');
    },
    onError: (err) => {
      alert(`Error updating settings: ${err.message}`);
    },
  });

  const [localSettings, setLocalSettings] = useState<NotificationSettings | undefined>(settings);

  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSettingChange = (key: keyof NotificationSettings, value: boolean) => {
    if (localSettings) {
      setLocalSettings((prev) => (prev ? { ...prev, [key]: value } : undefined));
    }
  };

  const handleSave = () => {
    if (localSettings) {
      mutation.mutate(localSettings);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-gray-100">Loading notification settings...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-red-500">Error: {error?.message || 'Failed to load settings'}</div>;
  }

  if (!localSettings) {
    return <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-gray-100">No settings available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center mb-6">Notification Personalization</h1>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="text-lg">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={localSettings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              aria-label="Toggle email notifications"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notifications" className="text-lg">SMS Notifications</Label>
            <Switch
              id="sms-notifications"
              checked={localSettings.smsNotifications}
              onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
              aria-label="Toggle SMS notifications"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="text-lg">Push Notifications</Label>
            <Switch
              id="push-notifications"
              checked={localSettings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              aria-label="Toggle push notifications"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="marketing-emails" className="text-lg">Marketing Emails</Label>
            <Switch
              id="marketing-emails"
              checked={localSettings.marketingEmails}
              onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
              aria-label="Toggle marketing emails"
            />
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={mutation.isLoading}
          className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
        >
          {mutation.isLoading ? 'Saving...' : 'Save Changes'}
        </Button>

        {mutation.isError && (
          <p className="text-red-500 text-center mt-4">Error: {mutation.error?.message || 'Failed to save changes.'}</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPersonalizationScreen;
