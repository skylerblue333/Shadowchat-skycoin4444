// AUTO-GENERATED DRAFT SCREEN: RewardsMarketplace

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MoonIcon, SunIcon, GiftIcon, ShoppingCartIcon } from 'lucide-react';

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  imageUrl: string;
}

const RewardsMarketplace: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data: rewards, isLoading, isError, error } = trpc.rewards.getRewards.useQuery();

  const filteredRewards = rewards?.filter(reward =>
    reward.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Loading rewards...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-red-500">Error loading rewards: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 transition-colors duration-300">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold flex items-center">
          <GiftIcon className="w-10 h-10 mr-3 text-sky-500" />
          Reward Marketplace
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {isDarkMode ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="ml-2"
              aria-label="Toggle dark mode"
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <ShoppingCartIcon className="w-5 h-5 mr-2" />
            My Cart
          </Button>
        </div>
      </header>

      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search rewards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRewards && filteredRewards.length > 0 ? (
          filteredRewards.map((reward) => (
            <Card key={reward.id} className="flex flex-col justify-between bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <img src={reward.imageUrl} alt={reward.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                <CardTitle className="text-xl font-semibold text-sky-600 dark:text-sky-400">{reward.name}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">{reward.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{reward.pointsCost} Points</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                  Redeem
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 dark:text-gray-400">No rewards found.</p>
        )}
      </div>
    </div>
  );
};

export default RewardsMarketplace;
