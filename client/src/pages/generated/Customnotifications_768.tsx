// AUTO-GENERATED DRAFT SCREEN: CustomNotifications
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react'; // For loading spinner

interface NotificationSetting {
  id: string;
  name: string;
  enabled: boolean;
  webhookUrl?: string;
}

const queryClient = new QueryClient();

const CustomNotificationsContent: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>([]);
  const [newNotificationName, setNewNotificationName] = useState('');
  const [newNotificationWebhook, setNewNotificationWebhook] = useState('');

  // Placeholder for actual tRPC query to fetch settings
  // const { data, isLoading, isError, error, refetch } = trpc.customNotifications.getSettings.useQuery();
  const { data, isLoading, isError, error, refetch } = useQuery<NotificationSetting[]>({ 
    queryKey: ['customNotifications'],
    queryFn: async () => { /* Simulate API call */ return []; }, // Replace with actual tRPC call
    initialData: [
      { id: '1', name: 'Slack Alerts', enabled: true, webhookUrl: 'https://example.com/webhook-removed' },
      { id: '2', name: 'Discord Webhook', enabled: false, webhookUrl: 'https://discord.com/api/webhooks/discord1' },
    ]
  });

  // Placeholder for actual tRPC mutation to add a new setting
  // const { mutate: addNotificationMutate, isPending: addNotificationIsPending, isError: addNotificationIsError, error: addNotificationError } = trpc.customNotifications.addSetting.useMutation();
  const { mutate: addNotificationMutate, isPending: addNotificationIsPending, isError: addNotificationIsError, error: addNotificationError } = useMutation({
    mutationFn: async (newSetting: Omit<NotificationSetting, 'id'>) => { /* Simulate API call */ return { id: Math.random().toString(36).substring(7), ...newSetting }; }, // Replace with actual tRPC call
  });

  // Placeholder for actual tRPC mutation to update a setting
  // const { mutate: updateNotificationMutate, isPending: updateNotificationIsPending, isError: updateNotificationIsError, error: updateNotificationError } = trpc.customNotifications.updateSetting.useMutation();
  const { mutate: updateNotificationMutate, isPending: updateNotificationIsPending, isError: updateNotificationIsError, error: updateNotificationError } = useMutation({
    mutationFn: async (updatedSetting: NotificationSetting) => { /* Simulate API call */ return updatedSetting; }, // Replace with actual tRPC call
  });

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  const handleAddNotification = async () => {
    if (newNotificationName.trim() && newNotificationWebhook.trim()) {
      try {
        const newSetting = await addNotificationMutate({ name: newNotificationName, enabled: true, webhookUrl: newNotificationWebhook });
        setSettings((prev) => [...prev, newSetting]);
        setNewNotificationName('');
        setNewNotificationWebhook('');
        refetch(); // Refetch settings to ensure consistency
      } catch (err) {
        console.error("Error adding notification:", err);
      }
    }
  };

  const handleToggleNotification = async (id: string) => {
    const settingToUpdate = settings.find(s => s.id === id);
    if (settingToUpdate) {
      const updatedEnabled = !settingToUpdate.enabled;
      // Optimistic update
      setSettings((prev) =>
        prev.map((setting) =>
          setting.id === id ? { ...setting, enabled: updatedEnabled } : setting
        )
      );
      try {
        await updateNotificationMutate({ ...settingToUpdate, enabled: updatedEnabled });
        refetch(); // Refetch settings to ensure consistency
      } catch (err) {
        console.error("Error updating notification:", err);
        // Revert optimistic update on error
        setSettings((prev) =>
          prev.map((setting) =>
            setting.id === id ? { ...setting, enabled: !updatedEnabled } : setting
          )
        );
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900" role="status" aria-live="polite">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" aria-hidden="true" />
        <span className="ml-2 text-lg dark:text-gray-300">Loading custom notification settings...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900" role="alert">
        <p className="text-red-500 text-lg">Error: {error?.message || 'Failed to load settings'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold">Integrations: Custom Notifications</h1>
      <p className="text-gray-600 dark:text-gray-400">Manage your custom notification webhooks and settings.</p>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add New Notification</CardTitle>
          <CardDescription>Configure a new custom notification webhook.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="notification-name">Notification Name</Label>
            <Input
              id="notification-name"
              placeholder="e.g., Slack Alerts"
              value={newNotificationName}
              onChange={(e) => setNewNotificationName(e.target.value)}
              aria-label="Notification Name"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder="https://example.com/webhook-removed"
              value={newNotificationWebhook}
              onChange={(e) => setNewNotificationWebhook(e.target.value)}
              aria-label="Webhook URL"
            />
          </div>
          <Button onClick={handleAddNotification} disabled={addNotificationIsPending}>
            {addNotificationIsPending ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Adding...</>
            ) : (
              'Add Notification'
            )}
          </Button>
          {addNotificationIsError && (
            <p className="text-red-500 text-sm mt-2" role="alert">Error adding notification: {addNotificationError?.message}</p>
          )}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Existing Notifications</CardTitle>
          <CardDescription>Toggle your existing custom notification webhooks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No custom notifications configured yet.</p>
          ) : (
            settings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-2 border rounded-md dark:border-gray-700">
                <div>
                  <p className="font-medium">{setting.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate w-64">{setting.webhookUrl}</p>
                </div>
                <Switch
                  checked={setting.enabled}
                  onCheckedChange={() => handleToggleNotification(setting.id)}
                  aria-label={`Toggle ${setting.name}`}
                  disabled={updateNotificationIsPending}
                />
              </div>
            ))
          )}
          {updateNotificationIsError && (
            <p className="text-red-500 text-sm mt-2" role="alert">Error updating notification: {updateNotificationError?.message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const CustomNotifications: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <CustomNotificationsContent />
  </QueryClientProvider>
);

export default CustomNotifications;
