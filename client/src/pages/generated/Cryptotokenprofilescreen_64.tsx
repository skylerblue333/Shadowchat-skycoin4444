// AUTO-GENERATED DRAFT SCREEN: CryptoTokenProfileScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface TokenProfileProps {
  tokenId: string;
}

interface TokenData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  volume24h: number;
  // Add more token-specific data as needed
}

const CryptoTokenProfileScreen: React.FC<TokenProfileProps> = ({ tokenId }) => {
  const { data, isLoading, isError, error } = trpc.crypto.getTokenProfile.useQuery({
    tokenId,
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load token profile: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>
            No token data found for the provided ID.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const token: TokenData = data as TokenData; // Type assertion for simplicity, ideally validate with Zod

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{token.name} ({token.symbol})</CardTitle>
          <CardDescription>Detailed profile for {token.name}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p><strong>Current Price:</strong> ${token.price.toFixed(2)}</p>
            <p><strong>Market Cap:</strong> ${token.marketCap.toLocaleString()}</p>
            <p><strong>24h Volume:</strong> ${token.volume24h.toLocaleString()}</p>
            {/* Add more details here */}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Technical Details</h3>
            <p><strong>Token ID:</strong> {token.id}</p>
            {/* Placeholder for charts or additional technical info */}
            <div className="mt-4 h-32 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500 dark:text-gray-400">
              [Chart Placeholder]
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoTokenProfileScreen;
