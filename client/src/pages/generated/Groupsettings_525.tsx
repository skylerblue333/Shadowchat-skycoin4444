// AUTO-GENERATED DRAFT SCREEN: GroupSettings
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '@/lib/trpc'; // Simulated tRPC client
import { Loader2, AlertCircle } from 'lucide-react';

// --- Schema Definition ---
const groupSettingsSchema = z.object({
  groupName: z.string().min(3, { message: 'Group name must be at least 3 characters.' }),
  isPublic: z.boolean(),
  allowInvites: z.boolean(),
  maxMembers: z.number().min(2, { message: 'Minimum 2 members.' }).max(1000, { message: 'Maximum 1000 members.' }),
});

type GroupSettingsFormValues = z.infer<typeof groupSettingsSchema>;

// --- Simulated tRPC Hooks (for demonstration) ---
// In a real application, these would connect to a tRPC backend.
const simulatedTrpc = {
  group: {
    getSettings: (groupId: string) => useQuery<GroupSettingsFormValues>({ queryKey: ['groupSettings', groupId], queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (groupId === 'error-group') throw new Error('Failed to fetch group settings.');
      return { groupName: 'My Awesome Group', isPublic: true, allowInvites: true, maxMembers: 50 };
    }}),
    updateSettings: () => useMutation<GroupSettingsFormValues, Error, { groupId: string; data: GroupSettingsFormValues }>({ mutationFn: async ({ groupId, data }) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (groupId === 'error-update') throw new Error('Failed to update group settings.');
      console.log('Updating group settings:', data);
      return data;
    }}),
  },
};

// --- GroupSettings Component ---
const GroupSettings: React.FC = () => {
  const groupId = 'example-group'; // Replace with actual group ID from context/props

  const { data: settings, isLoading, isError, error } = simulatedTrpc.group.getSettings(groupId);
  const { mutate: updateSettings, isLoading: isUpdating, isError: isUpdateError, error: updateError } = simulatedTrpc.group.updateSettings();

  const form = useForm<GroupSettingsFormValues>({
    resolver: zodResolver(groupSettingsSchema),
    defaultValues: settings, // Populate form with fetched data
  });

  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings, form]);

  const onSubmit = (data: GroupSettingsFormValues) => {
    updateSettings({ groupId, data });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading settings...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-destructive">
        <AlertCircle className="h-8 w-8" />
        <span className="mt-2">Error: {error?.message || 'Failed to load settings.'}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8 dark">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Group Settings</h1>
        <p className="text-muted-foreground">Manage your group's privacy, membership, and general information.</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Group Name */}
          <div>
            <Label htmlFor="groupName">Group Name</Label>
            <Input
              id="groupName"
              {...form.register('groupName')}
              className={form.formState.errors.groupName ? 'border-destructive' : ''}
              aria-invalid={form.formState.errors.groupName ? 'true' : 'false'}
            />
            {form.formState.errors.groupName && (
              <p className="text-destructive text-sm mt-1" role="alert">{form.formState.errors.groupName.message}</p>
            )}
          </div>

          {/* Public/Private Switch */}
          <div className="flex items-center justify-between">
            <Label htmlFor="isPublic">Public Group</Label>
            <Switch
              id="isPublic"
              checked={form.watch('isPublic')}
              onCheckedChange={(checked) => form.setValue('isPublic', checked)}
              aria-checked={form.watch('isPublic') ? 'true' : 'false'}
            />
          </div>

          {/* Allow Invites Switch */}
          <div className="flex items-center justify-between">
            <Label htmlFor="allowInvites">Allow Member Invites</Label>
            <Switch
              id="allowInvites"
              checked={form.watch('allowInvites')}
              onCheckedChange={(checked) => form.setValue('allowInvites', checked)}
              aria-checked={form.watch('allowInvites') ? 'true' : 'false'}
            />
          </div>

          {/* Max Members Input */}
          <div>
            <Label htmlFor="maxMembers">Maximum Members</Label>
            <Input
              id="maxMembers"
              type="number"
              {...form.register('maxMembers', { valueAsNumber: true })}
              className={form.formState.errors.maxMembers ? 'border-destructive' : ''}
              aria-invalid={form.formState.errors.maxMembers ? 'true' : 'false'}
            />
            {form.formState.errors.maxMembers && (
              <p className="text-destructive text-sm mt-1" role="alert">{form.formState.errors.maxMembers.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isUpdating} className="w-full">
            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>

          {isUpdateError && (
            <p className="text-destructive text-sm mt-2 text-center" role="alert">Error: {updateError?.message || 'Failed to save changes.'}</p>
          )}
        </form>
      </div>
    </div>
  );
};

// --- Root Component for QueryClientProvider ---
const QueryClientWrapper: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GroupSettings />
    </QueryClientProvider>
  );
};

export default QueryClientWrapper;
