// AUTO-GENERATED DRAFT SCREEN: ProfileVisibility
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { toast } from 'sonner';

interface ProfileVisibilitySettings {
  isVisibleToPublic: boolean;
  showEmail: boolean;
  showPhoneNumber: boolean;
}

const fetchProfileVisibility = async (): Promise<ProfileVisibilitySettings> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isVisibleToPublic: true,
        showEmail: false,
        showPhoneNumber: true,
      });
    }, 500);
  });
};

const updateProfileVisibility = async (settings: ProfileVisibilitySettings): Promise<ProfileVisibilitySettings> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(settings);
    }, 500);
  });
};

const ProfileVisibility: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<ProfileVisibilitySettings>({
    queryKey: ['profileVisibility'],
    queryFn: fetchProfileVisibility,
  });

  const mutation = useMutation<ProfileVisibilitySettings, Error, ProfileVisibilitySettings>({
    mutationFn: updateProfileVisibility,
    onSuccess: () => {
      toast.success('Profile visibility updated successfully!');
      refetch();
    },
    onError: (err) => {
      toast.error(`Failed to update profile visibility: ${err.message}`);
    },
  });

  const handleToggle = (key: keyof ProfileVisibilitySettings) => {
    if (data) {
      mutation.mutate({ ...data, [key]: !data[key] });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-32">Loading settings...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-32 text-red-500">Error: {error?.message}</div>;
  }

  if (!data) {
    return null; // Or a placeholder for no data
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Profile Visibility</CardTitle>
        <CardDescription>Manage who can see your profile information.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="public-visibility">Visible to Public</Label>
          <Switch
            id="public-visibility"
            checked={data.isVisibleToPublic}
            onCheckedChange={() => handleToggle('isVisibleToPublic')}
            disabled={mutation.isPending}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="show-email">Show Email Address</Label>
          <Switch
            id="show-email"
            checked={data.showEmail}
            onCheckedChange={() => handleToggle('showEmail')}
            disabled={mutation.isPending}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="show-phone">Show Phone Number</Label>
          <Switch
            id="show-phone"
            checked={data.showPhoneNumber}
            onCheckedChange={() => handleToggle('showPhoneNumber')}
            disabled={mutation.isPending}
          />
        </div>
        {mutation.isPending && <div className="text-sm text-gray-500">Saving changes...</div>}
      </CardContent>
    </Card>
  );
};

export default ProfileVisibility;
