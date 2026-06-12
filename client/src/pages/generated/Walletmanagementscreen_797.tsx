// AUTO-GENERATED DRAFT SCREEN: WalletManagementScreen
import { useState } from 'react';
import { Button } from "./components/ui/button";
import { trpc } from './trpc';
import { ThemeToggle } from './components/theme-toggle';

interface Wallet {
  id: string;
  name: string;
  address: string;
  currency: string;
  balance: number;
  is_hd: boolean;
  created_at: Date;
}

function WalletManagementScreen() {
  const { data: wallets, isLoading, isError, error } = trpc.wallet.getAll.useQuery();

  if (isLoading) {
    return <div className="min-h-screen bg-background text-foreground p-4">Loading wallets...</div>;
  }

  if (isError) {
    return <div className="min-h-screen bg-background text-foreground p-4 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Wallet Management</h1>
        <ThemeToggle />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wallets?.map((wallet: Wallet) => (
          <div key={wallet.id} className="bg-card text-card-foreground p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{wallet.name}</h2>
            <p>Address: {wallet.address}</p>
            <p>Balance: {wallet.balance} {wallet.currency}</p>
            <p>Type: {wallet.is_hd ? 'HD Wallet' : 'Standard'}</p>
            <Button className="mt-2">View Details</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WalletManagementScreen;
