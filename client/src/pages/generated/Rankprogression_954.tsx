// AUTO-GENERATED DRAFT SCREEN: RankProgression

import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming react-query for data fetching
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'; // shadcn/ui Card
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'; // shadcn/ui Table
import { Button } from './components/ui/button'; // shadcn/ui Button
import { Skeleton } from './components/ui/skeleton'; // shadcn/ui Skeleton for loading states
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert'; // shadcn/ui Alert for error handling
import { MoonIcon, SunIcon } from 'lucide-react'; // Lucide icons for theme toggle

// Define types for rank progression data
interface RankData {
  id: string;
  rank: number;
  username: string;
  score: number;
  progress: number; // Percentage of progress to next rank
}

interface RankProgressionProps {
  userId: string;
}

const RankProgression: React.FC<RankProgressionProps> = ({ userId }) => {
  const { data, isLoading, isError, error, refetch } = trpc.rank.getProgression.useQuery({ userId });
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  // Toggle dark theme
  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-12 w-full" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load rank progression: {error?.message || 'Unknown error'}</AlertDescription>
          <Button onClick={() => refetch()} className="mt-2">Retry</Button>
        </Alert>
      </div>
    );
  }

  const rankData: RankData[] = data || [];

  return (
    <div className={`min-h-screen bg-background text-foreground ${isDarkTheme ? 'dark' : ''}`} aria-live="polite">
      <Card className="w-full max-w-4xl mx-auto p-6 shadow-lg rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl font-bold">Rank Progression</CardTitle>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkTheme ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
          </Button>
        </CardHeader>
        <CardContent>
          {rankData.length === 0 ? (
            <p className="text-center text-muted-foreground">No rank data available.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.rank}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.score}</TableCell>
                    <TableCell className="text-right">{item.progress}%</TableCell>
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

export default RankProgression;
