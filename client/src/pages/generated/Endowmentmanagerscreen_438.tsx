// AUTO-GENERATED DRAFT SCREEN: EndowmentManagerScreen

import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC/React Query
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui path
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

// Mock tRPC hook for demonstration. In a real app, this would come from your tRPC client.
const trpc = {
  endowment: {
    getSummary: () => ({ queryKey: ['endowmentSummary'], queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      if (Math.random() < 0.1) throw new Error('Failed to fetch endowment data.');
      return {
        totalValue: 1234567.89,
        investments: [
          { id: '1', name: 'Tech Fund A', value: 500000, yield: 0.12 },
          { id: '2', name: 'Green Energy B', value: 300000, yield: 0.08 },
          { id: '3', name: 'Real Estate C', value: 434567.89, yield: 0.05 },
        ],
      };
    } }),
  },
};

interface Investment {
  id: string;
  name: string;
  value: number;
  yield: number;
}

interface EndowmentSummary {
  totalValue: number;
  investments: Investment[];
}

const EndowmentManagerScreen: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<EndowmentSummary>(
    trpc.endowment.getSummary().queryKey,
    trpc.endowment.getSummary().queryFn,
    { retry: 1 } // Basic error handling: retry once
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg" aria-live="polite">Loading endowment data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Failed to load endowment data.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm" role="alert">{error?.message || 'An unknown error occurred.'}</p>
            <Button onClick={() => refetch()} className="mt-4">Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Endowment Manager</CardTitle>
          <CardDescription>Overview of your endowment investments.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <Label htmlFor="total-value" className="text-lg">Total Endowment Value</Label>
              <Input
                id="total-value"
                type="text"
                value={`$${data?.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                readOnly
                className="mt-2 text-xl font-semibold"
                aria-label="Total Endowment Value"
              />
            </div>
            <div className="flex items-end justify-end">
              <Button onClick={() => refetch()} aria-label="Refresh Endowment Data">Refresh Data</Button>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Investment Portfolio</h3>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Investment</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Yield</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.investments.map((investment) => (
                <TableRow key={investment.id}>
                  <TableCell className="font-medium">{investment.name}</TableCell>
                  <TableCell className="text-right">{`$${investment.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</TableCell>
                  <TableCell className="text-right">{(investment.yield * 100).toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EndowmentManagerScreen;
