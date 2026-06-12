// AUTO-GENERATED DRAFT SCREEN: CryptoPortfolioRebalancing
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

import { trpc } from '../utils/trpc'; // Assuming tRPC client setup, adjust path as needed
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { Toaster } from '@/components/ui/toaster'; // Assuming shadcn/ui Toaster component

interface Asset { 
  id: string;
  name: string;
  currentAllocation: number; // Percentage
  targetAllocation: number; // Percentage
}

const CryptoPortfolioRebalancing: React.FC = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { theme, setTheme } = useTheme();

  // Simulate fetching portfolio data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['portfolioData'],
    queryFn: async () => {
      // Replace with actual tRPC call
      return new Promise<Asset[]>((resolve) =>
        setTimeout(() =>
          resolve([
            { id: 'btc', name: 'Bitcoin', currentAllocation: 40, targetAllocation: 30 },
            { id: 'eth', name: 'Ethereum', currentAllocation: 30, targetAllocation: 35 },
            { id: 'sol', name: 'Solana', currentAllocation: 20, targetAllocation: 25 },
            { id: 'ada', name: 'Cardano', currentAllocation: 10, targetAllocation: 10 },
          ]),
        1000
      );
    },
  });

  useEffect(() => {
    if (data) {
      setAssets(data);
    }
  }, [data]);

  useEffect(() => {
    setIsDarkTheme(theme === 'dark');
  }, [theme]);

  const rebalanceMutation = useMutation({
    mutationFn: async (updatedAssets: Asset[]) => {
      // Replace with actual tRPC mutation
      return new Promise<string>((resolve)
        setTimeout(() => {

          resolve('Rebalancing successful!');
        }, 1500)
      );
    },
    onSuccess: () => {
      toast({
        title: 'Rebalancing Successful',
        description: 'Your portfolio has been rebalanced.',
      });
      queryClient.invalidateQueries({ queryKey: ['portfolioData'] });
    },
    onError: (err) => {
      toast({
        title: 'Rebalancing Failed',
        description: `Error: ${err.message}`,
        variant: 'destructive',
      });
    },
  });

  const handleTargetAllocationChange = (id: string, value: number) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.id === id ? { ...asset, targetAllocation: value } : asset
      )
    );
  };

  const handleRebalance = () => {
    // Basic validation: ensure total target allocation is 100%
    const totalTargetAllocation = assets.reduce((sum, asset) => sum + asset.targetAllocation, 0);
    if (totalTargetAllocation !== 100) {
      toast({
        title: 'Validation Error',
        description: 'Total target allocation must be 100%',
        variant: 'destructive',
      });
      return;
    }
    rebalanceMutation.mutate(assets);
  };

  const toggleTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading portfolio...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error?.message}</div>;

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <Card className="w-full max-w-2xl mx-auto">
                <Toaster />
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crypto Portfolio Rebalancing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
            <Switch
              id="dark-mode-toggle"
              checked={isDarkTheme}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
          </div>

          <div className="space-y-4">
            {assets.map((asset) => (
              <div key={asset.id} className="flex items-center justify-between">
                <Label className="w-1/3">{asset.name}</Label>
                <div className="w-1/3 text-center">{asset.currentAllocation}%</div>
                <Input
                  type="number"
                  value={asset.targetAllocation}
                  onChange={(e) => handleTargetAllocationChange(asset.id, parseInt(e.target.value || '0'))}
                  className="w-1/4"
                  aria-label={`Target allocation for ${asset.name}`}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleRebalance}
              disabled={rebalanceMutation.isPending}
              className="px-6 py-2"
            >
              {rebalanceMutation.isPending ? 'Rebalancing...' : 'Rebalance Portfolio'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoPortfolioRebalancing;
