// AUTO-GENERATED DRAFT SCREEN: BiometricAuthScreen
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Button } from '@/components/ui/button'; // shadcn/ui button
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react'; // Lucide icon for loading

interface BiometricAuthScreenProps {
  userId: string;
}

const BiometricAuthScreen: React.FC<BiometricAuthScreenProps> = ({ userId }) => {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // tRPC mutation for enabling/disabling biometric auth
  const enableBiometricMutation = trpc.user.enableBiometric.useMutation();
  const disableBiometricMutation = trpc.user.disableBiometric.useMutation();

  useEffect(() => {
    // Simulate fetching current biometric status
    const fetchBiometricStatus = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, this would be a tRPC query
        const status = await new Promise<boolean>(resolve => setTimeout(() => resolve(false), 1000));
        setIsBiometricEnabled(status);
      } catch (err) {
        setError('Failed to fetch biometric status.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBiometricStatus();
  }, [userId]);

  const handleBiometricToggle = async (checked: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      if (checked) {
        // Simulate biometric enrollment process
        const enrollmentSuccess = await new Promise<boolean>(resolve => setTimeout(() => resolve(true), 1500));
        if (enrollmentSuccess) {
          await enableBiometricMutation.mutateAsync({ userId });
          setIsBiometricEnabled(true);
        } else {
          setError('Biometric enrollment failed.');
        }
      } else {
        await disableBiometricMutation.mutateAsync({ userId });
        setIsBiometricEnabled(false);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 dark">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Biometric Authentication</CardTitle>
          <CardDescription>Manage your biometric login settings for enhanced security.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p>Loading...</p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <Label htmlFor="biometric-mode" className="text-lg">
                Enable Biometric Login
              </Label>
              <Switch
                id="biometric-mode"
                checked={isBiometricEnabled}
                onCheckedChange={handleBiometricToggle}
                disabled={isLoading}
                aria-label="Toggle biometric login"
              />
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm" role="alert">
              Error: {error}
            </p>
          )}

          <p className="text-sm text-muted-foreground">
            Biometric authentication allows you to log in securely using your device's fingerprint or facial recognition.
            This feature adds an extra layer of security to your account.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiometricAuthScreen;
