// AUTO-GENERATED DRAFT SCREEN: AchievementTracker
import React from 'react';
import { trpc } from '../trpc';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  progress: number;
  total: number;
}

const AchievementTracker: React.FC = () => {
  const { data: achievements, isLoading, isError, error } = trpc.achievements.query({});

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading achievements...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Achievement Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements?.map((achievement: Achievement) => (
          <div
            key={achievement.id}
            className={cn(
              "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border",
              achievement.unlocked ? "border-green-500" : "border-gray-300 dark:border-gray-700"
            )}
          >
            <h2 className="text-2xl font-semibold mb-2">{achievement.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{achievement.description}</p>
            <div className="flex items-center justify-between">
              {achievement.unlocked ? (
                <span className="text-green-500 font-medium">Unlocked!</span>
              ) : (
                <span className="text-yellow-500 font-medium">Progress: {achievement.progress}/{achievement.total}</span>
              )}
              <Button
                variant={achievement.unlocked ? "secondary" : "default"}
                disabled={achievement.unlocked}
              >
                {achievement.unlocked ? "Achieved" : "Keep Going"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementTracker;