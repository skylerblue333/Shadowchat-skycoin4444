// AUTO-GENERATED DRAFT SCREEN: OnboardingBackgroundCheck
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC/react-query
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

interface BackgroundCheckData {
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  details?: string;
}

// Mock tRPC hook for demonstration. In a real app, this would interact with a tRPC backend.
const useGetBackgroundCheckStatus = () => {
  return useQuery<BackgroundCheckData, Error>({
    queryKey: ['backgroundCheckStatus'],
    queryFn: async () => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          const statuses: BackgroundCheckData['status'][] = ['pending', 'in_progress', 'completed', 'failed'];
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
          resolve({ status: randomStatus, details: 'Simulated details for ' + randomStatus });
        }, 1500);
      });
    },
    refetchInterval: 5000, // Refetch every 5 seconds to simulate updates
  });
};

const OnboardingBackgroundCheck: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { data, isLoading, error, refetch } = useGetBackgroundCheckStatus();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderStatus = () => {
    if (isLoading) {
      return <p className="text-gray-500 dark:text-gray-400">Loading background check status...</p>;
    }

    if (error) {
      return <p className="text-red-500 dark:text-red-400">Error: {error.message}</p>;
    }

    if (!data) {
      return <p className="text-gray-500 dark:text-gray-400">No status data available.</p>;
    }

    switch (data.status) {
      case 'pending':
        return <p className="text-yellow-600 dark:text-yellow-400">Status: Pending. Awaiting initiation.</p>;
      case 'in_progress':
        return <p className="text-blue-600 dark:text-blue-400">Status: In Progress. Please wait.</p>;
      case 'completed':
        return <p className="text-green-600 dark:text-green-400">Status: Completed successfully!</p>;
      case 'failed':
        return <p className="text-red-600 dark:text-red-400">Status: Failed. Please contact support. {data.details}</p>;
      default:
        return <p className="text-gray-600 dark:text-gray-400">Unknown status.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Background Check</CardTitle>
          <CardDescription>Monitor the status of your background verification process.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode-switch" className="flex items-center gap-2">
              {isDarkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
              <span>Dark Mode</span>
            </Label>
            <Switch
              id="dark-mode-switch"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Current Status:</h3>
            {renderStatus()}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" aria-label="Acknowledge background check terms" />
            <Label htmlFor="terms">
              I acknowledge the terms and conditions of the background check.
            </Label>
          </div>

          <Button
            onClick={() => refetch()} // Simulate re-checking status
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Checking...' : 'Refresh Status'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingBackgroundCheck;
