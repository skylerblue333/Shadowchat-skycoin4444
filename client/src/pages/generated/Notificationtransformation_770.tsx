// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import * as __ns_react_hook_form_1 from 'react-hook-form';
const { useForm } = (__ns_react_hook_form_1 as any);
import { z } from 'zod';
import * as __ns__hookform_resolvers_zod_2 from '@hookform/resolvers/zod';
const { zodResolver } = (__ns__hookform_resolvers_zod_2 as any);

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: NotificationTransformation

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


// Define schema for form validation
const formSchema = z.object({
  integrationName: z.string().min(2, { message: 'Integration name must be at least 2 characters.' }),
  notificationType: z.string().min(1, { message: 'Please select a notification type.' }),
  transformationScript: z.string().optional(),
  isActive: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

// Mock API functions (replace with actual tRPC hooks)
const fetchIntegrationSettings = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        integrationName: 'Default Integration',
        notificationType: 'email',
        transformationScript: 'function transform(data) { return data; }',
        isActive: true,
      });
    }, 1000);
  });
};

const saveIntegrationSettings = async (data: FormData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Saving settings:', data);
      resolve({ success: true, data });
    }, 1000);
  });
};

const NotificationTransformation: React.FC = () => {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { data, isLoading, error } = useStubQuery({ queryKey: ['integrationSettings'], queryFn: fetchIntegrationSettings });
  const mutation = useStubMutation({ mutationFn: saveIntegrationSettings });

  useEffect(() => {
    if (data) {
      setValue('integrationName', (data as any).integrationName);
      setValue('notificationType', (data as any).notificationType);
      setValue('transformationScript', (data as any).transformationScript);
      setValue('isActive', (data as any).isActive);
    }
  }, [data, setValue]);

  const onSubmit = (formData: FormData) => {
    mutation.mutate(formData);
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">Loading settings...</div>;
  if (error) return <div className="flex justify-center items-center h-screen dark:bg-gray-900 text-red-500">Error loading settings: {(error as Error).message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-lg dark:bg-gray-800 dark:text-gray-100">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">Notification Transformation</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Configure how notifications are transformed before delivery.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="integrationName" className="text-gray-700 dark:text-gray-300">Integration Name</Label>
              <Input
                id="integrationName"
                {...register('integrationName')}
                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              />
              {errors.integrationName && <p className="text-red-500 text-sm">{errors.integrationName.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notificationType" className="text-gray-700 dark:text-gray-300">Notification Type</Label>
              <Select onValueChange={(value) => setValue('notificationType', value)} defaultValue={(data as any)?.notificationType}>
                <SelectTrigger className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                  <SelectValue placeholder="Select a notification type" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="push">Push Notification</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                </SelectContent>
              </Select>
              {errors.notificationType && <p className="text-red-500 text-sm">{errors.notificationType.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="transformationScript" className="text-gray-700 dark:text-gray-300">Transformation Script (JavaScript)</Label>
              <textarea
                id="transformationScript"
                {...register('transformationScript')}
                rows={8}
                className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                placeholder="function transform(data) { /* your logic here */ return data; }"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={(data as any)?.isActive}
                onCheckedChange={(checked) => setValue('isActive', checked)}
                className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300"
              />
              <Label htmlFor="isActive" className="text-gray-700 dark:text-gray-300">Activate Transformation</Label>
            </div>

            <CardFooter className="flex justify-end p-0 pt-6">
              <Button type="submit" disabled={mutation.isPending} className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                {mutation.isPending ? 'Saving...' : 'Save Settings'}
              </Button>
            </CardFooter>
            {mutation.isSuccess && <p className="text-green-500 text-sm">Settings saved successfully!</p>}
            {mutation.isError && <p className="text-red-500 text-sm">Error saving settings: {mutation.error.message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationTransformation;
