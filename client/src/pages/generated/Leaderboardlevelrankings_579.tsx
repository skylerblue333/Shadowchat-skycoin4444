// AUTO-GENERATED DRAFT SCREEN: LeaderboardLevelRankings
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

// Mock tRPC-like API call
const fetchLevelRankings = async () => {
  return new Promise<{ id: string; name: string; level: number; rank: number }[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', name: 'PlayerOne', level: 99, rank: 1 },
        { id: '2', name: 'PlayerTwo', level: 98, rank: 2 },
        { id: '3', name: 'PlayerThree', level: 97, rank: 3 },
        { id: '4', name: 'PlayerFour', level: 96, rank: 4 },
        { id: '5', name: 'PlayerFive', level: 95, rank: 5 },
      ]);
    }, 1000);
  });
};

interface LevelRanking {
  id: string;
  name: string;
  level: number;
  rank: number;
}

const LeaderboardLevelRankings: React.FC = () => {
  const { data: rankings, isLoading, isError, error } = useQuery<LevelRanking[], Error>({
    queryKey: ['levelRankings'],
    queryFn: fetchLevelRankings,
  });

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Level Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Level Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading rankings: {error?.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Level Rankings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankings?.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">{player.rank}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell className="text-right">{player.level}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LeaderboardLevelRankings;
