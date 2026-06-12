// AUTO-GENERATED DRAFT SCREEN: CryptoAffiliateDashboard
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // shadcn/ui Card
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'; // shadcn/ui Table
import { Separator } from './ui/separator'; // shadcn/ui Separator

// Mock tRPC client for demonstration. In a real app, this would be imported from your tRPC setup.
const trpc = {
  affiliate: {
    getCommissions: {
      useQuery: () => {
        // Simulate API call
        const [data, setData] = React.useState<Commission[] | null>(null);
        const [isLoading, setIsLoading] = React.useState(true);
        const [isError, setIsError] = React.useState(false);
        const [error, setError] = React.useState<Error | null>(null);

        React.useEffect(() => {
          setTimeout(() => {
            if (Math.random() > 0.1) { // Simulate occasional error
              setData([
                { id: '1', amount: 150.75, currency: 'BTC', date: '2023-01-15' },
                { id: '2', amount: 200.00, currency: 'ETH', date: '2023-01-20' },
                { id: '3', amount: 50.25, currency: 'USDT', date: '2023-01-22' },
              ]);
              setIsLoading(false);
            } else {
              setIsError(true);
              setError(new Error('Failed to fetch commissions.'));
              setIsLoading(false);
            }
          }, 1500);
        }, []);

        return { data, isLoading, isError, error };
      },
    },
    getReferrals: {
      useQuery: () => {
        const [data, setData] = React.useState<Referral[] | null>(null);
        const [isLoading, setIsLoading] = React.useState(true);
        const [isError, setIsError] = React.useState(false);
        const [error, setError] = React.useState<Error | null>(null);

        React.useEffect(() => {
          setTimeout(() => {
            if (Math.random() > 0.1) { // Simulate occasional error
              setData([
                { id: 'a', name: 'Alice', status: 'Active', date: '2023-01-10' },
                { id: 'b', name: 'Bob', status: 'Pending', date: '2023-01-12' },
                { id: 'c', name: 'Charlie', status: 'Active', date: '2023-01-18' },
              ]);
              setIsLoading(false);
            } else {
              setIsError(true);
              setError(new Error('Failed to fetch referrals.'));
              setIsLoading(false);
            }
          }, 1000);
        }, []);

        return { data, isLoading, isError, error };
      },
    },
  },
};

interface Commission {
  id: string;
  amount: number;
  currency: string;
  date: string;
}

interface Referral {
  id: string;
  name: string;
  status: 'Active' | 'Pending';
  date: string;
}

const CryptoAffiliateDashboard: React.FC = () => {
  const { data: commissions, isLoading: isLoadingCommissions, isError: isErrorCommissions, error: errorCommissions } = trpc.affiliate.getCommissions.useQuery();
  const { data: referrals, isLoading: isLoadingReferrals, isError: isErrorReferrals, error: errorReferrals } = trpc.affiliate.getReferrals.useQuery();

  const isLoading = isLoadingCommissions || isLoadingReferrals;
  const isError = isErrorCommissions || isErrorReferrals;
  const error = errorCommissions || errorReferrals;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-red-500">
        <p>Error: {error?.message || 'An unknown error occurred.'}</p>
      </div>
    );
  }

  const totalCommissions = commissions?.reduce((sum, c) => sum + c.amount, 0).toFixed(2) || '0.00';
  const activeReferrals = referrals?.filter(r => r.status === 'Active').length || 0;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Crypto Affiliate Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
            {/* Icon could go here */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCommissions}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Across all currencies</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
            {/* Icon could go here */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeReferrals}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Currently earning</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            {/* Icon could go here */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">No pending payouts</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="mb-8 dark:bg-gray-700" />

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Commissions</h2>
        <div className="rounded-md border dark:border-gray-700">
          <Table>
            <TableHeader className="dark:bg-gray-800">
              <TableRow className="dark:border-gray-700">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissions?.map((commission) => (
                <TableRow key={commission.id} className="dark:border-gray-800">
                  <TableCell className="font-medium">{commission.id}</TableCell>
                  <TableCell>{commission.amount.toFixed(2)}</TableCell>
                  <TableCell>{commission.currency}</TableCell>
                  <TableCell className="text-right">{commission.date}</TableCell>
                </TableRow>
              ))}
              {commissions?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-gray-500 dark:text-gray-400">
                    No commissions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Referrals</h2>
        <div className="rounded-md border dark:border-gray-700">
          <Table>
            <TableHeader className="dark:bg-gray-800">
              <TableRow className="dark:border-gray-700">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals?.map((referral) => (
                <TableRow key={referral.id} className="dark:border-gray-800">
                  <TableCell className="font-medium">{referral.id}</TableCell>
                  <TableCell>{referral.name}</TableCell>
                  <TableCell>{referral.status}</TableCell>
                  <TableCell className="text-right">{referral.date}</TableCell>
                </TableRow>
              ))}
              {referrals?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-gray-500 dark:text-gray-400">
                    No referrals found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CryptoAffiliateDashboard;
