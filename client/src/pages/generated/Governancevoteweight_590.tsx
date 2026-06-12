// AUTO-GENERATED DRAFT SCREEN: GovernanceVoteWeight
import React, { useState, useEffect } from 'react';
import { cn } from './lib/utils';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Progress } from './components/ui/progress';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from './components/ui/use-toast';

// Mock tRPC client for demonstration purposes
const trpc = {
  governance: {
    getVoteWeight: {
      useQuery: (address: string) => useQuery<number, Error>({ queryKey: ['voteWeight', address], queryFn: async () => {
        if (!address) return 0;
        await new Promise(resolve => setTimeout(resolve, 500));
        const weights: { [key: string]: number } = {
          '0x123...abc': 1500,
          '0x456...def': 800,
          '0x789...ghi': 2300,
        };
        if (!weights[address]) throw new Error('Address not found');
        return weights[address];
      }}),
    },
    delegateVoteWeight: {
      useMutation: () => useMutation<void, Error, { from: string; to: string; amount: number }>({ mutationFn: async ({ from, to, amount }) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (amount > 1000) throw new Error('Cannot delegate more than 1000 at once');
        console.log(`Delegating ${amount} from ${from} to ${to}`);
      }}),
    },
  },
};

interface GovernanceVoteWeightProps {
  className?: string;
}

const queryClient = new QueryClient();

const GovernanceVoteWeightScreen: React.FC<GovernanceVoteWeightProps> = ({ className }) => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [delegateToAddress, setDelegateToAddress] = useState<string>('');
  const [delegateAmount, setDelegateAmount] = useState<number>(0);

  const { data: voteWeight, isLoading, isError, error, refetch } = trpc.governance.getVoteWeight.useQuery(walletAddress);
  const { mutate: delegate, isPending: isDelegating } = trpc.governance.delegateVoteWeight.useMutation();

  const handleDelegate = () => {
    if (!walletAddress || !delegateToAddress || delegateAmount <= 0) {
      toast({ title: 'Error', description: 'Please fill all delegation fields.', variant: 'destructive' });
      return;
    }
    delegate({ from: walletAddress, to: delegateToAddress, amount: delegateAmount }, {
      onSuccess: () => {
        toast({ title: 'Success', description: 'Vote weight delegated successfully.' });
        refetch();
      },
      onError: (err) => {
        toast({ title: 'Error', description: err.message, variant: 'destructive' });
      },
    });
  };

  return (
    <div className={cn("container mx-auto p-4 dark:bg-gray-900 dark:text-white min-h-screen", className)}>
      <h1 className="text-3xl font-bold mb-6 text-center">Governance: Vote Weight</h1>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Vote Weight</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
          <div>
            <Label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Wallet Address</Label>
            <Input
              id="walletAddress"
              type="text"
              placeholder="Enter your wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex flex-col justify-center">
            {isLoading && <p className="text-gray-500 dark:text-gray-400">Loading vote weight...</p>}
            {isError && <p className="text-red-500">Error: {error?.message}</p>}
            {voteWeight !== undefined && (
              <div className="text-lg font-medium">
                Current Vote Weight: <span className="text-blue-600 dark:text-blue-400">{voteWeight}</span>
              </div>
            )}
          </div>
        </div>
        {voteWeight !== undefined && (
          <div className="mt-4">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vote Weight Utilization</Label>
            <Progress value={(voteWeight / 5000) * 100} className="w-full mt-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{voteWeight} of 5000 Max</p>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Delegate Vote Weight</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="delegateToAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Delegate To Address</Label>
            <Input
              id="delegateToAddress"
              type="text"
              placeholder="Enter recipient wallet address"
              value={delegateToAddress}
              onChange={(e) => setDelegateToAddress(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <Label htmlFor="delegateAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount to Delegate</Label>
            <Input
              id="delegateAmount"
              type="number"
              placeholder="Enter amount"
              value={delegateAmount}
              onChange={(e) => setDelegateAmount(Number(e.target.value))}
              className="mt-1 block w-full"
            />
          </div>
        </div>
        <Button
          onClick={handleDelegate}
          disabled={isDelegating || isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {isDelegating ? 'Delegating...' : 'Delegate Vote Weight'}
        </Button>
      </div>
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <GovernanceVoteWeightScreen />
  </QueryClientProvider>
);

export default AppWrapper;
