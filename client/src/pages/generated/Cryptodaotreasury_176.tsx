// AUTO-GENERATED DRAFT SCREEN: CryptoDAOTreasury

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'; // shadcn/ui Card
import { Skeleton } from '../components/ui/skeleton'; // shadcn/ui Skeleton for loading states
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'; // shadcn/ui Alert for error handling
import { DollarSign, Wallet, Banknote, TrendingUp, Clock } from 'lucide-react'; // Lucide icons
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'; // shadcn/ui Table
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'; // Recharts for data visualization

interface TreasuryData {
  totalAssets: number;
  liquidAssets: number;
  stakedAssets: number;
  assetDistribution: Array<{ name: string; value: number; color: string }>;
  recentTransactions: Array<{
    id: string;
    type: string;
    amount: number;
    asset: string;
    date: string;
  }>;
}

const CryptoDAOTreasury: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.dao.getTreasuryData.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen" aria-live="polite" aria-busy="true">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">DAO Treasury Overview</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-[120px] w-full" />
        </div>
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen" role="alert">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load DAO treasury data: {error?.message || 'Unknown error'}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const treasuryData: TreasuryData = data || {
    totalAssets: 0,
    liquidAssets: 0,
    stakedAssets: 0,
    assetDistribution: [],
    recentTransactions: [],
  };

  return (
    <div className="p-4 space-y-6 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white" role="region" aria-label="DAO Treasury Information">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">DAO Treasury Overview</h1>

      <section aria-labelledby="treasury-summary-heading">
        <h2 id="treasury-summary-heading" className="sr-only">Treasury Summary</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="dark:bg-gray-800 dark:text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${treasuryData.totalAssets.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total value across all holdings</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Liquid Assets</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${treasuryData.liquidAssets.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Immediately available funds</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staked Assets</CardTitle>
              <Banknote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${treasuryData.stakedAssets.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Assets locked in staking protocols</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section aria-labelledby="asset-distribution-heading">
        <h2 id="asset-distribution-heading" className="text-2xl font-bold">Asset Distribution</h2>
        <Card className="dark:bg-gray-800 dark:text-white p-4">
          <CardContent className="h-[300px]">
            {treasuryData.assetDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={treasuryData.assetDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {treasuryData.assetDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">No asset distribution data available.</div>
            )}
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="recent-transactions-heading">
        <h2 id="recent-transactions-heading" className="text-2xl font-bold">Recent Transactions</h2>
        <Card className="dark:bg-gray-800 dark:text-white">
          <CardContent className="p-0">
            {treasuryData.recentTransactions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {treasuryData.recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.type}</TableCell>
                      <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                      <TableCell>{transaction.asset}</TableCell>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-4 text-muted-foreground">No recent transactions to display.</div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default CryptoDAOTreasury;
