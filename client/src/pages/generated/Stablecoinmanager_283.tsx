// AUTO-GENERATED DRAFT SCREEN: StablecoinManager

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ArrowUpDown, MoreHorizontal, PlusCircle, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock tRPC-like hooks for demonstration
const trpc = {
  stablecoin: {
    list: {
      useQuery: () => useQuery<Stablecoin[]>({ queryKey: ['stablecoins'], queryFn: async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (Math.random() < 0.1) throw new Error('Failed to fetch stablecoins'); // Simulate error
        return [
          { id: '1', name: 'USDC', balance: 1500.75, status: 'active' },
          { id: '2', name: 'USDT', balance: 2300.00, status: 'active' },
          { id: '3', name: 'DAI', balance: 800.50, status: 'inactive' },
        ];
      }}),
    },
    deposit: {
      useMutation: () => useMutation<void, Error, { id: string; amount: number }>({ mutationFn: async ({ id, amount }) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        if (Math.random() < 0.2) throw new Error('Deposit failed'); // Simulate error
        console.log(`Depositing ${amount} to ${id}`);
        toast({ title: 'Deposit Successful', description: `Deposited ${amount} to ${id}` });
      }}),
    },
    withdraw: {
      useMutation: () => useMutation<void, Error, { id: string; amount: number }>({ mutationFn: async ({ id, amount }) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        if (Math.random() < 0.2) throw new Error('Withdrawal failed'); // Simulate error
        console.log(`Withdrawing ${amount} from ${id}`);
        toast({ title: 'Withdrawal Successful', description: `Withdrew ${amount} from ${id}` });
      }}),
    },
  },
};

interface Stablecoin {
  id: string;
  name: string;
  balance: number;
  status: 'active' | 'inactive';
}

const StablecoinManager: React.FC = () => {
  const { data: stablecoins, isLoading, isError, error, refetch } = trpc.stablecoin.list.useQuery();
  const depositMutation = trpc.stablecoin.deposit.useMutation({
    onSuccess: () => refetch(),
    onError: (err) => toast({ title: 'Deposit Error', description: err.message, variant: 'destructive' }),
  });
  const withdrawMutation = trpc.stablecoin.withdraw.useMutation({
    onSuccess: () => refetch(),
    onError: (err) => toast({ title: 'Withdrawal Error', description: err.message, variant: 'destructive' }),
  });

  const [selectedStablecoins, setSelectedStablecoins] = useState<string[]>([]);
  const [filter, setFilter] = useState('');

  const handleDeposit = (id: string, amount: number) => {
    depositMutation.mutate({ id, amount });
  };

  const handleWithdraw = (id: string, amount: number) => {
    withdrawMutation.mutate({ id, amount });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.16))] dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading stablecoins" />
        <span className="sr-only">Loading stablecoins...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.16))] dark:bg-gray-900">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
            <CardDescription>Failed to load stablecoins.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error?.message || 'An unknown error occurred.'}</p>
            <Button onClick={() => refetch()} className="mt-4">Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredStablecoins = stablecoins?.filter(stablecoin =>
    stablecoin.name.toLowerCase().includes(filter.toLowerCase())
  );

  const isMutating = depositMutation.isPending || withdrawMutation.isPending;

  return (
    <div className="container mx-auto py-10 dark:bg-gray-900 dark:text-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Crypto: Stablecoin Manager</h1>
        <Button onClick={() => toast({ title: 'Add Stablecoin', description: 'Feature coming soon!' })} disabled={isMutating}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Stablecoin
        </Button>
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Filter stablecoins..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="max-w-sm dark:bg-gray-800 dark:text-gray-50 dark:border-gray-700"
          aria-label="Filter stablecoins by name"
          disabled={isMutating}
        />
      </div>

      <div className="rounded-md border dark:border-gray-700">
        <Table>
          <TableHeader className="dark:bg-gray-800">
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedStablecoins.length === filteredStablecoins?.length && filteredStablecoins.length > 0}
                  onCheckedChange={(checked) => {
                    setSelectedStablecoins(prev =>
                      checked ? [...prev, stablecoin.id] : prev.filter(id => id !== stablecoin.id)
                    );
                  }}
                  aria-label="Select all stablecoins"
                  disabled={isMutating}
                />
              </TableHead>
              <TableHead className="cursor-pointer flex items-center" onClick={() => { /* Sort by name */ }}>
                Name <ArrowUpDown className="ml-2 h-4 w-4" />
              </TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStablecoins?.length ? (
              filteredStablecoins.map((stablecoin) => (
                <TableRow key={stablecoin.id} className="dark:hover:bg-gray-800/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedStablecoins.includes(stablecoin.id)}
                      onCheckedChange={(checked) => {
                        setSelectedStablecoins(prev =>
                          checked ? [...prev, stablecoin.id] : prev.filter(id => id !== stablecoin.id)
                        );
                      }}
                      aria-label={`Select ${stablecoin.name}`}
                      disabled={isMutating}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{stablecoin.name}</TableCell>
                  <TableCell>{stablecoin.balance.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${stablecoin.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                      {stablecoin.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isMutating}>
                          <span className="sr-only">Open menu for {stablecoin.name}</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="dark:bg-gray-700" />
                        <DropdownMenuItem onClick={() => handleDeposit(stablecoin.id, 100)} disabled={depositMutation.isPending}>
                          {depositMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Deposit 100
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleWithdraw(stablecoin.id, 50)} disabled={withdrawMutation.isPending}>
                          {withdrawMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Withdraw 50
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="dark:bg-gray-700" />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center dark:text-gray-400">
                  No stablecoins found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StablecoinManager;
