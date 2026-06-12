// AUTO-GENERATED DRAFT SCREEN: RewardsCenter

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sun, Moon, Gift } from 'lucide-react';

type Reward = {
  id: string;
  name: string;
  pointsRequired: number;
  description: string;
};

interface RewardsCenterProps {
  userId: string;
}

const RewardsCenter: React.FC<RewardsCenterProps> = ({ userId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data, isLoading, isError, error } = trpc.rewards.getRewards.useQuery({
    userId,
  });

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="dark:bg-gray-800">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-10 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="m-4" role="alert">
        <AlertTitle>Error loading rewards</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Gift className="mr-3 h-8 w-8 text-sky-500" aria-hidden="true" />
          SKYCOIN4444 Rewards Center
        </h1>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <p className="text-lg mb-8 max-w-2xl">
        Welcome to the SKYCOIN4444 Rewards Center! Earn points and redeem them for exciting rewards.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.rewards.map((reward: Reward) => (
          <Card key={reward.id} className="dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-sky-400">{reward.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">{reward.description}</p>
              <p className="text-lg font-medium">Points Required: <span className="text-sky-500">{reward.pointsRequired}</span></p>
              <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75">
                Redeem Reward
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RewardsCenter;
