// AUTO-GENERATED DRAFT SCREEN: TelegramNotifications
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '../utils/trpc';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const formSchema = z.object({
  apiKey: z.string().min(1, { message: 'API Key is required.' }),
  chatId: z.string().min(1, { message: 'Chat ID is required.' }),
  enabled: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const TelegramNotifications: React.FC = () => {
  const { data, isLoading, error } = trpc.telegram.getSettings.useQuery();
  const updateSettingsMutation = trpc.telegram.updateSettings.useMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: '',
      chatId: '',
      enabled: false,
    },
  });

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const onSubmit = async (values: FormValues) => {
    try {
      await updateSettingsMutation.mutateAsync(values);
      alert('Settings updated successfully!');
    } catch (err) {
      alert('Failed to update settings.');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900 dark:text-white">
        <p>Loading settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900 dark:text-white">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-md dark:bg-gray-900 dark:text-white">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Telegram Notifications Integration</CardTitle>
          <CardDescription className="dark:text-gray-400">Configure your Telegram notification settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="apiKey" className="dark:text-white">API Key</Label>
              <Input
                id="apiKey"
                {...form.register("apiKey")}
                className={`dark:bg-gray-700 dark:text-white dark:border-gray-600 ${form.formState.errors.apiKey ? "border-red-500" : ""}`}
              />
              {form.formState.errors.apiKey && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.apiKey.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="chatId" className="dark:text-white">Chat ID</Label>
              <Input
                id="chatId"
                {...form.register("chatId")}
                className={`dark:bg-gray-700 dark:text-white dark:border-gray-600 ${form.formState.errors.chatId ? "border-red-500" : ""}`}
              />
              {form.formState.errors.chatId && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.chatId.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enabled" className="dark:text-white">Enable Notifications</Label>
              <Switch
                id="enabled"
                checked={form.watch("enabled")}
                onCheckedChange={(checked) => form.setValue("enabled", checked)}
                className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200 dark:data-[state=checked]:bg-blue-500 dark:data-[state=unchecked]:bg-gray-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-theme" className="dark:text-white">Dark Theme</Label>
              <Switch
                id="dark-theme"
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
                className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200 dark:data-[state=checked]:bg-blue-500 dark:data-[state=unchecked]:bg-gray-600"
              />
            </div>
            <Button type="submit" disabled={updateSettingsMutation.isLoading} className="dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
              {updateSettingsMutation.isLoading ? 'Saving...' : 'Save Settings'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TelegramNotifications;