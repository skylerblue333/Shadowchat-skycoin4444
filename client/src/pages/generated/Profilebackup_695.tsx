// AUTO-GENERATED DRAFT SCREEN: ProfileBackup
import React from 'react';
import { useQuery, useMutation, trpc } from '../lib/trpc';
import { Button } from './ui/button'; // Assuming shadcn/ui button is available
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui card is available
import { Switch } from './ui/switch'; // Assuming shadcn/ui switch is available
import { Label } from './ui/label'; // Assuming shadcn/ui label is available
import { useToast } from './ui/use-toast'; // Assuming shadcn/ui toast is available

interface ProfileBackupProps {
  // No props needed for this specific screen based on the request
}

const ProfileBackup: React.FC<ProfileBackupProps> = () => {
  const { toast } = useToast();

  const { data: backupStatus, isLoading: isLoadingStatus, isError: isErrorStatus, error: errorStatus } = useQuery(
    trpc.profile.getBackupStatus
  );

  const { mutate: initiateBackup, isLoading: isInitiatingBackup, isError: isErrorInitiatingBackup, error: errorInitiatingBackup } = useMutation(
    trpc.profile.initiateBackup
  );

  const handleInitiateBackup = async () => {
    try {
      const result = await initiateBackup({});
      if (result.success) {
        toast({
          title: "Backup Initiated",
          description: result.message,
        });
        // Optionally re-fetch status after successful initiation
        // queryClient.invalidateQueries("profile.getBackupStatus");
      } else {
        toast({
          title: "Backup Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: errorInitiatingBackup || "An unexpected error occurred during backup initiation.",
        variant: "destructive",
      });
    }
  };

  if (isLoadingStatus) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p className="text-lg">Loading backup status...</p>
      </div>
    );
  }

  if (isErrorStatus) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-destructive">
        <p className="text-lg">Error loading backup status: {errorStatus}</p>
      </div>
    );
  }

  const isBackupEnabled = backupStatus?.status === 'enabled';

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8 flex items-center justify-center dark">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile Backup</CardTitle>
          <CardDescription>Manage your profile data backup settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="backup-switch" className="text-base">Automatic Backup</Label>
            <Switch
              id="backup-switch"
              checked={isBackupEnabled}
              onCheckedChange={() => {
                // In a real app, this would trigger an API call to toggle backup
                toast({
                  title: "Feature Not Implemented",
                  description: "Toggling automatic backup is not yet implemented.",
                });
              }}
              aria-label="Toggle automatic profile backup"
            />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Last Backup:</p>
            <p className="text-base font-medium">
              {backupStatus?.lastBackup ? backupStatus.lastBackup : 'Never'}
            </p>
          </div>

          <Button
            onClick={handleInitiateBackup}
            disabled={isInitiatingBackup}
            className="w-full py-2 text-lg font-semibold"
          >
            {isInitiatingBackup ? 'Initiating Backup...' : 'Initiate Backup Now'}
          </Button>

          {isErrorInitiatingBackup && (
            <p className="text-destructive text-sm mt-2">Error: {errorInitiatingBackup}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileBackup;
