// AUTO-GENERATED DRAFT SCREEN: LeaderboardFollowingRankings
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface RankingItem {
  id: string;
  name: string;
  score: number;
}

interface LeaderboardFollowingRankingsProps {
  // In a real application, this would likely come from tRPC or a similar data fetching mechanism
  // For this example, we'll simulate it.
  data?: RankingItem[];
  isLoading?: boolean;
  isError?: boolean;
}

const LeaderboardFollowingRankings: React.FC<LeaderboardFollowingRankingsProps> = ({
  data,
  isLoading = false,
  isError = false,
}) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Following Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-24">
            <p>Loading rankings...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Following Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-24 text-red-500">
            <p>Error loading rankings. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const rankings = data || [
    { id: '1', name: 'UserA', score: 1200 },
    { id: '2', name: 'UserB', score: 1150 },
    { id: '3', name: 'UserC', score: 1100 },
    { id: '4', name: 'UserD', score: 1050 },
    { id: '5', name: 'UserE', score: 1000 },
  ];

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-2xl font-bold">Following Rankings</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-2">
          {rankings.map((item, index) => (
            <li key={item.id} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="font-medium">{index + 1}. {item.name}</span>
              <span className="text-lg font-semibold">{item.score}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default LeaderboardFollowingRankings;
