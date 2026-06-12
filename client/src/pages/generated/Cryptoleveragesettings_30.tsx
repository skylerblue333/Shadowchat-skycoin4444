// AUTO-GENERATED DRAFT SCREEN: CryptoLeverageSettings
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup for API calls
import { Switch } from './components/ui/switch'; // shadcn/ui Switch component for toggling features
import { Label } from './components/ui/label'; // shadcn/ui Label component for accessibility
import { Slider } from './components/ui/slider'; // shadcn/ui Slider component for numerical input
import { Button } from './components/ui/button'; // shadcn/ui Button component for actions
import { useTheme } from 'next-themes'; // For managing dark/light theme
import { toast } from 'sonner'; // For displaying user notifications

// Define the shape of our leverage settings data
type LeverageSettings = {
  enabled: boolean;
  leverageAmount: number;
};

/**
 * CryptoLeverageSettings Component
 * A production-grade React 19 screen component for managing cryptocurrency leverage settings.
 * Features:
 * - Fully typed TSX for robust development.
 * - Styled with Tailwind CSS 4 and shadcn/ui components for a modern look.
 * - Integrates with tRPC for type-safe API communication.
 * - Includes comprehensive error handling and loading states for a smooth user experience.
 * - Supports dark theme for user preference.
 * - Designed with accessibility in mind.
 */
const CryptoLeverageSettings: React.FC = () => {
  // Determine current theme for conditional styling
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  // Fetch current leverage settings from the backend using tRPC
  const { data, isLoading, isError, error, refetch } = trpc.leverage.getSettings.useQuery();

  // State to manage the form inputs, initialized with fetched data or defaults
  const [settings, setSettings] = useState<LeverageSettings>({
    enabled: data?.enabled || false,
    leverageAmount: data?.leverageAmount || 1,
  });

  // Update local state when data is successfully fetched
  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  // tRPC mutation hook for updating settings on the server
  const updateSettingsMutation = trpc.leverage.updateSettings.useMutation({
    onSuccess: () => {
      toast.success('Leverage settings saved successfully!');
      refetch(); // Re-fetch settings to ensure UI is up-to-date
    },
    onError: (err) => {
      toast.error(`Failed to save settings: ${err.message}`);
      console.error('Error saving leverage settings:', err);
    },
  });

  // Handler for saving the settings
  const handleSave = () => {
    updateSettingsMutation.mutate(settings);
  };

  // Display loading state while fetching initial settings
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg">Loading leverage settings...</p>
      </div>
    );
  }

  // Display error state if fetching initial settings fails
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100">
        <p className="text-lg font-semibold">Error loading settings: {error?.message}</p>
        <Button onClick={() => refetch()} className="ml-4">Retry</Button>
      </div>
    );
  }

  // Main component rendering
  return (
    <div className={`container mx-auto p-6 max-w-2xl rounded-lg shadow-lg ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      <h1 className="text-3xl font-extrabold mb-6 text-center">Crypto: Leverage Settings</h1>

      {/* Enable/Disable Leverage Trading Switch */}
      <div className="flex items-center justify-between space-x-4 mb-6 p-4 border rounded-md ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}'">
        <Label htmlFor="leverage-mode" className="text-lg font-medium cursor-pointer">Enable Leverage Trading</Label>
        <Switch
          id="leverage-mode"
          checked={settings.enabled}
          onCheckedChange={(checked) => setSettings({ ...settings, enabled: checked })}
          aria-label="Toggle leverage trading feature"
        />
      </div>

      {/* Leverage Amount Slider */}
      <div className="mb-8 p-4 border rounded-md ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}'">
        <Label htmlFor="leverage-amount" className="block text-lg font-medium mb-4">Leverage Amount: <span className="font-bold text-blue-500">{settings.leverageAmount}x</span></Label>
        <Slider
          id="leverage-amount"
          min={1}
          max={100}
          step={1}
          value={[settings.leverageAmount]}
          onValueChange={(value) => setSettings({ ...settings, leverageAmount: value[0] })}
          className="w-full"
          aria-label="Select leverage amount from 1x to 100x"
          disabled={!settings.enabled} // Disable slider if leverage is not enabled
        />
        {!settings.enabled && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Enable leverage trading to adjust the amount.</p>
        )}
      </div>

      {/* Save Settings Button */}
      <Button
        onClick={handleSave}
        disabled={updateSettingsMutation.isLoading}
        className="w-full py-3 text-lg font-semibold ${updateSettingsMutation.isLoading ? 'opacity-70 cursor-not-allowed' : ''}'"
      >
        {updateSettingsMutation.isLoading ? 'Saving Settings...' : 'Save Settings'}
      </Button>

      {/* Feedback messages for saving operation */}
      {updateSettingsMutation.isError && (
        <p className="text-red-500 text-center mt-4 text-sm">Error: {updateSettingsMutation.error?.message}</p>
      )}
      {updateSettingsMutation.isSuccess && (
        <p className="text-green-500 text-center mt-4 text-sm">Settings updated successfully!</p>
      )}
    </div>
  );
};

export default CryptoLeverageSettings;
