// AUTO-GENERATED DRAFT SCREEN: OilTokenScreen
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

type OilTokenData = {
  price: number;
  change: number;
  volume: number;
};

// Simulate tRPC hook
const useOilTokenData = () => {
  const [data, setData] = useState<OilTokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData: OilTokenData = {
          price: 85.75,
          change: 1.23,
          volume: 123456789,
        };
        setData(mockData);
      } catch (error) {
        console.error("Failed to fetch oil token data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, isError };
};

const OilTokenScreen: React.FC = () => {
  const { data, isLoading, isError } = useOilTokenData();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading Oil Token Data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-100 dark:bg-red-900">
        <p className="text-lg text-red-700 dark:text-red-300">Error loading data. Please try again later.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">No data available.</p>
      </div>
    );
  }

  const changeColorClass = data.change >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Crypto: Oil Token</h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md space-y-4" role="region" aria-labelledby="oil-token-status">
        <h2 id="oil-token-status" className="text-2xl font-semibold">Current Status</h2>
        <div className="flex justify-between items-center">
          <p className="text-lg">Price:</p>
          <p className="text-xl font-bold">${data.price.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg">Change (24h):</p>
          <p className={`text-xl font-bold ${changeColorClass}`}>{data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}%</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg">Volume (24h):</p>
          <p className="text-xl font-bold">{data.volume.toLocaleString()}</p>
        </div>
        <Button className="w-full mt-6">View Details</Button>
      </div>
    </div>
  );
};

export default OilTokenScreen;
