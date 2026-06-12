// AUTO-GENERATED DRAFT SCREEN: CryptoStakingRewards
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming @tanstack/react-query for tRPC
import { cn } from '@/lib/utils'; // Utility for Tailwind classes
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Wallet } from 'lucide-react'; // Icons

// Define the shape of a staking reward
interface StakingReward {
  id: string;
  asset: string;
  amount: number;
  rewardDate: string; // ISO date string
  status: 'pending' | 'completed';
}

// Define the props for the component (currently empty, but good practice)
interface CryptoStakingRewardsProps {
  // No specific props needed for this component based on the request
}

// Mock tRPC API context for demonstration. In a real app, this would come from your tRPC client setup.
const trpc = {
  staking: {
    getRewards: {
      useQuery: () => {
        // Simulate loading, error, and data states
        const [data, setData] = React.useState<StakingReward[] | undefined>(undefined);
        const [isLoading, setIsLoading] = React.useState(true);
        const [isError, setIsError] = React.useState(false);
        const [error, setError] = React.useState<Error | null>(null);

        React.useEffect(() => {
          const timer = setTimeout(() => {
            if (Math.random() > 0.8) { // Simulate an error 20% of the time
              setIsError(true);
              setError(new Error('Failed to fetch staking rewards.'));
              setIsLoading(false);
            } else {
              setData([
                { id: '1', asset: 'ETH', amount: 0.05, rewardDate: '2023-01-15', status: 'completed' },
                { id: '2', asset: 'ADA', amount: 15.2, rewardDate: '2023-01-16', status: 'pending' },
                { id: '3', asset: 'DOT', amount: 2.1, rewardDate: '2023-01-17', status: 'completed' },
                { id: '4', asset: 'SOL', amount: 0.12, rewardDate: '2023-01-18', status: 'pending' },
              ]);
              setIsLoading(false);
            }
          }, 1500); // Simulate network delay
          return () => clearTimeout(timer);
        }, []);

        return { data, isLoading, isError, error };
      },
    },
  },
};

const CryptoStakingRewards: React.FC<CryptoStakingRewardsProps> = () => {
  // Use tRPC hook to fetch staking rewards
  const { data: stakingRewards, isLoading, isError, error } = trpc.staking.getRewards.useQuery();

  // Loading State
  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto p-6">
        <CardHeader>
          <CardTitle>Staking Rewards</CardTitle>
          <CardDescription>Overview of your crypto staking rewards.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  // Error Handling State
  if (isError) {
    return (
      <Card className="w-full max-w-4xl mx-auto p-6">
        <CardHeader>
          <CardTitle>Staking Rewards</CardTitle>
          <CardDescription>Overview of your crypto staking rewards.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error?.message || 'Failed to load staking rewards. Please try again later.'}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Main Content Display
  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-6 w-6" />
          Crypto Staking Rewards
        </CardTitle>
        <CardDescription>A comprehensive overview of your earned staking rewards.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {stakingRewards && stakingRewards.length > 0 ? (
          <div className="grid gap-4">
            {stakingRewards.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">{reward.amount} {reward.asset}</p>
                  <p className="text-sm text-muted-foreground">{new Date(reward.rewardDate).toLocaleDateString()}</p>
                </div>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-semibold",
                  reward.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                )}>
                  {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <Alert>
            <AlertTitle>No Rewards Found</AlertTitle>
            <AlertDescription>It looks like you haven't received any staking rewards yet.</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default CryptoStakingRewards;
