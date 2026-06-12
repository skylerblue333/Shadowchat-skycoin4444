// AUTO-GENERATED DRAFT SCREEN: ArcadeTournamentStandings
import React, { useEffect } from 'react'; // Removed useState as it's not used
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { trpc } from '@/utils/trpc'; // Adjust path as per your tRPC setup
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface PlayerStanding {
  id: string;
  rank: number;
  username: string;
  score: number;
  wins: number;
  losses: number;
}

const ArcadeTournamentStandings: React.FC = () => {
  // Set document title for better accessibility and SEO
  useEffect(() => {
    document.title = 'SKYCOIN4444 - Arcade Tournament Standings';
  }, []);

  const { data, isLoading, isError, error } = trpc.arcade.getTournamentStandings.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen">
        <Card className="w-full max-w-4xl mx-auto dark:bg-gray-800 dark:text-gray-50">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <Alert variant="destructive" className="w-full max-w-4xl mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load tournament standings: {error?.message || 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const standings: PlayerStanding[] = data || [];

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-50">
      <Card className="w-full max-w-4xl mx-auto dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Arcade Tournament Standings</CardTitle>
        </CardHeader>
        <CardContent>
          {standings.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">No standings available yet.</p>
          ) : (
            <Table className="dark:text-gray-50">
              <TableHeader>
                <TableRow className="dark:hover:bg-gray-700">
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right">Wins</TableHead>
                  <TableHead className="text-right">Losses</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standings.map((player) => (
                  <TableRow key={player.id} className="dark:hover:bg-gray-700">
                    <TableCell className="font-medium">{player.rank}</TableCell>
                    <TableCell>{player.username}</TableCell>
                    <TableCell className="text-right">{player.score}</TableCell>
                    <TableCell className="text-right">{player.wins}</TableCell>
                    <TableCell className="text-right">{player.losses}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// This component displays the tournament standings for the Arcade.
// It fetches data using tRPC, handles loading and error states, and displays the standings in a table.
export default ArcadeTournamentStandings;
