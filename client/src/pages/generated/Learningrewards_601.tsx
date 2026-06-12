// AUTO-GENERATED DRAFT SCREEN: LearningRewards
import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Skeleton } from './components/ui/skeleton';

interface Reward {
  id: string;
  name: string;
  points: number;
  description: string;
}

interface LearningRewardsProps {
  userId: string;
}

const LearningRewards: React.FC<LearningRewardsProps> = ({ userId }) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mock tRPC hook for fetching data
  const useLearningRewards = (id: string) => {
    // In a real application, this would be a tRPC hook call
    // For now, simulate an API call
    useEffect(() => {
      const fetchRewards = async () => {
        setLoading(true);
        setError(null);
        try {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          if (id === 'errorUser') {
            throw new Error('Failed to fetch rewards.');
          }
          const mockRewards: Reward[] = [
            { id: '1', name: 'Complete Module 1', points: 100, description: 'Earn 100 points for finishing the first learning module.' },
            { id: '2', name: 'Pass Quiz 1', points: 50, description: 'Earn 50 points for passing the first quiz with 80% or higher.' },
            { id: '3', name: 'Daily Login Streak', points: 20, description: 'Log in for 7 consecutive days to earn 20 points.' },
            { id: '4', name: 'Invite a Friend', points: 75, description: 'Invite a friend who signs up and completes their first module.' },
          ];
          setRewards(mockRewards);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchRewards();
    }, [id]);
    return { data: rewards, isLoading: loading, isError: !!error, error };
  };

  const { data: learningRewards, isLoading, isError, error: fetchError } = useLearningRewards(userId);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">Learning Rewards</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="dark:bg-gray-800 dark:text-gray-200">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500 dark:text-red-400">
        <h1 className="text-2xl font-bold">Error</h1>
        <p>Error loading learning rewards: {fetchError}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center">Learning Rewards</h1>
      {learningRewards.length === 0 ? (
        <p className="text-center text-lg">No learning rewards available at the moment. Keep learning!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {learningRewards.map((reward) => (
            <Card key={reward.id} className="flex flex-col justify-between dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400">{reward.name}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">{reward.points} Points</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-base text-gray-700 dark:text-gray-300">{reward.description}</p>
              </CardContent>
              <div className="p-4 border-t dark:border-gray-700">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-600">Claim Reward</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningRewards;