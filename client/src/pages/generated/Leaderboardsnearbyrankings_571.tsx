// AUTO-GENERATED DRAFT SCREEN: LeaderboardsNearbyRankings
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

interface RankingItem {
  id: string;
  username: string;
  rank: number;
  score: number;
}

interface LeaderboardsNearbyRankingsProps {
  userId: string;
}

// Mock tRPC hook for demonstration purposes
const useNearbyRankings = (userId: string) => {
  const [data, setData] = React.useState<RankingItem[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData: RankingItem[] = [
          { id: '1', username: 'UserA', rank: 1, score: 1200 },
          { id: '2', username: 'UserB', rank: 2, score: 1150 },
          { id: '3', username: 'UserC', rank: 3, score: 1100 },
          { id: '4', username: 'UserD', rank: 4, score: 1050 },
          { id: '5', username: 'UserE', rank: 5, score: 1000 },
          { id: '6', username: 'UserF', rank: 6, score: 980 },
          { id: '7', username: 'UserG', rank: 7, score: 950 },
          { id: '8', username: 'UserH', rank: 8, score: 920 },
          { id: '9', username: 'UserI', rank: 9, score: 900 },
          { id: '10', username: 'UserJ', rank: 10, score: 880 },
        ];
        setData(mockData);
      } catch (err) {
        setError('Failed to fetch rankings.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return { data, isLoading, error };
};

const LeaderboardsNearbyRankings: React.FC<LeaderboardsNearbyRankingsProps> = ({ userId }) => {
  const { data: rankings, isLoading, error } = useNearbyRankings(userId);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto" aria-live="polite" aria-busy="true">
        <CardHeader>
          <CardTitle>Nearby Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8" role="status">Loading rankings...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto" aria-live="assertive">
        <CardHeader>
          <CardTitle>Nearby Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-500" role="alert">Error: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto" aria-labelledby="leaderboard-title">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle id="leaderboard-title">Nearby Rankings</CardTitle>
        <button
          onClick={toggleDarkMode}
          className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2" role="list">
          {rankings?.map((item) => (
            <li key={item.id} className="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800" aria-label={`Rank ${item.rank}: ${item.username} with score ${item.score}`}>
              <span className="font-medium">{item.rank}. {item.username}</span>
              <span className="text-gray-600 dark:text-gray-400">{item.score}</span>
            </li>
          ))}
        </ul>
        {rankings?.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400" role="status">No nearby rankings found.</div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeaderboardsNearbyRankings;
