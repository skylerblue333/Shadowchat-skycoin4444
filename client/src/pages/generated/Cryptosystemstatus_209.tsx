// AUTO-GENERATED DRAFT SCREEN: CryptoSystemStatus

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface SystemStatus {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'offline';
  lastUpdated: string;
  message: string;
}

const CryptoSystemStatus: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.system.getStatus.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen">
        <Card className="w-full max-w-4xl mx-auto dark:bg-gray-800 dark:text-gray-50">
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <Alert variant="destructive" className="w-full max-w-4xl mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load system status: {error?.message || 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">Crypto System Status</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl mx-auto">
        {data?.map((statusItem: SystemStatus) => (
          <Card key={statusItem.id} className="dark:bg-gray-800 dark:text-gray-50">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{statusItem.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-sm font-medium ${statusItem.status === 'operational' ? 'text-green-500' : statusItem.status === 'degraded' ? 'text-yellow-500' : 'text-red-500'}`}>
                Status: {statusItem.status.charAt(0).toUpperCase() + statusItem.status.slice(1)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last Updated: {new Date(statusItem.lastUpdated).toLocaleString()}</p>
              <p className="text-sm mt-2">{statusItem.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CryptoSystemStatus;
