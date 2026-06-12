// AUTO-GENERATED DRAFT SCREEN: ExchangeRates
import React, { useState } from 'react';
import { trpc } from '../trpc/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ExchangeRates: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');

  const { data, isLoading, error, refetch } = trpc.exchangeRates.useQuery(
    { baseCurrency, targetCurrency },
    { enabled: false } // Disable automatic fetching on mount
  );

  const handleFetchRates = () => {
    refetch();
  };

  const currencies = ['USD', 'EUR', 'GBP', 'JPY'];

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Exchange Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="base-currency">Base Currency</Label>
              <Select value={baseCurrency} onValueChange={setBaseCurrency}>
                <SelectTrigger id="base-currency">
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="target-currency">Target Currency</Label>
              <Select value={targetCurrency} onValueChange={setTargetCurrency}>
                <SelectTrigger id="target-currency">
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleFetchRates} disabled={isLoading}>
              {isLoading ? 'Fetching...' : 'Get Exchange Rate'}
            </Button>

            {error && <p className="text-red-500">Error: {error.message}</p>}

            {data && (
              <div className="mt-4 p-4 border rounded-md dark:border-gray-700">
                <p className="text-lg">
                  1 {baseCurrency} = <span className="font-semibold">{data.rate.toFixed(4)}</span> {targetCurrency}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {new Date(data.timestamp).toLocaleString()}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExchangeRates;
