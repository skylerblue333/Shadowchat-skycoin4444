// AUTO-GENERATED DRAFT SCREEN: CryptoHardwareMonitor

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'; // shadcn/ui
import { Skeleton } from './components/ui/skeleton'; // shadcn/ui
import { Switch } from './components/ui/switch'; // shadcn/ui
import { Label } from './components/ui/label'; // shadcn/ui

interface HardwareStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
  temperature: number;
  fanSpeed: number;
  lastUpdated: string;
}

const CryptoHardwareMonitor: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.hardware.getStatus.useQuery();
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (isLoading) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Crypto Hardware Monitor</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="dark:bg-gray-800 dark:text-white">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full bg-gray-300 dark:bg-gray-700" />
                <Skeleton className="h-4 w-full bg-gray-300 dark:bg-gray-700" />
                <Skeleton className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen text-red-500">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Crypto Hardware Monitor</h1>
        <p>Error loading hardware status: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-white">Crypto Hardware Monitor</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={setDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode" className="dark:text-white">Dark Mode</Label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((device: HardwareStatus) => (
          <Card key={device.id} className="dark:bg-gray-800 dark:text-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{device.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Status: <span
                  className={`font-medium ${
                    device.status === 'online' ? 'text-green-500' :
                    device.status === 'warning' ? 'text-yellow-500' :
                    'text-red-500'
                  }`}
                >
                  {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                </span>
              </p>
              <p className="text-sm">Temperature: {device.temperature}°C</p>
              <p className="text-sm">Fan Speed: {device.fanSpeed} RPM</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last Updated: {new Date(device.lastUpdated).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CryptoHardwareMonitor;
