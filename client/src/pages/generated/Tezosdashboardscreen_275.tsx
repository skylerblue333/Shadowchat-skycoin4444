// AUTO-GENERATED DRAFT SCREEN: TezosDashboardScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Skeleton } from './components/ui/skeleton';

interface TezosAccountData {
  address: string;
  balance: number;
  transactions: {
    hash: string;
    amount: number;
    timestamp: string;
    type: string;
  }[];
}

const TezosDashboardScreen: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = trpc.tezos.getAccountData.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
        </div>
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500 dark:text-red-400" role="alert">
        <h2 className="text-lg font-semibold">Error loading Tezos data:</h2>
        <p>{error.message}</p>
        <Button onClick={() => refetch()} className="mt-2">Retry</Button>
      </div>
    );
  }

  const accountData: TezosAccountData = data as TezosAccountData;

  return (
    <div className="p-4 space-y-6 bg-background text-foreground dark:bg-gray-900 dark:text-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Tezos Dashboard</h1>
      <p className="text-muted-foreground">Overview of your Tezos account and recent activity.</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card text-card-foreground shadow-sm">
          <CardHeader>
            <CardDescription>Account Address</CardDescription>
            <CardTitle className="text-2xl font-medium break-all">{accountData.address}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-card text-card-foreground shadow-sm">
          <CardHeader>
            <CardDescription>Current Balance</CardDescription>
            <CardTitle className="text-2xl font-medium">{accountData.balance} XTZ</CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-card text-card-foreground shadow-sm">
          <CardHeader>
            <CardDescription>Total Transactions</CardDescription>
            <CardTitle className="text-2xl font-medium">{accountData.transactions.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="bg-card text-card-foreground shadow-sm">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest Tezos blockchain interactions.</CardDescription>
        </CardHeader>
        <CardContent>
          {accountData.transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hash</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accountData.transactions.map((tx) => (
                    <TableRow key={tx.hash}>
                      <TableCell className="font-medium break-all">{tx.hash.substring(0, 10)}...</TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell className="text-right">{tx.amount} XTZ</TableCell>
                      <TableCell className="text-right">{new Date(tx.timestamp).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">No recent transactions found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TezosDashboardScreen;
