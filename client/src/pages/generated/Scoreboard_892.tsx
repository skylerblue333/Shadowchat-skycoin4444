// AUTO-GENERATED DRAFT SCREEN: ScoreBoard

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui components are in ./ui
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Skeleton } from './ui/skeleton'; // For loading states

// Mock tRPC hooks for demonstration purposes
const trpc = {
  arcade: {
    getScoreBoard: {
      useQuery: () => {
        const [data, setData] = React.useState<{ scores: { id: string; player: string; score: number }[] } | undefined>(undefined);
        const [isLoading, setIsLoading] = React.useState(true);
        const [isError, setIsError] = React.useState(false);

        React.useEffect(() => {
          const fetchData = async () => {
            try {
              setIsLoading(true);
              // Simulate API call delay
              await new Promise(resolve => setTimeout(resolve, 1500));
              const mockScores = [
                { id: '1', player: 'PlayerOne', score: 1500 },
                { id: '2', player: 'PlayerTwo', score: 1200 },
                { id: '3', player: 'PlayerThree', score: 1000 },
                { id: '4', player: 'PlayerFour', score: 900 },
                { id: '5', player: 'PlayerFive', score: 750 },
              ];
              setData({ scores: mockScores });
            } catch (error) {
              setIsError(true);
            } finally {
              setIsLoading(false);
            }
          };
          fetchData();
        }, []);

        return { data, isLoading, isError };
      },
    },
  },
};

interface ScoreBoardProps {}

const ScoreBoard: React.FC<ScoreBoardProps> = () => {
  const { data, isLoading, isError } = trpc.arcade.getScoreBoard.useQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Arcade Score Board</h1>
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Top Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Arcade Score Board</h1>
        <Card className="w-full max-w-3xl mx-auto bg-red-100 dark:bg-red-900 border-red-400 dark:border-red-700 text-red-800 dark:text-red-200">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load scores. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Arcade Score Board</h1>

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Top Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.scores.map((score, index) => (
                <TableRow key={score.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{score.player}</TableCell>
                  <TableCell className="text-right">{score.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreBoard;
