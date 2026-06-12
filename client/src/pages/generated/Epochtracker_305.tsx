// AUTO-GENERATED DRAFT SCREEN: EpochTracker

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface EpochData {
  epoch: number;
  startTime: string;
  endTime: string;
  blocksProduced: number;
  totalBlocks: number;
}

const EpochTracker: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.crypto.getEpochData.useQuery();

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Epoch Tracker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="w-full max-w-md mx-auto">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load epoch data: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert className="w-full max-w-md mx-auto">
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>
          No epoch data available at this time.
        </AlertDescription>
      </Alert>
    );
  }

  const { epoch, startTime, endTime, blocksProduced, totalBlocks } = data;

  return (
    <Card className="w-full max-w-md mx-auto dark:bg-gray-800 dark:text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Crypto: Epoch Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Current Epoch:</span>
          <span className="text-xl font-bold text-blue-500">{epoch}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Start Time:</span>
          <span className="text-md">{new Date(startTime).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">End Time:</span>
          <span className="text-md">{new Date(endTime).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Blocks Produced:</span>
          <span className="text-md">{blocksProduced} / {totalBlocks}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Progress:</span>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ml-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(blocksProduced / totalBlocks) * 100}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EpochTracker;
