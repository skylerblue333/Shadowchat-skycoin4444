// @ts-nocheck
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: HallOfFame

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  rank: number;
}

const HallOfFame: React.FC = () => {
  const { data, isLoading, isError, error } = useStubQuery({ limit: 10 });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 flex flex-col items-center justify-center">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Hall of Fame</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 flex flex-col items-center justify-center">
        <Card className="w-full max-w-4xl border-red-500">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-red-400">Failed to load Hall of Fame: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hallOfFameEntries: LeaderboardEntry[] = data || [];

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="container mx-auto py-10">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">Hall of Fame</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hallOfFameEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.rank}</TableCell>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell className="text-right">{entry.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HallOfFame;
