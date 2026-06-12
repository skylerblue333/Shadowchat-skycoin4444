// AUTO-GENERATED DRAFT SCREEN: OSAnalyticsDashboard
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Skeleton } from './components/ui/skeleton';
import { ThemeProvider, useTheme } from './components/theme-provider'; // Assuming shadcn theme provider
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { Button } from './components/ui/button';

interface OSData {
  osName: string;
  version: string;
  uptime: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

const OSAnalyticsDashboard: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { data, isLoading, isError, error } = useQuery<OSData>(
    ['osAnalytics'],
    () => trpc.os.getAnalytics.query(),
    { staleTime: 5000 } // Data considered fresh for 5 seconds
  );

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="p-4 text-red-500 dark:text-red-400">
        <h2 className="text-lg font-semibold">Error loading OS Analytics:</h2>
        <p>{error?.message || 'An unknown error occurred.'}</p>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">OS Analytics Dashboard</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Operating System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.osName}</div>
              <p className="text-xs text-muted-foreground">Version: {data?.version}</p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor((data?.uptime || 0) / 3600)}h {Math.floor(((data?.uptime || 0) % 3600) / 60)}m</div>
              <p className="text-xs text-muted-foreground">Total system uptime</p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.cpuUsage.toFixed(2)}%</div>
              <p className="text-xs text-muted-foreground">Current CPU utilization</p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.memoryUsage.toFixed(2)}%</div>
              <p className="text-xs text-muted-foreground">Total memory consumed</p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.diskUsage.toFixed(2)}%</div>
              <p className="text-xs text-muted-foreground">Storage space used</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default OSAnalyticsDashboard;
