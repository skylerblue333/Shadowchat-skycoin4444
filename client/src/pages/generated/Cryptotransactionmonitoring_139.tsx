// AUTO-GENERATED DRAFT SCREEN: CryptoTransactionMonitoring
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

// Assume tRPC hooks are available, e.g., from a generated client
// import { trpc } from '@/utils/trpc';

interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
}

const mockTransactions: Transaction[] = [
  { id: '1', hash: '0x123...', from: '0xabc...', to: '0xdef...', amount: 10.5, currency: 'SKY', status: 'completed', timestamp: '2023-01-01T10:00:00Z' },
  { id: '2', hash: '0x456...', from: '0xghi...', to: '0xjkl...', amount: 2.0, currency: 'SKY', status: 'pending', timestamp: '2023-01-01T10:05:00Z' },
  { id: '3', hash: '0x789...', from: '0xmno...', to: '0xpqr...', amount: 50.0, currency: 'SKY', status: 'failed', timestamp: '2023-01-01T10:10:00Z' },
];

const CryptoTransactionMonitoring: React.FC = () => {
  // Example of tRPC hook usage (uncomment and adapt when tRPC is set up)
  // const { data: transactions, isLoading, error } = trpc.getTransactions.useQuery();

  const isLoading = false; // Replace with actual loading state from tRPC
  const error = null; // Replace with actual error state from tRPC
  const transactions = mockTransactions; // Replace with actual data from tRPC

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-12 w-full" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 dark:text-red-400">
        <h2 className="text-lg font-semibold">Error loading transactions:</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen">
      <Card className="w-full dark:bg-gray-800 dark:text-gray-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crypto: Transaction Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="dark:hover:bg-gray-700">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Hash</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="dark:hover:bg-gray-700">
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.hash}</TableCell>
                  <TableCell>{transaction.from}</TableCell>
                  <TableCell>{transaction.to}</TableCell>
                  <TableCell className="text-right">{transaction.amount} {transaction.currency}</TableCell>
                  <TableCell>
                    <Badge
                      className={{
                        'bg-green-500 dark:bg-green-600': transaction.status === 'completed',
                        'bg-yellow-500 dark:bg-yellow-600': transaction.status === 'pending',
                        'bg-red-500 dark:bg-red-600': transaction.status === 'failed',
                      }[transaction.status]}
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(transaction.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoTransactionMonitoring;
