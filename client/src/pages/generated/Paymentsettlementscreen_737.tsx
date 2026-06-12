// AUTO-GENERATED DRAFT SCREEN: PaymentSettlementScreen
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Button } from './components/ui/button'; // shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'; // shadcn/ui card
import { Input } from './components/ui/input'; // shadcn/ui input
import { Label } from './components/ui/label'; // shadcn/ui label
import { Switch } from './components/ui/switch'; // shadcn/ui switch
import { toast } from './components/ui/use-toast'; // shadcn/ui toast for notifications

interface PaymentSettlement {
  id: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  settlementDate: string;
}

const PaymentSettlementScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'failed'>('all');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const { data, isLoading, isError, error, refetch } = trpc.payments.getSettlements.useQuery({
    status: filterStatus === 'all' ? undefined : filterStatus,
  });

  const settlePaymentMutation = trpc.payments.settlePayment.useMutation({
    onSuccess: () => {
      toast({
        title: 'Payment Settled',
        description: 'The payment has been successfully settled.',
      });
      refetch();
    },
    onError: (err) => {
      toast({
        title: 'Settlement Failed',
        description: `Error: ${err.message}`,
        variant: 'destructive',
      });
    },
  });

  const handleSettle = (id: string) => {
    settlePaymentMutation.mutate({ settlementId: id });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-lg">Loading settlements...</div>;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        Error loading settlements: {error?.message}
        <Button onClick={() => refetch()} className="ml-4">Retry</Button>
      </div>
    );
  }

  const filteredSettlements = data || [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Payment Settlement</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Label htmlFor="dark-mode-switch">Dark Mode</Label>
            <Switch
              id="dark-mode-switch"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="filter-status">Filter by Status:</Label>
            <select
              id="filter-status"
              className="p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              aria-label="Filter payment settlements by status"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
            <Button onClick={() => refetch()}>Refresh</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSettlements.length === 0 ? (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-400">No settlements found.</p>
          ) : (
            filteredSettlements.map((settlement) => (
              <Card key={settlement.id} className="dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl">Settlement ID: {settlement.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Transaction ID:</strong> {settlement.transactionId}</p>
                  <p><strong>Amount:</strong> {settlement.amount} {settlement.currency}</p>
                  <p><strong>Status:</strong> <span className={`font-semibold ${settlement.status === 'completed' ? 'text-green-500' : settlement.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>{settlement.status}</span></p>
                  <p><strong>Settlement Date:</strong> {new Date(settlement.settlementDate).toLocaleDateString()}</p>
                  {settlement.status === 'pending' && (
                    <Button
                      onClick={() => handleSettle(settlement.id)}
                      disabled={settlePaymentMutation.isLoading}
                      className="mt-4 w-full"
                    >
                      {settlePaymentMutation.isLoading ? 'Settling...' : 'Settle Payment'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSettlementScreen;
