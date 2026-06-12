// @ts-nocheck
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: LearningStreaks

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


interface LearningStreakData {
  currentStreak: number;
  longestStreak: number;
  lastUpdated: string;
}

// Placeholder for tRPC hook - in a real app, this would connect to a tRPC backend
const useLearningStreaks = () => {
  return useQuery<LearningStreakData>({
    queryKey: ['learningStreaks'],
    queryFn: async () => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            currentStreak: 7,
            longestStreak: 15,
            lastUpdated: new Date().toLocaleDateString(),
          });
        }, 1000);
      });
    },
  });
};

const LearningStreaks: React.FC = () => {
  const { data, isLoading, isError, error } = useLearningStreaks();

  if (isLoading) {
    return (
      <Card className="w-[350px] dark:bg-gray-800 dark:text-gray-100">
        <CardHeader>
          <CardTitle>Learning Streaks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-[350px] dark:bg-gray-800 dark:text-gray-100 border-red-500">
        <CardHeader>
          <CardTitle>Learning Streaks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading streaks: {error?.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[350px] dark:bg-gray-800 dark:text-gray-100">
      <CardHeader>
        <CardTitle>Learning Streaks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Current Streak:</p>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{data?.currentStreak} days</span>
        </div>
        <Progress value={(data?.currentStreak / data?.longestStreak) * 100} className="w-full" aria-label="Current streak progress" />
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <p>Longest Streak: {data?.longestStreak} days</p>
          <p>Last Updated: {data?.lastUpdated}</p>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-2" role="contentinfo">
          Keep up the great work! Consistency is key to learning.
        </p>
      </CardContent>
    </Card>
  );
};

export default LearningStreaks;
