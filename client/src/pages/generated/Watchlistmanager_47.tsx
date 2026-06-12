// AUTO-GENERATED DRAFT SCREEN: WatchlistManager
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup
import { cn } from '../lib/utils'; // Assuming shadcn/ui utils
import { Switch } from '../components/ui/switch'; // Assuming shadcn/ui switch
import { Label } from '../components/ui/label'; // Assuming shadcn/ui label
import { Input } from '../components/ui/input'; // Assuming shadcn/ui input
import { Button } from '../components/ui/button'; // Assuming shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'; // Assuming shadcn/ui card
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'; // Assuming shadcn/ui table

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

const WatchlistManager: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');

  const { data: watchlist, isLoading, isError, error } = trpc.watchlist.getWatchlist.useQuery();
  const addMutation = trpc.watchlist.addWatchlistItem.useMutation();
  const removeMutation = trpc.watchlist.removeWatchlistItem.useMutation();

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const handleAddWatchlistItem = async () => {
    if (newSymbol.trim()) {
      try {
        await addMutation.mutateAsync({ symbol: newSymbol.trim() });
        setNewSymbol('');
      } catch (err) {
        console.error('Failed to add item:', err);
        // Implement more user-friendly error display
      }
    }
  };

  const handleRemoveWatchlistItem = async (id: string) => {
    try {
      await removeMutation.mutateAsync({ id });
    } catch (err) {
      console.error('Failed to remove item:', err);
      // Implement more user-friendly error display
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading watchlist...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error?.message}</div>;
  }

  return (
    <div className={cn("min-h-screen bg-background text-foreground p-4", { 'dark': isDarkTheme })} role="main">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Crypto Watchlist Manager</CardTitle>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Add crypto symbol (e.g., BTC)"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              className="flex-grow"
              aria-label="Crypto symbol input"
            />
            <Button onClick={handleAddWatchlistItem} disabled={addMutation.isLoading} aria-label="Add to watchlist">
              {addMutation.isLoading ? 'Adding...' : 'Add'}
            </Button>
          </div>

          {watchlist && watchlist.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>24h Change</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {watchlist.map((item: WatchlistItem) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.symbol}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell className={cn({
                      'text-green-500': item.change24h > 0,
                      'text-red-500': item.change24h < 0,
                    })}>
                      {item.change24h.toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveWatchlistItem(item.id)}
                        disabled={removeMutation.isLoading}
                        aria-label={`Remove ${item.symbol} from watchlist`}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground">Your watchlist is empty. Add some crypto symbols!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WatchlistManager;
