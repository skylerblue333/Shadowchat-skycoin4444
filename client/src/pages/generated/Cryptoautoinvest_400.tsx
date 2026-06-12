// AUTO-GENERATED DRAFT SCREEN: CryptoAutoInvest
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui button
import { Input } from '@/components/ui/input';   // Assuming shadcn/ui input
import { Label } from '@/components/ui/label';   // Assuming shadcn/ui label
import { Switch } from '@/components/ui/switch'; // Assuming shadcn/ui switch

// Placeholder for tRPC hooks - replace with actual implementation
// import { trpc } from '@/utils/trpc';

interface AutoInvestSettings {
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  enabled: boolean;
}

interface CryptoAutoInvestProps {
  userId: string;
}

const CryptoAutoInvest: React.FC<CryptoAutoInvestProps> = ({ userId }) => {
  const [settings, setSettings] = useState<AutoInvestSettings>({
    amount: 100,
    frequency: 'weekly',
    enabled: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching user settings with tRPC hook
  // const { data, isLoading, error: trpcError } = trpc.autoInvest.getSettings.useQuery({ userId });

  useEffect(() => {
    // Simulate API call
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError(null);
        // In a real app, this would be an actual tRPC call:
        // const response = await trpc.autoInvest.getSettings.query({ userId });
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setSettings({ amount: 150, frequency: 'monthly', enabled: true }); // Mock data
      } catch (err) {
        setError('Failed to load auto-invest settings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [userId]);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      // In a real app, this would be an actual tRPC mutation:
      // await trpc.autoInvest.updateSettings.mutate(settings);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      alert('Settings saved successfully!');
    } catch (err) {
      setError('Failed to save settings.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-100">
        <p className="text-lg">Loading auto-invest settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-100 text-red-500">
        <p className="text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 space-y-6" role="region" aria-labelledby="auto-invest-heading">
      <h1 id="auto-invest-heading" className="text-3xl sm:text-4xl font-bold text-center mb-8">Crypto: Auto-Invest</h1>

      <div className="max-w-md mx-auto bg-card text-card-foreground dark:bg-gray-800 dark:text-gray-50 rounded-lg shadow-lg p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium">Investment Amount</Label>
          <Input
            id="amount"
            type="number"
            value={settings.amount}
            onChange={(e) => setSettings({ ...settings, amount: parseFloat(e.target.value) || 0 })}
            className="w-full bg-input dark:bg-gray-700 dark:text-gray-50 border-border dark:border-gray-600"
            aria-label="Investment amount in USD"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency" className="text-sm font-medium">Investment Frequency</Label>
          <select
            id="frequency"
            value={settings.frequency}
            onChange={(e) => setSettings({ ...settings, frequency: e.target.value as AutoInvestSettings['frequency'] })}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background dark:bg-gray-700 dark:text-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Investment frequency"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="enabled" className="text-sm font-medium cursor-pointer">Enable Auto-Invest</Label>
          <Switch
            id="enabled"
            checked={settings.enabled}
            onCheckedChange={(checked) => setSettings({ ...settings, enabled: checked })}
            aria-label="Toggle auto-invest feature"
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
};

export default CryptoAutoInvest;
