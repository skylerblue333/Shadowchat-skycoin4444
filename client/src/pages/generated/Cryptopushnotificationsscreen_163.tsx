// AUTO-GENERATED DRAFT SCREEN: CryptoPushNotificationsScreen
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useMutation, useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { toast } from 'sonner';

interface PushNotificationSettings {
  newCoinListings: boolean;
  priceAlerts: boolean;
  newsUpdates: boolean;
}

const CryptoPushNotificationsScreen: React.FC = () => {
  const [settings, setSettings] = useState<PushNotificationSettings | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Assuming dark theme state is managed globally or via context

  // Fetch current settings
  const { data, isLoading, error } = trpc.notifications.getSettings.useQuery();

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  // Mutation to update settings
  const updateSettingsMutation = trpc.notifications.updateSettings.useMutation({
    onSuccess: () => {
      toast.success('Notification settings updated successfully!');
    },
    onError: (err) => {
      toast.error(`Failed to update settings: ${err.message}`);
    },
  });

  const handleSettingChange = (key: keyof PushNotificationSettings) => {
    if (settings) {
      const newSettings = { ...settings, [key]: !settings[key] };
      setSettings(newSettings);
      updateSettingsMutation.mutate(newSettings);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading settings...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error.message}</div>;
  }

  if (!settings) {
    return <div className="flex items-center justify-center h-screen">No settings found.</div>;
  }

  return (
    <div className={`container mx-auto p-4 ${isDarkTheme ? 'dark' : ''}`} aria-label="Push Notification Settings">
      <h1 className="text-2xl font-bold mb-6">Push Notifications</h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 border rounded-md shadow-sm bg-card text-card-foreground">
          <Label htmlFor="newCoinListings" className="text-lg">New Coin Listings</Label>
          <Switch
            id="newCoinListings"
            checked={settings.newCoinListings}
            onCheckedChange={() => handleSettingChange('newCoinListings')}
            aria-label="Toggle new coin listings notifications"
          />
        </div>

        <div className="flex items-center justify-between p-3 border rounded-md shadow-sm bg-card text-card-foreground">
          <Label htmlFor="priceAlerts" className="text-lg">Price Alerts</Label>
          <Switch
            id="priceAlerts"
            checked={settings.priceAlerts}
            onCheckedChange={() => handleSettingChange('priceAlerts')}
            aria-label="Toggle price alerts notifications"
          />
        </div>

        <div className="flex items-center justify-between p-3 border rounded-md shadow-sm bg-card text-card-foreground">
          <Label htmlFor="newsUpdates" className="text-lg">News Updates</Label>
          <Switch
            id="newsUpdates"
            checked={settings.newsUpdates}
            onCheckedChange={() => handleSettingChange('newsUpdates')}
            aria-label="Toggle news updates notifications"
          />
        </div>
      </div>

      {updateSettingsMutation.isPending && (
        <div className="mt-4 text-blue-500">Saving changes...</div>
      )}
    </div>
  );
};

export default CryptoPushNotificationsScreen;
