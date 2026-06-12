// AUTO-GENERATED DRAFT SCREEN: MarkPriceFeed
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { cn } from '@/lib/utils';

// Define the schema for the mark price data
const MarkPriceSchema = z.object({
  symbol: z.string(),
  price: z.number(),
  timestamp: z.number(),
});

type MarkPrice = z.infer<typeof MarkPriceSchema>;

// Mock API call function
const fetchMarkPrice = async (): Promise<MarkPrice> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockPrice = Math.random() * 10000 + 30000; // Simulate price between 30000 and 40000
      resolve({
        symbol: 'SKYCOIN4444/USD',
        price: parseFloat(mockPrice.toFixed(2)),
        timestamp: Date.now(),
      });
    }, 1000);
  });
};

interface MarkPriceFeedProps {
  className?: string;
}

const MarkPriceFeed: React.FC<MarkPriceFeedProps> = ({ className }) => {
  const { data, isLoading, isError, error } = useQuery<MarkPrice, Error>({
    queryKey: ['markPrice'],
    queryFn: fetchMarkPrice,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center h-48 text-gray-500 dark:text-gray-400", className)}>
        Loading mark price...
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn("flex items-center justify-center h-48 text-red-500 dark:text-red-400", className)}>
        Error: {error?.message || 'Failed to fetch mark price'}
      </div>
    );
  }

  return (
    <div className={cn("p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md", className)}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Crypto: Mark Price Feed</h2>
      {data ? (
        <div className="space-y-2">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Symbol:</span> {data.symbol}
          </p>
          <p className="text-4xl font-extrabold text-green-600 dark:text-green-400">
            <span className="text-lg align-top">$</span>{data.price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date(data.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No mark price data available.</p>
      )}
    </div>
  );
};

export default MarkPriceFeed;
