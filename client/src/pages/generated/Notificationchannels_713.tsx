// AUTO-GENERATED DRAFT SCREEN: NotificationChannels

import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup
import { toast } from 'sonner'; // Assuming sonner for toasts
import { Skeleton } from '@/components/ui/skeleton'; // Assuming shadcn/ui Skeleton
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Assuming shadcn/ui Alert
import { Terminal } from 'lucide-react'; // Assuming Lucide icons

/**
 * @typedef {Object} NotificationChannel
 * @property {string} id - Unique identifier for the notification channel.
 * @property {string} name - Display name of the notification channel.
 * @property {boolean} enabled - Current enabled status of the channel.
 * @property {string} description - A brief description of the channel.
 */
type NotificationChannel = {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
};

/**
 * @typedef {Object} GlobalNotificationSettings
 * @property {boolean} enableAll - Global toggle to enable or disable all notifications.
 */
type GlobalNotificationSettings = {
  enableAll: boolean;
};

/**
 * NotificationChannels component displays and manages user notification channels.
 * It integrates with tRPC for data fetching and mutations, uses shadcn/ui for UI components,
 * Tailwind CSS for styling, and includes loading states, error handling, and dark theme support.
 */
const NotificationChannels: React.FC = () => {
  const queryClient = useQueryClient();
  const [pendingChanges, setPendingChanges] = useState<Record<string, boolean>>({});
  const [globalEnableAll, setGlobalEnableAll] = useState<boolean | undefined>(undefined);

  // Fetch notification channels
  const { data: channels, isLoading, isError, error, refetch } = trpc.notifications.getChannels.useQuery();

  // Fetch global notification settings
  const { data: globalSettings, isLoading: isLoadingGlobal, isError: isErrorGlobal, error: errorGlobal } = trpc.notifications.getGlobalSettings.useQuery();

  // Mutation for updating a single channel
  const updateChannelMutation = trpc.notifications.updateChannel.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'getChannels'] });
      toast.success('Notification channel updated successfully.');
    },
    onError: (err) => {
      toast.error(`Failed to update channel: ${err.message}`);
      console.error('Failed to update channel:', err);
    },
  });

  // Mutation for updating global settings
  const updateGlobalSettingsMutation = trpc.notifications.updateGlobalSettings.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'getGlobalSettings'] });
      toast.success('Global notification settings updated successfully.');
    },
    onError: (err) => {
      toast.error(`Failed to update global settings: ${err.message}`);
      console.error('Failed to update global settings:', err);
    },
  });

  useEffect(() => {
    if (globalSettings) {
      setGlobalEnableAll(globalSettings.enableAll);
    }
  }, [globalSettings]);

  /**
   * Handles the toggle action for individual notification channels.
   * @param {string} channelId - The ID of the channel to toggle.
   * @param {boolean} currentStatus - The current enabled status of the channel.
   */
  const handleChannelToggle = (channelId: string, currentStatus: boolean) => {
    setPendingChanges(prev => ({ ...prev, [channelId]: !currentStatus }));
  };

  /**
   * Handles the toggle action for global notification settings.
   * @param {boolean} checked - The new checked status for global enable all.
   */
  const handleGlobalToggle = (checked: boolean) => {
    setGlobalEnableAll(checked);
  };

  /**
   * Saves all pending changes to the backend.
   */
  const handleSaveChanges = async () => {
    const updates = Object.entries(pendingChanges).map(([id, enabled]) =>
      updateChannelMutation.mutateAsync({ id, enabled })
    );
    if (globalEnableAll !== undefined && globalEnableAll !== globalSettings?.enableAll) {
      updates.push(updateGlobalSettingsMutation.mutateAsync({ enableAll: globalEnableAll }));
    }

    try {
      await Promise.all(updates);
      setPendingChanges({}); // Clear pending changes after successful save
    } catch (e) {
      // Errors are handled by individual mutation onError callbacks
    }
  };

  const hasPendingChanges = Object.keys(pendingChanges).length > 0 || (globalEnableAll !== undefined && globalEnableAll !== globalSettings?.enableAll);

  if (isLoading || isLoadingGlobal) {
    return (
      <div className="p-6 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-md animate-pulse">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/5" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
          ))}
        </div>
        <Skeleton className="h-10 w-32 ml-auto" />
      </div>
    );
  }

  if (isError || isErrorGlobal) {
    return (
      <Alert variant="destructive" className="p-6">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error loading notifications</AlertTitle>
        <AlertDescription>
          {error?.message || errorGlobal?.message || 'Could not load notification settings. Please try again later.'}
          <Button onClick={() => refetch()} className="ml-2">Retry</Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notification Channels</h2>
      <p className="text-gray-600 dark:text-gray-300">Manage how you receive notifications across different channels.</p>

      {/* Global Notification Settings */}
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label htmlFor="global-enable-all" className="text-lg font-medium text-gray-800 dark:text-gray-100">
              Enable All Notifications
            </Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">Toggle to enable or disable all notification channels globally.</p>
          </div>
          <Switch
            id="global-enable-all"
            checked={globalEnableAll ?? false}
            onCheckedChange={handleGlobalToggle}
            aria-label="Toggle all notifications globally"
          />
        </div>
      </div>

      {/* Individual Notification Channels */}
      <div className="space-y-4">
        {channels?.map((channel: NotificationChannel) => (
          <div
            key={channel.id}
            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md"
          >
            <div className="flex-1">
              <Label htmlFor={`channel-${channel.id}`} className="text-lg font-medium text-gray-800 dark:text-gray-100">
                {channel.name}
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">{channel.description}</p>
            </div>
            <Switch
              id={`channel-${channel.id}`}
              checked={pendingChanges[channel.id] !== undefined ? pendingChanges[channel.id] : channel.enabled}
              onCheckedChange={() => handleChannelToggle(channel.id, pendingChanges[channel.id] !== undefined ? pendingChanges[channel.id] : channel.enabled)}
              aria-label={`Toggle ${channel.name} notifications`}
              disabled={updateChannelMutation.isPending || globalEnableAll === false}
            />
          </div>
        ))}
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveChanges}
          disabled={!hasPendingChanges || updateChannelMutation.isPending || updateGlobalSettingsMutation.isPending}
          className="px-6 py-2"
        >
          {updateChannelMutation.isPending || updateGlobalSettingsMutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default NotificationChannels;
