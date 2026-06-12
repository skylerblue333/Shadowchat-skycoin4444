// AUTO-GENERATED DRAFT SCREEN: CryptoTopGainersLosers
import React from 'react';
import { cn } from '../lib/utils';

// Mock tRPC hooks
const trpc = {
  crypto: {
    getTopGainersLosers: {
      useQuery: (options?: { enabled?: boolean }) => {
        const [data, setData] = React.useState<{ gainers: any[]; losers: any[] } | null>(null);
        const [isLoading, setIsLoading] = React.useState(true);
        const [isError, setIsError] = React.useState(false);

        React.useEffect(() => {
          if (options?.enabled === false) {
            setIsLoading(false);
            return;
          }
          setIsLoading(true);
          setIsError(false);
          const fetchData = async () => {
            try {
              // Simulate API call
              await new Promise(resolve => setTimeout(resolve, 1500));
              const mockData = {
                gainers: [
                  { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 60000, change: 5.2, volume: '1.2B' },
                  { id: '2', name: 'Ethereum', symbol: 'ETH', price: 3000, change: 4.8, volume: '800M' },
                  { id: '3', name: 'Solana', symbol: 'SOL', price: 150, change: 3.5, volume: '500M' },
                ],
                losers: [
                  { id: '4', name: 'Ripple', symbol: 'XRP', price: 0.5, change: -3.1, volume: '300M' },
                  { id: '5', name: 'Cardano', symbol: 'ADA', price: 0.4, change: -2.5, volume: '200M' },
                  { id: '6', name: 'Dogecoin', symbol: 'DOGE', price: 0.1, change: -1.8, volume: '150M' },
                ],
              };
              setData(mockData);
            } catch (error) {
              setIsError(true);
            } finally {
              setIsLoading(false);
            }
          };
          fetchData();
        }, [options?.enabled]);

        return { data, isLoading, isError };
      },
    },
  },
};

interface CryptoItemProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
  volume: string;
  isGainer: boolean;
}

const CryptoItem: React.FC<CryptoItemProps> = ({ name, symbol, price, change, volume, isGainer }) => (
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
  const { data, isLoading, isError } = trpc.crypto.getTopGainersLosers.useQuery();

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