// AUTO-GENERATED DRAFT SCREEN: MoneroDashboard
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { ModeToggle } from './components/mode-toggle';
import { trpc } from './lib/trpc';

const MoneroDashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize dark mode from localStorage or system preference
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Using a mock tRPC hook for now, as the actual tRPC server is not set up.
  // In a real application, this would be `trpc.monero.useQuery({ text: 'monero' });`
  const { data, isLoading, error } = trpc.monero.useQuery({ text: 'monero' });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100" role="status" aria-live="polite">
        <p className="text-lg">Loading Monero Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100" role="alert" aria-live="assertive">
        <p className="text-lg text-red-500">Error loading data: {error.message}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold" tabIndex={0}>Monero Dashboard</h1>
        <ModeToggle onToggle={toggleDarkMode} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="dark:bg-gray-800 dark:text-white" tabIndex={0} aria-labelledby="balance-title">
          <CardHeader>
            <CardTitle id="balance-title">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data?.balance}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:text-white" tabIndex={0} aria-labelledby="price-title">
          <CardHeader>
            <CardTitle id="price-title">XMR Price</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data?.price}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:text-white" tabIndex={0} aria-labelledby="transactions-title">
          <CardHeader>
            <CardTitle id="transactions-title">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data?.transactions}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:text-white" tabIndex={0} aria-labelledby="hashrate-title">
          <CardHeader>
            <CardTitle id="hashrate-title">Network Hash Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data?.networkHashRate}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoneroDashboard;
