// AUTO-GENERATED DRAFT SCREEN: UserStats
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { trpc } from './trpc';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from './components/ui/button';

const UserStats: React.FC = () => {
  const { data, isLoading, error } = trpc.user.getStats.useQuery();
  const { theme, setTheme } = useTheme();

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <p>Loading user statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            {/* Icon placeholder */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalUsers}</div>
            <p className="text-xs text-muted-foreground">{data?.totalUsersChange}% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            {/* Icon placeholder */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.activeUsers}</div>
            <p className="text-xs text-muted-foreground">{data?.activeUsersChange}% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
            {/* Icon placeholder */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.newRegistrations}</div>
            <p className="text-xs text-muted-foreground">{data?.newRegistrationsChange}% from last month</p>
          </CardContent>
        </Card>

        {/* More cards can be added here for other stats */}
      </div>
    </div>
  );
};

export default UserStats;