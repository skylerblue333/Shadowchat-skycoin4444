// AUTO-GENERATED DRAFT SCREEN: CryptoSandboxScreen
import React, { useState, useEffect } from 'react';
import { useQuery } from '@trpc/react-query';
import { api } from '@/utils/api'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface SandboxData {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  balance: number;
  lastUpdated: string;
}

const CryptoSandboxScreen: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const { data, isLoading, isError, error, refetch } = api.sandbox.getSandboxData.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load sandbox data: {error.message}</AlertDescription>
        </Alert>
        <Button onClick={() => refetch()} className="mt-4">Retry</Button>
      </div>
    );
  }

  const sandbox = data?.sandboxData;

  if (!sandbox) {
    return (
      <div className="p-4">
        <Alert>
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>No sandbox data available.</AlertDescription>
        </Alert>
        <Button onClick={() => refetch()} className="mt-4">Refresh</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Crypto: Sandbox Environment</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </div>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Sandbox Details: {sandbox.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>ID:</strong> {sandbox.id}</p>
          <p><strong>Status:</strong> <span className={`font-semibold ${sandbox.status === 'running' ? 'text-green-500' : sandbox.status === 'stopped' ? 'text-red-500' : 'text-yellow-500'}`}>{sandbox.status.toUpperCase()}</span></p>
          <p><strong>Balance:</strong> ${sandbox.balance.toFixed(2)}</p>
          <p><strong>Last Updated:</strong> {new Date(sandbox.lastUpdated).toLocaleString()}</p>
          <div className="flex space-x-2 mt-4">
            <Button onClick={() => console.log('Start Sandbox')}>Start</Button>
            <Button variant="destructive" onClick={() => console.log('Stop Sandbox')}>Stop</Button>
            <Button variant="outline" onClick={() => refetch()}>Refresh Data</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoSandboxScreen;
