// AUTO-GENERATED DRAFT SCREEN: ExchangeSyncScreen
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation } from '@tanstack/react-query'; // Placeholder for tRPC hooks
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface ExchangeSyncData {
  exchangeName: string;
  lastSync: string;
  status: 'success' | 'failed' | 'pending';
}

// Mock API calls for demonstration
const fetchExchangeStatus = async (): Promise<ExchangeSyncData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { exchangeName: 'Binance', lastSync: '2023-10-26 10:00:00', status: 'success' },
        { exchangeName: 'Coinbase', lastSync: '2023-10-26 09:30:00', status: 'failed' },
        { exchangeName: 'Kraken', lastSync: '2023-10-26 11:00:00', status: 'pending' },
      ]);
    }, 1000);
  });
};

const syncExchange = async (exchangeName: string): Promise<ExchangeSyncData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve({ exchangeName, lastSync: new Date().toLocaleString(), status: 'success' });
      } else {
        reject(new Error(`Failed to sync ${exchangeName}`));
      }
    }, 1500);
  });
};

const ExchangeSyncScreen: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const { data, isLoading, isError, error, refetch } = useQuery<ExchangeSyncData[], Error>({ queryKey: ['exchangeStatus'], queryFn: fetchExchangeStatus });

  const mutation = useMutation<ExchangeSyncData, Error, string>({
    mutationFn: syncExchange,
    onSuccess: () => {
      refetch();
    },
  });

  const handleSync = (exchangeName: string) => {
    mutation.mutate(exchangeName);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading exchange status" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 text-red-500">
        <AlertCircle className="h-8 w-8 mb-2" aria-hidden="true" />
        <p role="alert">Error loading exchange data: {error?.message}</p>
        <Button onClick={() => refetch()} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Crypto Exchange Sync</h1>

        <div className="flex justify-end items-center mb-6">
          <Label htmlFor="dark-mode" className="mr-2">Dark Mode</Label>
          <Switch
            id="dark-mode"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((exchange) => (
            <Card key={exchange.exchangeName} className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{exchange.exchangeName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">Last Sync: {exchange.lastSync}</p>
                <div className="flex items-center mb-4">
                  {exchange.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500 mr-2" aria-hidden="true" />}
                  {exchange.status === 'failed' && <AlertCircle className="h-5 w-5 text-red-500 mr-2" aria-hidden="true" />}
                  {exchange.status === 'pending' && <Loader2 className="h-5 w-5 animate-spin text-yellow-500 mr-2" aria-hidden="true" />}
                  <span className={`font-medium ${exchange.status === 'success' ? 'text-green-500' : exchange.status === 'failed' ? 'text-red-500' : 'text-yellow-500'}`}>
                    Status: {exchange.status.charAt(0).toUpperCase() + exchange.status.slice(1)}
                  </span>
                </div>
                <Button
                  onClick={() => handleSync(exchange.exchangeName)}
                  disabled={mutation.isPending && mutation.variables === exchange.exchangeName}
                  className="w-full"
                >
                  {mutation.isPending && mutation.variables === exchange.exchangeName ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : null}
                  Sync Now
                </Button>
                {mutation.isError && mutation.variables === exchange.exchangeName && (
                  <p className="text-red-500 text-sm mt-2" role="alert">Sync failed: {mutation.error?.message}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExchangeSyncScreen;
