// AUTO-GENERATED DRAFT SCREEN: FaucetScreen
import React, { useState } from 'react';
import { trpc } from './lib/trpc';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { toast } from 'sonner';

/**
 * @typedef {object} FaucetScreenProps
 * @property {string} [initialAddress] - Optional initial wallet address for the faucet.
 */

/**
 * FaucetScreen component for requesting test tokens on a test network.
 * It provides a user interface to input a wallet address and request tokens,
 * handling loading states, success messages, and error notifications.
 * The component integrates with a tRPC backend for token requests.
 *
 * @param {FaucetScreenProps} props - Props for the FaucetScreen component.
 */
const FaucetScreen: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // tRPC mutation hook for requesting tokens
  const requestTokens = trpc.requestTokens.useMutation({
    onSuccess: (data) => {
      toast.success('Tokens Requested', {
        description: data.message,
      });
      setAddress(''); // Clear the address input on successful request
      setValidationError(null); // Clear any previous validation errors
    },
    onError: (error) => {
      // Display a more user-friendly error message
      const errorMessage = error.message.includes('Simulated error')
        ? 'Failed to request tokens. Please try again later or check your address.'
        : error.message;
      toast.error('Request Failed', {
        description: errorMessage,
      });
    },
  });

  /**
   * Handles the form submission for requesting tokens.
   * Performs client-side validation before sending the request to the server.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null); // Clear previous validation errors

    if (address.trim() === '') {
      setValidationError('Wallet address cannot be empty.');
      toast.error('Validation Error', {
        description: 'Please enter a valid wallet address.',
      });
      return;
    }

    // Basic address format validation (e.g., check for a minimum length or specific prefix)
    // This can be extended with more robust regex for specific blockchain addresses
    if (address.trim().length < 10) { // Example: minimum length of 10 characters
      setValidationError('Wallet address is too short. Please enter a valid address.');
      toast.error('Validation Error', {
        description: 'The provided wallet address is too short.',
      });
      return;
    }

    requestTokens.mutate({ address });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 dark">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Crypto: Test Network Faucet</CardTitle>
          <CardDescription className="text-center">Get test tokens for development and testing.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="address">Wallet Address</Label>
              <Input
                type="text"
                id="address"
                placeholder="Enter your wallet address (e.g., 0xAbCdEf1234567890...)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={requestTokens.isLoading}
                aria-invalid={validationError ? "true" : "false"}
                aria-describedby={validationError ? "address-error" : undefined}
              />
              {validationError && (
                <p id="address-error" className="text-red-500 text-sm" role="alert" aria-live="assertive">
                  {validationError}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={requestTokens.isLoading}>
              {requestTokens.isLoading ? 'Requesting...' : 'Request Tokens'}
            </Button>
            {requestTokens.isError && (
              <p className="text-red-500 text-sm text-center" role="alert" aria-live="assertive">
                {requestTokens.error?.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaucetScreen;
