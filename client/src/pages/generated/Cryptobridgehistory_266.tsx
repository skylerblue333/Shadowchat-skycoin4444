// AUTO-GENERATED DRAFT SCREEN: CryptoBridgeHistory
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface BridgeHistoryItem {
  id: string;
  fromChain: string;
  toChain: string;
  amount: number;
  token: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
}

const CryptoBridgeHistory: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.bridge.getHistory.useQuery();

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto p-4 bg-background text-foreground shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Bridge History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-2/3" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-4xl mx-auto p-4 bg-background text-foreground shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Bridge History</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load bridge history: {error.message}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto p-4 bg-background text-foreground shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Bridge History</CardTitle>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: BridgeHistoryItem) => (
                <TableRow key={item.id}>
                  <TableCell>{item.fromChain}</TableCell>
                  <TableCell>{item.toChain}</TableCell>
                  <TableCell>{item.amount} {item.token}</TableCell>
                  <TableCell>{item.token}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${item.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : item.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(item.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-muted-foreground">No bridge history found.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CryptoBridgeHistory;
