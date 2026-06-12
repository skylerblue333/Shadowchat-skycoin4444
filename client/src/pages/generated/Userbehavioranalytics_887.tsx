// AUTO-GENERATED DRAFT SCREEN: UserBehaviorAnalytics
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Activity, ArrowUpRight, Clock, Sun, Moon } from 'lucide-react';
import { trpc } from '../utils/trpc';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

const UserBehaviorAnalytics: React.FC = () => {
  const { data, isLoading, error } = trpc.userBehavior.getAnalytics.useQuery();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center" role="status" aria-live="polite">
        <p className="text-lg">Loading user behavior data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500" role="alert">
        <p className="text-lg">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? (
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          ) : (
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-6" tabIndex={0}>User Behavior Analytics</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card aria-labelledby="total-users-title">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle id="total-users-title" className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card aria-labelledby="sessions-title">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle id="sessions-title" className="text-sm font-medium">Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.sessions}</div>
            <p className="text-xs text-muted-foreground">+15.3% from last month</p>
          </CardContent>
        </Card>
        <Card aria-labelledby="bounce-rate-title">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle id="bounce-rate-title" className="text-sm font-medium">Bounce Rate</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.bounceRate}</div>
            <p className="text-xs text-muted-foreground">-5.2% from last month</p>
          </CardContent>
        </Card>
        <Card aria-labelledby="avg-session-duration-title">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle id="avg-session-duration-title" className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.avgSessionDuration}</div>
            <p className="text-xs text-muted-foreground">+1.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card aria-labelledby="user-activity-title">
          <CardHeader>
            <CardTitle id="user-activity-title">User Activity Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            {data?.userActivityOverTime.map((item) => (
              <p key={item.date}>{item.date}: {item.users} users</p>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserBehaviorAnalytics;
