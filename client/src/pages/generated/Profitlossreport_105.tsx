// AUTO-GENERATED DRAFT SCREEN: ProfitLossReport

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC hook simulation
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react"; // For error icon

// Define the structure for individual asset data
interface AssetData {
  id: string; // Unique identifier for the asset
  name: string;
  symbol: string; // e.g., BTC, ETH
  purchasePrice: number;
  currentPrice: number;
  quantity: number;
  lastUpdated: string; // ISO date string
}

// Define the props for the ProfitLossReport component
interface ProfitLossReportProps {
  userId: string; // Identifier for the user whose report is being viewed
  currencySymbol?: string; // Optional currency symbol, defaults to '$'
}

// Simulate a tRPC-like data fetching function
// In a real application, this would be an actual tRPC procedure call
const fetchProfitLossData = async (userId: string): Promise<AssetData[]> => {
  console.log(`Fetching profit/loss data for user: ${userId}`);
  // Simulate network delay and potential errors
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) { // 10% chance of error
        reject(new Error("Failed to connect to crypto data service."));
        return;
      }
      resolve([
        { id: 'btc-1', name: 'Bitcoin', symbol: 'BTC', purchasePrice: 30000, currentPrice: 60000, quantity: 0.5, lastUpdated: '2023-01-15T10:00:00Z' },
        { id: 'eth-1', name: 'Ethereum', symbol: 'ETH', purchasePrice: 2000, currentPrice: 4000, quantity: 2, lastUpdated: '2023-01-15T10:05:00Z' },
        { id: 'doge-1', name: 'Dogecoin', symbol: 'DOGE', purchasePrice: 0.1, currentPrice: 0.05, quantity: 10000, lastUpdated: '2023-01-15T10:10:00Z' },
        { id: 'ada-1', name: 'Cardano', symbol: 'ADA', purchasePrice: 0.5, currentPrice: 0.75, quantity: 500, lastUpdated: '2023-01-15T10:12:00Z' },
        { id: 'sol-1', name: 'Solana', symbol: 'SOL', purchasePrice: 150, currentPrice: 120, quantity: 10, lastUpdated: '2023-01-15T10:18:00Z' },
      ]);
    }, 1500); // Simulate a longer loading time
  });
};

export const ProfitLossReport: React.FC<ProfitLossReportProps> = ({ userId, currencySymbol = '$' }) => {
  // Use react-query to manage data fetching, caching, and loading states
  const { data, isLoading, isError, error, refetch } = useQuery<AssetData[], Error>(
    ['profitLossReport', userId], // Query key includes userId for unique caching
    () => fetchProfitLossData(userId), // The actual data fetching function
    { 
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      refetchOnWindowFocus: false, // Do not refetch automatically on window focus
      retry: 2, // Retry failed requests up to 2 times
    }
  );

  // Display a loading state while data is being fetched
  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto p-4 dark:bg-gray-800 dark:text-white" aria-live="polite" aria-busy="true">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crypto Profit/Loss Report</CardTitle>
          <CardDescription>Loading your financial data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 text-lg">
            <svg className="animate-spin h-5 w-5 mr-3 text-gray-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading profit/loss data...
          </div>
        </CardContent>
      </Card>
    );
  }

  // Display an error message if data fetching fails
  if (isError) {
    return (
      <Card className="w-full max-w-4xl mx-auto p-4 dark:bg-gray-800 dark:text-white" role="alert">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crypto Profit/Loss Report</CardTitle>
          <CardDescription>Error retrieving your financial data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error?.message || 'An unknown error occurred while fetching data.'}
              <button onClick={() => refetch()} className="ml-2 underline">Try again</button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Calculate total profit/loss
  const totalProfitLoss = data?.reduce((acc, asset) => {
    const profitLoss = (asset.currentPrice - asset.purchasePrice) * asset.quantity;
    return acc + profitLoss;
  }, 0) || 0;

  return (
    <Card className="w-full max-w-4xl mx-auto p-4 dark:bg-gray-800 dark:text-white shadow-lg rounded-lg" aria-labelledby="report-title">
      <CardHeader>
        <CardTitle id="report-title" className="text-3xl font-extrabold text-center mb-2">Crypto Profit/Loss Report</CardTitle>
        <CardDescription className="text-center text-gray-500 dark:text-gray-400">Overview of your cryptocurrency investments.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto mb-6">
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <TableHeader className="bg-gray-50 dark:bg-gray-700">
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Asset</TableHead>
                <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Purchase Price</TableHead>
                <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Current Price</TableHead>
                <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Quantity</TableHead>
                <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Profit/Loss</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {data?.map((asset) => {
                const profitLoss = (asset.currentPrice - asset.purchasePrice) * asset.quantity;
                const isProfit = profitLoss >= 0;
                return (
                  <TableRow key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {asset.name} ({asset.symbol})
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-right">{currencySymbol}{asset.purchasePrice.toFixed(2)}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-right">{currencySymbol}{asset.currentPrice.toFixed(2)}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-right">{asset.quantity.toFixed(4)}</TableCell>
                    <TableCell className={cn(
                      "px-6 py-4 whitespace-nowrap text-sm font-semibold text-right",
                      isProfit ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}>
                      {currencySymbol}{profitLoss.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-right text-2xl font-extrabold">
          Total P/L: <span className={cn(totalProfitLoss >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
            {currencySymbol}{totalProfitLoss.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfitLossReport;
