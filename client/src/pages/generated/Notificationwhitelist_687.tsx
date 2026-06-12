// AUTO-GENERATED DRAFT SCREEN: NotificationWhitelist

import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

type WhitelistEntry = {
  id: string;
  address: string;
  enabled: boolean;
};

// Mock API functions
const fetchWhitelist = async (): Promise<WhitelistEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', address: '0xabc123...', enabled: true },
        { id: '2', address: '0xdef456...', enabled: false },
      ]);
    }, 500);
  });
};

const addWhitelistEntry = async (address: string): Promise<WhitelistEntry> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEntry = { id: String(Date.now()), address, enabled: true };
      resolve(newEntry);
    }, 500);
  });
};

const updateWhitelistEntry = async (entry: WhitelistEntry): Promise<WhitelistEntry> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(entry);
    }, 500);
  });
};

const deleteWhitelistEntry = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

export function NotificationWhitelist() {
  const { data: whitelist, isLoading, error, refetch } = useQuery<WhitelistEntry[]>({ queryKey: ['whitelist'], queryFn: fetchWhitelist });
  const addMutation = useMutation({ mutationFn: addWhitelistEntry, onSuccess: () => { toast.success('Address added to whitelist'); refetch(); } });
  const updateMutation = useMutation({ mutationFn: updateWhitelistEntry, onSuccess: () => { toast.success('Whitelist updated'); refetch(); } });
  const deleteMutation = useMutation({ mutationFn: deleteWhitelistEntry, onSuccess: () => { toast.success('Address removed from whitelist'); refetch(); } });

  const [newAddress, setNewAddress] = useState('');

  const handleAddAddress = async () => {
    if (newAddress.trim() === '') {
      toast.error('Address cannot be empty');
      return;
    }
    await addMutation.mutateAsync(newAddress);
    setNewAddress('');
  };

  const handleToggleEnable = async (entry: WhitelistEntry) => {
    await updateMutation.mutateAsync({ ...entry, enabled: !entry.enabled });
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  if (isLoading) return <div className="p-4">Loading whitelist...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading whitelist: {error.message}</div>;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Notification Whitelist</CardTitle>
        <CardDescription>Manage addresses for which you want to receive notifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex space-x-2">
          <Input
            placeholder="Enter new address to whitelist"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleAddAddress} disabled={addMutation.isPending}>
            {addMutation.isPending ? 'Adding...' : 'Add Address'}
          </Button>
        </div>

        <div className="space-y-4">
          {whitelist?.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-3 border rounded-md">
              <Label htmlFor={`switch-${entry.id}`} className="flex items-center space-x-2 cursor-pointer">
                <Switch
                  id={`switch-${entry.id}`}
                  checked={entry.enabled}
                  onCheckedChange={() => handleToggleEnable(entry)}
                  disabled={updateMutation.isPending}
                />
                <span>{entry.address}</span>
              </Label>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(entry.id)} disabled={deleteMutation.isPending}>
                Delete
              </Button>
            </div>
          ))}
          {whitelist?.length === 0 && <p className="text-center text-muted-foreground">No addresses in whitelist.</p>}
        </div>
      </CardContent>
    </Card>
  );
}


export default function Notificationwhitelist_687() { return null; }
