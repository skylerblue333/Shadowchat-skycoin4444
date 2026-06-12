// AUTO-GENERATED DRAFT SCREEN: CustomWidgets
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Skeleton } from './ui/skeleton';

interface WidgetData {
  id: string;
  name: string;
  value: number;
}

const CustomWidgets: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { data, isLoading, isError, error, refetch } = trpc.getWidgets.useQuery<WidgetData[]>(
    undefined,
    { 
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-4 w-full mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500" role="alert">
        <p>Error loading widgets: {error.message}</p>
        <Button onClick={() => refetch()} className="mt-2">Retry</Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Custom Widgets</h2>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-toggle"
            checked={isDarkMode}
            onCheckedChange={toggleDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((widget) => (
          <Card key={widget.id} className="w-full">
            <CardHeader>
              <CardTitle>{widget.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{widget.value}</p>
              <p className="text-sm text-muted-foreground">Last updated: Just now</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomWidgets;