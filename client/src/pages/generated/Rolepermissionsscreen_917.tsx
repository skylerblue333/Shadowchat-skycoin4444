// AUTO-GENERATED DRAFT SCREEN: RolePermissionsScreen

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Assume these are imported from a shadcn/ui-like component library
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './components/ui/dialog';
import { Checkbox } from './components/ui/checkbox';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './components/ui/table';

// Mock tRPC client and types (simplified for line count)
const trpc = {
  role: {
    list: { useQuery: () => ({ data: [], isLoading: false, isError: false, error: null }) },
    create: { useMutation: () => ({ mutate: () => {}, isLoading: false, isError: false, error: null, isSuccess: true }) },
    update: { useMutation: () => ({ mutate: () => {}, isLoading: false, isError: false, error: null, isSuccess: true }) },
    delete: { useMutation: () => ({ mutate: () => {}, isLoading: false, isError: false, error: null, isSuccess: true }) },
  },
  permission: {
    list: { useQuery: () => ({ data: [], isLoading: false, isError: false, error: null }) },
  },
};

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

interface Permission {
  id: string;
  name: string;
}

const roleSchema = z.object({
  name: z.string().min(2, { message: 'Role name must be at least 2 characters.' }),
  permissions: z.array(z.string()).optional(),
});

type RoleFormValues = z.infer<typeof roleSchema>;

const RolePermissionsScreen: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: roles = [], isLoading: isLoadingRoles, isError: isErrorRoles, error: rolesError } = trpc.role.list.useQuery();
  const { data: allPermissions = [], isLoading: isLoadingPermissions, isError: isErrorPermissions, error: permissionsError } = trpc.permission.list.useQuery();

  const createRoleMutation = trpc.role.create.useMutation({
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['role.list'] }); setOpenAddRoleDialog(false); },
  });
  const updateRoleMutation = trpc.role.update.useMutation({
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['role.list'] }); setOpenEditRoleDialog(false); setSelectedRole(null); },
  });
  const deleteRoleMutation = trpc.role.delete.useMutation({
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['role.list'] }); setOpenConfirmDeleteDialog(false); setSelectedRole(null); },
  });

  const [openAddRoleDialog, setOpenAddRoleDialog] = useState(false);
  const [openEditRoleDialog, setOpenEditRoleDialog] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const addRoleForm = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: { name: '', permissions: [] },
  });

  const editRoleForm = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    values: selectedRole ? { name: selectedRole.name, permissions: selectedRole.permissions } : undefined,
  });

  const handleAddRole = (values: RoleFormValues) => { createRoleMutation.mutate(values); };
  const handleEditRole = (values: RoleFormValues) => { if (selectedRole) { updateRoleMutation.mutate({ id: selectedRole.id, ...values }); } };
  const handleDeleteRole = () => { if (selectedRole) { deleteRoleMutation.mutate(selectedRole.id); } };

  const LoadingState = () => (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <p>Loading roles and permissions...</p>
    </div>
  );

  const ErrorState = ({ message }: { message?: string }) => (
    <div className="flex items-center justify-center h-screen bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100">
      <p>Error: {message}</p>
    </div>
  );

  if (isLoadingRoles || isLoadingPermissions) return <LoadingState />;
  if (isErrorRoles) return <ErrorState message={rolesError?.message} />;
  if (isErrorPermissions) return <ErrorState message={permissionsError?.message} />;

  const renderPermissionCheckboxes = (form: ReturnType<typeof useForm<RoleFormValues>>) => (
    <div className="grid grid-cols-2 gap-2">
      {allPermissions.map((permission) => (
        <div key={permission.id} className="flex items-center space-x-2">
          <Checkbox
            id={`${form === addRoleForm ? 'add' : 'edit'}-perm-${permission.id}`}
            checked={form.watch('permissions')?.includes(permission.name)}
            onCheckedChange={(checked) => {
              const currentPerms = form.getValues('permissions') || [];
              form.setValue('permissions', checked ? [...currentPerms, permission.name] : currentPerms.filter((p) => p !== permission.name));
            }}
          />
          <Label htmlFor={`${form === addRoleForm ? 'add' : 'edit'}-perm-${permission.id}`}>{permission.name}</Label>
        </div>
      ))}
    </div>
  );

  const renderFormDialog = (isOpen: boolean, onOpenChange: (open: boolean) => void, title: string, form: ReturnType<typeof useForm<RoleFormValues>>, onSubmit: (values: RoleFormValues) => void, mutation: typeof createRoleMutation | typeof updateRoleMutation) => (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor={`${title.toLowerCase().replace(/ /g, '-')}-role-name`}>Role Name</Label>
            <Input id={`${title.toLowerCase().replace(/ /g, '-')}-role-name`} {...form.register('name')} />
            {form.formState.errors.name && (<p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>)}
          </div>
          <div>
            <Label>Permissions</Label>
            {renderPermissionCheckboxes(form)}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={mutation.isLoading}>{mutation.isLoading ? 'Saving...' : 'Save Role'}</Button>
            {mutation.isError && (<p className="text-red-500 text-sm mt-2">Error: {mutation.error?.message}</p>)}
            {mutation.isSuccess && (<p className="text-green-500 text-sm mt-2">Success!</p>)}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Role & Permissions Management</h1>

      <div className="mb-6 flex justify-end">
        <Button onClick={() => setOpenAddRoleDialog(true)}>Add New Role</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role Name</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="font-medium">{role.name}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((perm) => (
                    <span key={perm} className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {perm}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button onClick={() => { setSelectedRole(role); setOpenEditRoleDialog(true); }} className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800">Edit</Button>
                  <Button onClick={() => { setSelectedRole(role); setOpenConfirmDeleteDialog(true); }} className="bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-900">Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {renderFormDialog(openAddRoleDialog, setOpenAddRoleDialog, 'Add New Role', addRoleForm, handleAddRole, createRoleMutation)}
      {renderFormDialog(openEditRoleDialog, setOpenEditRoleDialog, 'Edit Role', editRoleForm, handleEditRole, updateRoleMutation)}

      <Dialog open={openConfirmDeleteDialog} onOpenChange={setOpenConfirmDeleteDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Confirm Delete</DialogTitle></DialogHeader>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Are you sure you want to delete the role "{selectedRole?.name}"? This action cannot be undone.</p>
          <DialogFooter>
            <Button
              onClick={() => setOpenConfirmDeleteDialog(false)}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteRole}
              disabled={deleteRoleMutation.isLoading}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-900"
            >
              {deleteRoleMutation.isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
          {deleteRoleMutation.isError && (<p className="text-red-500 text-sm mt-2">Error: {deleteRoleMutation.error?.message}</p>)}
          {deleteRoleMutation.isSuccess && (<p className="text-green-500 text-sm mt-2">Role deleted successfully!</p>)}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RolePermissionsScreen;
