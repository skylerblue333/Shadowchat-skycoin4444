// AUTO-GENERATED DRAFT SCREEN: CommunityModerationReportsScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Badge } from './components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Skeleton } from './components/ui/skeleton';

// Mock tRPC client for demonstration. In a real app, this would be imported.
const trpc = {
  moderation: {
    getReports: {
      useQuery: () => {
        // Simulate loading, error, and success states
        const [data, setData] = React.useState<Report[] | undefined>(undefined);
        const [isLoading, setIsLoading] = React.useState(true);
        const [isError, setIsError] = React.useState(false);
        const [error, setError] = React.useState<Error | null>(null);

        React.useEffect(() => {
          const fetchData = setTimeout(() => {
            if (Math.random() > 0.8) { // Simulate error 20% of the time
              setIsError(true);
              setError(new Error('Failed to fetch moderation reports.'));
              setIsLoading(false);
            } else {
              setData([
                { id: '1', reporter: 'UserA', reportedContent: 'Spam post', reason: 'Spam', status: 'pending', timestamp: '2023-01-01T10:00:00Z' },
                { id: '2', reporter: 'UserB', reportedContent: 'Hate speech', reason: 'Hate Speech', status: 'reviewed', timestamp: '2023-01-01T11:00:00Z' },
                { id: '3', reporter: 'UserC', reportedContent: 'Nudity', reason: 'NSFW', status: 'rejected', timestamp: '2023-01-01T12:00:00Z' },
                { id: '4', reporter: 'UserD', reportedContent: 'Phishing link', reason: 'Scam', status: 'pending', timestamp: '2023-01-01T13:00:00Z' },
              ]);
              setIsLoading(false);
            }
          }, 1500); // Simulate network delay
          return () => clearTimeout(fetchData);
        }, []);

        return { data, isLoading, isError, error };
      },
    },
  },
};

interface Report {
  id: string;
  reporter: string;
  reportedContent: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'rejected';
  timestamp: string;
}

const CommunityModerationReportsScreen: React.FC = () => {
  const { data: reports, isLoading, isError, error } = trpc.moderation.getReports.useQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
        <Card className="dark:bg-gray-800 dark:text-gray-50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Community Moderation Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Skeleton className="h-8 w-3/4 dark:bg-gray-700" />
              <Skeleton className="h-8 w-full dark:bg-gray-700" />
              <Skeleton className="h-8 w-full dark:bg-gray-700" />
              <Skeleton className="h-8 w-2/3 dark:bg-gray-700" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen text-red-500">
        <Card className="dark:bg-gray-800 dark:text-gray-50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Community Moderation Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg" role="alert">Error: {error?.message || 'An unknown error occurred.'}</p>
            <p className="text-sm text-gray-400">Please try refreshing the page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
      <Card className="dark:bg-gray-800 dark:text-gray-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold" aria-label="Community Moderation Reports">Community Moderation Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="dark:text-gray-50">
            <TableHeader>
              <TableRow className="dark:border-gray-700">
                <TableHead className="dark:text-gray-300">ID</TableHead>
                <TableHead className="dark:text-gray-300">Reporter</TableHead>
                <TableHead className="dark:text-gray-300">Content</TableHead>
                <TableHead className="dark:text-gray-300">Reason</TableHead>
                <TableHead className="dark:text-gray-300">Status</TableHead>
                <TableHead className="dark:text-gray-300">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports?.map((report) => (
                <TableRow key={report.id} className="dark:border-gray-800 hover:dark:bg-gray-700/50">
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>{report.reporter}</TableCell>
                  <TableCell>{report.reportedContent}</TableCell>
                  <TableCell>{report.reason}</TableCell>
                  <TableCell>
                    <Badge
                      className={{
                        pending: 'bg-yellow-500 dark:bg-yellow-600',
                        reviewed: 'bg-blue-500 dark:bg-blue-600',
                        rejected: 'bg-red-500 dark:bg-red-600',
                      }[report.status]}
                    >
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(report.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {reports && reports.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4">No moderation reports found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityModerationReportsScreen;
