// @ts-nocheck
import React from 'react';
import { cn } from '@/lib/utils';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: CryptoTopGainersLosers

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


// Mock tRPC hooks

interface CryptoItemProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
  volume: string;
  isGainer: boolean;
}

const CryptoItem: React.FC<any> = ({ name, symbol, price, change, volume, isGainer }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
    <div className="flex flex-col">
      <span className="font-semibold text-lg">{name} ({symbol})</span>
      <span className="text-sm text-gray-500 dark:text-gray-400">Volume: {volume}</span>
    </div>
    <div className="flex flex-col items-end">
      <span className="font-bold text-lg">${price.toFixed(2)}</span>
      <span className={cn(
        "text-sm",
        isGainer ? "text-green-500" : "text-red-500"
      )}>
        {change > 0 ? '+' : ''}{change.toFixed(2)}%
      </span>
    </div>
  </div>
);

const CryptoTopGainersLosers: React.FC = () => {
  const { data, isLoading, isError } = useStubQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="text-xl font-semibold">Loading top gainers and losers...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-red-500">
        <div className="text-xl font-semibold">Error loading data. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Crypto: Top Gainers & Losers</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section aria-labelledby="gainers-heading">
          <h2 id="gainers-heading" className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">Top Gainers</h2>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            {data?.gainers.map((crypto) => (
              <CryptoItem key={crypto.id} {...crypto} isGainer={true} />
            ))}
          </div>
        </section>

        <section aria-labelledby="losers-heading">
          <h2 id="losers-heading" className="text-2xl font-semibold mb-4 text-red-600 dark:text-red-400">Top Losers</h2>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            {data?.losers.map((crypto) => (
              <CryptoItem key={crypto.id} {...crypto} isGainer={false} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CryptoTopGainersLosers;