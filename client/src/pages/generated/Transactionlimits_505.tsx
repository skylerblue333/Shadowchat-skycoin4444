// AUTO-GENERATED DRAFT SCREEN: TransactionLimits
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface TransactionLimitsData {
  dailyLimit: number;
  monthlyLimit: number;
  currency: string;
}

interface UpdateLimitsPayload {
  dailyLimit?: number;
  monthlyLimit?: number;
}

const TransactionLimits: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [dailyLimitInput, setDailyLimitInput] = useState<string>('');
  const [monthlyLimitInput, setMonthlyLimitInput] = useState<string>('');

  const { data, isLoading, isError, error, refetch } = trpc.crypto.getTransactionLimits.useQuery();

  const updateLimitsMutation = trpc.crypto.updateTransactionLimits.useMutation({
    onSuccess: () => {
      refetch();
      alert('Transaction limits updated successfully!');
    },
    onError: (err) => {
      alert(`Failed to update limits: ${err.message}`);
    },
  });

  const handleUpdateLimits = () => {
    const payload: UpdateLimitsPayload = {};
    if (dailyLimitInput) {
      payload.dailyLimit = parseFloat(dailyLimitInput);
    }
    if (monthlyLimitInput) {
      payload.monthlyLimit = parseFloat(monthlyLimitInput);
    }
    if (Object.keys(payload).length > 0) {
      updateLimitsMutation.mutate(payload);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading transaction limits...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load transaction limits: {error?.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end mb-4">
          <Label htmlFor="dark-mode" className="mr-2">Dark Mode</Label>
          <Switch
            id="dark-mode"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Crypto Transaction Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              View and manage your daily and monthly cryptocurrency transaction limits.
            </p>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="current-daily-limit">Current Daily Limit</Label>
                <Input
                  id="current-daily-limit"
                  type="text"
                  value={`${data?.dailyLimit} ${data?.currency}`}
                  readOnly
                  className="mt-1"
                  aria-readonly="true"
                />
              </div>
              <div>
                <Label htmlFor="current-monthly-limit">Current Monthly Limit</Label>
                <Input
                  id="current-monthly-limit"
                  type="text"
                  value={`${data?.monthlyLimit} ${data?.currency}`}
                  readOnly
                  className="mt-1"
                  aria-readonly="true"
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="new-daily-limit">New Daily Limit</Label>
                <Input
                  id="new-daily-limit"
                  type="number"
                  placeholder="Enter new daily limit"
                  value={dailyLimitInput}
                  onChange={(e) => setDailyLimitInput(e.target.value)}
                  className="mt-1"
                  aria-label="New daily transaction limit"
                />
              </div>
              <div>
                <Label htmlFor="new-monthly-limit">New Monthly Limit</Label>
                <Input
                  id="new-monthly-limit"
                  type="number"
                  placeholder="Enter new monthly limit"
                  value={monthlyLimitInput}
                  onChange={(e) => setMonthlyLimitInput(e.target.value)}
                  className="mt-1"
                  aria-label="New monthly transaction limit"
                />
              </div>
              <Button
                onClick={handleUpdateLimits}
                disabled={updateLimitsMutation.isLoading}
                className="w-full mt-4"
              >
                {updateLimitsMutation.isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Limits
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionLimits;
