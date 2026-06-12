// AUTO-GENERATED DRAFT SCREEN: CryptoPriceAlertsScreen
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery, useMutation } from '@trpc/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface PriceAlert {
  id: string;
  cryptoSymbol: string;
  targetPrice: number;
  direction: 'above' | 'below';
  isActive: boolean;
  createdAt: string;
}

interface CryptoPriceAlertsScreenProps {
  userId: string;
}

const CryptoPriceAlertsScreen: React.FC<CryptoPriceAlertsScreenProps> = ({ userId }) => {
  const [newAlertSymbol, setNewAlertSymbol] = useState<string>('');
  const [newAlertPrice, setNewAlertPrice] = useState<string>('');
  const [newAlertDirection, setNewAlertDirection] = useState<'above' | 'below'>('above');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Simulate tRPC query for fetching alerts
  const { data: alerts, isLoading, isError, error, refetch } = useQuery<PriceAlert[]>(
    ['priceAlerts', userId],
    async () => {
      // In a real app, this would call your tRPC client
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      if (Math.random() < 0.1) throw new Error('Failed to fetch alerts');
      return [
        { id: '1', cryptoSymbol: 'BTC', targetPrice: 70000, direction: 'above', isActive: true, createdAt: '2023-01-01' },
        { id: '2', cryptoSymbol: 'ETH', targetPrice: 3500, direction: 'below', isActive: false, createdAt: '2023-01-05' },
      ];
    },
    { staleTime: 5 * 60 * 1000 } // 5 minutes stale time
  );

  // Simulate tRPC mutation for creating an alert
  const createAlertMutation = useMutation(
    async (alertData: Omit<PriceAlert, 'id' | 'createdAt'>) => {
      await new Promise(resolve => setTimeout(resolve, 700));
      if (Math.random() < 0.15) throw new Error('Failed to create alert');
      return { ...alertData, id: `new-${Date.now()}`, createdAt: new Date().toISOString() };
    },
    {
      onSuccess: () => {
        toast.success('Price alert created successfully!');
        refetch();
        setNewAlertSymbol('');
        setNewAlertPrice('');
        setNewAlertDirection('above');
        setIsDialogOpen(false);
      },
      onError: (err: any) => {
        toast.error(`Error creating alert: ${err.message}`);
      },
    }
  );

  // Simulate tRPC mutation for toggling alert status
  const toggleAlertMutation = useMutation(
    async (alertId: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      if (Math.random() < 0.05) throw new Error('Failed to toggle alert');
      return { id: alertId, success: true };
    },
    {
      onSuccess: () => {
        toast.success('Alert status updated!');
        refetch();
      },
      onError: (err: any) => {
        toast.error(`Error updating alert: ${err.message}`);
      },
    }
  );

  const handleCreateAlert = useCallback(() => {
    const price = parseFloat(newAlertPrice);
    if (!newAlertSymbol || isNaN(price) || price <= 0) {
      toast.error('Please enter a valid crypto symbol and target price.');
      return;
    }
    createAlertMutation.mutate({
      cryptoSymbol: newAlertSymbol.toUpperCase(),
      targetPrice: price,
      direction: newAlertDirection,
      isActive: true,
    });
  }, [newAlertSymbol, newAlertPrice, newAlertDirection, createAlertMutation]);

  const handleToggleAlert = useCallback((alertId: string) => {
    toggleAlertMutation.mutate(alertId);
  }, [toggleAlertMutation]);

  const sortedAlerts = useMemo(() => {
    if (!alerts) return [];
    return [...alerts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [alerts]);

  return (
    <div className="container mx-auto p-4 dark:bg-gray-950 dark:text-gray-50 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto shadow-lg dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Crypto Price Alerts</CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-400">
            Set up custom price alerts for your favorite cryptocurrencies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full mb-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white">
                Create New Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark:bg-gray-900 dark:text-gray-50">
              <DialogHeader>
                <DialogTitle>New Price Alert</DialogTitle>
                <DialogDescription>
                  Enter details for your new crypto price alert.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="symbol" className="text-right">Symbol</Label>
                  <Input
                    id="symbol"
                    value={newAlertSymbol}
                    onChange={(e) => setNewAlertSymbol(e.target.value)}
                    className="col-span-3 dark:bg-gray-800 dark:text-gray-50 dark:border-gray-700"
                    placeholder="e.g., BTC, ETH"
                    aria-label="Crypto Symbol"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">Target Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newAlertPrice}
                    onChange={(e) => setNewAlertPrice(e.target.value)}
                    className="col-span-3 dark:bg-gray-800 dark:text-gray-50 dark:border-gray-700"
                    placeholder="e.g., 70000.00"
                    aria-label="Target Price"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="direction" className="text-right">Direction</Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Button
                      variant={newAlertDirection === 'above' ? 'default' : 'outline'}
                      onClick={() => setNewAlertDirection('above')}
                      className="dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-50"
                      aria-pressed={newAlertDirection === 'above'}
                    >
                      Above
                    </Button>
                    <Button
                      variant={newAlertDirection === 'below' ? 'default' : 'outline'}
                      onClick={() => setNewAlertDirection('below')}
                      className="dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-50"
                      aria-pressed={newAlertDirection === 'below'}
                    >
                      Below
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleCreateAlert}
                  disabled={createAlertMutation.isPending}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white"
                >
                  {createAlertMutation.isPending ? 'Creating...' : 'Create Alert'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {isLoading && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400" role="status" aria-live="polite">
              Loading price alerts...
            </div>
          )}

          {isError && (
            <div className="text-center py-8 text-red-600 dark:text-red-400" role="alert">
              Error: {error?.message || 'Failed to load alerts.'}
            </div>
          )}

          {!isLoading && !isError && sortedAlerts.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No price alerts set. Create one above!
            </div>
          )}

          {!isLoading && !isError && sortedAlerts.length > 0 && (
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="dark:bg-gray-800">
                    <TableHead className="w-[100px] dark:text-gray-300">Symbol</TableHead>
                    <TableHead className="dark:text-gray-300">Target Price</TableHead>
                    <TableHead className="dark:text-gray-300">Direction</TableHead>
                    <TableHead className="dark:text-gray-300">Status</TableHead>
                    <TableHead className="text-right dark:text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAlerts.map((alert) => (
                    <TableRow key={alert.id} className="dark:border-gray-800 hover:dark:bg-gray-800/50">
                      <TableCell className="font-medium dark:text-gray-50">{alert.cryptoSymbol}</TableCell>
                      <TableCell className="dark:text-gray-50">{alert.targetPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                      <TableCell className="dark:text-gray-50">{alert.direction === 'above' ? 'Above' : 'Below'}</TableCell>
                      <TableCell>
                        <Switch
                          checked={alert.isActive}
                          onCheckedChange={() => handleToggleAlert(alert.id)}
                          disabled={toggleAlertMutation.isPending}
                          aria-label={`Toggle alert for ${alert.cryptoSymbol}`}
                          className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-300 dark:data-[state=checked]:bg-blue-600 dark:data-[state=unchecked]:bg-gray-700"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="destructive" size="sm" className="dark:bg-red-700 dark:hover:bg-red-800">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-sm text-gray-500 dark:text-gray-400 justify-center">
          <p>&copy; {new Date().getFullYear()} SKYCOIN4444. All rights reserved.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CryptoPriceAlertsScreen;
