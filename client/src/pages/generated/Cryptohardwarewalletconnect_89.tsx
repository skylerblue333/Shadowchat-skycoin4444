// AUTO-GENERATED DRAFT SCREEN: CryptoHardwareWalletConnect
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { Loader2 } from 'lucide-react';

interface CryptoHardwareWalletConnectProps {
  onConnectSuccess: (walletAddress: string) => void;
  onConnectError: (error: string) => void;
}

const CryptoHardwareWalletConnect: React.FC<CryptoHardwareWalletConnectProps> = ({
  onConnectSuccess,
  onConnectError,
}) => {
  const [deviceName, setDeviceName] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);

  const connectWalletMutation = trpc.crypto.connectHardwareWallet.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await connectWalletMutation.mutateAsync({
        deviceName,
        pin,
      });
      if (result.success) {
        onConnectSuccess(result.walletAddress);
      } else {
        setError(result.message || 'Failed to connect wallet.');
        onConnectError(result.message || 'Failed to connect wallet.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
      onConnectError(errorMessage);
    }
  };

  const isLoading = connectWalletMutation.isLoading;

  return (
    <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-card dark:bg-gray-800 text-card-foreground dark:text-gray-100 shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Connect Hardware Wallet</CardTitle>
          <CardDescription className="text-muted-foreground dark:text-gray-400 mt-2">
            Securely connect your hardware wallet to SKYCOIN4444.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="deviceName" className="text-sm font-medium">Device Name</Label>
              <Input
                id="deviceName"
                type="text"
                placeholder="e.g., Ledger Nano X"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                required
                aria-label="Hardware wallet device name"
                className="bg-input dark:bg-gray-700 border-border dark:border-gray-600 text-foreground dark:text-gray-50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pin" className="text-sm font-medium">PIN</Label>
              <Input
                id="pin"
                type="password"
                placeholder="Enter your device PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
                aria-label="Hardware wallet PIN"
                className="bg-input dark:bg-gray-700 border-border dark:border-gray-600 text-foreground dark:text-gray-50"
              />
            </div>
            {error && (
              <p role="alert" className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full bg-primary dark:bg-blue-600 text-primary-foreground dark:text-white hover:bg-primary/90 dark:hover:bg-blue-700 transition-colors duration-200"
              disabled={isLoading}
              aria-live="polite"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Connecting...
                </span>
              ) : (
                'Connect Wallet'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoHardwareWalletConnect;
