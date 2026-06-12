// AUTO-GENERATED DRAFT SCREEN: CryptoSanctionsScreening
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Loader2 } from 'lucide-react';

interface SanctionedEntity {
  id: string;
  name: string;
  reason: string;
  dateAdded: string;
}

const CryptoSanctionsScreening: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const { data, isLoading, isError, error, refetch } = trpc.sanctions.checkWallet.useQuery(
    { walletAddress },
    { enabled: false, retry: false }
  );

  const handleScreening = () => {
    if (walletAddress) {
      refetch();
    }
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <Label htmlFor="dark-mode" className="mr-2">Dark Mode</Label>
          <Switch
            id="dark-mode"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
          />
        </div>

        <Card className={isDarkTheme ? 'bg-gray-800 border-gray-700' : ''}>
          <CardHeader>
            <CardTitle className={isDarkTheme ? 'text-white' : ''}>Crypto: Sanctions Screening</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="wallet-address" className={isDarkTheme ? 'text-gray-300' : ''}>Wallet Address</Label>
              <Input
                id="wallet-address"
                type="text"
                placeholder="Enter wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className={isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : ''}
              />
            </div>
            <Button onClick={handleScreening} disabled={isLoading || !walletAddress} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Screen Wallet
            </Button>

            {isError && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error?.message || 'An unknown error occurred during screening.'}</AlertDescription>
              </Alert>
            )}

            {isLoading && (
              <Alert className="mt-4">
                <AlertTitle>Screening in progress...</AlertTitle>
                <AlertDescription>Please wait while we check the wallet address against sanctions lists.</AlertDescription>
              </Alert>
            )}

            {data && (
              <div className="mt-4">
                {data.isSanctioned ? (
                  <Alert variant="destructive">
                    <AlertTitle>Sanctioned Entity Detected!</AlertTitle>
                    <AlertDescription>
                      The wallet address is associated with a sanctioned entity:
                      <ul className="list-disc list-inside mt-2">
                        {data.sanctionedEntities?.map((entity: SanctionedEntity) => (
                          <li key={entity.id}>{entity.name} (Reason: {entity.reason}, Added: {entity.dateAdded})</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="success">
                    <AlertTitle>No Sanctioned Entities Found</AlertTitle>
                    <AlertDescription>The wallet address appears to be clear of known sanctions.</AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoSanctionsScreening;
