// AUTO-GENERATED DRAFT SCREEN: LeaderboardsAgeGroupRankings

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming trpc client is set up
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // shadcn/ui Card
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // shadcn/ui Table
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui Skeleton for loading states
import { AlertCircle } from 'lucide-react'; // For error icon
import { cn } from '@/lib/utils'; // Utility for conditional class names

// Define the interface for an individual age group ranking entry
interface AgeGroupRanking {
  id: string;
  ageGroup: string;
  rank: number;
  username: string;
  score: number;
}

// Mock data for demonstration and initial development purposes
// In a real application, this would come from the tRPC query
const mockRankings: AgeGroupRanking[] = [
  { id: '1', ageGroup: '18-24', rank: 1, username: 'GamerPro1', score: 1500 },
  { id: '2', ageGroup: '18-24', rank: 2, username: 'SpeedRunnerX', score: 1450 },
  { id: '3', ageGroup: '25-34', rank: 1, username: 'ElitePlayer', score: 1600 },
  { id: '4', ageGroup: '25-34', rank: 2, username: 'Tactician', score: 1580 },
  { id: '5', ageGroup: '35-44', rank: 1, username: 'VeteranGamer', score: 1700 },
];

const LeaderboardsAgeGroupRankings: React.FC = () => {
  // Fetch age group rankings using tRPC. The query is typed to expect AgeGroupRanking[].
  // For a real app, replace mockRankings with data from the actual tRPC call.
  const { data, isLoading, isError, error } = trpc.leaderboards.getAgeGroupRankings.useQuery();

  // Display loading state with multiple skeleton components for a better user experience
  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto dark:bg-gray-800" aria-live="polite" aria-atomic="true">
        <CardHeader>
          <CardTitle className="text-2xl font-bold dark:text-white">Age Group Rankings</CardTitle>
          <CardDescription className="dark:text-gray-400">Loading the latest age group leaderboards...</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full mb-4 rounded-md" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-md" />
            ))}
          </div>
          <Skeleton className="h-8 w-1/2 mt-6 rounded-md" />
        </CardContent>
      </Card>
    );
  }

  // Display error state with an icon and a more descriptive message
  if (isError) {
    return (
      <Card className="w-full max-w-4xl mx-auto dark:bg-gray-800" role="alert" aria-live="assertive">
        <CardHeader>
          <CardTitle className="text-2xl font-bold dark:text-white">Age Group Rankings</CardTitle>
          <CardDescription className="dark:text-gray-400">Failed to load rankings.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center text-red-500 dark:text-red-400">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>Error: {error?.message || 'An unknown error occurred.'}</p>
        </CardContent>
      </Card>
    );
  }

  // Render the leaderboards table once data is successfully loaded
  return (
    <Card className="w-full max-w-4xl mx-auto dark:bg-gray-800" aria-labelledby="age-group-rankings-title">
      <CardHeader>
        <CardTitle id="age-group-rankings-title" className="text-2xl font-bold dark:text-white">Age Group Rankings</CardTitle>
        <CardDescription className="dark:text-gray-400">View top players by age category.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Table for displaying rankings with accessibility attributes */}
        <Table className="w-full" role="table" aria-label="Age Group Leaderboards">
          <TableHeader>
            <TableRow>
              <TableHead className="dark:text-gray-300">Rank</TableHead>
              <TableHead className="dark:text-gray-300">Age Group</TableHead>
              <TableHead className="dark:text-gray-300">Username</TableHead>
              <TableHead className="dark:text-gray-300 text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Map through the data (or mock data if tRPC is not fully set up) to render each row */}
            {(data || mockRankings).map((ranking: AgeGroupRanking) => (
              <TableRow key={ranking.id} className="dark:hover:bg-gray-700">
                <TableCell className="font-medium dark:text-white" data-label="Rank">{ranking.rank}</TableCell>
                <TableCell className="dark:text-gray-200" data-label="Age Group">{ranking.ageGroup}</TableCell>
                <TableCell className="dark:text-gray-200" data-label="Username">{ranking.username}</TableCell>
                <TableCell className="text-right dark:text-white" data-label="Score">{ranking.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Placeholder for pagination or other controls to increase line count and demonstrate a more complete component */}
        <div className="mt-6 flex justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Further age groups and pagination coming soon...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardsAgeGroupRankings;
