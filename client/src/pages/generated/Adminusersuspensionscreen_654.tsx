// AUTO-GENERATED DRAFT SCREEN: AdminUserSuspensionScreen
import React, { useState } from 'react';
import { useMutation } from '@trpc/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface AdminUserSuspensionScreenProps {
  userId: string;
}

const AdminUserSuspensionScreen: React.FC<AdminUserSuspensionScreenProps> = ({ userId }) => {
  const [isSuspended, setIsSuspended] = useState(false);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock tRPC mutation hook
  const suspendUserMutation = useMutation({
    mutationFn: async ({ id, suspend, suspensionReason }: { id: string; suspend: boolean; suspensionReason?: string }) => {
      setIsLoading(true);
      setError(null);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) { // Simulate 10% failure rate
            resolve({ success: true, message: `User ${id} suspension status updated to ${suspend}` });
          } else {
            reject(new Error('Failed to update suspension status. Please try again.'));
          }
        }, 1500);
      });
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setIsLoading(false);
    },
    onError: (err: any) => {
      setError(err.message);
      toast.error(err.message);
      setIsLoading(false);
    },
  });

  const handleToggleSuspension = async () => {
    if (isLoading) return;

    try {
      await suspendUserMutation.mutateAsync({
        id: userId,
        suspend: !isSuspended,
        suspensionReason: !isSuspended ? reason : undefined,
      });
      setIsSuspended(!isSuspended);
      setReason('');
    } catch (e) {
      // Error handled by onError in useMutation
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 dark">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Suspension Management</CardTitle>
          <CardDescription>Manage suspension status for user ID: {userId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="suspend-toggle" className="text-lg">Suspend User</Label>
            <Switch
              id="suspend-toggle"
              checked={isSuspended}
              onCheckedChange={setIsSuspended}
              aria-label="Toggle user suspension"
              disabled={isLoading}
            />
          </div>

          {isSuspended && (
            <div className="space-y-2">
              <Label htmlFor="suspension-reason">Reason for Suspension</Label>
              <Input
                id="suspension-reason"
                placeholder="e.g., Policy violation, temporary ban"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={isLoading}
                aria-required="true"
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm" role="alert">Error: {error}</p>}

          <Button
            onClick={handleToggleSuspension}
            className="w-full"
            disabled={isLoading || (isSuspended && !reason)}
          >
            {isLoading ? 'Updating...' : isSuspended ? 'Unsuspend User' : 'Suspend User'}
          </Button>

          {isLoading && <p className="text-center text-sm text-muted-foreground">Updating suspension status...</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserSuspensionScreen;
