// AUTO-GENERATED DRAFT SCREEN: ArcadePlayerStatsScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC hook
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Placeholder for shadcn/ui Card
import { Skeleton } from '@/components/ui/skeleton'; // Placeholder for shadcn/ui Skeleton
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Placeholder for shadcn/ui Alert

interface PlayerStats {
  id: string;
  username: string;
  score: number;
  rank: number;
  achievements: string[];
  lastPlayed: string;
}

interface ArcadePlayerStatsScreenProps {
  playerId: string;
}

const fetchPlayerStats = async (playerId: string): Promise<PlayerStats> => {
  // Simulate API call with tRPC or similar
  return new Promise((resolve) => {
    setTimeout(() => {
      if (playerId === 'player123') {
        resolve({
          id: 'player123',
          username: 'GamerPro42',
          score: 123456,
          rank: 7,
          achievements: ['First Blood', 'Quad Kill', 'Legendary'],
          lastPlayed: '2026-06-10T14:30:00Z',
        });
      } else {
        throw new Error('Player not found');
      }
    }, 1000);
  });
};

const ArcadePlayerStatsScreen: React.FC<ArcadePlayerStatsScreenProps> = ({ playerId }) => {
  const { data: playerStats, isLoading, isError, error } = useQuery<PlayerStats, Error>({
    queryKey: ['playerStats', playerId],
    queryFn: () => fetchPlayerStats(playerId),
    // tRPC-like integration would be here, e.g., trpc.player.getStats.useQuery({ playerId })
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen" aria-live="polite" aria-atomic="true">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen" role="alert">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load player stats: {error?.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!playerStats) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen" aria-live="polite" aria-atomic="true">
        <Alert>
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>No player stats available for this ID.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 p-6 sm:p-8 md:p-10 lg:p-12">
      <Card className="w-full max-w-4xl mx-auto shadow-lg dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center sm:text-left">Player Stats: {playerStats.username}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg mb-2"><strong className="font-semibold">Score:</strong> {playerStats.score}</p>
            <p className="text-lg mb-2"><strong className="font-semibold">Rank:</strong> {playerStats.rank}</p>
            <p className="text-lg mb-2"><strong className="font-semibold">Last Played:</strong> {new Date(playerStats.lastPlayed).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Achievements:</h3>
            <ul className="list-disc list-inside space-y-1">
              {playerStats.achievements.map((achievement, index) => (
                <li key={index} className="text-lg">{achievement}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArcadePlayerStatsScreen;
