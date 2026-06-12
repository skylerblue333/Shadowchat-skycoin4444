// AUTO-GENERATED DRAFT SCREEN: IntegrationsNotificationEnrichment
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui path
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form'; // For form management
import { zodResolver } from '@hookform/resolvers/zod'; // For schema validation
import * as z from 'zod'; // For schema definition

// Assume tRPC types and hooks are available
// import { trpc } from '../utils/trpc';

const formSchema = z.object({
  enableEnrichment: z.boolean().default(false),
  enrichmentKeyword: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const IntegrationsNotificationEnrichment: React.FC = () => {
  // Simulate tRPC loading and error states
  const { data, isLoading, isError, error } = { 
    data: { enableEnrichment: true, enrichmentKeyword: 'urgent' }, 
    isLoading: false, 
    isError: false, 
    error: null 
  }; // trpc.integrations.getNotificationEnrichment.useQuery();

  // Simulate tRPC mutation
  const { mutate, isLoading: isMutating } = { 
    mutate: (values: FormValues) => console.log('Saving:', values), 
    isLoading: false 
  }; // trpc.integrations.updateNotificationEnrichment.useMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data || { enableEnrichment: false, enrichmentKeyword: '' },
  });

  React.useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading settings...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-lg">Error: {error?.message || 'Failed to load settings'}</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 dark:bg-gray-900 dark:text-gray-100">
      <Card className="w-full max-w-2xl mx-auto dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Notification Enrichment</CardTitle>
          <CardDescription>Configure rules to enrich your notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-enrichment" className="text-base">Enable Enrichment</Label>
              <Switch
                id="enable-enrichment"
                checked={form.watch('enableEnrichment')}
                onCheckedChange={(checked) => form.setValue('enableEnrichment', checked)}
                aria-label="Toggle notification enrichment"
              />
            </div>

            {form.watch('enableEnrichment') && (
              <div className="space-y-2">
                <Label htmlFor="enrichment-keyword">Enrichment Keyword</Label>
                <Input
                  id="enrichment-keyword"
                  placeholder="e.g., urgent, critical"
                  {...form.register('enrichmentKeyword')}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
                {form.formState.errors.enrichmentKeyword && (
                  <p className="text-red-500 text-sm">{form.formState.errors.enrichmentKeyword.message}</p>
                )}
              </div>
            )}

            <Button type="submit" disabled={isMutating} className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
              {isMutating ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsNotificationEnrichment;
