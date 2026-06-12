// AUTO-GENERATED DRAFT SCREEN: GovernanceVoteDelegationHistory
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Assume tRPC hooks are generated and available
// import { trpc } from '@/utils/trpc';

interface DelegationHistoryEntry {
  id: string;
  delegator: string;
  delegatee: string;
  amount: number;
  timestamp: string;
  status: 'active' | 'revoked' | 'expired';
}

interface GovernanceVoteDelegationHistoryProps {}

const GovernanceVoteDelegationHistory: React.FC<GovernanceVoteDelegationHistoryProps> = () => {
  const [history, setHistory] = useState<DelegationHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching data with tRPC
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // In a real app, this would be: const data = await trpc.governance.getDelegationHistory.query();
        const mockData: DelegationHistoryEntry[] = [
          { id: '1', delegator: '0xabc...123', delegatee: '0xdef...456', amount: 1000, timestamp: '2023-01-01T10:00:00Z', status: 'active' },
          { id: '2', delegator: '0xghi...789', delegatee: '0xklm...012', amount: 500, timestamp: '2023-01-02T11:00:00Z', status: 'revoked' },
          { id: '3', delegator: '0xnop...345', delegatee: '0xqrst...678', amount: 2000, timestamp: '2023-01-03T12:00:00Z', status: 'active' },
          { id: '4', delegator: '0xuvw...901', delegatee: '0xxyz...234', amount: 750, timestamp: '2023-01-04T13:00:00Z', status: 'expired' },
        ];
        setHistory(mockData);
      } catch (err) {
        setError('Failed to load delegation history.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4" role="status" aria-live="polite">
        <Skeleton className="h-10 w-full" aria-label="Loading title" />
        <Skeleton className="h-64 w-full" aria-label="Loading table data" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4" role="alert">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-50 min-h-screen" aria-live="polite" aria-busy={isLoading}>
      <Card className="w-full shadow-lg rounded-lg">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-3xl font-extrabold tracking-tight">Governance: Vote Delegation History</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {history.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No delegation history found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800">
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delegator</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delegatee</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                  {history.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">{entry.delegator}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{entry.delegatee}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{entry.amount} <span className="font-semibold">SKY</span></TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{format(new Date(entry.timestamp), 'PPP p')}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                        <Badge variant={entry.status === 'active' ? 'default' : entry.status === 'revoked' ? 'destructive' : 'secondary'}>
                          {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernanceVoteDelegationHistory;
