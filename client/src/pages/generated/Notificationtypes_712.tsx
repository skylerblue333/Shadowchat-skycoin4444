// AUTO-GENERATED DRAFT SCREEN: NotificationTypes

import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC hooks integrate with react-query
import { Switch } from '@/components/ui/switch'; // shadcn/ui switch
import { Label } from '@/components/ui/label';   // shadcn/ui label
import { useTheme } from 'next-themes'; // For dark theme

// Mock tRPC client for demonstration. In a real app, this would be generated.
const trpc = {
  notification: {
    getNotificationTypes: {
      useQuery: () => useQuery<NotificationType[], Error>({
        queryKey: ['notificationTypes'],
        queryFn: async () => {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          if (Math.random() < 0.1) throw new Error('Failed to fetch notification types');
          return [
            { id: '1', name: 'Email Notifications', enabled: true, description: 'Receive updates via email.' },
            { id: '2', name: 'SMS Alerts', enabled: false, description: 'Get critical alerts on your phone.' },
            { id: '3', name: 'Push Notifications', enabled: true, description: 'In-app notifications for important events.' },
          ];
        },
      }),
    },
    updateNotificationType: {
      useMutation: () => ({ // Mock mutation
        mutate: async (data: { id: string; enabled: boolean }) => {
          await new Promise(resolve => setTimeout(resolve, 300));
          if (Math.random() < 0.2) throw new Error('Failed to update notification type');
          console.log('Updated:', data);
          return data;
        },
        isLoading: false, // Mock loading state
      }),
    },
  },
};

interface NotificationType {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
}

const NotificationTypes: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { data, isLoading, isError, error, refetch } = trpc.notification.getNotificationTypes.useQuery();
  const { mutate: updateNotification, isLoading: isUpdating } = trpc.notification.updateNotificationType.useMutation();

  const handleToggle = useCallback((id: string, enabled: boolean) => {
    updateNotification({ id, enabled });
  }, [updateNotification]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  if (isLoading) {
    return <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading notification types...</div>;
  }

  if (isError) {
    return (
      <div role="alert" className="p-4 text-center text-red-600 dark:text-red-400">
        <p>Error: {error?.message || 'Failed to load notification types.'}</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold text-center mb-6">Notification Preferences</h1>

      <div className="flex justify-end mb-4">
        <Label htmlFor="theme-toggle" className="flex items-center space-x-2 cursor-pointer">
          <span>Dark Mode</span>
          <Switch
            id="theme-toggle"
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
            aria-label="Toggle dark mode"
          />
        </Label>
      </div>

      <div className="space-y-4">
        {data?.map((type) => (
          <div
            key={type.id}
            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex-1">
              <Label htmlFor={`switch-${type.id}`} className="text-lg font-semibold cursor-pointer">
                {type.name}
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{type.description}</p>
            </div>
            <Switch
              id={`switch-${type.id}`}
              checked={type.enabled}
              onCheckedChange={(checked) => handleToggle(type.id, checked)}
              disabled={isUpdating}
              aria-label={`Toggle ${type.name}`}
            />
          </div>
        ))}
      </div>

      {isUpdating && (
        <div className="text-center text-blue-500 dark:text-blue-400 mt-4">Updating preferences...</div>
      )}
    </div>
  );
};

export default NotificationTypes;
