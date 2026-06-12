// AUTO-GENERATED DRAFT SCREEN: UserDeletionScreen
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // Placeholder for tRPC hooks

interface User {
  id: string;
  name: string;
  email: string;
}

interface DeleteUserResponse {
  success: boolean;
  message: string;
}

// Placeholder for tRPC client and hooks
const trpc = {
  user: {
    delete: (userId: string): Promise<DeleteUserResponse> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (userId === 'user-123') {
            resolve({ success: true, message: `User ${userId} deleted successfully.` });
          } else {
            resolve({ success: false, message: `User ${userId} not found.` });
          }
        }, 1500);
      });
    },
  },
};

const UserDeletionScreen: React.FC = () => {
  const [userIdToDelete, setUserIdToDelete] = useState<string>('');
  const [confirmDeletion, setConfirmDeletion] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const queryClient = useQueryClient(); // For invalidating queries after deletion

  const deleteUserMutation = useMutation<DeleteUserResponse, Error, string>({
    mutationFn: async (userId: string) => {
      setIsDeleting(true);
      setError(null);
      try {
        const response = await trpc.user.delete(userId);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response;
      } catch (err) {
        throw err;
      } finally {
        setIsDeleting(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']); // Invalidate user list after deletion
      setUserIdToDelete('');
      setConfirmDeletion(false);
      alert('User deleted successfully!');
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const handleDelete = () => {
    if (!userIdToDelete) {
      setError('Please enter a User ID.');
      return;
    }
    if (!confirmDeletion) {
      setError('Please confirm deletion.');
      return;
    }
    deleteUserMutation.mutate(userIdToDelete);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Admin: User Deletion</CardTitle>
          <CardDescription>Permanently delete a user from the system.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              type="text"
              placeholder="Enter user ID"
              value={userIdToDelete}
              onChange={(e) => setUserIdToDelete(e.target.value)}
              disabled={isDeleting}
              aria-label="User ID to delete"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="confirmDeletion"
              checked={confirmDeletion}
              onCheckedChange={setConfirmDeletion}
              disabled={isDeleting}
              aria-label="Confirm user deletion"
            />
            <Label htmlFor="confirmDeletion">I understand this action is irreversible.</Label>
          </div>

          {error && <p className="text-red-500 text-sm" role="alert">Error: {error}</p>}

          <Button
            className="w-full"
            onClick={handleDelete}
            disabled={!userIdToDelete || !confirmDeletion || isDeleting}
            aria-live="polite"
          >
            {isDeleting ? 'Deleting User...' : 'Delete User'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDeletionScreen;
