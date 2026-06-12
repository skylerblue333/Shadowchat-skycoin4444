// AUTO-GENERATED DRAFT SCREEN: CryptoUserManagement

import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Button } from './components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Skeleton } from './components/ui/skeleton';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';
import { toast } from 'sonner'; // Assuming sonner for toasts

interface User {
  id: string;
  name: string;
  email: string;
  cryptoBalance: number;
  isActive: boolean;
}

const CryptoUserManagement: React.FC = () => {
  const { data: users, isLoading, isError, error } = trpc.users.list.useQuery();
  const deleteUserMutation = trpc.users.delete.useMutation({
    onSuccess: () => {
      toast.success('User deleted successfully.');
      // Invalidate queries to refetch user list
      trpc.users.list.invalidate();
    },
    onError: (err) => {
      toast.error(`Failed to delete user: ${err.message}`);
    },
  });

  const toggleUserStatusMutation = trpc.users.toggleStatus.useMutation({
    onSuccess: () => {
      toast.success('User status updated successfully.');
      trpc.users.list.invalidate();
    },
    onError: (err) => {
      toast.error(`Failed to update user status: ${err.message}`);
    },
  });

  const handleDelete = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUserMutation.mutate({ id: userId });
    }
  };

  const handleToggleStatus = (userId: string, currentStatus: boolean) => {
    toggleUserStatusMutation.mutate({ id: userId, isActive: !currentStatus });
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error loading users: ${error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Crypto Balance</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.cryptoBalance.toFixed(4)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`user-status-${user.id}`}
                    checked={user.isActive}
                    onCheckedChange={() => handleToggleStatus(user.id, user.isActive)}
                    aria-label={`Toggle ${user.name} status`}
                  />
                  <Label htmlFor={`user-status-${user.id}`}>{user.isActive ? 'Active' : 'Inactive'}</Label>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                  disabled={deleteUserMutation.isLoading}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CryptoUserManagement;
