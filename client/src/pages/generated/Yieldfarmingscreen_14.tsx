// AUTO-GENERATED DRAFT SCREEN: YieldFarmingScreen

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming trpc client setup
import { cn } from '../lib/utils';

interface YieldFarmingData {
  asset: string;
  apy: number;
  staked: number;
  rewards: number;
}

const YieldFarmingScreen: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Simulate fetching data with tRPC hook
  const { data, isLoading, error } = useQuery<YieldFarmingData[]>(
    ['yieldFarmingData'],
    async () => {
      // In a real app, this would be a tRPC call like trpc.yieldFarming.getData.query()
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { asset: 'ETH', apy: 12.5, staked: 10, rewards: 0.5 },
            { asset: 'USDC', apy: 8.2, staked: 1000, rewards: 50 },
          ]);
        }, 1000);
      });
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading yield farming data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 dark:bg-red-900">
        <p className="text-lg text-red-700 dark:text-red-300">Error loading data: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen p-8",
      isDarkTheme ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
    )}>
      <h1 className="text-4xl font-bold mb-8 text-center">Crypto Yield Farming</h1>

      <button
        onClick={() => setIsDarkTheme(!isDarkTheme)}
        className="absolute top-4 right-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Toggle {isDarkTheme ? 'Light' : 'Dark'} Theme
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item) => (
          <div
            key={item.asset}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">{item.asset}</h2>
            <p className="text-lg mb-2">APY: <span className="font-medium text-green-600 dark:text-green-400">{item.apy}%</span></p>
            <p className="text-lg mb-2">Staked: <span className="font-medium">{item.staked} {item.asset}</span></p>
            <p className="text-lg">Rewards: <span className="font-medium text-yellow-600 dark:text-yellow-400">{item.rewards} {item.asset}</span></p>
            <button className="mt-4 w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              Farm Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YieldFarmingScreen;
