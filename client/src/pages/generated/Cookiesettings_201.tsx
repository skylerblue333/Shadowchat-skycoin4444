// AUTO-GENERATED DRAFT SCREEN: CookieSettings
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc';
import { useToast } from '@/components/ui/use-toast'; // Assuming toast component is available

interface CookieSettingsProps {
  // No longer need onSave as tRPC handles the saving logic
  initialSettings?: { essential: boolean; analytics: boolean; marketing: boolean };
}

const CookieSettings: React.FC<CookieSettingsProps> = ({ initialSettings }) => {
  const { toast } = useToast();
  const [essential, setEssential] = useState(initialSettings?.essential ?? true);
  const [analytics, setAnalytics] = useState(initialSettings?.analytics ?? false);
  const [marketing, setMarketing] = useState(initialSettings?.marketing ?? false);

  const saveSettingsMutation = trpc.cookieSettings.save.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Cookie settings saved successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to save cookie settings: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const handleSave = () => {
    saveSettingsMutation.mutate({
      essential,
      analytics,
      marketing,
    });
  };

  useEffect(() => {
    // This effect can be used to load initial settings from an API if needed
    // For now, it just sets the initial state from props or defaults
    if (initialSettings) {
      setEssential(initialSettings.essential);
      setAnalytics(initialSettings.analytics);
      setMarketing(initialSettings.marketing);
    }
  }, [initialSettings]);

  return (
    <div className="p-6 space-y-6 bg-card text-card-foreground rounded-lg shadow-lg max-w-md mx-auto border border-border">
      <h2 className="text-2xl font-bold text-center">Cookie Settings</h2>
      <p className="text-sm text-muted-foreground text-center">Manage your cookie preferences for a personalized experience.</p>

      <div className="flex items-center justify-between p-4 bg-muted/40 rounded-md">
        <Label htmlFor="essential-cookies" className="text-base font-medium">Essential Cookies</Label>
        <Switch
          id="essential-cookies"
          checked={essential}
          onCheckedChange={setEssential}
          disabled
          aria-label="Essential Cookies (always active)"
        />
      </div>
      <p className="text-sm text-muted-foreground mt-1">These cookies are essential for the website to function and cannot be switched off.</p>

      <div className="flex items-center justify-between p-4 bg-muted/40 rounded-md">
        <Label htmlFor="analytics-cookies" className="text-base font-medium">Analytics Cookies</Label>
        <Switch
          id="analytics-cookies"
          checked={analytics}
          onCheckedChange={setAnalytics}
          aria-label="Analytics Cookies"
        />
      </div>
      <p className="text-sm text-muted-foreground mt-1">These cookies help us understand how visitors interact with our website.</p>

      <div className="flex items-center justify-between p-4 bg-muted/40 rounded-md">
        <Label htmlFor="marketing-cookies" className="text-base font-medium">Marketing Cookies</Label>
        <Switch
          id="marketing-cookies"
          checked={marketing}
          onCheckedChange={setMarketing}
          aria-label="Marketing Cookies"
        />
      </div>
      <p className="text-sm text-muted-foreground mt-1">These cookies are used to track visitors across websites to display relevant ads.</p>

      <Button
        onClick={handleSave}
        disabled={saveSettingsMutation.isLoading}
        className="w-full py-2 text-lg font-semibold"
      >
        {saveSettingsMutation.isLoading ? 'Saving...' : 'Save Preferences'}
      </Button>
    </div>
  );
};

export default CookieSettings;
