// AUTO-GENERATED DRAFT SCREEN: SystemSettings
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock tRPC hooks for demonstration purposes
const useSystemSettings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    language: 'en',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      try {
        // Load settings from local storage or default
        const storedSettings = localStorage.getItem('systemSettings');
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
        setIsLoading(false);
      } catch (e) {
        setError('Failed to load settings');
        setIsLoading(false);
      }
    }, 1000);
  }, []);

  const updateSettings = async (newSettings: Partial<typeof settings>) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API update
      await new Promise(resolve => setTimeout(resolve, 500));
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      localStorage.setItem('systemSettings', JSON.stringify(updated));
      setIsLoading(false);
    } catch (e) {
      setError('Failed to update settings');
      setIsLoading(false);
    }
  };

  return { settings, isLoading, error, updateSettings };
};

const SystemSettings: React.FC = () => {
  const { settings, isLoading, error, updateSettings } = useSystemSettings();
  const { toast } = useToast();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading settings...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-lg">Error: {error}</div>;
  }

  const handleDarkModeChange = (checked: boolean) => {
    updateSettings({ darkMode: checked });
    document.documentElement.classList.toggle('dark', checked);
  };

  const handleNotificationsChange = (checked: boolean) => {
    updateSettings({ notifications: checked });
  };

  const handleLanguageChange = (value: string) => {
    updateSettings({ language: value });
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">System Settings</h1>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode" className="text-lg">Dark Mode</Label>
          <Switch
            id="dark-mode"
            checked={settings.darkMode}
            onCheckedChange={handleDarkModeChange}
            aria-label="Toggle dark mode"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="notifications" className="text-lg">Enable Notifications</Label>
          <Switch
            id="notifications"
            checked={settings.notifications}
            onCheckedChange={handleNotificationsChange}
            aria-label="Toggle notifications"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="language" className="text-lg">Language</Label>
          <Select value={settings.language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => toast({ title: "Settings saved!", description: "Your system settings have been updated." })} className="px-6 py-2">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;