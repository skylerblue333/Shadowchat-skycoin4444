// AUTO-GENERATED DRAFT SCREEN: ThemeSettings
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes'; // Assuming next-themes for dark mode management
import { Switch } from '@/components/ui/switch'; // shadcn/ui Switch component for toggling
import { Label } from '@/components/ui/label'; // shadcn/ui Label component for form elements
import { Button } from '@/components/ui/button'; // shadcn/ui Button component for actions
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // shadcn/ui Select for dropdowns
import { Slider } from '@/components/ui/slider'; // shadcn/ui Slider for range inputs
import { useQuery, useMutation } from '@trpc/react-query'; // tRPC hooks for data fetching and mutations
import { type AppRouter } from '@/server/api/root'; // Assuming tRPC app router type for strong typing

// Define the props interface for the ThemeSettings component for better type safety
interface ThemeSettingsProps {
  userId: string; // Unique identifier for the user whose settings are being managed
}

// Define the ThemeSettings React functional component
const ThemeSettings: React.FC<ThemeSettingsProps> = ({ userId }) => {
  // Access theme state and setter from next-themes library
  const { theme, setTheme } = useTheme();
  // State to manage the dark theme toggle locally
  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(theme === 'dark');
  // State to manage primary color selection
  const [primaryColor, setPrimaryColor] = useState('blue');
  // State to manage font size preference
  const [fontSize, setFontSize] = useState([16]);

  // Simulate tRPC query to fetch user's theme preferences from the backend
  // This query is enabled only when a userId is provided
  const { data: userPreferences, isLoading, isError, error } = useQuery<
    AppRouter['user']['getPreferences']
  >(
    ['user.getPreferences', { userId }],
    { enabled: !!userId } // Only run query if userId is available
  );

  // Simulate tRPC mutation to update user's theme preferences on the backend
  const updateThemeMutation = useMutation<
    AppRouter['user']['updatePreferences']
  >(
    ['user.updatePreferences'],
    {
      // Callback for successful mutation
      onSuccess: () => {
        console.log('Theme preferences updated successfully');
        // Optionally, invalidate queries or show a toast notification here
      },
      // Callback for failed mutation
      onError: (err) => {
        console.error('Failed to update theme preferences:', err.message);
        // Optionally, show an error message to the user
      },
    }
  );

  // Effect to synchronize local dark theme state with the global theme context
  useEffect(() => {
    setIsDarkThemeEnabled(theme === 'dark');
  }, [theme]);

  // Handler for the dark mode toggle switch
  const handleThemeToggle = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme); // Update global theme context
    setIsDarkThemeEnabled(checked); // Update local state
    // Trigger tRPC mutation to persist the new theme preference
    updateThemeMutation.mutate({ userId, theme: newTheme, primaryColor, fontSize: fontSize[0] });
  };

  // Handler for primary color selection
  const handlePrimaryColorChange = (value: string) => {
    setPrimaryColor(value);
    updateThemeMutation.mutate({ userId, theme: theme || 'light', primaryColor: value, fontSize: fontSize[0] });
  };

  // Handler for font size slider
  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value);
    updateThemeMutation.mutate({ userId, theme: theme || 'light', primaryColor, fontSize: value[0] });
  };

  // Display loading state while fetching user preferences
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 min-h-[200px]">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Loading theme settings...</p>
      </div>
    );
  }

  // Display error state if fetching user preferences fails
  if (isError) {
    return (
      <div role="alert" className="p-6 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="font-semibold mb-2">Error loading theme settings:</p>
        <p className="text-sm">{error?.message || 'An unknown error occurred.'}</p>
        <Button onClick={() => window.location.reload()} className="mt-4 bg-red-500 hover:bg-red-600 text-white">
          Retry Loading
        </Button>
      </div>
    );
  }

  // Main component rendering for theme settings
  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-8 max-w-2xl bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg" aria-labelledby="theme-settings-heading">
      <h1 id="theme-settings-heading" className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
        Crypto Theme Settings
      </h1>

      {/* Dark Mode Toggle Section */}
      <div className="flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 ease-in-out hover:shadow-md">
        <Label htmlFor="dark-mode-toggle" className="text-lg font-medium text-gray-700 dark:text-gray-200 cursor-pointer">
          Enable Dark Mode
        </Label>
        <Switch
          id="dark-mode-toggle"
          checked={isDarkThemeEnabled}
          onCheckedChange={handleThemeToggle}
          aria-label="Toggle dark mode for the application"
          className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300"
        />
      </div>

      {/* Primary Color Selection Section */}
      <div className="flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 ease-in-out hover:shadow-md">
        <Label htmlFor="primary-color-select" className="text-lg font-medium text-gray-700 dark:text-gray-200">Primary Color</Label>
        <Select value={primaryColor} onValueChange={handlePrimaryColorChange}>
          <SelectTrigger id="primary-color-select" className="w-[180px]">
            <SelectValue placeholder="Select a color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="purple">Purple</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Font Size Adjustment Section */}
      <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 ease-in-out hover:shadow-md">
        <Label htmlFor="font-size-slider" className="text-lg font-medium text-gray-700 dark:text-gray-200 block mb-4">Font Size</Label>
        <Slider
          id="font-size-slider"
          min={12}
          max={20}
          step={1}
          value={fontSize}
          onValueChange={handleFontSizeChange}
          className="w-full"
          aria-label="Adjust font size"
        />
        <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-2">{fontSize[0]}px</div>
      </div>

      {/* Save Confirmation/Information */}
      <div className="p-4 text-center text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
        <p>Your theme preferences are saved automatically.</p>
        <p className="mt-1">Changes will be applied instantly across the application.</p>
      </div>
    </div>
  );
};

export default ThemeSettings;
