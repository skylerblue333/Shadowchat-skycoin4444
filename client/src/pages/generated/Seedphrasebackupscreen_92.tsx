// AUTO-GENERATED DRAFT SCREEN: SeedPhraseBackupScreen
import React, { useState, useCallback } from 'react';
import { useSeedPhraseBackup } from '@/hooks/useSeedPhraseBackup'; // Custom hook for seed phrase logic
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Loader2 } from 'lucide-react'; // Icons for error and loading states

// Define the props for the SeedPhraseBackupScreen component
type SeedPhraseBackupScreenProps = {
  onBackupComplete: () => void; // Callback function to be called upon successful backup
};

/**
 * SeedPhraseBackupScreen Component
 * This component provides a user interface for securely backing up a cryptocurrency seed phrase.
 * It includes features like displaying the seed phrase, a confirmation input, loading states,
 * error handling, and adheres to a dark theme with accessibility considerations.
 */
const SeedPhraseBackupScreen: React.FC<SeedPhraseBackupScreenProps> = ({ onBackupComplete }) => {
  // State to manage the user's confirmation input
  const [confirmationText, setConfirmationText] = useState<string>('');
  // Custom hook to handle the logic for fetching and backing up the seed phrase
  const { seedPhrase, isLoading, error, backupSeedPhrase } = useSeedPhraseBackup();

  // Handler for the backup confirmation process
  const handleBackup = useCallback(async () => {
    // Ensure the user has correctly typed the confirmation phrase
    if (confirmationText === 'I understand the risks') {
      try {
        await backupSeedPhrase(); // Attempt to backup the seed phrase
        onBackupComplete(); // Notify parent component of completion
      } catch (err) {
        // Error handling is managed by the useSeedPhraseBackup hook, but we can log here if needed
        console.error('Failed to backup seed phrase:', err);
      }
    } else {
      // Alert the user if the confirmation text is incorrect
      alert('Please type \'I understand the risks\' exactly as shown to confirm.');
    }
  }, [confirmationText, backupSeedPhrase, onBackupComplete]);

  // Display a loading spinner while the seed phrase is being fetched or backed up
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
        <Loader2 className="h-8 w-8 animate-spin text-sky-400 mb-4" />
        <p className="text-lg">Loading your seed phrase securely...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait, this may take a moment.</p>
      </div>
    );
  }

  // Display an error message if something went wrong during the process
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
        <Alert variant="destructive" className="w-full max-w-md bg-red-900 border-red-700 text-red-100">
          <Terminal className="h-4 w-4 mr-2" />
          <AlertTitle className="text-red-300">Error Loading Seed Phrase</AlertTitle>
          <AlertDescription className="text-red-200">{error}</AlertDescription>
          <p className="text-sm text-red-400 mt-2">Please try again or contact support if the issue persists.</p>
        </Alert>
      </div>
    );
  }

  // Main component rendering for seed phrase backup
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700 text-gray-100 shadow-lg rounded-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-extrabold text-sky-400 text-center">Crypto: Seed Phrase Backup</CardTitle>
          <CardDescription className="text-gray-400 text-center mt-2">
            Securely back up your seed phrase. This is crucial for recovering your wallet.
            Keep it safe, private, and offline.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="seed-phrase" className="text-gray-300 text-sm font-medium">Your Seed Phrase</Label>
            <Input
              id="seed-phrase"
              type="text"
              value={seedPhrase || 'Loading...'}
              readOnly
              aria-label="Seed Phrase Display"
              className="bg-gray-700 border-gray-600 text-gray-100 font-mono text-base p-3 rounded-md
                         focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
            />
            <p className="text-sm text-gray-500 leading-relaxed">
              <span className="font-bold text-red-400">WARNING:</span> Write this down on paper and store it in multiple secure, offline locations.
              Never share it with anyone, and do not store it digitally.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmation" className="text-gray-300 text-sm font-medium">Type &quot;I understand the risks&quot; to confirm</Label>
            <Input
              id="confirmation"
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              aria-label="Confirmation Input"
              placeholder="I understand the risks"
              className="bg-gray-700 border-gray-600 text-gray-100 p-3 rounded-md
                         focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
            />
          </div>
          <Button
            onClick={handleBackup}
            disabled={confirmationText !== 'I understand the risks' || isLoading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
                       focus:ring-offset-gray-900 transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Confirm Backup
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeedPhraseBackupScreen;
