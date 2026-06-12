// AUTO-GENERATED DRAFT SCREEN: CryptoStakingDashboard
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { trpc } from '@/utils/trpc';

interface StakingData {
  totalStaked: number;
  apy: number;
  rewards: number;
}

const CryptoStakingDashboard: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.stakingData.useQuery<StakingData>();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error: {error?.message}</div>;
  }

  return (
    <div className="p-4 space-y-4 dark:bg-gray-900 dark:text-white min-h-screen" role="region" aria-label="Crypto Staking Dashboard">
      <h1 className="text-3xl font-bold">Crypto Staking Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Staked</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data?.totalStaked} SKY</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>APY</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data?.apy}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rewards Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data?.rewards} SKY</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoStakingDashboard;
