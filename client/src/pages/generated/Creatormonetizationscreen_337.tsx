// AUTO-GENERATED DRAFT SCREEN: CreatorMonetizationScreen
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { MoonIcon, SunIcon, Loader2 } from 'lucide-react';

interface CreatorSettings {
  id: string;
  monetizationEnabled: boolean;
  payoutThreshold: number;
  darkMode: boolean;
}

const CreatorMonetizationScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fetch creator settings
  const { data: settings, isLoading, isError, error } = trpc.creator.getSettings.useQuery();

  // Update creator settings
  const updateSettingsMutation = trpc.creator.updateSettings.useMutation();

  useEffect(() => {
    if (settings?.darkMode !== undefined) {
      setIsDarkMode(settings.darkMode);
      document.documentElement.classList.toggle('dark', settings.darkMode);
    }
  }, [settings?.darkMode]);

  const handleMonetizationToggle = async (checked: boolean) => {
    if (settings) {
      await updateSettingsMutation.mutateAsync({ ...settings, monetizationEnabled: checked });
    }
  };

  const handlePayoutThresholdChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newThreshold = parseFloat(e.target.value);
    if (settings && !isNaN(newThreshold)) {
      await updateSettingsMutation.mutateAsync({ ...settings, payoutThreshold: newThreshold });
    }
  };

  const handleDarkModeToggle = async (checked: boolean) => {
    setIsDarkMode(checked);
    document.documentElement.classList.toggle('dark', checked);
    if (settings) {
      await updateSettingsMutation.mutateAsync({ ...settings, darkMode: checked });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading settings" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-red-500">
        <p>Error loading settings: {error.message}</p>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-gray-500">
        <p>No settings found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-2xl mx-auto shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Creator Monetization</CardTitle>
          <CardDescription>Manage your monetization settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="monetization-toggle" className="text-base">Enable Monetization</Label>
            <Switch
              id="monetization-toggle"
              checked={settings.monetizationEnabled}
              onCheckedChange={handleMonetizationToggle}
              aria-label="Toggle monetization"
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="payout-threshold" className="text-base">Payout Threshold (USD)</Label>
            <Input
              id="payout-threshold"
              type="number"
              value={settings.payoutThreshold}
              onChange={handlePayoutThresholdChange}
              className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50"
              aria-label="Payout threshold in USD"
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode-toggle" className="text-base">Dark Mode</Label>
            <Switch
              id="dark-mode-toggle"
              checked={isDarkMode}
              onCheckedChange={handleDarkModeToggle}
              aria-label="Toggle dark mode"
              thumbIcon={isDarkMode ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
            />
          </div>

          {updateSettingsMutation.isPending && (
            <div className="flex items-center text-blue-500">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span>Saving settings...</span>
            </div>
          )}
          {updateSettingsMutation.isSuccess && (
            <p className="text-green-500">Settings saved successfully!</p>
          )}
          {updateSettingsMutation.isError && (
            <p className="text-red-500">Error saving settings: {updateSettingsMutation.error?.message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorMonetizationScreen;
