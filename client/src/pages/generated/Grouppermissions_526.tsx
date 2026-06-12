// AUTO-GENERATED DRAFT SCREEN: GroupPermissions
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { Switch } from '@/components/ui/switch'; // shadcn/ui Switch component
import { Label } from '@/components/ui/label'; // shadcn/ui Label component
import { Button } from '@/components/ui/button'; // shadcn/ui Button component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui Card components

// Placeholder for tRPC client - in a real app, this would be imported from a tRPC client setup file
const trpc = {
  group: {
    getPermissions: (groupId: string) => new Promise<{ id: string; name: string; permissions: string[] }>((resolve) =>
      setTimeout(() =>
        resolve({
          id: groupId,
          name: `Group ${groupId}`,
          permissions: ['read', 'write', 'delete'],
        }),
      1000)
    ),
    updatePermissions: (groupId: string, permissions: string[]) => new Promise<void>((resolve) =>
      setTimeout(() => resolve(), 500)
    ),
  },
};

interface GroupPermissionsProps {
  groupId: string;
}

const GroupPermissions: React.FC<GroupPermissionsProps> = ({ groupId }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading, isError, error: queryError } = useQuery({
    queryKey: ['groupPermissions', groupId],
    queryFn: () => trpc.group.getPermissions(groupId),
  });

  useEffect(() => {
    if (data) {
      setPermissions(data.permissions);
    }
  }, [data]);

  useEffect(() => {
    if (queryError) {
      setError(queryError.message);
    }
  }, [queryError]);

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setPermissions((prev) =>
      checked ? [...prev, permission] : prev.filter((p) => p !== permission)
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await trpc.group.updatePermissions(groupId, permissions);
      alert('Permissions updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update permissions.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`min-h-screen p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className={`w-full max-w-md mx-auto ${isDarkTheme ? 'dark:bg-gray-800 dark:text-white' : ''}`}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Social: Group Permissions</CardTitle>
          <CardDescription>Manage permissions for group {groupId}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="dark-mode" className="text-sm font-medium">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark mode"
            />
          </div>

          {isLoading && <p className="text-center py-4">Loading permissions...</p>}
          {isError && <p className="text-center py-4 text-red-500">Error: {error}</p>}
          {error && !isError && <p className="text-center py-4 text-red-500">Error: {error}</p>}

          {!isLoading && !isError && data && (
            <div className="space-y-4">
              <p className="text-lg font-semibold">Permissions for {data.name}:</p>
              <div className="grid gap-2">
                {['read', 'write', 'delete', 'admin'].map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Switch
                      id={permission}
                      checked={permissions.includes(permission)}
                      onCheckedChange={(checked) => handlePermissionChange(permission, checked)}
                      aria-label={`Toggle ${permission} permission`}
                    />
                    <Label htmlFor={permission}>{permission.charAt(0).toUpperCase() + permission.slice(1)}</Label>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full mt-4"
              >
                {isSaving ? 'Saving...' : 'Save Permissions'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupPermissions;
