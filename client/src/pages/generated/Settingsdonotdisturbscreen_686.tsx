// AUTO-GENERATED DRAFT SCREEN: SettingsDoNotDisturbScreen
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation } from '@trpc/react-query';
import { cn } from '@/lib/utils';

interface DoNotDisturbSettings {
  enabled: boolean;
  scheduleStart: string;
  scheduleEnd: string;
}

// Simulate tRPC API calls
const api = {
  settings: {
    getDoNotDisturb: async (): Promise<DoNotDisturbSettings> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { enabled: false, scheduleStart: '22:00', scheduleEnd: '07:00' };
    },
    updateDoNotDisturb: async (settings: DoNotDisturbSettings): Promise<DoNotDisturbSettings> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Updating Do Not Disturb settings:', settings);
      return settings;
    },
  },
};

export const SettingsDoNotDisturbScreen: React.FC = () => {
  const { data, isLoading, error } = useQuery(['doNotDisturbSettings'], api.settings.getDoNotDisturb);
  const mutation = useMutation(api.settings.updateDoNotDisturb);

  const [doNotDisturb, setDoNotDisturb] = useState<DoNotDisturbSettings | null>(null);

  useEffect(() => {
    if (data) {
      setDoNotDisturb(data);
    }
  }, [data]);

  const handleToggle = async (checked: boolean) => {
    if (doNotDisturb) {
      const updatedSettings = { ...doNotDisturb, enabled: checked };
      setDoNotDisturb(updatedSettings);
      try {
        await mutation.mutateAsync(updatedSettings);
      } catch (e) {
        console.error('Failed to update Do Not Disturb settings:', e);
        // Revert on error
        setDoNotDisturb(doNotDisturb);
      }
    }
  };

  const isDarkTheme = document.documentElement.classList.contains('dark'); // Simulate dark theme detection

  if (isLoading) {
    return <div className="p-4 text-gray-500 dark:text-gray-400">Loading settings...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600 dark:text-red-400">Error loading settings.</div>;
  }

  if (!doNotDisturb) {
    return <div className="p-4 text-gray-500 dark:text-gray-400">No settings found.</div>;
  }

  return (
    <div className={cn(
      "p-6 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-md",
      isDarkTheme ? 'text-gray-100' : 'text-gray-900'
    )}>
      <h2 className="text-2xl font-bold">Do Not Disturb</h2>

      <div className="flex items-center justify-between">
        <Label htmlFor="do-not-disturb-toggle" className="text-lg cursor-pointer">
          Enable Do Not Disturb
        </Label>
        <Switch
          id="do-not-disturb-toggle"
          checked={doNotDisturb.enabled}
          onCheckedChange={handleToggle}
          aria-label="Toggle Do Not Disturb mode"
          disabled={mutation.isLoading}
        />
      </div>

      {doNotDisturb.enabled && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Calls and notifications will be silenced during the scheduled time.
          </p>
          <div className="flex items-center space-x-4">
            <Label htmlFor="schedule-start">Start Time:</Label>
            <input
              id="schedule-start"
              type="time"
              value={doNotDisturb.scheduleStart}
              className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              aria-label="Do Not Disturb start time"
              disabled
            />
            <Label htmlFor="schedule-end">End Time:</Label>
            <input
              id="schedule-end"
              type="time"
              value={doNotDisturb.scheduleEnd}
              className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              aria-label="Do Not Disturb end time"
              disabled
            />
          </div>
        </div>
      )}

      {mutation.isLoading && (
        <p className="text-sm text-blue-600 dark:text-blue-400">Saving changes...</p>
      )}
      {mutation.isError && (
        <p className="text-sm text-red-600 dark:text-red-400">Failed to save changes. Please try again.</p>
      )}
    </div>
  );
};


export default SettingsDoNotDisturbScreen;
