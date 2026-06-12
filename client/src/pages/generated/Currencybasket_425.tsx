// AUTO-GENERATED DRAFT SCREEN: CurrencyBasket
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ExclamationTriangleIcon, ReloadIcon } from '@radix-ui/react-icons';
import { trpc } from '@/utils/trpc'; // Assuming trpc is configured and available

interface Currency {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  changePercent24Hr: string;
}

const fetchCurrencyBasket = async (): Promise<Currency[]> => {
  // In a real application, this would fetch data from a tRPC endpoint.
  // For demonstration, we'll return mock data with a slight delay.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', priceUsd: '60000.00', changePercent24Hr: '2.5' },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', priceUsd: '3000.00', changePercent24Hr: '-1.2' },
        { id: 'ripple', name: 'Ripple', symbol: 'XRP', priceUsd: '0.50', changePercent24Hr: '0.8' },
        { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', priceUsd: '150.00', changePercent24Hr: '3.1' },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA', priceUsd: '0.70', changePercent24Hr: '-0.5' },
        { id: 'solana', name: 'Solana', symbol: 'SOL', priceUsd: '180.00', changePercent24Hr: '4.2' },
        { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', priceUsd: '0.15', changePercent24Hr: '1.1' },
      ]);
    }, 1500);
  });
};

export function CurrencyBasket() {
  const { data, isLoading, isError, error, refetch } = useQuery<Currency[]>({ 
    queryKey: ['currencyBasket'], 
    queryFn: fetchCurrencyBasket, 
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });

  const lastUpdated = new Date().toLocaleString();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
        <Card className="w-full max-w-3xl shadow-lg dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
          <CardFooter className="text-sm text-gray-500 dark:text-gray-400">
            <Skeleton className="h-4 w-32" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
        <Alert variant="destructive" className="w-full max-w-3xl">
          <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
          <AlertTitle>Error Loading Data</AlertTitle>
          <AlertDescription>
            Failed to load crypto currency basket data. Please try again later. {error?.message}
          </AlertDescription>
          <Button onClick={() => refetch()} className="mt-4" variant="outline">
            <ReloadIcon className="h-4 w-4 mr-2" /> Retry
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      <Card className="w-full max-w-3xl shadow-lg dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight dark:text-white">Crypto Currency Basket</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Overview of selected cryptocurrencies and their 24-hour performance.
            </CardDescription>
          </div>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            <ReloadIcon className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableHead className="w-[150px] text-gray-700 dark:text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Symbol</TableHead>
                  <TableHead className="text-right text-gray-700 dark:text-gray-300">Price (USD)</TableHead>
                  <TableHead className="text-right text-gray-700 dark:text-gray-300">Change (24Hr)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((currency) => (
                  <TableRow key={currency.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <TableCell className="font-medium text-gray-900 dark:text-white">{currency.name}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-200">{currency.symbol}</TableCell>
                    <TableCell className="text-right text-gray-800 dark:text-gray-100">${parseFloat(currency.priceUsd).toFixed(2)}</TableCell>
                    <TableCell className={`text-right font-semibold ${parseFloat(currency.changePercent24Hr) > 0 ? 'text-green-600' : 'text-red-600'} dark:${parseFloat(currency.changePercent24Hr) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {parseFloat(currency.changePercent24Hr).toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
          <span>Last updated: {lastUpdated}</span>
          <a href="#" className="text-blue-500 hover:underline dark:text-blue-400">View more details</a>
        </CardFooter>
      </Card>
    </div>
  );
}


export default function Currencybasket_425() { return null; }
