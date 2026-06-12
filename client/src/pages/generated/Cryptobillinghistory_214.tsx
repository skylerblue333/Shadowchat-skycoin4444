// AUTO-GENERATED DRAFT SCREEN: CryptoBillingHistory
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

// Mock tRPC hook for fetching billing history
const useBillingHistory = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData = [
          { id: '1', date: '2023-10-26', amount: '0.05 BTC', status: 'Completed' },
          { id: '2', date: '2023-10-25', amount: '1.2 ETH', status: 'Pending' },
          { id: '3', date: '2023-10-24', amount: '200 USDT', status: 'Failed' },
          { id: '4', date: '2023-10-23', amount: '0.1 BTC', status: 'Completed' },
        ];
        setData(mockData);
      } catch (error) {
        console.error('Failed to fetch billing history:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, isError };
};

interface BillingHistoryItem {
  id: string;
  date: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

const CryptoBillingHistory: React.FC = () => {
  const { data, isLoading, isError } = useBillingHistory();

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500 dark:text-red-400">
        <AlertCircle className="mr-2" />
        <span>Error loading billing history. Please try again later.</span>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto dark:bg-gray-900 dark:text-gray-50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Crypto Billing History</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((item: BillingHistoryItem) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.date}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      <Badge
                        className={`
                          ${item.status === 'Completed' && 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'}
                          ${item.status === 'Pending' && 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700'}
                          ${item.status === 'Failed' && 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'}
                        `}
                      >
                        {item.status === 'Completed' && <CheckCircle2 className="mr-1 h-4 w-4" />}
                        {item.status === 'Failed' && <AlertCircle className="mr-1 h-4 w-4" />}
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No billing history found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default CryptoBillingHistory;
