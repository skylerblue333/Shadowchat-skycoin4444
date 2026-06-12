// AUTO-GENERATED DRAFT SCREEN: CurrencyConverter
import React, { useState } from 'react';
import { trpc } from '../trpc';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');

  const { data, isLoading, error } = trpc.convertCurrency.useQuery({
    amount,
    fromCurrency,
    toCurrency,
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value) || 0);
  };

  const handleFromCurrencyChange = (value: string) => {
    setFromCurrency(value);
  };

  const handleToCurrencyChange = (value: string) => {
    setToCurrency(value);
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Currency Converter</h1>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
          <Input
            id="amount"
            aria-label="Amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="mt-1 block w-full"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
          <Select value={fromCurrency} onValueChange={handleFromCurrencyChange} aria-label="From currency">
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
          <Select value={toCurrency} onValueChange={handleToCurrencyChange} aria-label="To currency">
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => { /* Conversion is automatic via tRPC hook */ }}
          className="w-full py-2 mt-2"
          disabled={isLoading}
        >
          {isLoading ? 'Converting...' : 'Convert'}
        </Button>

        {error && (
          <p className="text-red-500 text-sm mt-2">Error: {error.message}</p>
        )}

        {data && !isLoading && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p className="text-lg font-semibold">{data.amount} {data.fromCurrency} = {data.convertedAmount} {data.toCurrency}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Exchange Rate: {data.rate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;