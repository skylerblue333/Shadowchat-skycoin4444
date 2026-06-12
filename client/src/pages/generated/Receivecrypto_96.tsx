// AUTO-GENERATED DRAFT SCREEN: ReceiveCrypto
import React, { useState, useEffect, useCallback } from 'react';
import { trpc } from '../trpc';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useTheme } from '../components/theme-provider';
import { Copy } from 'lucide-react'; // For copy icon
import { toast } from 'sonner'; // For toast notifications

// Define the props for the ReceiveCrypto component for better type safety.
interface ReceiveCryptoProps {}

const ReceiveCrypto: React.FC<ReceiveCryptoProps> = () => {
  // State management for selected currency, generated address, and QR code.
  const [currency, setCurrency] = useState<string>('BTC');
  const [address, setAddress] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Access theme context for dark/light mode toggle.
  const { theme, setTheme } = useTheme();

  // tRPC hook to fetch the receive address. It's disabled initially and fetched on demand.
  const { data, isLoading, isError, error, refetch } = trpc.crypto.getReceiveAddress.useQuery(
    { currency },
    { 
      enabled: false, // Prevent automatic fetching on component mount.
      retry: 1, // Retry once on failure.
      staleTime: Infinity, // Data is always fresh until explicitly refetched.
    }
  );

  // Effect hook to update address and QR code when data is successfully fetched.
  useEffect(() => {
    if (data) {
      setAddress(data.address);
      setQrCode(data.qrCode);
      setCopySuccess(false); // Reset copy success state on new address generation.
    }
  }, [data]);

  // Callback function to handle address generation.
  const handleGenerateAddress = useCallback(() => {
    refetch();
  }, [refetch]);

  // Callback function to copy the address to the clipboard.
  const handleCopyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopySuccess(true);
      toast.success('Address copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy address: ', err);
      toast.error('Failed to copy address.');
    }
  }, [address]);

  return (
    <div 
      className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
      aria-live="polite" // Announce dynamic content changes to assistive technologies.
    >
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Receive Crypto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="currency-select" className="text-sm font-medium">Select Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency-select" aria-label="Select cryptocurrency">
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  <SelectItem value="SKY">SKYCOIN (SKY)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleGenerateAddress} 
              disabled={isLoading}
              className="w-full py-2 text-lg font-medium"
              aria-busy={isLoading} // Indicate to screen readers that an action is in progress.
            >
              {isLoading ? 'Generating Address...' : 'Generate Address'}
            </Button>

            {isError && (
              <p role="alert" className="text-red-500 text-sm text-center">
                Error: {error?.message || 'Failed to fetch address.'}
              </p>
            )}

            {address && (
              <div className="grid gap-2">
                <Label htmlFor="receive-address" className="text-sm font-medium">Your Receive Address</Label>
                <div className="relative flex items-center">
                  <Input 
                    id="receive-address" 
                    type="text" 
                    value={address} 
                    readOnly 
                    className="pr-10 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                    aria-readonly="true"
                    aria-label="Cryptocurrency receive address"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-0 h-full px-3"
                    onClick={handleCopyAddress}
                    aria-label="Copy address to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                {copySuccess && <p className="text-green-500 text-sm text-center">Copied!</p>}
                {qrCode && (
                  <div className="flex justify-center mt-4">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${address}`}
                      alt="QR Code for receive address"
                      className="rounded-md shadow-sm"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              variant="outline" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              Toggle Theme ({theme === 'dark' ? 'Dark' : 'Light'})
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceiveCrypto;