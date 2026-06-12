// AUTO-GENERATED DRAFT SCREEN: GovernanceVoteHistory
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface VoteHistoryEntry {
  id: string;
  proposalId: string;
  voterAddress: string;
  vote: 'yes' | 'no' | 'abstain';
  timestamp: string;
}

const GovernanceVoteHistory: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.governance.getVoteHistory.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load vote history: {error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Vote History</CardTitle>
        </CardHeader>
        <CardContent>
          {data && data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Proposal ID</TableHead>
                  <TableHead>Voter Address</TableHead>
                  <TableHead>Vote</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.proposalId}</TableCell>
                    <TableCell>{entry.voterAddress}</TableCell>
                    <TableCell>{entry.vote}</TableCell>
                    <TableCell>{new Date(entry.timestamp).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground">No vote history available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernanceVoteHistory;
