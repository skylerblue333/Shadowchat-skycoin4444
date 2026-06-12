// AUTO-GENERATED DRAFT SCREEN: CryptoTravelRuleScreen
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup

interface TravelRuleData {
  id: string;
  transactionId: string;
  originator: string;
  beneficiary: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: number;
  currency: string;
  timestamp: string;
}

const fetchTravelRuleData = async (): Promise<TravelRuleData[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          transactionId: 'TXN12345',
          originator: 'Alice Smith',
          beneficiary: 'Bob Johnson',
          status: 'approved',
          amount: 1000,
          currency: 'USDT',
          timestamp: '2023-01-15T10:00:00Z',
        },
        {
          id: '2',
          transactionId: 'TXN67890',
          originator: 'Charlie Brown',
          beneficiary: 'Diana Prince',
          status: 'pending',
          amount: 500,
          currency: 'BTC',
          timestamp: '2023-01-15T11:30:00Z',
        },
      ]);
    }, 1500);
  });
};

const CryptoTravelRuleScreen: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { data, isLoading, isError, error } = useQuery<TravelRuleData[], Error>(
    ['travelRuleData'],
    fetchTravelRuleData
  );

  if (isLoading) {
    return (
      <div className={`p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Crypto Travel Rule</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-5/6" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
        <Alert variant="destructive" className="w-full max-w-4xl mx-auto">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load travel rule data: {error?.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={`p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </div>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Crypto Travel Rule</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Travel Rule Transactions</h2>
          {data && data.length > 0 ? (
            <div className="space-y-4">
              {data.map((item) => (
                <div key={item.id} className="border p-4 rounded-md">
                  <p><strong>Transaction ID:</strong> {item.transactionId}</p>
                  <p><strong>Originator:</strong> {item.originator}</p>
                  <p><strong>Beneficiary:</strong> {item.beneficiary}</p>
                  <p><strong>Status:</strong> {item.status}</p>
                  <p><strong>Amount:</strong> {item.amount} {item.currency}</p>
                  <p><strong>Timestamp:</strong> {new Date(item.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No travel rule data available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoTravelRuleScreen;
