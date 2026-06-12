// AUTO-GENERATED DRAFT SCREEN: StakingOverview
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { trpc } from '../trpc';

const StakingOverview: React.FC = () => {
  const { data: overviewData, isLoading: isOverviewLoading, error: overviewError } = trpc.staking.getOverview.useQuery();
  const { data: rewardsData, isLoading: isRewardsLoading, error: rewardsError } = trpc.staking.getRewardsHistory.useQuery({ page: 1, limit: 5 });

  if (isOverviewLoading || isRewardsLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Staking Overview</h1>
        <p>Loading staking data...</p>
      </div>
    );
  }

  if (overviewError || rewardsError) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        <h1 className="text-3xl font-bold mb-6">Staking Overview</h1>
        <p>Error loading staking data: {overviewError?.message || rewardsError?.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Staking Overview</h1>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Your Staking Summary</CardTitle>
              <CardDescription>
                Details about your current staked assets.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Total Staked: {overviewData?.totalStaked?.toFixed(2) || '0.00'} SKY</p>
              <p>APY: {overviewData?.apy?.toFixed(2) || '0.00'}%</p>
              <p>Next Reward: {overviewData?.nextReward ? new Date(overviewData.nextReward).toLocaleString() : '--'}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle>Your Staking Rewards</CardTitle>
              <CardDescription>
                History of your earned staking rewards.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {rewardsData?.rewards && rewardsData.rewards.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rewardsData.rewards.map((reward) => (
                      <TableRow key={reward.id}>
                        <TableCell>{reward.amount.toFixed(2)} SKY</TableCell>
                        <TableCell>{new Date(reward.date).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No rewards history available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StakingOverview;