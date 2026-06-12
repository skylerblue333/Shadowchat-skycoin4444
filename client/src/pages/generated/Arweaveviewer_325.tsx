// AUTO-GENERATED DRAFT SCREEN: ArweaveViewer
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { Sun, Moon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// Mock tRPC client for demonstration
const trpc = {
  arweave: {
    getTransaction: (id: string) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (id === 'valid-tx-id') {
            resolve({
              id: 'valid-tx-id',
              owner: 'some-owner-address',
              target: 'some-target-address',
              dataSize: '1024',
              block: { height: 123456, timestamp: Date.now() },
            });
          } else if (id === 'error-tx-id') {
            reject(new Error('Transaction not found'));
          } else {
            resolve(null);
          }
        }, 1000);
      }),
  },
};

interface TransactionData {
  id: string;
  owner: string;
  target: string;
  dataSize: string;
  block: { height: number; timestamp: number };
}

const ArweaveViewer: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [transactionId, setTransactionId] = useState('');
  const [searchId, setSearchId] = useState('');

  const { data, isLoading, isError, error } = useQuery<TransactionData | null>(
    ['arweaveTransaction', searchId],
    () => trpc.arweave.getTransaction(searchId),
    {
      enabled: !!searchId,
    }
  );

  const handleSearch = () => {
    setSearchId(transactionId);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Arweave Transaction Viewer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Enter Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="flex-grow"
              aria-label="Transaction ID Input"
            />
            <Button onClick={handleSearch} disabled={isLoading} aria-label="Search Transaction">
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>

          {isLoading && <p className="text-center">Loading transaction data...</p>}
          {isError && <p className="text-center text-red-500">Error: {error?.message}</p>}

          {data && (
            <div className="space-y-2">
              <p><strong>ID:</strong> {data.id}</p>
              <p><strong>Owner:</strong> {data.owner}</p>
              <p><strong>Target:</strong> {data.target}</p>
              <p><strong>Data Size:</strong> {data.dataSize} bytes</p>
              <p><strong>Block Height:</strong> {data.block.height}</p>
              <p><strong>Timestamp:</strong> {new Date(data.block.timestamp).toLocaleString()}</p>
            </div>
          )}
          {!data && !isLoading && !isError && searchId && (
            <p className="text-center text-muted-foreground">No transaction found for ID: {searchId}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ArweaveViewer;
