// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: RewardsRewardExpiration

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


interface Reward {
  id: string;
  name: string;
  expirationDate: string;
  isExpired: boolean;
}

// Mock tRPC-like API call
const fetchRewards = async (): Promise<Reward[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', name: '100 SKYCOIN Bonus', expirationDate: '2026-07-01', isExpired: false },
        { id: '2', name: 'Free Transaction', expirationDate: '2026-05-15', isExpired: true },
        { id: '3', name: '5% Staking Boost', expirationDate: '2026-08-20', isExpired: false },
        { id: '4', name: 'Exclusive NFT Drop', expirationDate: '2026-06-10', isExpired: true },
      ]);
    }, 1500);
  });
};

const RewardsRewardExpiration: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data: rewards, isLoading, isError, error } = useQuery<Reward[], Error>({
    queryKey: ['rewards'],
    queryFn: fetchRewards,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading rewards...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
            <CardDescription>Failed to load rewards.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-400">{error?.message || 'An unknown error occurred.'}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Reward Expiration</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </div>

        <p className="text-lg text-muted-foreground mb-10">
          Monitor the expiration dates of your SKYCOIN rewards. Expired rewards cannot be redeemed.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rewards?.map((reward) => (
            <Card key={reward.id} className={reward.isExpired ? "opacity-70 border-red-500" : ""}>
              <CardHeader>
                <CardTitle className={reward.isExpired ? "text-red-500" : ""}>{reward.name}</CardTitle>
                <CardDescription>
                  {reward.isExpired ? (
                    <span className="text-red-400">Expired on {reward.expirationDate}</span>
                  ) : (
                    <span className="text-green-500">Expires on {reward.expirationDate}</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {reward.isExpired
                    ? "This reward has expired and can no longer be claimed."
                    : "Claim this reward before its expiration date to avoid losing it."}
                </p>
                <Button
                  className="mt-4 w-full"
                  disabled={reward.isExpired}
                  variant={reward.isExpired ? "destructive" : "default"}
                >
                  {reward.isExpired ? "Expired" : "Claim Reward"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardsRewardExpiration;