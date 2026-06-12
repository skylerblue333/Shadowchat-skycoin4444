// AUTO-GENERATED DRAFT SCREEN: CryptoBackupRecoveryScreen
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming trpc client setup
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Terminal } from 'lucide-react';

type BackupRecoveryData = {
  recoveryPhrase: string;
  lastBackupDate: string;
};

interface CryptoBackupRecoveryScreenProps {
  userId: string;
}

const CryptoBackupRecoveryScreen: React.FC<CryptoBackupRecoveryScreenProps> = ({ userId }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showRecoveryPhrase, setShowRecoveryPhrase] = useState(false);

  const { data, isLoading, isError, error } = trpc.crypto.getBackupRecoveryData.useQuery(
    { userId },
    { 
      enabled: !!userId, 
      staleTime: Infinity, 
      cacheTime: Infinity, 
      refetchOnWindowFocus: false 
    }
  );

  const handleToggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Loading backup recovery data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load backup recovery data: {error?.message || 'Unknown error'}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkTheme ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Crypto Backup Recovery</CardTitle>
          <CardDescription>Manage your cryptocurrency backup and recovery phrase.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="recoveryPhrase">Recovery Phrase</Label>
              <Input
                id="recoveryPhrase"
                type={showRecoveryPhrase ? 'text' : 'password'}
                value={data?.recoveryPhrase || ''}
                readOnly
                aria-label="Recovery Phrase"
              />
              <Button
                variant="outline"
                onClick={() => setShowRecoveryPhrase((prev) => !prev)}
                className="mt-2"
                aria-controls="recoveryPhrase"
                aria-expanded={showRecoveryPhrase}
              >
                {showRecoveryPhrase ? 'Hide' : 'Show'} Phrase
              </Button>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastBackup">Last Backup Date</Label>
              <Input id="lastBackup" value={data?.lastBackupDate || 'N/A'} readOnly aria-label="Last Backup Date" />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch id="dark-mode" checked={isDarkTheme} onCheckedChange={handleToggleTheme} aria-label="Toggle Dark Mode" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="secondary">Backup Now</Button>
          <Button>Copy Phrase</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CryptoBackupRecoveryScreen;
