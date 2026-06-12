// AUTO-GENERATED DRAFT SCREEN: CryptoRolePermissions

import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

// Zod schema for form validation
const rolePermissionsSchema = z.object({
  roleName: z.string().min(1, 'Role name is required'),
  canViewBalances: z.boolean(),
  canTransact: z.boolean(),
  canManageUsers: z.boolean(),
});

type RolePermissionsFormValues = z.infer<typeof rolePermissionsSchema>;

interface CryptoRolePermissionsProps {
  roleId?: string; // Optional role ID for editing existing roles
}

const CryptoRolePermissions: React.FC<CryptoRolePermissionsProps> = ({ roleId }) => {
  const { data, isLoading, error } = trpc.roles.getRolePermissions.useQuery({ roleId }, { enabled: !!roleId });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<RolePermissionsFormValues>({
    resolver: zodResolver(rolePermissionsSchema),
    defaultValues: {
      roleName: data?.roleName || '',
      canViewBalances: data?.canViewBalances || false,
      canTransact: data?.canTransact || false,
      canManageUsers: data?.canManageUsers || false,
    },
  });

  React.useEffect(() => {
    if (data) {
      reset({
        roleName: data.roleName,
        canViewBalances: data.canViewBalances,
        canTransact: data.canTransact,
        canManageUsers: data.canManageUsers,
      });
    }
  }, [data, reset]);

  const createRoleMutation = trpc.roles.createRole.useMutation({
    onSuccess: () => {
      toast.success('Role created successfully!');
      reset();
    },
    onError: (err) => {
      toast.error(`Error creating role: ${err.message}`);
    },
  });

  const updateRoleMutation = trpc.roles.updateRole.useMutation({
    onSuccess: () => {
      toast.success('Role updated successfully!');
    },
    onError: (err) => {
      toast.error(`Error updating role: ${err.message}`);
    },
  });

  const onSubmit = (values: RolePermissionsFormValues) => {
    if (roleId) {
      updateRoleMutation.mutate({ id: roleId, ...values });
    } else {
      createRoleMutation.mutate(values);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading role permissions...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4 dark:bg-gray-900">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold dark:text-white">{roleId ? 'Edit Role Permissions' : 'Create New Role'}</CardTitle>
          <CardDescription className="dark:text-gray-400">Manage permissions for crypto-related roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="roleName" className="dark:text-white">Role Name</Label>
              <Input
                id="roleName"
                type="text"
                placeholder="e.g., Trader, Auditor"
                {...register('roleName')}
                className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
              {errors.roleName && <p className="text-red-500 text-sm">{errors.roleName.message}</p>}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="canViewBalances" className="dark:text-white">Can View Balances</Label>
                <Switch
                  id="canViewBalances"
                  {...register('canViewBalances')}
                  checked={watch('canViewBalances')}
                  onCheckedChange={(checked) => setValue('canViewBalances', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="canTransact" className="dark:text-white">Can Transact</Label>
                <Switch
                  id="canTransact"
                  {...register('canTransact')}
                  checked={watch('canTransact')}
                  onCheckedChange={(checked) => setValue('canTransact', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="canManageUsers" className="dark:text-white">Can Manage Users</Label>
                <Switch
                  id="canManageUsers"
                  {...register('canManageUsers')}
                  checked={watch('canManageUsers')}
                  onCheckedChange={(checked) => setValue('canManageUsers', checked)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
              {roleId ? 'Update Role' : 'Create Role'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoRolePermissions;
