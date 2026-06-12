// AUTO-GENERATED DRAFT SCREEN: Leaderboard
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { trpc } from './trpc';

interface PlayerScore {
  id: string;
  name: string;
  score: number;
  rank: number;
}

const Leaderboard: React.FC = () => {
  const { data: leaderboard, isLoading, isError, error } = trpc.leaderboard.useQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <p>Loading leaderboard...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-destructive">
        <p>Error: {error?.message || 'Failed to fetch leaderboard data.'}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <h1 className="text-4xl font-bold mb-8">Arcade Leaderboard</h1>
      <div className="w-full max-w-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard?.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">{player.rank}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell className="text-right">{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Leaderboard;
