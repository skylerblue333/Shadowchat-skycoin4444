// AUTO-GENERATED DRAFT SCREEN: CryptoOtcTradingScreen
import React from 'react';
import { useQuery } from '@trpc/react-query'; // Placeholder for tRPC hook
import { Button } from '@/components/ui/button'; // Placeholder for shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Placeholder for shadcn/ui card
import { Input } from '@/components/ui/input'; // Placeholder for shadcn/ui input
import { Label } from '@/components/ui/label'; // Placeholder for shadcn/ui label

interface OTCData {
  id: string;
  asset: string;
  amount: number;
  price: number;
  status: 'pending' | 'completed' | 'failed';
}

// Placeholder for tRPC client setup
// const trpc = createTRPCReact<AppRouter>();

const CryptoOtcTradingScreen: React.FC = () => {
  // Simulate tRPC query for OTC data
  const { data, isLoading, isError, error } = useQuery<OTCData[]>(
    ['otcData'], // Query key
    async () => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: '1', asset: 'BTC', amount: 0.5, price: 60000, status: 'pending' },
            { id: '2', asset: 'ETH', amount: 5, price: 3000, status: 'completed' },
          ]);
        }, 1000);
      });
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p className="text-lg">Loading OTC data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-destructive">
        <p className="text-lg">Error loading data: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8 dark:bg-gray-900 dark:text-gray-100">
      <Card className="w-full max-w-4xl mx-auto shadow-lg dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Crypto: OTC Trading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <Label htmlFor="asset" className="text-sm font-medium">Asset</Label>
              <Input id="asset" type="text" placeholder="e.g., BTC" className="mt-1 dark:bg-gray-700 dark:text-gray-100" aria-label="Crypto asset" />
            </div>
            <div>
              <Label htmlFor="amount" className="text-sm font-medium">Amount</Label>
              <Input id="amount" type="number" placeholder="e.g., 0.5" className="mt-1 dark:bg-gray-700 dark:text-gray-100" aria-label="Amount to trade" />
            </div>
          </div>
          <Button className="w-full py-3 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700" aria-label="Initiate trade">
            Place OTC Order
          </Button>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-center">Recent Trades</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Asset</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {data?.map((trade) => (
                  <tr key={trade.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{trade.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{trade.asset}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${trade.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        trade.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                        trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                        'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                      }`}>
                        {trade.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoOtcTradingScreen;
