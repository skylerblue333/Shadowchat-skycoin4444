// AUTO-GENERATED DRAFT SCREEN: LeaderboardsSchoolRankings

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC setup
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './components/ui/card'; // shadcn/ui card
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './components/ui/table'; // shadcn/ui table
import { Skeleton } from './components/ui/skeleton'; // shadcn/ui skeleton for loading states
import { AlertCircle, Loader2 } from 'lucide-react'; // Icons for error and loading
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert'; // shadcn/ui alert

/**
 * @interface SchoolRanking
 * @description Defines the structure for a single school's ranking data.
 */
interface SchoolRanking {
  id: string;
  name: string;
  rank: number;
  score: number;
}

/**
 * @function LeaderboardsSchoolRankings
 * @description A production-grade React component displaying school rankings in a leaderboard format.
 * It integrates with tRPC for data fetching, uses shadcn/ui for styling, and includes loading states,
 * error handling, dark theme support, and accessibility features.
 * @returns {JSX.Element} The LeaderboardsSchoolRankings component.
 */
const LeaderboardsSchoolRankings: React.FC = () => {
  // Fetch school ranking data using tRPC. The useQuery hook from @tanstack/react-query manages caching, loading, and error states.
  const { data, isLoading, isError, error } = trpc.leaderboards.getSchoolRankings.useQuery();

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4" aria-live="polite" aria-atomic="true">
        <Card className="w-full max-w-4xl dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden="true" />
              <CardTitle className="text-2xl font-bold">Loading Rankings</CardTitle>
            </div>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4" role="alert">
        <Alert variant="destructive" className="w-full max-w-md dark:bg-red-900 dark:text-red-100">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <AlertTitle>Error Loading Leaderboards</AlertTitle>
          <AlertDescription>
            Failed to fetch school rankings. Please try again later. <br />
            <span className="font-mono text-sm">Details: {error.message}</span>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // --- Main Content ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex items-start justify-center">
      <Card className="w-full max-w-4xl mx-auto dark:bg-gray-800 dark:text-gray-100 shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 p-6">
          <CardTitle className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-50 mb-2" aria-level="1" role="heading">
            SKYCOIN4444 School Rankings
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300">
            Discover the top-performing schools based on their overall scores.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {data && data.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="w-full text-left">
                <TableHeader className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                  <TableRow className="dark:hover:bg-gray-600/50">
                    <TableHead className="w-[80px] px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Rank</TableHead>
                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">School Name</TableHead>
                    <TableHead className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {data.map((school: SchoolRanking) => (
                    <TableRow key={school.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <TableCell className="font-medium px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-50">{school.rank}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">{school.name}</TableCell>
                      <TableCell className="text-right px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">{school.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No school rankings available at the moment. Please check back later.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardsSchoolRankings;
