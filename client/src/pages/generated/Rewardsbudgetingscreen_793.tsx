// AUTO-GENERATED DRAFT SCREEN: RewardsBudgetingScreen
import React from 'react';
import { useQuery } from '@trpc/react-query';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Skeleton } from './components/ui/skeleton';

// Define a type for the reward budget data
interface RewardBudget {
  id: string;
  name: string;
  amount: number;
  currency: string;
}

// Mock tRPC hook for demonstration. In a real app, this would come from your tRPC client.
// For this exercise, we'll simulate loading and error states.
const useGetRewardBudget = () => {
  const [data, setData] = React.useState<RewardBudget | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Simulate successful data fetch
        setData({
          id: 'budget-1',
          name: 'Q3 Rewards Budget',
          amount: 15000.75,
          currency: 'SKY'
        });
      } catch (err) {
        setIsError(true);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, isError, error };
};

const RewardsBudgetingScreen: React.FC = () => {
  // Replace with actual tRPC hook: const { data, isLoading, isError, error } = useQuery(['rewards.getBudget']);
  const { data, isLoading, isError, error } = useGetRewardBudget();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 dark:bg-gray-900">
        <Skeleton className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-24 w-full bg-gray-200 dark:bg-gray-700" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500 dark:bg-gray-900 dark:text-red-400">
        <p>Error loading reward budget: {error?.message || 'Unknown error'}</p>
        <Button onClick={() => window.location.reload()} className="mt-4 bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800">
          Retry
        </Button>
      </div>
    );
  }

  const rewardBudget: RewardBudget = data!;

  return (
    <div className="container mx-auto p-4 min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl font-bold mb-6">Reward Budgeting</h1>

      <Card className="w-full max-w-md bg-gray-50 dark:bg-gray-900 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Current Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-extrabold mb-2">{rewardBudget.currency} {rewardBudget.amount.toFixed(2)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800">
            Adjust Budget
          </Button>
        </CardContent>
      </Card>

      {/* Placeholder for additional budgeting features */}
      <div className="mt-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-4">Budget Overview</h2>
        <p className="text-gray-700 dark:text-gray-300">Detailed breakdown of allocations and expenditures will go here.</p>
      </div>
    </div>
  );
};

export default RewardsBudgetingScreen;
