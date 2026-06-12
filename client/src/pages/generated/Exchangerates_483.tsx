// AUTO-GENERATED DRAFT SCREEN: ExchangeRates
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Mock tRPC-like hook for fetching data
const useExchangeRates = () => {
  const [data, setData] = useState<ExchangeRate[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData: ExchangeRate[] = [
          { currency: 'BTC', rate: 60000, change24h: 1.5 },
          { currency: 'ETH', rate: 3000, change24h: -0.8 },
          { currency: 'XRP', rate: 0.5, change24h: 2.1 },
          { currency: 'LTC', rate: 150, change24h: 0.2 },
        ];
        setData(mockData);
      } catch (err) {
        setError('Failed to fetch exchange rates.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRates();
  }, []);

  return { data, isLoading, error };
};

interface ExchangeRate {
  currency: string;
  rate: number;
  change24h: number;
}

const ExchangeRates: React.FC = () => {
  const { data: rates, isLoading, error } = useExchangeRates();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Crypto Exchange Rates</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode-switch"
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-switch">Dark Mode</Label>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4" role="alert">Error: {error}</p>}

        <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
          <CardHeader>
            <CardTitle>Current Rates</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Currency</TableHead>
                    <TableHead>Rate (USD)</TableHead>
                    <TableHead className="text-right">24h Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rates?.map((rate) => (
                    <TableRow key={rate.currency}>
                      <TableCell className="font-medium">{rate.currency}</TableCell>
                      <TableCell>${rate.rate.toLocaleString()}</TableCell>
                      <TableCell className={`text-right ${rate.change24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {rate.change24h > 0 ? '+' : ''}{rate.change24h}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExchangeRates;
