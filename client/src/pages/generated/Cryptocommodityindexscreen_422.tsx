// AUTO-GENERATED DRAFT SCREEN: CryptoCommodityIndexScreen
import React from 'react';
import { useQuery } from '@trpc/react-query'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui Card
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui Skeleton

// Define types for commodity data
interface CommodityIndexData {
  id: string;
  name: string;
  value: number;
  change24h: number;
  marketCap: number;
}

// Simulate tRPC query for commodity index data
// In a real app, this would connect to your tRPC backend
const useGetCommodityIndex = () => {
  return useQuery<CommodityIndexData[], Error>(['commodityIndex'], async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Simulate data or error
    if (Math.random() < 0.1) { // 10% chance of error
      throw new Error('Failed to fetch commodity index data.');
    }
    return [
      { id: 'gold', name: 'Gold Index', value: 2350.45, change24h: 0.82, marketCap: 14.5e12 },
      { id: 'silver', name: 'Silver Index', value: 29.10, change24h: -1.23, marketCap: 1.5e12 },
      { id: 'oil', name: 'Oil Index', value: 78.90, change24h: 2.15, marketCap: 6.2e12 },
      { id: 'copper', name: 'Copper Index', value: 4.50, change24h: 0.55, marketCap: 0.8e12 },
    ];
  });
};

const CryptoCommodityIndexScreen: React.FC = () => {
  const { data, isLoading, isError, error } = useGetCommodityIndex();

  return (
    <div className="min-h-screen bg-background text-foreground p-6 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Crypto: Commodity Index</h1>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center text-red-500 text-lg mt-8" role="alert">
          <p>Error: {error?.message || 'Failed to load commodity data.'}</p>
          <p>Please try again later.</p>
        </div>
      )}

      {data && !isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((commodity) => (
            <Card key={commodity.id} className="w-full bg-card text-card-foreground shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">{commodity.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-2">${commodity.value.toFixed(2)}</p>
                <p className={`text-lg ${commodity.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {commodity.change24h >= 0 ? '+' : ''}{commodity.change24h.toFixed(2)}%
                </p>
                <p className="text-muted-foreground mt-4">Market Cap: ${(commodity.marketCap / 1e12).toFixed(2)} T</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoCommodityIndexScreen;