// AUTO-GENERATED DRAFT SCREEN: CancellationFlow
import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';
import { useQuery, useMutation } from '@tanstack/react-query';

interface CancellationDetails {
  id: string;
  reason: string;
  cancellable: boolean;
}

interface CancelCryptoRequest {
  id: string;
  reason: string;
}

// Simulated tRPC hooks
const trpc = {
  crypto: {
    getCancellationDetails: {
      useQuery: (id: string) => useQuery<CancellationDetails, Error>({
        queryKey: ['cancellationDetails', id],
        queryFn: async () => {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
          if (id === 'error') throw new Error('Failed to fetch details');
          return { id, reason: 'User requested cancellation', cancellable: true };
        },
      }),
    },
    cancelCrypto: {
      useMutation: () => useMutation<boolean, Error, CancelCryptoRequest>({
        mutationFn: async (data: CancelCryptoRequest) => {
          await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
          if (data.id === 'fail') throw new Error('Cancellation failed');
          return true;
        },
      }),
    },
  },
};

interface CancellationFlowProps {
  cryptoId: string;
}

export const CancellationFlow: React.FC<CancellationFlowProps> = ({ cryptoId }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { data, isLoading, error } = trpc.crypto.getCancellationDetails.useQuery(cryptoId);
  const { mutate, isPending, isSuccess, isError, error: cancellationError } = trpc.crypto.cancelCrypto.useMutation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const handleCancel = () => {
    if (data?.cancellable) {
      mutate({ id: cryptoId, reason: 'User initiated cancellation' });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen dark:bg-gray-900 text-gray-700 dark:text-gray-300">Loading cancellation details...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500 dark:bg-gray-900">Error: {error.message}</div>;
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${isDarkTheme ? 'dark bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Crypto Cancellation</h1>

        <div className="flex items-center justify-between mb-4">
          <Label htmlFor="dark-mode-switch">Dark Mode</Label>
          <Switch
            id="dark-mode-switch"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
        </div>

        <p className="mb-4">Crypto ID: <span className="font-semibold">{data?.id}</span></p>
        <p className="mb-6">Reason: <span className="font-semibold">{data?.reason}</span></p>

        {isSuccess && <p className="text-green-500 mb-4" role="status">Cancellation successful!</p>}
        {isError && <p className="text-red-500 mb-4" role="alert">Cancellation failed: {cancellationError?.message}</p>}

        <Button
          onClick={handleCancel}
          disabled={!data?.cancellable || isPending || isSuccess}
          className="w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-200
                     bg-red-600 hover:bg-red-700 disabled:bg-gray-400 dark:bg-red-700 dark:hover:bg-red-800 dark:disabled:bg-gray-600"
        >
          {isPending ? 'Cancelling...' : 'Confirm Cancellation'}
        </Button>

        {!data?.cancellable && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center" role="note">
            This crypto is currently not cancellable.
          </p>
        )}
      </div>
    </div>
  );
};

export default CancellationFlow;
