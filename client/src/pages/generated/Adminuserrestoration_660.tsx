// AUTO-GENERATED DRAFT SCREEN: AdminUserRestoration
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Button } from './components/ui/button'; // shadcn/ui button
import { Input } from './components/ui/input'; // shadcn/ui input
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card'; // shadcn/ui card
import { Label } from './components/ui/label'; // shadcn/ui label
import { Switch } from './components/ui/switch'; // shadcn/ui switch
import { useTheme } from './context/theme-provider'; // Assuming a theme provider for dark mode

interface User {
  id: string;
  email: string;
  isDeleted: boolean;
}

const AdminUserRestoration: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Placeholder for theme toggle
  const { theme, setTheme } = useTheme(); // Assuming useTheme hook from context

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  const { data: user, isLoading, isError, error, refetch } = trpc.admin.getUserForRestoration.useQuery(
    { userId },
    { enabled: !!userId, retry: false }
  );

  const restoreUserMutation = trpc.admin.restoreUser.useMutation({
    onSuccess: () => {
      alert('User restored successfully!');
      setUserId('');
      refetch(); // Re-fetch user data after successful restoration
    },
    onError: (mutationError) => {
      alert(`Error restoring user: ${mutationError.message}`);
    },
  });

  const handleRestore = () => {
    if (user?.id) {
      restoreUserMutation.mutate({ userId: user.id });
    }
  };

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="max-w-md mx-auto shadow-lg rounded-lg p-6 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center dark:text-white">Admin: User Restoration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode-toggle" className="text-lg dark:text-gray-300">Dark Mode</Label>
            <Switch
              id="dark-mode-toggle"
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-id" className="dark:text-gray-300">User ID</Label>
            <Input
              id="user-id"
              type="text"
              placeholder="Enter user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
              aria-label="User ID input"
            />
          </div>

          <Button
            onClick={() => refetch()} // Trigger search on button click
            disabled={!userId || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {isLoading ? 'Searching...' : 'Search User'}
          </Button>

          {isError && (
            <p className="text-red-500 text-center dark:text-red-400" role="alert">
              Error: {error?.message || 'Failed to fetch user.'}
            </p>
          )}

          {user && (
            <div className="border-t pt-4 mt-4 border-gray-200 dark:border-gray-700 space-y-4">
              <p className="dark:text-gray-300"><strong>User Email:</strong> {user.email}</p>
              <p className="dark:text-gray-300"><strong>Status:</strong> {user.isDeleted ? 'Deleted' : 'Active'}</p>
              {user.isDeleted && (
                <Button
                  onClick={handleRestore}
                  disabled={restoreUserMutation.isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded dark:bg-green-700 dark:hover:bg-green-800"
                >
                  {restoreUserMutation.isLoading ? 'Restoring...' : 'Restore User'}
                </Button>
              )}
              {restoreUserMutation.isError && (
                <p className="text-red-500 text-center dark:text-red-400" role="alert">
                  Error: {restoreUserMutation.error?.message || 'Failed to restore user.'}
                </p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="text-sm text-gray-500 dark:text-gray-400 text-center">
          <p>Admin User Restoration Panel - Powered by React 19, Tailwind 4, shadcn/ui, tRPC</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminUserRestoration;
