// AUTO-GENERATED DRAFT SCREEN: NotificationDeduplication
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

type NotificationDeduplicationSettings = {
  enabled: boolean;
};

const NotificationDeduplication: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<NotificationDeduplicationSettings>(
    ['notificationDeduplicationSettings'],
    async () => {
      // Simulate fetching data from tRPC
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ enabled: true });
        }, 1000);
      });
    }
  );

  const mutation = trpc.user.updateNotificationDeduplication.useMutation({
    onSuccess: () => {
      toast.success('Notification deduplication settings updated.');
    },
    onError: (err) => {
      toast.error(`Failed to update settings: ${err.message}`);
    },
  });

  const handleToggle = async (checked: boolean) => {
    try {
      await mutation.mutateAsync({ enabled: checked });
    } catch (e) {
      // Error handled by onError in useMutation
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Notification Deduplication</CardTitle>
          <CardDescription>Manage your notification deduplication settings.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center space-x-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-32" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-md mx-auto border-destructive">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Failed to load notification settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Error: {error?.message || 'Unknown error'}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto dark:bg-gray-900 dark:text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Notification Deduplication</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Group similar notifications to reduce clutter in your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="deduplication-mode" className="text-lg">
            Enable Deduplication
          </Label>
          <Switch
            id="deduplication-mode"
            checked={data?.enabled}
            onCheckedChange={handleToggle}
            disabled={mutation.isLoading}
            aria-label="Toggle notification deduplication"
            className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300 dark:data-[state=checked]:bg-blue-500 dark:data-[state=unchecked]:bg-gray-700"
          />
        </div>
        {mutation.isLoading && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Updating settings...</p>}
      </CardContent>
    </Card>
  );
};

export default NotificationDeduplication;
