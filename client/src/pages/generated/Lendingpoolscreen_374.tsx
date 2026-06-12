// AUTO-GENERATED DRAFT SCREEN: LendingPoolScreen

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useTheme } from 'next-themes';
import { useMutation, useQuery } from '@tanstack/react-query'; // Simulate tRPC hooks
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'; // For icons

interface LendingPoolScreenProps {
  // Define props here if needed
}

// Simulate tRPC context and hooks
const trpc = {
  loan: {
    getPoolInfo: () => useQuery({ queryKey: ['poolInfo'], queryFn: async () => { /* Simulate API call */ await new Promise(resolve => setTimeout(resolve, 500)); return { totalAssets: 1000000, availableLiquidity: 750000, interestRate: 0.05 }; } }),
    lend: () => useMutation({ mutationFn: async (amount: number) => { /* Simulate API call */ await new Promise((resolve, reject) => setTimeout(() => amount > 0 ? resolve({ success: true }) : reject(new Error('Invalid amount')), 1000)); } }),
  },
};

const LendingPoolScreen: React.FC<LendingPoolScreenProps> = () => {
  const { theme, setTheme } = useTheme();
  const [amount, setAmount] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState<number[]>([50]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data: poolInfo, isLoading: isLoadingPoolInfo, isError: isErrorPoolInfo } = trpc.loan.getPoolInfo();
  const { mutate: lendMutate, isLoading: isLending, isError: isLendError, error: lendError, isSuccess: isLendSuccess } = trpc.loan.lend();

  useEffect(() => {
    if (isLendSuccess) {
      setSuccessMessage('Successfully lent ' + amount + ' units!');
      setError(null);
      setAmount(0);
    } else if (isLendError && lendError) {
      setError(lendError.message);
      setSuccessMessage(null);
    }
  }, [isLendSuccess, isLendError, lendError, amount]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLend = () => {
    if (amount <= 0) {
      setError('Please enter a valid amount to lend.');
      return;
    }
    setError(null);
    setSuccessMessage(null);
    lendMutate(amount);
  };

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md" aria-live="polite">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center">Crypto Lending Pool</CardTitle>
          <CardDescription className="text-center text-muted-foreground">Deposit your assets and earn interest.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center justify-between p-2 rounded-md bg-accent/20">
            <Label htmlFor="dark-mode" className="text-lg font-medium">Dark Mode</Label>
            <Switch id="dark-mode" checked={theme === 'dark'} onCheckedChange={toggleTheme} aria-label="Toggle dark mode" />
          </div>

          {isLoadingPoolInfo ? (
            <div className="flex items-center justify-center text-primary">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
              <p>Loading pool information...</p>
            </div>
          ) : isErrorPoolInfo ? (
            <div className="flex items-center text-destructive">
              <AlertCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              <p>Failed to load pool information.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>Total Assets:</div><div className="font-semibold">${poolInfo?.totalAssets.toLocaleString()}</div>
              <div>Available Liquidity:</div><div className="font-semibold">${poolInfo?.availableLiquidity.toLocaleString()}</div>
              <div>Current Interest Rate:</div><div className="font-semibold">{(poolInfo?.interestRate * 100).toFixed(2)}%</div>
            </div>
          )}

          <div className="space-y-4">
            <Label htmlFor="amount" className="text-lg font-medium">Amount to Lend</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount === 0 ? '' : amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              aria-describedby="amount-description"
              className="text-lg p-3"
            />
            <p id="amount-description" className="text-sm text-muted-foreground">Enter the amount of crypto you wish to lend.</p>
          </div>

          <div className="space-y-4">
            <Label htmlFor="interest-slider" className="text-lg font-medium">Desired Interest Rate</Label>
            <Slider
              id="interest-slider"
              defaultValue={[50]}
              max={100}
              step={1}
              value={sliderValue}
              onValueChange={setSliderValue}
              className="w-full"
              aria-label="Desired interest rate slider"
            />
            <p className="text-sm text-muted-foreground">Selected Rate: {sliderValue[0].toFixed(2)}%</p>
          </div>

          {error && (
            <div className="flex items-center p-3 rounded-md bg-destructive/10 text-destructive" role="alert">
              <AlertCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              <p>{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center p-3 rounded-md bg-success/10 text-success" role="status">
              <CheckCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              <p>{successMessage}</p>
            </div>
          )}

          <Button
            className="w-full py-3 text-lg font-semibold"
            onClick={handleLend}
            disabled={isLending || isLoadingPoolInfo}
            aria-live="assertive"
          >
            {isLending ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" /> Lending...</>
            ) : (
              'Lend Now'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LendingPoolScreen;
