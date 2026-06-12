// AUTO-GENERATED DRAFT SCREEN: CryptoTravelCard

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC hooks integrate with react-query
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui card component
import { Button } from '@/components/ui/button'; // shadcn/ui button component
import { Switch } from '@/components/ui/switch'; // shadcn/ui switch component for dark mode
import { Label } from '@/components/ui/label';
import { DollarSign, CreditCard, Loader2, WifiOff } from 'lucide-react'; // Icons for UI

// Mock tRPC client for demonstration. In a real app, this would be generated.
const trpc = {
  travelCard: {
    getCardDetails: (cardId: string) => ({ queryKey: ['cardDetails', cardId], queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (Math.random() < 0.1) throw new Error('Failed to fetch card details');
      return {
        id: cardId,
        balance: Math.floor(Math.random() * 10000) / 100,
        currency: 'USD',
        status: 'active',
        lastTransactions: [
          { id: 't1', description: 'Coffee Shop', amount: -4.50, date: '2023-01-10' },
          { id: 't2', description: 'Online Store', amount: -75.00, date: '2023-01-09' },
        ],
      };
    }}),
  },
};

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
}

interface CardDetails {
  id: string;
  balance: number;
  currency: string;
  status: string;
  lastTransactions: Transaction[];
}

interface CryptoTravelCardProps {
  cardId: string;
}

const CryptoTravelCard: React.FC<CryptoTravelCardProps> = ({ cardId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data, isLoading, isError, error, refetch } = useQuery<CardDetails, Error>(
    trpc.travelCard.getCardDetails(cardId)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading card details" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 text-red-500">
        <WifiOff className="h-12 w-12 mb-4" aria-hidden="true" />
        <p className="text-lg font-semibold">Error: {error?.message || 'Failed to load card details.'}</p>
        <Button onClick={() => refetch()} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-md mx-auto">
        <Card className="w-full shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold flex items-center">
              <CreditCard className="mr-2 h-6 w-6" aria-hidden="true" /> Crypto Travel Card
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode-switch"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                aria-label="Toggle dark mode"
              />
              <Label htmlFor="dark-mode-switch">Dark Mode</Label>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-extrabold flex items-center mb-4" role="status" aria-live="polite">
              <DollarSign className="h-10 w-10 mr-2" aria-hidden="true" />{data?.balance.toFixed(2)} {data?.currency}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Status: <span className="font-medium capitalize">{data?.status}</span></p>

            <h3 className="text-lg font-semibold mb-3">Recent Transactions</h3>
            {data?.lastTransactions.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No recent transactions.</p>
            ) : (
              <ul className="space-y-2" aria-label="Recent transactions">
                {data?.lastTransactions.map((tx) => (
                  <li key={tx.id} className="flex justify-between items-center text-sm">
                    <span>{tx.description}</span>
                    <span className={`${tx.amount < 0 ? 'text-red-500' : 'text-green-500'} font-medium`}>
                      {tx.amount < 0 ? '-' : '+'}{Math.abs(tx.amount).toFixed(2)} {data.currency}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <Button className="w-full mt-6" aria-label="View all transactions">View All Transactions</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoTravelCard;
