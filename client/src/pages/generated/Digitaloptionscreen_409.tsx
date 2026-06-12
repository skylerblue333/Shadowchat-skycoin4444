// AUTO-GENERATED DRAFT SCREEN: DigitalOptionScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Simulating tRPC hook with react-query
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui components
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface DigitalOptionData {
  id: string;
  asset: string;
  strikePrice: number;
  expiry: string;
  currentPrice: number;
  status: 'open' | 'closed';
}

// Simulate tRPC-like data fetching
const fetchDigitalOption = async (optionId: string): Promise<DigitalOptionData> => {
  // In a real app, this would be a tRPC call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: optionId,
        asset: 'BTC/USD',
        strikePrice: 60000,
        expiry: '2026-12-31T23:59:59Z',
        currentPrice: Math.random() * 10000 + 55000, // Simulate price fluctuation
        status: 'open',
      });
    }, 1000);
  });
};

interface DigitalOptionScreenProps {
  optionId: string;
}

const DigitalOptionScreen: React.FC<DigitalOptionScreenProps> = ({ optionId }) => {
  const { data, isLoading, isError, error } = useQuery<DigitalOptionData, Error>(
    ['digitalOption', optionId],
    () => fetchDigitalOption(optionId)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-100">
        <p className="text-lg">Loading digital option data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-100">
        <p className="text-lg text-red-500">Error: {error?.message || 'Failed to load option data'}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-100">
        <p className="text-lg">No digital option data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-2xl mx-auto shadow-lg dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Digital Option: {data.asset}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="strikePrice" className="text-sm font-medium">Strike Price</Label>
              <Input id="strikePrice" type="text" value={`$${data.strikePrice}`} readOnly className="mt-1 dark:bg-gray-700 dark:text-gray-200" />
            </div>
            <div>
              <Label htmlFor="currentPrice" className="text-sm font-medium">Current Price</Label>
              <Input id="currentPrice" type="text" value={`$${data.currentPrice.toFixed(2)}`} readOnly className="mt-1 dark:bg-gray-700 dark:text-gray-200" />
            </div>
            <div>
              <Label htmlFor="expiry" className="text-sm font-medium">Expiry</Label>
              <Input id="expiry" type="text" value={new Date(data.expiry).toLocaleString()} readOnly className="mt-1 dark:bg-gray-700 dark:text-gray-200" />
            </div>
            <div>
              <Label htmlFor="status" className="text-sm font-medium">Status</Label>
              <Input id="status" type="text" value={data.status === 'open' ? 'Open' : 'Closed'} readOnly className="mt-1 dark:bg-gray-700 dark:text-gray-200" />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Button className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
              Trade Option
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalOptionScreen;
