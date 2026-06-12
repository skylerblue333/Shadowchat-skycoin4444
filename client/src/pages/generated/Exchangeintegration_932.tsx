// AUTO-GENERATED DRAFT SCREEN: ExchangeIntegration
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { trpc } from '@/lib/trpc';
import DarkModeToggle from '@/components/dark-mode-toggle';

const ExchangeIntegration = () => {
  const [exchange, setExchange] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');

  const connectMutation = trpc.exchange.connect.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await connectMutation.mutateAsync({ exchange, apiKey, apiSecret });
      alert('Successfully connected to ' + exchange);
    } catch (error: any) {
      alert('Error connecting: ' + error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Exchange Integration</CardTitle>
            <DarkModeToggle />
          </div>
          <CardDescription>Connect your cryptocurrency exchange accounts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="exchange">Select Exchange</Label>
              <Select onValueChange={setExchange} value={exchange}>
                <SelectTrigger id="exchange" aria-label="Select an exchange">
                  <SelectValue placeholder="Select an exchange" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="binance">Binance</SelectItem>
                  <SelectItem value="coinbase">Coinbase</SelectItem>
                  <SelectItem value="kraken">Kraken</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input id="apiKey" type="password" placeholder="Enter your API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} aria-required="true" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiSecret">API Secret</Label>
              <Input id="apiSecret" type="password" placeholder="Enter your API Secret" value={apiSecret} onChange={(e) => setApiSecret(e.target.value)} aria-required="true" />
            </div>
            <Button className="w-full" type="submit" disabled={connectMutation.isLoading || !exchange || !apiKey || !apiSecret}>
              {connectMutation.isLoading ? 'Connecting...' : 'Connect Exchange'}
            </Button>
            {connectMutation.isError && (
              <p className="text-red-500 text-sm" role="alert">Error: {connectMutation.error?.message}</p>
            )}
            {connectMutation.isSuccess && (
              <p className="text-green-500 text-sm" role="status">{connectMutation.data?.message}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExchangeIntegration;
