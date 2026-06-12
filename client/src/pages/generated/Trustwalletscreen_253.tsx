// AUTO-GENERATED DRAFT SCREEN: TrustWalletScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SunIcon, MoonIcon, WalletIcon } from 'lucide-react';

interface CryptoBalance {
  currency: string;
  amount: string;
  usdValue: string;
}

const TrustWalletScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // Simulate fetching data with tRPC
  const { data, isLoading, error } = useQuery<CryptoBalance[]>(
    ['cryptoBalances'],
    async () => {
      // Replace with actual tRPC call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { currency: 'BTC', amount: '0.05', usdValue: '3500.00' },
            { currency: 'ETH', amount: '0.75', usdValue: '2250.00' },
            { currency: 'BNB', amount: '2.00', usdValue: '600.00' },
          ]);
        }, 1500);
      });
    }
  );

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load wallet data.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center">
            <WalletIcon className="mr-2" /> Trust Wallet
          </h1>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold">$6350.00 USD</p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mb-4">Your Assets</h2>
        <div className="grid gap-4">
          {data?.map((balance) => (
            <Card key={balance.currency}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{balance.currency}</CardTitle>
                <span className="text-muted-foreground">{balance.amount}</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${balance.usdValue}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustWalletScreen;
