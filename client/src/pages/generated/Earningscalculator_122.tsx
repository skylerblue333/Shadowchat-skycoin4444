// AUTO-GENERATED DRAFT SCREEN: EarningsCalculator

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Button } from './components/ui/button';
import { Switch } from './components/ui/switch';
import { Slider } from './components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Loader2 } from 'lucide-react';

interface CryptoData {
  price: number;
  apy: number;
}

const fetchCryptoData = async (cryptoSymbol: string): Promise<CryptoData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (cryptoSymbol.toLowerCase() === 'skycoin4444') {
        resolve({ price: 0.05, apy: 0.15 }); // Example data
      } else {
        resolve({ price: 1.0, apy: 0.05 }); // Default data for other cryptos
      }
    }, 1000);
  });
};

const EarningsCalculator: React.FC = () => {
  const [investment, setInvestment] = useState<number>(1000);
  const [duration, setDuration] = useState<number>(1);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useQuery<CryptoData, Error>(
    ['cryptoData', 'skycoin4444'],
    () => fetchCryptoData('skycoin4444')
  );

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const calculateEarnings = () => {
    if (!data) return 0;
    const { price, apy } = data;
    // Simple compound interest calculation for demonstration
    return investment * Math.pow(1 + apy, duration);
  };

  const estimatedEarnings = calculateEarnings();

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crypto: Earnings Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
              <p>Loading crypto data...</p>
            </div>
          )}

          {isError && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Failed to load crypto data: {error?.message}</AlertDescription>
            </Alert>
          )}

          {data && (
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="investment">Initial Investment (USD)</Label>
                <Input
                  id="investment"
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  placeholder="Enter investment amount"
                  aria-label="Initial Investment Amount"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (Years)</Label>
                <Slider
                  id="duration"
                  min={1}
                  max={10}
                  step={1}
                  value={[duration]}
                  onValueChange={(val) => setDuration(val[0])}
                  aria-label="Investment Duration in Years"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">{duration} Year(s)</p>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="dark-theme">Dark Theme</Label>
                <Switch
                  id="dark-theme"
                  checked={isDarkTheme}
                  onCheckedChange={setIsDarkTheme}
                  aria-label="Toggle Dark Theme"
                />
              </div>

              <div className="grid gap-2">
                <Label>Estimated Earnings</Label>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ${estimatedEarnings.toFixed(2)}
                </p>
              </div>

              <Button className="w-full">Calculate</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsCalculator;
