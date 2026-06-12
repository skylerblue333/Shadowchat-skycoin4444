// AUTO-GENERATED DRAFT SCREEN: PushNotifications

import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { SunIcon, MoonIcon, BellIcon } from 'lucide-react';

interface PushNotificationsProps {
  userId: string;
}

const PushNotifications: React.FC<PushNotificationsProps> = ({ userId }) => {
  const { toast } = useToast();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Simulate fetching initial state
  const { data, isLoading: trpcLoading, error } = trpc.notifications.getSettings.useQuery({ userId });

  useEffect(() => {
    if (data) {
      setIsEnabled(data.pushNotificationsEnabled);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    // Apply dark theme class to body or parent element
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const mutation = trpc.notifications.updateSettings.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Push notification settings updated.',
      });
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: `Failed to update settings: ${err.message}`,
        variant: 'destructive',
      });
    },
  });

  const handleToggle = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    await mutation.mutateAsync({ userId, pushNotificationsEnabled: newState });
  };

  if (isLoading || trpcLoading) {
    return <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400">Loading settings...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center p-4 text-red-500 dark:text-red-400">Error: {error.message}</div>;
  }

  return (
    <div className={`p-6 rounded-lg shadow-md ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <BellIcon className="mr-2" /> Push Notifications
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Manage your preferences for receiving push notifications.
      </p>

      <div className="flex items-center justify-between mb-4">
        <Label htmlFor="push-notifications" className="flex flex-col">
          <span className="text-lg font-medium">Enable Push Notifications</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Receive real-time alerts and updates.</span>
        </Label>
        <Switch
          id="push-notifications"
          checked={isEnabled}
          onCheckedChange={handleToggle}
          disabled={mutation.isLoading}
          aria-label="Toggle push notifications"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="dark-theme-toggle" className="flex flex-col">
          <span className="text-lg font-medium">Dark Theme</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark mode.</span>
        </Label>
        <Switch
          id="dark-theme-toggle"
          checked={isDarkTheme}
          onCheckedChange={setIsDarkTheme}
          aria-label="Toggle dark theme"
          thumbIcon={isDarkTheme ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
        />
      </div>

      {mutation.isLoading && (
        <p className="text-blue-500 dark:text-blue-400 mt-4">Updating settings...</p>
      )}
    </div>
  );
};

export default PushNotifications;
