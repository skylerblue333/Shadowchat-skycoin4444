// AUTO-GENERATED DRAFT SCREEN: SettingsPushPreferences
import React, { useState } from 'react';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';
import { Button } from './components/ui/button';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { z } from 'zod';

// --- tRPC Setup (Mock) ---
// In a real application, this would be a separate file and connected to a backend.
const pushPreferencesSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  inAppNotifications: z.boolean(),
});

type PushPreferences = z.infer<typeof pushPreferencesSchema>;

const mockPreferences: PushPreferences = {
  emailNotifications: true,
  smsNotifications: false,
  inAppNotifications: true,
};

const appRouter = {
  getPreferences: async (): Promise<PushPreferences> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPreferences), 500);
    });
  },
  updatePreferences: async (input: PushPreferences): Promise<PushPreferences> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        Object.assign(mockPreferences, input);
        resolve(mockPreferences);
      }, 500);
    });
  },
};

const trpc = createTRPCProxyClient<typeof appRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc', // This would be your actual tRPC API endpoint
    }),
  ],
});

const queryClient = new QueryClient();

// --- PushPreferences Component ---
const SettingsPushPreferences: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pushPreferences'],
    queryFn: () => trpc.getPreferences.query(),
  });

  const mutation = useMutation({
    mutationFn: (newPreferences: PushPreferences) => trpc.updatePreferences.mutate(newPreferences),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pushPreferences'] });
      alert('Preferences updated successfully!');
    },
    onError: (err) => {
      alert(`Failed to update preferences: ${err.message}`);
    },
  });

  const [preferences, setPreferences] = useState<PushPreferences>(data || mockPreferences);

  React.useEffect(() => {
    if (data) {
      setPreferences(data);
    }
  }, [data]);

  const handleToggle = (key: keyof PushPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = () => {
    mutation.mutate(preferences);
  };

  if (isLoading) return <div className="p-4 text-center">Loading preferences...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Error: {error?.message}</div>;

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Push Preferences</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Manage your notification settings.</p>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications" className="text-lg">
            Email Notifications
          </Label>
          <Switch
            id="email-notifications"
            checked={preferences.emailNotifications}
            onCheckedChange={() => handleToggle('emailNotifications')}
            disabled={mutation.isPending}
            aria-label="Toggle email notifications"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="sms-notifications" className="text-lg">
            SMS Notifications
          </Label>
          <Switch
            id="sms-notifications"
            checked={preferences.smsNotifications}
            onCheckedChange={() => handleToggle('smsNotifications')}
            disabled={mutation.isPending}
            aria-label="Toggle SMS notifications"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="in-app-notifications" className="text-lg">
            In-App Notifications
          </Label>
          <Switch
            id="in-app-notifications"
            checked={preferences.inAppNotifications}
            onCheckedChange={() => handleToggle('inAppNotifications')}
            disabled={mutation.isPending}
            aria-label="Toggle in-app notifications"
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={mutation.isPending}
        className="mt-8 w-full md:w-auto"
      >
        {mutation.isPending ? 'Saving...' : 'Save Preferences'}
      </Button>

      {mutation.isError && (
        <p className="text-red-500 mt-4">Error saving preferences: {mutation.error?.message}</p>
      )}
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsPushPreferences />
  </QueryClientProvider>
);

export default AppWrapper;
