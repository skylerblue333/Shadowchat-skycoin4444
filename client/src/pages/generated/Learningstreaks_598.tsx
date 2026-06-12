// AUTO-GENERATED DRAFT SCREEN: LearningStreaks
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC/react-query
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Placeholder for shadcn/ui Card
import { Progress } from './ui/progress'; // Placeholder for shadcn/ui Progress
import { Skeleton } from './ui/skeleton'; // Placeholder for shadcn/ui Skeleton

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
