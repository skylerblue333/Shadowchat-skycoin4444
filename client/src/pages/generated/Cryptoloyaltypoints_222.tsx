// AUTO-GENERATED DRAFT SCREEN: CryptoLoyaltyPoints
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui Card
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui Skeleton for loading states
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // shadcn/ui Alert for error handling
import { Terminal } from 'lucide-react'; // Example icon for Alert

interface LoyaltyPoint {
  id: string;
  name: string;
  points: number;
  lastUpdated: string;
}

const CryptoLoyaltyPoints: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.loyalty.getLoyaltyPoints.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-12 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load loyalty points: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Crypto Loyalty Points</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((point: LoyaltyPoint) => (
          <Card key={point.id} className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">{point.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{point.points} Points</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last Updated: {new Date(point.lastUpdated).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {data && data.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No loyalty points found.</p>
      )}
    </div>
  );
};

export default CryptoLoyaltyPoints;
