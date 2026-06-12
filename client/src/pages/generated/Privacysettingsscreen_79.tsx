// AUTO-GENERATED DRAFT SCREEN: PrivacySettingsScreen
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface PrivacySettings {
  enableTwoFactorAuth: boolean;
  hideTransactionHistory: boolean;
  shareAnalyticsData: boolean;
}

const PrivacySettingsScreen: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.user.getPrivacySettings.useQuery();
  const updateSettingsMutation = trpc.user.updatePrivacySettings.useMutation();

  const [settings, setSettings] = useState<PrivacySettings | undefined>(data);

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  const handleSettingChange = (key: keyof PrivacySettings) => {
    setSettings(prev => prev ? { ...prev, [key]: !prev[key] } : undefined);
  };

  const handleSave = async () => {
    if (settings) {
      try {
        await updateSettingsMutation.mutateAsync(settings);
        toast.success('Privacy settings updated successfully!');
      } catch (err) {
        toast.error('Failed to update settings. Please try again.');
        console.error('Failed to update privacy settings:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p>Loading privacy settings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-destructive">
        <p>Error: {error?.message || 'Failed to load privacy settings.'}</p>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-muted-foreground">
        <p>No privacy settings found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8 dark">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Privacy Settings</CardTitle>
          <CardDescription>Manage your privacy preferences for your SKYCOIN4444 account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="two-factor-auth" className="text-base">Enable Two-Factor Authentication</Label>
            <Switch
              id="two-factor-auth"
              checked={settings.enableTwoFactorAuth}
              onCheckedChange={() => handleSettingChange('enableTwoFactorAuth')}
              aria-label="Toggle two-factor authentication"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="hide-history" className="text-base">Hide Transaction History</Label>
            <Switch
              id="hide-history"
              checked={settings.hideTransactionHistory}
              onCheckedChange={() => handleSettingChange('hideTransactionHistory')}
              aria-label="Toggle hiding transaction history"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="share-analytics" className="text-base">Share Anonymous Analytics Data</Label>
            <Switch
              id="share-analytics"
              checked={settings.shareAnalyticsData}
              onCheckedChange={() => handleSettingChange('shareAnalyticsData')}
              aria-label="Toggle sharing anonymous analytics data"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={updateSettingsMutation.isLoading}
            className="w-full"
          >
            {updateSettingsMutation.isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettingsScreen;
