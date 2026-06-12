// AUTO-GENERATED DRAFT SCREEN: EmissionSchedule
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup in '../utils/trpc'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // shadcn/ui Card
import { Skeleton } from './ui/skeleton'; // shadcn/ui Skeleton for loading states
import { Alert, AlertDescription, AlertTitle } from './ui/alert'; // shadcn/ui Alert for error handling
import { Terminal, Sun, Moon } from 'lucide-react'; // Lucide icons for Alert and dark mode toggle

// Interface for the emission schedule data structure
interface EmissionScheduleData {
  block: number;
  emissionAmount: number;
  timestamp: string;
}

/**
 * EmissionSchedule Component
 * Displays the emission schedule for SKYCOIN4444, including loading states, error handling, and dark theme support.
 */
const EmissionSchedule: React.FC = () => {
  // Fetch emission schedule data using tRPC hook
  const { data, isLoading, isError, error } = trpc.crypto.getEmissionSchedule.useQuery();

  // State for managing dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Initialize dark mode from local storage or system preference
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') === 'dark';
    }
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Effect to apply dark mode class to the document element and update local storage
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Display loading state with skeleton components
  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto p-6 shadow-lg dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold dark:text-white">Emission Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Display error message if data fetching fails
  if (isError) {
    return (
      <Alert variant="destructive" className="w-full max-w-4xl mx-auto">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load emission schedule: {error?.message || 'Unknown error'}
        </AlertDescription>
      </Alert>
    );
  }

  // Render the emission schedule data
  return (
    <Card className="w-full max-w-4xl mx-auto p-6 shadow-lg dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold dark:text-white">SKYCOIN4444 Emission Schedule</CardTitle>
        {/* Dark mode toggle button */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-200">Upcoming Emissions</h3>
        {data && data.length > 0 ? (
          <ul className="space-y-2">
            {data.map((item: EmissionScheduleData, index: number) => (
              <li key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <span className="font-medium dark:text-gray-100">Block: {item.block}</span>
                <span className="text-gray-700 dark:text-gray-300">Amount: {item.emissionAmount}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Date: {new Date(item.timestamp).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No emission data available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default EmissionSchedule;
