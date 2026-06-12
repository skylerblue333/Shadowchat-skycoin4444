// AUTO-GENERATED DRAFT SCREEN: CryptoKeyManagementScreen
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@trpc/react';
import { type AppRouter } from '../server/api/root'; // Assuming tRPC setup
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes'; // For dark theme
import { Loader2 } from 'lucide-react'; // Example loading icon

interface Key {
  id: string;
  name: string;
  type: 'ECDSA' | 'RSA';
  createdAt: string;
}

const CryptoKeyManagementScreen: React.FC = () => {
  const { theme } = useTheme();
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);

  // tRPC query to fetch keys
  const { data: keys, isLoading, error, refetch } = useQuery(['key.getAll'], {
    onError: (err) => console.error('Failed to fetch keys:', err.message),
  });

  // tRPC mutation to create a new key
  const createKeyMutation = useMutation(['key.create'], {
    onSuccess: () => {
      setNewKeyName('');
      refetch();
    },
    onError: (err) => console.error('Failed to create key:', err.message),
  });

  // tRPC mutation to delete a key
  const deleteKeyMutation = useMutation(['key.delete'], {
    onSuccess: () => {
      setSelectedKey(null);
      refetch();
    },
    onError: (err) => console.error('Failed to delete key:', err.message),
  });

  const handleCreateKey = useCallback(() => {
    if (newKeyName.trim()) {
      createKeyMutation.mutate({ name: newKeyName.trim(), type: 'ECDSA' });
    }
  }, [newKeyName, createKeyMutation]);

  const handleDeleteKey = useCallback((keyId: string) => {
    deleteKeyMutation.mutate({ id: keyId });
  }, [deleteKeyMutation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" aria-label="Loading keys" />
        <span className="sr-only">Loading keys...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="text-red-500 p-4">
        Error: {error.message}. Please try again.
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crypto Key Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="new-key-name" className="block text-sm font-medium mb-2">Create New Key</Label>
            <div className="flex space-x-2">
              <Input
                id="new-key-name"
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Enter key name"
                className="flex-grow"
                aria-label="New key name input"
              />
              <Button onClick={handleCreateKey} disabled={createKeyMutation.isLoading || !newKeyName.trim()}>
                {createKeyMutation.isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create Key
              </Button>
            </div>
            {createKeyMutation.isError && (
              <p className="text-red-500 text-sm mt-2" role="alert">Failed to create key: {createKeyMutation.error?.message}</p>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Existing Keys</h3>
            {keys && keys.length > 0 ? (
              <ul className="space-y-3">
                {keys.map((key) => (
                  <li key={key.id} className="flex items-center justify-between p-3 border rounded-md bg-white dark:bg-gray-800">
                    <div>
                      <p className="font-medium">{key.name} ({key.type})</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">ID: {key.id}</p>
                    </div>
                    <Button variant="destructive" onClick={() => handleDeleteKey(key.id)} disabled={deleteKeyMutation.isLoading && selectedKey?.id === key.id}>
                      {deleteKeyMutation.isLoading && selectedKey?.id === key.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Delete
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No keys found. Create one above!</p>
            )}
            {deleteKeyMutation.isError && (
              <p className="text-red-500 text-sm mt-2" role="alert">Failed to delete key: {deleteKeyMutation.error?.message}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoKeyManagementScreen;
