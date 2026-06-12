// AUTO-GENERATED DRAFT SCREEN: DualInvestment
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { trpc } from '../trpc';

interface DualInvestmentProps {
  // Define props if any
}

const DualInvestment: React.FC<DualInvestmentProps> = () => {
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<string>('USDT');

  // tRPC hook for data fetching
  const { data, isLoading: trpcLoading, error: trpcError } = trpc.dualInvestment.getData.useQuery();

  const handleInvest = () => {
    // Simulate investment logic, potentially using a tRPC mutation
    console.log(`Investing ${amount} ${currency}`);
    // For now, just log and reset
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto max-w-md bg-card p-6 rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">Dual Investment</h1>

        {trpcLoading && <p className="text-center text-blue-500">Loading data...</p>}
        {trpcError && <p className="text-center text-red-500">Error: {trpcError.message}</p>}
        {data && <p className="text-center text-green-500">{data.message}</p>}

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium mb-2">Amount</label>
          <input
            type="number"
            id="amount"
            className="w-full p-2 border border-input rounded-md bg-background dark:bg-gray-700 dark:border-gray-600"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            aria-label="Investment amount"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="currency" className="block text-sm font-medium mb-2">Currency</label>
          <select
            id="currency"
            className="w-full p-2 border border-input rounded-md bg-background dark:bg-gray-700 dark:border-gray-600"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            aria-label="Select currency"
          >
            <option value="USDT">USDT</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
          </select>
        </div>

        <Button
          onClick={handleInvest}
          disabled={trpcLoading || !amount}
          className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {trpcLoading ? 'Loading...' : 'Invest Now'}
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-4 dark:text-gray-400">
          By investing, you agree to the terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default DualInvestment;
