// AUTO-GENERATED DRAFT SCREEN: FeatureFlagAdmin

import React, { useState } from 'react';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { z } from 'zod';

// shadcn/ui components
import { Button } from './components/ui/button';
import { Switch } from './components/ui/switch';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

// Define the feature flag schema
const featureFlagSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  enabled: z.boolean(),
});

type FeatureFlag = z.infer<typeof featureFlagSchema>;

// Mock tRPC API for demonstration purposes
const appRouter = {
  featureFlags: {
    list: async (): Promise<FeatureFlag[]> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        { id: '1', name: 'NewDashboard', description: 'Enables the new dashboard layout', enabled: true },
        { id: '2', name: 'BetaFeatures', description: 'Access to experimental features', enabled: false },
        { id: '3', name: 'DarkModeToggle', description: 'Allows users to switch to dark mode', enabled: true },
      ];
    },
    update: async (input: { id: string; enabled: boolean }): Promise<FeatureFlag> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const existingFlags = await appRouter.featureFlags.list();
      const flagToUpdate = existingFlags.find(flag => flag.id === input.id);
      if (!flagToUpdate) throw new Error('Feature flag not found');
      return { ...flagToUpdate, enabled: input.enabled };
    },
  },
};

// tRPC client setup
const trpc = createTRPCClient<typeof appRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
});

const queryClient = new QueryClient();

const FeatureFlagAdmin: React.FC = () => {
  
  const [searchQuery, setSearchQuery] = useState('');

  const { data: featureFlags, isLoading, isError, error } = useQuery({
    queryKey: ['featureFlags'],
    queryFn: () => trpc.featureFlags.list(),
  });

  const updateFlagMutation = useMutation({
    mutationFn: trpc.featureFlags.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featureFlags'] });
      toast.success('Feature flag updated successfully.');
    },
    onError: (err) => {
      toast.error(`Failed to update feature flag: ${err.message}`);
    },
  });

  const handleToggle = (flag: FeatureFlag) => {
    updateFlagMutation.mutate({ id: flag.id, enabled: !flag.enabled });
  };

  const filteredFlags = featureFlags?.filter(flag =>
    flag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flag.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading feature flags...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error?.message}</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Feature Flags Management</CardTitle>
            <CardDescription>Manage application feature flags.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search feature flags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Enabled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFlags?.map((flag) => (
                  <TableRow key={flag.id}>
                    <TableCell className="font-medium">{flag.name}</TableCell>
                    <TableCell>{flag.description}</TableCell>
                    <TableCell className="text-right">
                      <Switch
                        checked={flag.enabled}
                        onCheckedChange={() => handleToggle(flag)}
                        aria-label={`Toggle ${flag.name}`}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
};

export default FeatureFlagAdmin;
