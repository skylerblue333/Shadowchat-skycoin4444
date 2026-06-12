// AUTO-GENERATED DRAFT SCREEN: MetaMaskIntegrationScreen
import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button'; // Assuming shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'; // Assuming shadcn/ui card
import { useWalletConnect } from './hooks/useWalletConnect'; // Placeholder for tRPC hook
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'; // Example icons for theme toggle

interface MetaMaskIntegrationScreenProps {}

const MetaMaskIntegrationScreen: React.FC<MetaMaskIntegrationScreenProps> = () => {
  const { connect, disconnect, address, isConnecting, error } = useWalletConnect();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  if (isConnecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p className="text-lg">Connecting to MetaMask...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-red-500">Connection Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-400">{error.message || 'Failed to connect to MetaMask.'}</p>
            <Button onClick={connect} className="mt-4 w-full">Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="absolute top-4 right-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkTheme ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
        </Button>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">MetaMask Integration</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {address ? (
            <>
              <p className="text-lg text-green-500 font-semibold">Wallet Connected!</p>
              <p className="text-sm text-muted-foreground break-all">Address: {address}</p>
              <Button onClick={disconnect} className="w-full variant="destructive"">
                Disconnect Wallet
              </Button>
            </>
          ) : (
            <>
              <p className="text-md text-center">Connect your MetaMask wallet to get started.</p>
              <Button onClick={connect} className="w-full">
                Connect MetaMask
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaMaskIntegrationScreen;

// Placeholder for a tRPC-like hook for wallet connection
// In a real application, this would interact with your tRPC client and MetaMask provider
function useWalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      // Simulate MetaMask connection
      const accounts = await new Promise<string[]>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.2) { // Simulate occasional failure
            resolve(['0x' + Math.random().toString(16).substring(2, 42)]);
          } else {
            reject(new Error('User rejected connection or connection failed.'));
          }
        }, 1500);
      });
      setAddress(accounts[0]);
    } catch (err) {
      setError(err as Error);
      setAddress(null);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setError(null);
    setIsConnecting(false);
  };

  return { connect, disconnect, address, isConnecting, error };
}