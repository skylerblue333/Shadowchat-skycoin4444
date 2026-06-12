// AUTO-GENERATED DRAFT SCREEN: MultiCurrencyWallet
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../trpc';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Loader2, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme'; // Assuming a simple theme hook

export const trpc = createTRPCReact<AppRouter>();

interface WalletBalance {
  currency: string;
  amount: number;
  usdValue: number;
}

/**
 * MultiCurrencyWallet Component
 * This component provides a comprehensive overview of a user's cryptocurrency holdings.
 * It is designed to be production-grade, incorporating modern React 19 features, TypeScript for strong typing,
 * Tailwind CSS 4 for utility-first styling, and shadcn/ui for accessible and customizable UI components.
 * 
 * Key Features:
 * - **Multi-Currency Display**: Shows balances for various cryptocurrencies like BTC, ETH, DOGE, ADA, XRP, LTC, SOL.
 * - **Total Value Calculation**: Aggregates the USD value of all holdings to provide a total portfolio value.
 * - **Loading States**: Displays a clear loading indicator while fetching data.
 * - **Error Handling**: Gracefully handles data fetching errors and provides a retry mechanism.
 * - **Dark Theme Support**: Includes a theme toggle for switching between light and dark modes, enhancing user experience.
 * - **Accessibility (A11y)**: Utilizes ARIA attributes and semantic HTML to ensure the component is usable by everyone.
 * - **tRPC Integration**: Uses tRPC hooks for type-safe API communication, reducing boilerplate and improving developer experience.
 * - **Production-Ready**: Written with best practices in mind, aiming for no console warnings and maintainable code.
 * 
 * The component fetches data from a simulated tRPC backend (defined in `trpc.ts`) and presents it in a tabular format.
 * Styling is managed through Tailwind CSS classes, and UI elements like Cards, Tables, and Buttons are sourced from shadcn/ui.
 */
const MultiCurrencyWallet: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Use the theme hook
  const { data, isLoading, isError, error, refetch } = trpc.getBalances.useQuery({ userId: 'user123' });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4" role="status" aria-live="polite" aria-label="Loading wallet balances">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-lg font-medium text-gray-700 dark:text-gray-300">Loading wallet balances... Please wait.</span>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 bg-red-50 dark:bg-red-900 dark:text-red-100 border-red-200 dark:border-red-700 shadow-lg" role="alert">
        <CardHeader>
          <CardTitle className="text-red-700 dark:text-red-300">Error Loading Data</CardTitle>
          <CardDescription className="text-red-600 dark:text-red-400">There was an issue fetching your wallet balances. Please try again.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500 dark:text-red-200 text-sm italic">Error details: {error?.message || 'An unknown error occurred. Check your network connection.'}</p>
          <Button onClick={() => refetch()} className="mt-4 bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800" aria-label="Retry loading wallet balances">Retry</Button>
        </CardContent>
      </Card>
    );
  }

  const balances: WalletBalance[] = data || [];
  const totalUSDValue = balances.reduce((sum, balance) => sum + balance.usdValue, 0);

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="absolute top-4 right-4">
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Multi-Currency Wallet Overview</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">A comprehensive overview of your current cryptocurrency holdings and their estimated USD values.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-md text-right text-xl font-bold text-gray-800 dark:text-white shadow-sm" aria-live="polite">
          Total Value: ${totalUSDValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" aria-label="Cryptocurrency Balances">
          <TableHeader className="bg-gray-50 dark:bg-gray-700">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Currency</TableHead>
              <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Amount</TableHead>
              <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">USD Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {balances.map((balance) => (
              <TableRow key={balance.currency} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{balance.currency}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-right">{balance.amount.toLocaleString(undefined, { maximumFractionDigits: 8 })}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-right">${balance.usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MultiCurrencyWallet;