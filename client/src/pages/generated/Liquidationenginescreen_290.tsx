// AUTO-GENERATED DRAFT SCREEN: LiquidationEngineScreen
import React, { useState, useEffect } from 'react';
import { trpc } from './trpc';
import { Button } from './components/ui/button';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Loader2 } from 'lucide-react';

const LiquidationEngineScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize dark mode from local storage or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
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

  const { data, isLoading, error, refetch } = trpc.liquidation.liquidation.useQuery(
    { cryptoId: 'SKYCOIN4444' },
    { retry: false } // Disable retry for immediate error display
  );

  const handleLiquidation = () => {
    // In a real application, this would trigger a tRPC mutation
    alert('Initiating liquidation for SKYCOIN4444...');
    refetch(); // Refetch data after simulated action
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">Crypto: Liquidation Engine</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          {isLoading && (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin" aria-label="Loading" />
              <p className="text-lg text-muted-foreground">Fetching liquidation status...</p>
            </div>
          )}

          {error && (
            <div role="alert" className="text-red-500 text-center">
              <p className="font-semibold">Error loading data:</p>
              <p className="text-sm">{error.message}</p>
              <Button onClick={() => refetch()} className="mt-4">Retry</Button>
            </div>
          )}

          {data && !isLoading && !error && (
            <div className="text-center">
              <p className="text-lg mb-4">Current Status: <span className="font-semibold text-primary">{data.status.toUpperCase()}</span></p>
              <p className="text-md text-muted-foreground">{data.message}</p>
              <Button onClick={handleLiquidation} className="mt-6 w-full">Perform Liquidation</Button>
            </div>
          )}

          <div className="flex items-center space-x-2 mt-8" aria-label="Dark mode toggle">
            <Switch
              id="dark-mode-toggle"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-checked={isDarkMode}
              role="switch"
            />
            <Label htmlFor="dark-mode-toggle">Enable Dark Mode</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiquidationEngineScreen;
