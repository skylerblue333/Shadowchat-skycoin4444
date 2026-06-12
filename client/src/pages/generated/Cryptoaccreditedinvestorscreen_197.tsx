// AUTO-GENERATED DRAFT SCREEN: CryptoAccreditedInvestorScreen
// src/components/CryptoAccreditedInvestorScreen.tsx
import React from 'react';
import { useQuery } from '@trpc/react-query'; // Assuming tRPC setup
import { Button } from '@/components/ui/button'; // shadcn/ui button
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui card
import { Checkbox } from '@/components/ui/checkbox'; // shadcn/ui checkbox
import { Label } from '@/components/ui/label'; // shadcn/ui label
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui skeleton

interface AccreditedInvestorStatus {
  isAccredited: boolean;
  reason?: string;
}

// Simulate tRPC API call
const trpc = {
  investor: {
    getAccreditedStatus: {
      useQuery: () => ({
        data: { isAccredited: true, reason: 'Meets income requirements' } as AccreditedInvestorStatus,
        isLoading: false,
        isError: false,
        error: null,
      }),
    },
  },
};

export const CryptoAccreditedInvestorScreen: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.investor.getAccreditedStatus.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md shadow-lg dark:bg-gray-800">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md shadow-lg dark:bg-gray-800 border-red-500">
          <CardHeader>
            <CardTitle className="text-red-500">Error Loading Status</CardTitle>
            <CardDescription>We could not retrieve your accredited investor status.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-400" role="alert">Error: {error?.message || 'Unknown error'}</p>
            <Button className="mt-4 w-full" variant="destructive">Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isAccredited = data?.isAccredited || false;
  const reason = data?.reason || 'N/A';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Accredited Investor Status</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Your current status regarding accredited investor criteria.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2" aria-live="polite">
            <Checkbox
              id="accredited-status"
              checked={isAccredited}
              disabled
              aria-checked={isAccredited}
              aria-labelledby="accredited-label"
            />
            <Label htmlFor="accredited-status" id="accredited-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
              {isAccredited ? 'You are an Accredited Investor' : 'You are NOT an Accredited Investor'}
            </Label>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <p className="font-semibold">Details:</p>
            <p>{reason}</p>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
            Learn More About Accreditation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};


export default CryptoAccreditedInvestorScreen;
