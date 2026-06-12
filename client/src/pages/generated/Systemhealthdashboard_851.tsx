// AUTO-GENERATED DRAFT SCREEN: SystemHealthDashboard
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC hooks integrate with react-query
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // shadcn/ui card component
import { Switch } from './ui/switch'; // shadcn/ui switch component for dark mode
import { Label } from './ui/label'; // shadcn/ui label component
import { Progress } from './ui/progress'; // shadcn/ui progress component
import { Alert, AlertDescription, AlertTitle } from './ui/alert'; // shadcn/ui alert component
import { Terminal } from 'lucide-react'; // Lucide icon for alerts

// Assuming tRPC client setup and types are available globally or imported
// import { trpc } from '../utils/trpc';

interface SystemHealthData {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  serviceStatus: { name: string; status: 'healthy' | 'unhealthy' }[];
}

interface SystemHealthDashboardProps {
  // No specific props required for this component based on the prompt
}

const fetchSystemHealth = async (): Promise<SystemHealthData> => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        cpuUsage: Math.floor(Math.random() * 100),
        memoryUsage: Math.floor(Math.random() * 100),
        diskUsage: Math.floor(Math.random() * 100),
        networkLatency: Math.floor(Math.random() * 200),
        serviceStatus: [
          { name: 'Auth Service', status: Math.random() > 0.1 ? 'healthy' : 'unhealthy' },
          { name: 'Data Service', status: Math.random() > 0.05 ? 'healthy' : 'unhealthy' },
          { name: 'Notification Service', status: Math.random() > 0.02 ? 'healthy' : 'unhealthy' },
        ],
      });
    }, 1500);
  });
};

const SystemHealthDashboard: React.FC<SystemHealthDashboardProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Simulate tRPC hook for fetching data
  // In a real application, this would be: const { data, isLoading, error } = trpc.system.getHealth.useQuery();
  const { data, isLoading, error } = useQuery<SystemHealthData, Error>({
    queryKey: ['systemHealth'],
    queryFn: fetchSystemHealth,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p>Loading system health data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load system health data: {error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 lg:p-12 transition-colors duration-200">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">System Health Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-switch"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-switch">Dark Mode</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
              <line x1="12" x2="12" y1="17" y2="21"></line>
              <line x1="8" x2="8" y1="17" y2="21"></line>
              <line x1="16" x2="16" y1="17" y2="21"></line>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.cpuUsage}%</div>
            <Progress value={data?.cpuUsage} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M5 22V8H2L12 2L22 8H19V22H5Z" />
              <path d="M12 12V18" />
              <path d="M9 15H15" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.memoryUsage}%</div>
            <Progress value={data?.memoryUsage} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
              <path d="M12 6v6l4 2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.diskUsage}%</div>
            <Progress value={data?.diskUsage} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Latency</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M2 12s3-4 7-4 7 4 7 4 3 4 7 4" />
              <path d="M2 12s3 4 7 4 7-4 7-4 3-4 7-4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.networkLatency} ms</div>
            <p className="text-xs text-muted-foreground">Real-time average</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>Service Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.serviceStatus.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-3 border rounded-md">
                <span className="font-medium">{service.name}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    service.status === 'healthy'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <footer className="text-center text-sm text-muted-foreground mt-8">
        <p>&copy; {new Date().getFullYear()} SKYCOIN4444. All rights reserved.</p>
        <p>Data updated every 5 seconds.</p>
      </footer>
    </div>
  );
};

export default SystemHealthDashboard;
