// AUTO-GENERATED DRAFT SCREEN: ConfigurationManager

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/router'; // Assuming a tRPC server setup
import { Switch } from '../components/ui/switch'; // shadcn/ui Switch component
import { Label } from '../components/ui/label'; // shadcn/ui Label component
import { Button } from '../components/ui/button'; // shadcn/ui Button component
import { Input } from '../components/ui/input'; // shadcn/ui Input component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'; // shadcn/ui Card components
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'; // shadcn/ui Alert components
import { Terminal } from 'lucide-react'; // Lucide icon for alerts

// Initialize tRPC client (this would typically be in a separate file)
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:2025/trpc', // Replace with your tRPC API endpoint
    }),
  ],
});

// Mock tRPC server types for demonstration if a real server isn't set up
// In a real application, AppRouter would be imported from your tRPC server.
interface Configuration {
  id: string;
  name: string;
  value: string;
  enabled: boolean;
}

interface AppRouter {
  config: {
    list: () => Configuration[];
    get: (id: string) => Configuration | null;
    update: (input: { id: string; value?: string; enabled?: boolean }) => Configuration;
  };
}

const queryClient = new QueryClient();

const ConfigurationManager: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch configurations
  const { data: configurations, isLoading, isError, error } = useQuery<Configuration[]>({
    queryKey: ['configurations'],
    queryFn: () => trpc.config.list.query(),
  });

  // Mutation for updating configuration
  const updateConfigMutation = useMutation({
    mutationFn: (updatedConfig: { id: string; value?: string; enabled?: boolean }) =>
      trpc.config.update.mutate(updatedConfig),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configurations'] });
    },
  });

  const handleToggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  };

  const handleConfigValueChange = (id: string, value: string) => {
    updateConfigMutation.mutate({ id, value });
  };

  const handleConfigToggle = (id: string, enabled: boolean) => {
    updateConfigMutation.mutate({ id, enabled });
  };

  const filteredConfigurations = configurations?.filter((config) =>
    config.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading configurations...</div>;
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="m-4">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load configurations: {error?.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <h1 className="text-4xl font-bold mb-8 text-center">Configuration Manager</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkTheme}
              onCheckedChange={handleToggleTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
          <Input
            type="text"
            placeholder="Search configurations..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search configurations"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConfigurations?.map((config) => (
            <Card key={config.id} className="shadow-lg">
              <CardHeader>
                <CardTitle>{config.name}</CardTitle>
                <CardDescription>ID: {config.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor={`value-${config.id}`} className="block text-sm font-medium mb-1">Value</Label>
                  <Input
                    id={`value-${config.id}`}
                    type="text"
                    value={config.value}
                    onChange={(e) => handleConfigValueChange(config.id, e.target.value)}
                    className="w-full"
                    aria-label={`Configuration value for ${config.name}`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor={`enabled-${config.id}`}>Enabled</Label>
                  <Switch
                    id={`enabled-${config.id}`}
                    checked={config.enabled}
                    onCheckedChange={(checked) => handleConfigToggle(config.id, checked)}
                    aria-label={`Toggle ${config.name} enabled status`}
                  />
                </div>
                {updateConfigMutation.isPending && updateConfigMutation.variables?.id === config.id && (
                  <p className="text-sm text-blue-500">Saving...</p>
                )}
                {updateConfigMutation.isError && updateConfigMutation.variables?.id === config.id && (
                  <Alert variant="destructive">
                    <AlertTitle>Update Error</AlertTitle>
                    <AlertDescription>Failed to update: {updateConfigMutation.error?.message}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredConfigurations?.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No configurations found matching your search.</p>
        )}
      </div>
    </QueryClientProvider>
  );
};

export default ConfigurationManager;
