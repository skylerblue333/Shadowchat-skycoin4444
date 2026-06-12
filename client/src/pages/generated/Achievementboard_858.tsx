// AUTO-GENERATED DRAFT SCREEN: AchievementBoard
import React from 'react';
import { Button } from './ui/button';

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
}

const mockAchievements: Achievement[] = [
  { id: '1', name: 'First Win', description: 'Win your first game.', unlocked: true },
  { id: '2', name: '10 Wins', description: 'Win 10 games.', unlocked: false },
  { id: '3', name: 'Perfect Game', description: 'Win a game without taking damage.', unlocked: false },
];

const AchievementBoard: React.FC = () => {
  // In a real application, you would use tRPC hooks here to fetch achievements
  const { data: achievements, isLoading, isError } = { data: mockAchievements, isLoading: false, isError: false };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading achievements...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error loading achievements.</div>;
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Achievement Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-6 rounded-lg shadow-lg ${achievement.unlocked ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'}`}
          >
            <h2 className="text-2xl font-semibold mb-2">{achievement.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{achievement.description}</p>
            <Button
              variant={achievement.unlocked ? 'default' : 'outline'}
              disabled={!achievement.unlocked}
              className="w-full"
            >
              {achievement.unlocked ? 'Unlocked' : 'Locked'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementBoard;
