// AUTO-GENERATED DRAFT SCREEN: SecuritiesLendingScreen
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Mock tRPC client and hooks for demonstration
const trpc = {
  useQuery: (key: string) => {
    if (key === 'securitiesData') {
      return {
        data: {
          totalAssets: 1234567.89,
          availableForLending: 500000.00,
          lentOut: 734567.89,
          recentTransactions: [
            { id: '1', asset: 'BTC', amount: 10, type: 'Lend', status: 'Completed' },
            { id: '2', asset: 'ETH', amount: 50, type: 'Borrow', status: 'Pending' },
          ],
        },
        isLoading: false,
        isError: false,
      };
    }
    return { data: null, isLoading: false, isError: false };
  },
};

const SecuritiesLendingScreen: React.FC = () => {
  const { data, isLoading, isError } = trpc.useQuery('securitiesData');

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error loading data.</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-8">Crypto: Securities Lending</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">${data?.totalAssets.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available for Lending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">${data?.availableForLending.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lent Out</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">${data?.lentOut.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lend / Borrow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="asset">Asset</Label>
                <Input id="asset" placeholder="e.g., BTC" />
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" placeholder="e.g., 10" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="lend-borrow" />
                <Label htmlFor="lend-borrow">Borrow</Label>
              </div>
              <Button className="w-full">Submit Request</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data?.recentTransactions.map((tx) => (
                <li key={tx.id} className="flex justify-between items-center">
                  <span>{tx.type} {tx.amount} {tx.asset}</span>
                  <span className={`font-medium ${tx.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {tx.status}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecuritiesLendingScreen;
