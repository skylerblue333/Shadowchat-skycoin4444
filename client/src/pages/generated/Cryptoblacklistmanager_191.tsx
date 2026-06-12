// AUTO-GENERATED DRAFT SCREEN: CryptoBlacklistManager
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC setup
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { useTheme } from './components/theme-provider'; // Assuming dark theme provider

interface BlacklistItem {
  id: string;
  address: string;
  reason: string;
  isActive: boolean;
}

const CryptoBlacklistManager: React.FC = () => {
  const [newAddress, setNewAddress] = useState('');
  const [newReason, setNewReason] = useState('');
  const { theme } = useTheme();

  const { data: blacklist, isLoading, isError, error, refetch } = trpc.blacklist.getAll.useQuery();

  const addMutation = trpc.blacklist.add.useMutation({
    onSuccess: () => {
      setNewAddress('');
      setNewReason('');
      refetch();
    },
  });

  const toggleMutation = trpc.blacklist.toggleActive.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = trpc.blacklist.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading blacklist...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Crypto Blacklist Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 border rounded-md">
            <h3 className="text-xl font-semibold mb-4">Add New Blacklist Entry</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="address">Wallet Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Enter wallet address"
                  aria-label="Wallet Address"
                />
              </div>
              <div>
                <Label htmlFor="reason">Reason</Label>
                <Input
                  id="reason"
                  type="text"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="Enter reason for blacklisting"
                  aria-label="Reason for blacklisting"
                />
              </div>
            </div>
            <Button
              onClick={() => addMutation.mutate({ address: newAddress, reason: newReason })}
              disabled={addMutation.isLoading || !newAddress || !newReason}
              className="w-full"
            >
              {addMutation.isLoading ? 'Adding...' : 'Add to Blacklist'}
            </Button>
            {addMutation.isError && <p className="text-red-500 mt-2">Error adding: {addMutation.error.message}</p>}
          </div>

          <h3 className="text-xl font-semibold mb-4">Current Blacklist</h3>
          {blacklist && blacklist.length === 0 ? (
            <p>No addresses currently blacklisted.</p>
          ) : (
            <ul className="space-y-4">
              {blacklist?.map((item: BlacklistItem) => (
                <li key={item.id} className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <p className="font-medium">Address: {item.address}</p>
                    <p className="text-sm text-gray-500">Reason: {item.reason}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`active-${item.id}`}
                        checked={item.isActive}
                        onCheckedChange={() => toggleMutation.mutate({ id: item.id, isActive: !item.isActive })}
                        aria-label={`Toggle active status for ${item.address}`}
                      />
                      <Label htmlFor={`active-${item.id}`}>Active</Label>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete.mutate({ id: item.id })}
                      disabled={handleDelete.isLoading}
                      aria-label={`Delete ${item.address}`}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoBlacklistManager;
