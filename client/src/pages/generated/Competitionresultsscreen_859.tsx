// AUTO-GENERATED DRAFT SCREEN: CompetitionResultsScreen
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton'; // Assuming Skeleton is available or will be added
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Assuming Alert is available or will be added
import { Terminal } from 'lucide-react'; // Assuming Lucide icons are available or will be added

interface CompetitionResult {
  id: string;
  rank: number;
  participant: string;
  score: number;
}

// Mock data to simulate tRPC response
const mockFetchCompetitionResults = (): Promise<CompetitionResult[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldError = Math.random() < 0.2; // 20% chance of error
      if (shouldError) {
        reject(new Error('Failed to fetch competition results. Please try again.'));
      } else {
        const results: CompetitionResult[] = [
          { id: '1', rank: 1, participant: 'Alice', score: 1500 },
          { id: '2', rank: 2, participant: 'Bob', score: 1450 },
          { id: '3', rank: 3, participant: 'Charlie', score: 1400 },
          { id: '4', rank: 4, participant: 'David', score: 1350 },
          { id: '5', rank: 5, participant: 'Eve', score: 1300 },
          { id: '6', rank: 6, participant: 'Frank', score: 1250 },
          { id: '7', rank: 7, participant: 'Grace', score: 1200 },
          { id: '8', rank: 8, participant: 'Heidi', score: 1150 },
          { id: '9', rank: 9, participant: 'Ivan', score: 1100 },
          { id: '10', rank: 10, participant: 'Judy', score: 1050 },
        ];
        resolve(results);
      }
    }, 1500); // Simulate network delay
  });
};

const CompetitionResultsScreen: React.FC = () => {
  const [results, setResults] = useState<CompetitionResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await mockFetchCompetitionResults();
        setResults(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 text-center">
          Competition Results
        </h1>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          <div className="space-y-3">
            <Skeleton className="h-[40px] w-full" />
            <Skeleton className="h-[40px] w-full" />
            <Skeleton className="h-[40px] w-full" />
            <Skeleton className="h-[40px] w-full" />
            <Skeleton className="h-[40px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 text-center">
          Competition Results
        </h1>
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 text-center">
        Competition Results
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableCaption className="p-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            A list of your recent competition results.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Participant</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.length > 0 ? (
              results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.rank}</TableCell>
                  <TableCell>{result.participant}</TableCell>
                  <TableCell className="text-right">{result.score}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompetitionResultsScreen;