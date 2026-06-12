// AUTO-GENERATED DRAFT SCREEN: DcaScreen
import React, { useState, useEffect } from 'react';
import { cn } from './lib/utils';
import { useQuery } from '@tanstack/react-query';
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import { z } from 'zod';

// Define your tRPC app router schema (simplified for client-side)
const appRouter = {
  crypto: {
    getDcaData: z.object({
      currency: z.string(),
      investment: z.number(),
      frequency: z.string(),
      data: z.array(z.object({
        date: z.string(),
        price: z.number(),
        amount: z.number(),
        totalInvested: z.number(),
        totalCrypto: z.number(),
        avgPrice: z.number(),
      }))
    }),
  },
};

// Infer the type of your router
type AppRouter = typeof appRouter;

// Initialize tRPC client
const trpc = createTRPCReact<AppRouter>();

const client = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc', // Replace with your tRPC API endpoint
    }),
  ],
});

interface DcaDataPoint {
  date: string;
  price: number;
  amount: number;
  totalInvested: number;
  totalCrypto: number;
  avgPrice: number;
}

interface DcaScreenProps {
  currency: string;
  investmentAmount: number;
  investmentFrequency: 'daily' | 'weekly' | 'monthly';
}

const DcaScreen: React.FC<DcaScreenProps> = ({ currency, investmentAmount, investmentFrequency }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const { data, isLoading, isError, error } = trpc.crypto.getDcaData.useQuery({
    currency,
    investment: investmentAmount,
    frequency: investmentFrequency,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg">Loading DCA data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100">
        <p className="text-lg">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <trpc.Provider client={client} queryClient={new (require('@tanstack/react-query').QueryClient)()}>
      <div className={cn(
        "min-h-screen p-8",
        "bg-background text-foreground",
        "flex flex-col items-center",
        isDarkTheme ? "dark" : ""
      )}>
        <h1 className="text-4xl font-bold mb-8">Dollar Cost Averaging: {currency}</h1>

        <button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className="mb-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Toggle {isDarkTheme ? 'Light' : 'Dark'} Theme
        </button>

        <div className="w-full max-w-4xl bg-card text-card-foreground p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-muted-foreground">Investment Amount:</p>
              <p className="text-xl font-semibold">${investmentAmount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Investment Frequency:</p>
              <p className="text-xl font-semibold">{investmentFrequency}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted text-muted-foreground">
                  <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Price</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Amount</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Total Invested</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Total Crypto</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Avg Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data?.data.map((item, index) => (
                  <tr key={index} className="hover:bg-accent/50">
                    <td className="px-4 py-2 whitespace-nowrap">{item.date}</td>
                    <td className="px-4 py-2 whitespace-nowrap">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{item.amount.toFixed(4)}</td>
                    <td className="px-4 py-2 whitespace-nowrap">${item.totalInvested.toFixed(2)}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{item.totalCrypto.toFixed(4)}</td>
                    <td className="px-4 py-2 whitespace-nowrap">${item.avgPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </trpc.Provider>
  );
};

export default DcaScreen;
