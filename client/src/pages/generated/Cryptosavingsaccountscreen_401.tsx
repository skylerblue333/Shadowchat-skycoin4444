// AUTO-GENERATED DRAFT SCREEN: CryptoSavingsAccountScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { cn } from '@/lib/utils'; // Assuming shadcn/ui utils path
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock tRPC client for demonstration. In a real app, this would be generated.
const trpc = {
  crypto: {
    getSavingsAccount: {
      useQuery: () => {
        // Simulate loading, error, and success states
        const [data, setData] = React.useState<SavingsAccount | undefined>(undefined);
        const [isLoading, setIsLoading] = React.useState(true);
        const [isError, setIsError] = React.useState(false);
        const [error, setError] = React.useState<Error | null>(null);

        React.useEffect(() => {
          const timer = setTimeout(() => {
            if (Math.random() > 0.8) {
              setIsError(true);
              setError(new Error('Failed to fetch savings account data.'));
              setIsLoading(false);
            } else {
              setData({
                id: 'acc_123',
                currency: 'SKY',
                balance: 12345.67,
                interestRate: 0.05,
                lastUpdated: new Date().toISOString(),
              });
              setIsLoading(false);
            }
          }, 1500);
          return () => clearTimeout(timer);
        }, []);

        return { data, isLoading, isError, error };
      },
    },
  },
};

interface SavingsAccount {
  id: string;
  currency: string;
  balance: number;
  interestRate: number;
  lastUpdated: string;
}

interface CryptoSavingsAccountScreenProps {
  // Add any props if needed
}

export const CryptoSavingsAccountScreen: React.FC<CryptoSavingsAccountScreenProps> = () => {
  const { data, isLoading, isError, error } = trpc.crypto.getSavingsAccount.useQuery();
  const [depositAmount, setDepositAmount] = React.useState<string>('');

  const handleDeposit = () => {
    // Simulate deposit logic
    console.log('Depositing:', depositAmount);
    alert(`Depositing ${depositAmount} SKY`);
    setDepositAmount('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p>Loading savings account data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Failed to load savings account.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error?.message || 'An unknown error occurred.'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4 dark">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crypto Savings Account</CardTitle>
          <CardDescription>Manage your SKYCOIN4444 savings.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="balance">Current Balance</Label>
            <span id="balance" className="font-semibold text-lg">
              {data?.balance.toFixed(2)} {data?.currency}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="interest-rate">Interest Rate</Label>
            <span id="interest-rate" className="font-medium">
              {(data?.interestRate * 100).toFixed(2)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <Label>Last Updated</Label>
            <span>{data?.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : 'N/A'}</span>
          </div>
          <div className="grid gap-2 mt-4">
            <Label htmlFor="deposit-amount">Deposit Amount</Label>
            <Input
              id="deposit-amount"
              type="number"
              placeholder="0.00"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleDeposit} className="w-full">
              Deposit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoSavingsAccountScreen;
