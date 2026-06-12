// AUTO-GENERATED DRAFT SCREEN: AdminUserAuditScreen
import React, { useState, useEffect } from 'react';
import { useQuery } from '../utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // shadcn/ui Card component
import { Button } from './ui/button'; // shadcn/ui Button component
import { Switch } from './ui/switch'; // shadcn/ui Switch component
import { Label } from './ui/label';

interface UserAuditLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details: Record<string, any>;
}

interface AdminUserAuditScreenProps {
  // Props can be added here if needed
}

const AdminUserAuditScreen: React.FC<AdminUserAuditScreenProps> = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery(['admin.getUserAuditLogs', { page, limit: 10 }]);

  useEffect(() => {
    // This would typically interact with a global theme context
    // For demonstration, we'll just toggle a class on the body or a parent element
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg">Loading user audit logs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100">
        <p className="text-lg" role="alert">Error loading audit logs: {error.message}</p>
        <Button onClick={() => setPage(1)} className="ml-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Admin: User Audit</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-toggle"
            checked={isDarkTheme}
            onCheckedChange={toggleTheme}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.logs.map((log: UserAuditLog) => (
          <Card key={log.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">Action: {log.action}</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              <p><strong>User ID:</strong> {log.userId}</p>
              <p><strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}</p>
              <details className="mt-2">
                <summary className="cursor-pointer font-medium">Details</summary>
                <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md text-sm overflow-auto mt-1">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              </details>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <Button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1 || isLoading}
          aria-label="Previous page"
        >
          Previous
        </Button>
        <span className="text-gray-700 dark:text-gray-300 self-center">Page {page}</span>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!data?.hasMore || isLoading}
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AdminUserAuditScreen;
