// AUTO-GENERATED DRAFT SCREEN: LearningCompetitionsScreen

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Competition {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'closed' | 'upcoming';
  participants: number;
  startDate: string;
  endDate: string;
}

const LearningCompetitionsScreen: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.competitions.list.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold dark:text-white">Learning Competitions</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-10 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <Alert variant="destructive" className="dark:bg-red-900 dark:border-red-700 dark:text-red-100">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load learning competitions: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Learning Competitions</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">Participate in challenges to enhance your skills and compete with others.</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((competition: Competition) => (
          <Card key={competition.id} className="flex flex-col dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-semibold leading-none tracking-tight dark:text-white">
                {competition.title}
              </CardTitle>
              <Badge
                className={`px-3 py-1 rounded-full text-xs font-medium
                  ${competition.status === 'open' ? 'bg-green-500 text-white dark:bg-green-600'
                  : competition.status === 'upcoming' ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-gray-500 text-white dark:bg-gray-600'}
                `}
              >
                {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
              </Badge>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between p-6 pt-0">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                {competition.description}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                <p>Participants: {competition.participants}</p>
                <p>Starts: {new Date(competition.startDate).toLocaleDateString()}</p>
                <p>Ends: {new Date(competition.endDate).toLocaleDateString()}</p>
              </div>
              <Button
                className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                disabled={competition.status !== 'open'}
              >
                {competition.status === 'open' ? 'Join Competition' : 'View Details'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningCompetitionsScreen;
