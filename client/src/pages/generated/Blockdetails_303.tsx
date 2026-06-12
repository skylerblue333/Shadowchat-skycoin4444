// AUTO-GENERATED DRAFT SCREEN: BlockDetails
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

// Mock tRPC hook for demonstration purposes
const trpc = {
  crypto: {
    getBlockDetails: {
      useQuery: (blockId: string) => {
        const [data, setData] = React.useState<any>(null);
        const [isLoading, setIsLoading] = React.useState(true);
        const [isError, setIsError] = React.useState(false);

        React.useEffect(() => {
          const fetchData = async () => {
            setIsLoading(true);
            setIsError(false);
            try {
              // Simulate API call delay
              await new Promise(resolve => setTimeout(resolve, 1500));
              if (blockId === 'error-block') {
                throw new Error('Failed to fetch block details');
              }
              setData({
                id: blockId,
                hash: '0x' + Math.random().toString(16).substring(2, 66),
                number: Math.floor(Math.random() * 10000000),
                timestamp: new Date().toLocaleString(),
                transactions: Math.floor(Math.random() * 500) + 1,
                miner: '0x' + Math.random().toString(16).substring(2, 42),
                difficulty: (Math.random() * 10000000000000).toFixed(0),
              });
            } catch (e) {
              setIsError(true);
            } finally {
              setIsLoading(false);
            }
          };
          fetchData();
        }, [blockId]);

        return { data, isLoading, isError };
      },
    },
  },
};

interface BlockDetailsProps {
  blockId: string;
}

export const BlockDetails: React.FC<BlockDetailsProps> = ({ blockId }) => {
  const { data: block, isLoading, isError } = trpc.crypto.getBlockDetails.useQuery(blockId);

  if (isError) {
    return (
      <Alert variant="destructive" className="w-full max-w-2xl mx-auto mt-8">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load block details for ID: {blockId}. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 dark:bg-gray-800 dark:text-gray-50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Block Details</CardTitle>
        <CardDescription>Information about block ID: {blockId}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="col-span-1">
              <dt className="font-medium text-gray-500 dark:text-gray-400">Block Hash:</dt>
              <dd className="truncate font-mono text-gray-900 dark:text-gray-50" aria-label="Block Hash">{block?.hash}</dd>
            </div>
            <div className="col-span-1">
              <dt className="font-medium text-gray-500 dark:text-gray-400">Block Number:</dt>
              <dd className="font-mono text-gray-900 dark:text-gray-50" aria-label="Block Number">{block?.number}</dd>
            </div>
            <div className="col-span-1">
              <dt className="font-medium text-gray-500 dark:text-gray-400">Timestamp:</dt>
              <dd className="text-gray-900 dark:text-gray-50" aria-label="Timestamp">{block?.timestamp}</dd>
            </div>
            <div className="col-span-1">
              <dt className="font-medium text-gray-500 dark:text-gray-400">Transactions:</dt>
              <dd className="text-gray-900 dark:text-gray-50" aria-label="Number of Transactions">{block?.transactions}</dd>
            </div>
            <div className="col-span-1">
              <dt className="font-medium text-gray-500 dark:text-gray-400">Miner:</dt>
              <dd className="truncate font-mono text-gray-900 dark:text-gray-50" aria-label="Miner Address">{block?.miner}</dd>
            </div>
            <div className="col-span-1">
              <dt className="font-medium text-gray-500 dark:text-gray-400">Difficulty:</dt>
              <dd className="text-gray-900 dark:text-gray-50" aria-label="Block Difficulty">{block?.difficulty}</dd>
            </div>
          </dl>
        )}
      </CardContent>
    </Card>
  );
};

export default BlockDetails;
