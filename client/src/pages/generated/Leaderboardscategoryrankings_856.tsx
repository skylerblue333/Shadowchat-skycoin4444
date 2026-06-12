// AUTO-GENERATED DRAFT SCREEN: LeaderboardsCategoryRankings
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Button } from './components/ui/button';
import { trpc } from './trpc';

interface RankingData {
  rank: number;
  category: string;
  score: number;
  players: number;
}

const LeaderboardsCategoryRankings: React.FC = () => {
  const { data, isLoading, error } = trpc.categoryRankings.useQuery();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isLoading) {
    return <div className="container mx-auto py-10 text-center text-lg" role="status" aria-live="polite">Loading category rankings...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-10 text-center text-red-500 text-lg" role="alert">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-10 bg-background text-foreground min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category Rankings</h1>
        <Button onClick={toggleDarkMode} aria-label="Toggle dark mode">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
      <Table>
        <TableCaption>A list of top categories by score.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Score</TableHead>
            <TableHead className="text-right">Players</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((data) => (
            <TableRow key={data.rank}>
              <TableCell className="font-medium">{data.rank}</TableCell>
              <TableCell>{data.category}</TableCell>
              <TableCell>{data.score}</TableCell>
              <TableCell className="text-right">{data.players}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardsCategoryRankings;
