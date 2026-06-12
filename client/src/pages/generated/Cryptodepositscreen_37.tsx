// AUTO-GENERATED DRAFT SCREEN: CryptoDepositScreen
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CopyIcon } from '@radix-ui/react-icons';
import { useToast } from '@/components/ui/use-toast';
import { trpc } from '@/utils/trpc'; // Placeholder for tRPC hooks

interface CryptoDepositScreenProps {}

const CryptoDepositScreen: React.FC<CryptoDepositScreenProps> = () => {
  const [selectedCrypto, setSelectedCrypto] = React.useState<string>('bitcoin');
  const { toast } = useToast();

  // Placeholder tRPC query for deposit address
  const { data: depositAddressData, isLoading, error } = trpc.crypto.getDepositAddress.useQuery(
    { currency: selectedCrypto },
    { enabled: !!selectedCrypto }
  );

  const depositAddress = depositAddressData?.address || 'Loading...';
  const qrCodeUrl = depositAddressData?.qrCodeUrl || 'https://via.placeholder.com/150'; // Placeholder QR code

  const handleCopyAddress = async () => {
    if (depositAddress && depositAddress !== 'Loading...') {
      try {
        await navigator.clipboard.writeText(depositAddress);
        toast({
          title: 'Address Copied!',
          description: 'The deposit address has been copied to your clipboard.',
        });
      } catch (err) {
        toast({
          title: 'Copy Failed',
          description: 'Could not copy address. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading deposit information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <Card className="w-full max-w-2xl mx-auto dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Deposit Funds</CardTitle>
          <CardDescription>Select a cryptocurrency to generate your deposit address.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="crypto-select">Cryptocurrency</Label>
            <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
              <SelectTrigger id="crypto-select" className="dark:bg-gray-700 dark:border-gray-600">
                <SelectValue placeholder="Select a cryptocurrency" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                <SelectItem value="tether">Tether (USDT)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Deposit Address</Label>
            <div className="flex space-x-2">
              <Input
                type="text"
                readOnly
                value={depositAddress}
                className="flex-1 dark:bg-gray-700 dark:border-gray-600"
                aria-label="Deposit Address"
              />
              <Button onClick={handleCopyAddress} variant="outline" size="icon" aria-label="Copy Address">
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <img src={qrCodeUrl} alt="QR Code" className="w-36 h-36 border dark:border-gray-600" />
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Important: Only send {selectedCrypto.toUpperCase()} to this address. Sending other cryptocurrencies may result in permanent loss of funds.</p>
            <p>Deposits typically take 5-10 minutes to confirm.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoDepositScreen;
