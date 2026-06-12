// AUTO-GENERATED DRAFT SCREEN: TransactionDetailScreen
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Simulating tRPC hook usage
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui Card
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui Skeleton for loading states
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // shadcn/ui Alert for error handling
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'; // Example icon for errors

interface TransactionDetail {
  id: string;
  type: 'buy' | 'sell' | 'transfer';
  amount: number;
  currency: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  fromAddress?: string;
  toAddress?: string;
  fee: number;
}

// Simulate fetching data with a delay and potential errors
const fetchTransactionDetail = async (id: string): Promise<TransactionDetail> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 'error-id') {
        reject(new Error('Failed to fetch transaction details.'));
      } else if (id === 'loading-id') {
        // Simulate perpetual loading for demonstration
      } else {
        resolve({
          id: id,
          type: 'buy',
          amount: 1.2345,
          currency: 'BTC',
          timestamp: new Date().toISOString(),
          status: 'completed',
          fromAddress: '0xabc...123',
          toAddress: '0xdef...456',
          fee: 0.0001,
        });
      }
    }, 1500);
  });
};

interface TransactionDetailScreenProps {
  transactionId: string;
}

const TransactionDetailScreen: React.FC<TransactionDetailScreenProps> = ({ transactionId }) => {
  const { data, isLoading, isError, error } = useQuery<TransactionDetail, Error>(
    ['transactionDetail', transactionId],
    () => fetchTransactionDetail(transactionId),
    { staleTime: 5 * 60 * 1000 } // Data considered fresh for 5 minutes
  );

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message || 'An unexpected error occurred while fetching transaction details.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <Alert>
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>No transaction details found for ID: {transactionId}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100" role="region" aria-labelledby="transaction-detail-title">
      <h1 id="transaction-detail-title" className="text-2xl font-bold">Transaction Detail</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">ID: {data.id}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Type:</strong> {data.type}</p>
            <p><strong>Amount:</strong> {data.amount} {data.currency}</p>
            <p><strong>Status:</strong> <span className={`font-medium ${data.status === 'completed' ? 'text-green-500' : data.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>{data.status}</span></p>
            <p><strong>Timestamp:</strong> {new Date(data.timestamp).toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Addresses & Fees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.fromAddress && <p><strong>From:</strong> {data.fromAddress}</p>}
            {data.toAddress && <p><strong>To:</strong> {data.toAddress}</p>}
            <p><strong>Fee:</strong> {data.fee} {data.currency}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionDetailScreen;
