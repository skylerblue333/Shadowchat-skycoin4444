// AUTO-GENERATED DRAFT SCREEN: EmailNotificationsScreen
import React, { useState, useEffect } from 'react';
import { Switch } from './components/ui/switch';
import { Button } from './components/ui/button';
import { Label } from '@radix-ui/react-label';
import { toast } from 'sonner';
import { trpc } from './lib/trpc';

interface NotificationSetting {
  id: string;
  name: string;
  enabled: boolean;
}

const EmailNotificationsScreen: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>([]);

  const { data, isLoading, isError, error } = trpc.emailSettings.getSettings.useQuery();

  const saveSettingsMutation = trpc.emailSettings.updateSettings.useMutation({
    onSuccess: () => {
      toast.success('Settings saved successfully!');
    },
    onError: (err) => {
      toast.error('Failed to save settings.', { description: err.message });
    },
  });

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  const handleToggle = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const handleSave = () => {
    saveSettingsMutation.mutate(settings);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p className="text-lg">Loading email notification settings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-destructive">
        <p className="text-lg">Error: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8 bg-background text-foreground rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-100">
      <h1 className="text-4xl font-extrabold text-center mb-8">Email Notifications</h1>

      <div className="space-y-6">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-card dark:bg-gray-700 transition-colors duration-200">
            <Label htmlFor={`toggle-${setting.id}`} className="text-xl font-medium cursor-pointer flex-grow">
              {setting.name}
            </Label>
            <Switch
              id={`toggle-${setting.id}`}
              checked={setting.enabled}
              onCheckedChange={() => handleToggle(setting.id)}
              aria-label={`Toggle ${setting.name}`}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary"
            />
          </div>
        ))}
      </div>

      <Button
        onClick={handleSave}
        disabled={saveSettingsMutation.isPending}
        className="w-full py-3 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
      >
        {saveSettingsMutation.isPending ? 'Saving Changes...' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default EmailNotificationsScreen;
