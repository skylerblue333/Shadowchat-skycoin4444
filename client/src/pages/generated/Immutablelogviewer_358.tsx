// AUTO-GENERATED DRAFT SCREEN: ImmutableLogViewer

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC hook
import { Input } from '@/components/ui/input'; // Assuming shadcn/ui input
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui button
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Assuming shadcn/ui table
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination'; // Assuming shadcn/ui pagination

interface Transaction {
  id: string;
  timestamp: string;
  sender: string;
  receiver: string;
  amount: string;
  status: 'success' | 'failed' | 'pending';
}

// Placeholder for tRPC query
const fetchTransactions = async (page: number, searchTerm: string): Promise<Transaction[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const allTransactions: Transaction[] = Array.from({ length: 50 }, (_, i) => ({
        id: `tx-${i + 1}-${Math.random().toString(36).substring(7)}`,
        timestamp: new Date(Date.now() - i * 3600000).toLocaleString(),
        sender: `0xSender${i}`,
        receiver: `0xReceiver${i}`,
        amount: `${(100 - i).toFixed(2)} SKY`,
        status: i % 3 === 0 ? 'failed' : (i % 2 === 0 ? 'success' : 'pending'),
      }));
      const filtered = allTransactions.filter(tx => tx.id.includes(searchTerm));
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;
      resolve(filtered.slice(startIndex, endIndex));
    }, 500);
  });
};

const ImmutableLogViewer: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Using react-query as a placeholder for tRPC useQuery
  const { data: transactions, isLoading, isError, error } = useQuery<Transaction[], Error>(
    ['transactions', page, searchTerm],
    () => fetchTransactions(page, searchTerm),
    { keepPreviousData: true }
  );

  if (isLoading) return <div className="p-4 text-center">Loading transactions...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Error: {error?.message}</div>;

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Immutable Log Viewer</h1>

      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by Transaction ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm dark:bg-gray-800 dark:text-gray-100"
        />
        <Button className="dark:bg-blue-600 dark:hover:bg-blue-700">Refresh</Button>
      </div>

      <div className="overflow-x-auto rounded-md border dark:border-gray-700">
        <Table className="w-full">
          <TableHeader className="dark:bg-gray-800">
            <TableRow>
              <TableHead className="w-[150px]">Transaction ID</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.map((tx) => (
              <TableRow key={tx.id} className="dark:hover:bg-gray-800">
                <TableCell className="font-medium">{tx.id}</TableCell>
                <TableCell>{tx.timestamp}</TableCell>
                <TableCell>{tx.receiver}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell className={`text-right ${tx.status === 'success' ? 'text-green-500' : tx.status === 'failed' ? 'text-red-500' : 'text-yellow-500'}`}>
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage(prev => Math.max(1, prev - 1))} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => setPage(prev => prev + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ImmutableLogViewer;
