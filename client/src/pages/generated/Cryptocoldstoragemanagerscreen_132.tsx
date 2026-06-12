// AUTO-GENERATED DRAFT SCREEN: CryptoColdStorageManagerScreen
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface ColdStorageItem {
  id: string;
  name: string;
  address: string;
  balance: number;
  lastAccessed: string;
}

interface ColdStorageManagerProps {
  userId: string;
}

const CryptoColdStorageManagerScreen: React.FC<ColdStorageManagerProps> = ({ userId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const { data, isLoading, isError, error, refetch } = trpc.coldStorage.list.useQuery({
    userId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p className="text-lg">Loading cold storage data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-background text-foreground">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load cold storage data: {error?.message || 'Unknown error'}
          </AlertDescription>
        </Alert>
        <Button onClick={() => refetch()} className="mt-4">Retry</Button>
      </div>
    );
  }

  const coldStorageItems = data || [];

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8 space-y-6" aria-live="polite">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Crypto Cold Storage Manager</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-toggle"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
        </div>
      </header>

      <section aria-labelledby="cold-storage-list-heading">
        <h2 id="cold-storage-list-heading" className="sr-only">List of Cold Storage Wallets</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {coldStorageItems.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">No cold storage items found.</p>
          ) : (
            coldStorageItems.map((item) => (
              <Card key={item.id} className="w-full">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">Address: <span className="font-mono text-foreground break-all">{item.address}</span></p>
                  <p className="text-sm text-muted-foreground">Balance: <span className="font-semibold text-foreground">{item.balance} BTC</span></p>
                  <p className="text-sm text-muted-foreground">Last Accessed: {new Date(item.lastAccessed).toLocaleDateString()}</p>
                  <Button variant="outline" className="w-full mt-2">View Details</Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default CryptoColdStorageManagerScreen;
