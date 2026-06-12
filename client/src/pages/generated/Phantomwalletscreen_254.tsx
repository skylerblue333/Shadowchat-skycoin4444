// AUTO-GENERATED DRAFT SCREEN: PhantomWalletScreen
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react'; // Assuming lucide-react for icons

// Simulate tRPC hooks for data fetching
const usePhantomWalletData = () => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData = {
          address: '0xPhantomWalletAddress1234567890ABCDEF',
          balance: '12.345 SOL',
          transactions: [
            { id: '1', type: 'Sent', amount: '2.0 SOL', to: '0xRecipient1' },
            { id: '2', type: 'Received', amount: '5.0 SOL', from: '0xSender1' },
          ],
        };
        setData(mockData);
      } catch (error) {
        console.error('Failed to fetch wallet data:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, isError };
};

const useSendTransaction = () => {
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutate = async (amount: string, recipient: string) => {
    setIsSending(true);
    setSendError(null);
    setIsSuccess(false);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (Math.random() > 0.8) {
        throw new Error('Transaction failed: Insufficient funds.');
      }
      setIsSuccess(true);
    } catch (error: any) {
      setSendError(error.message || 'Failed to send transaction.');
    } finally {
      setIsSending(false);
    }
  };

  return { mutate, isSending, sendError, isSuccess };
};

interface PhantomWalletScreenProps {
  userId: string;
}

const PhantomWalletScreen: React.FC<PhantomWalletScreenProps> = ({ userId }) => {
  const { data, isLoading, isError } = usePhantomWalletData();
  const { mutate: sendTransaction, isSending, sendError, isSuccess } = useSendTransaction();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const handleSend = () => {
    // Example: send 1 SOL to a mock recipient
    sendTransaction('1.0 SOL', '0xMockRecipient');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading wallet data" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-red-500">
        <p>Error loading wallet data. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md mx-auto shadow-lg dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Phantom Wallet</CardTitle>
          <CardDescription>Manage your Solana assets, {userId}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark mode"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Wallet Details</h3>
            <p><strong>Address:</strong> <span className="font-mono text-sm break-all">{data?.address}</span></p>
            <p><strong>Balance:</strong> <span className="font-medium text-primary">{data?.balance}</span></p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
            {data?.transactions.length > 0 ? (
              <ul className="space-y-2">
                {data.transactions.map((tx: any) => (
                  <li key={tx.id} className="flex justify-between items-center text-sm">
                    <span>{tx.type}: {tx.amount}</span>
                    <span className="text-gray-500 dark:text-gray-400">{tx.type === 'Sent' ? `to ${tx.to}` : `from ${tx.from}`}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No recent transactions.</p>
            )}
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleSend}
              disabled={isSending}
              className="w-full"
              aria-live="polite"
            >
              {isSending ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
              ) : (
                'Send 1 SOL (Example)'
              )}
            </Button>
            {sendError && <p className="text-red-500 text-sm text-center" role="alert">{sendError}</p>}
            {isSuccess && <p className="text-green-500 text-sm text-center">Transaction successful!</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhantomWalletScreen;
