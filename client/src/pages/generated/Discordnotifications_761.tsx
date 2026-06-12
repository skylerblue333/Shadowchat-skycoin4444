// AUTO-GENERATED DRAFT SCREEN: DiscordNotifications
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup

const formSchema = z.object({
  webhookUrl: z.string().url({ message: 'Invalid URL format' }).min(1, { message: 'Webhook URL is required' }),
  sendNotifications: z.boolean().default(false),
  mentionRole: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const DiscordNotifications: React.FC = () => {
  const { toast } = useToast();
  const { data, isLoading, error } = trpc.discord.getSettings.useQuery();
  const updateSettings = trpc.discord.updateSettings.useMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      webhookUrl: '',
      sendNotifications: false,
      mentionRole: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      await updateSettings.mutateAsync(values);
      toast({
        title: 'Success',
        description: 'Discord notification settings updated.',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update settings. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900">
        <p className="text-lg text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Discord Notifications</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="space-y-2">
          <Label htmlFor="webhookUrl" className="text-sm font-medium">Discord Webhook URL</Label>
          <Input
            id="webhookUrl"
            type="url"
            placeholder="https://discord.com/api/webhooks/..."
            {...form.register('webhookUrl')}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
          {form.formState.errors.webhookUrl && (
            <p className="text-red-500 text-sm">{form.formState.errors.webhookUrl.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="sendNotifications" className="text-sm font-medium">Send Notifications</Label>
          <Switch
            id="sendNotifications"
            checked={form.watch('sendNotifications')}
            onCheckedChange={(checked) => form.setValue('sendNotifications', checked)}
            className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300 dark:data-[state=checked]:bg-blue-500 dark:data-[state=unchecked]:bg-gray-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mentionRole" className="text-sm font-medium">Mention Role (Optional)</Label>
          <Input
            id="mentionRole"
            type="text"
            placeholder="@everyone or @role-name"
            {...form.register('mentionRole')}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        <Button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          Save Settings
        </Button>
      </form>
    </div>
  );
};

export default DiscordNotifications;
