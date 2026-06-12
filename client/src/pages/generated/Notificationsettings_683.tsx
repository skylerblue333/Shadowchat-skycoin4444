// AUTO-GENERATED DRAFT SCREEN: NotificationSettings
import React, { useState, useEffect, useCallback } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useNotificationSettings } from '@/hooks/useNotificationSettings'; // Assuming tRPC hook for data fetching and mutations
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Info, CheckCircle2 } from 'lucide-react'; // Added Info and CheckCircle2 for better UX
import { useToast } from '@/components/ui/use-toast'; // Assuming shadcn/ui toast for notifications

// Define the interface for a single notification type
interface NotificationType {
  id: string;
  name: string;
  description: string; // Added description for more context
  enabled: boolean;
  category: 'system' | 'marketing' | 'security'; // Added category for filtering/grouping
}

// Main component for Notification Settings
const NotificationSettings: React.FC = () => {
  // Initialize toast hook for user feedback
  const { toast } = useToast();

  // tRPC hook for fetching and updating notification settings
  // Assuming useNotificationSettings provides: data, isLoading, isError, error, updateSetting (mutation)
  const { data, isLoading, isError, error, updateSetting } = useNotificationSettings();

  // Local state to manage notification settings, initialized from tRPC data
  const [settings, setSettings] = useState<NotificationType[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false); // State to indicate saving process

  // Effect to update local settings when tRPC data changes
  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  // Handler for toggling notification settings
  const handleToggle = useCallback(async (id: string, currentStatus: boolean) => {
    setIsSaving(true); // Set saving state
    try {
      // Optimistically update UI
      setSettings(prevSettings =>
        prevSettings.map(setting =>
          setting.id === id ? { ...setting, enabled: !currentStatus } : setting
        )
      );

      // Call tRPC mutation to update the setting on the server
      await updateSetting(id, !currentStatus); // Assuming updateSetting is an async function

      // Show success toast
      toast({
        title: 'Settings Updated',
        description: 'Your notification preferences have been saved.',
        action: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      });
    } catch (err: any) {
      // Revert UI on error
      setSettings(prevSettings =>
        prevSettings.map(setting =>
          setting.id === id ? { ...setting, enabled: currentStatus } : setting
        )
      );
      // Show error toast
      toast({
        title: 'Update Failed',
        description: `Failed to save settings: ${err.message || 'Unknown error'}`, 
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false); // Reset saving state
    }
  }, [updateSetting, toast]);

  // Render loading state with skeletons
  if (isLoading) {
    return (
      <div className="space-y-6 p-8 bg-background text-foreground min-h-screen dark:bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-gray-100">Notification Types</h2>
        <p className="text-muted-foreground text-gray-400">Loading your notification preferences...</p>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
            <div className="flex flex-col space-y-2 w-3/4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <Skeleton className="h-8 w-14 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  // Render error state
  if (isError) {
    return (
      <Alert variant="destructive" className="p-8 bg-red-900/20 border-red-500 text-red-200 min-h-screen dark:bg-red-900/30 rounded-lg shadow-lg">
        <Terminal className="h-5 w-5 text-red-400" />
        <AlertTitle className="text-red-100">Error Loading Settings</AlertTitle>
        <AlertDescription className="text-red-200">
          We encountered an issue loading your notification settings. Please try again later.
          {error?.message && <span className="block mt-2 text-sm opacity-80">Details: {error.message}</span>}
        </AlertDescription>
      </Alert>
    );
  }

  // Main component render
  return (
    <div className="space-y-8 p-8 bg-background text-foreground min-h-screen dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-gray-100">Notification Types</h2>
        {isSaving && (
          <div className="flex items-center text-sm text-blue-400">
            <Info className="h-4 w-4 mr-2 animate-pulse" />
            <span>Saving...</span>
          </div>
        )}
      </div>
      <p className="text-muted-foreground text-gray-400">Manage your preferences for different types of notifications. Control what alerts you receive and how.</p>

      <div className="space-y-6">
        {settings.length > 0 ? (
          settings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between p-5 border border-gray-700 rounded-xl shadow-sm bg-gray-800 hover:bg-gray-700 transition-colors duration-200">
              <div className="flex flex-col gap-1">
                <Label htmlFor={`toggle-${setting.id}`} className="text-lg font-semibold text-gray-50 cursor-pointer">
                  {setting.name}
                </Label>
                <p className="text-sm text-gray-400">{setting.description}</p>
              </div>
              <Switch
                id={`toggle-${setting.id}`}
                checked={setting.enabled}
                onCheckedChange={() => handleToggle(setting.id, setting.enabled)}
                aria-label={`Toggle ${setting.name} notifications`}
                disabled={isSaving} // Disable switch during saving
                className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-600"
              />
            </div>
          ))
        ) : (
          <div className="text-center py-10 border border-dashed border-gray-700 rounded-lg text-gray-500">
            <p className="text-lg">No notification types available at the moment.</p>
            <p className="text-sm mt-2">Please check back later or contact support if you believe this is an error.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;
