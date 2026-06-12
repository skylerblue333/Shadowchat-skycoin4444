// AUTO-GENERATED DRAFT SCREEN: TelegramBotSettings

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useMutation, useQuery } from '@tanstack/react-query'; // Simulating tRPC hooks

const formSchema = z.object({
  apiToken: z.string().min(1, { message: 'API Token is required.' }),
  chatId: z.string().min(1, { message: 'Chat ID is required.' }),
  notificationsEnabled: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface TelegramBotSettingsProps {}

const TelegramBotSettings: React.FC<TelegramBotSettingsProps> = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // Simulate tRPC query for initial settings
  const { data: settings, isLoading: isLoadingSettings, error: settingsError } = useQuery<FormValues>({
    queryKey: ['telegramBotSettings'],
    queryFn: async () => {
      // Replace with actual tRPC call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { apiToken: 'mock_token_123', chatId: 'mock_chat_456', notificationsEnabled: true };
    },
  });

  // Simulate tRPC mutation for saving settings
  const { mutate: saveSettings, isLoading: isSavingSettings, error: saveError } = useMutation({
    mutationFn: async (data: FormValues) => {
      // Replace with actual tRPC call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving settings:', data);
      return data;
    },
    onSuccess: () => {
      alert('Settings saved successfully!');
    },
    onError: (err) => {
      alert('Failed to save settings: ' + err.message);
    },
  });

  const onSubmit = (data: FormValues) => {
    saveSettings(data);
  };

  if (isLoadingSettings) return <div className="p-4 text-center">Loading settings...</div>;
  if (settingsError) return <div className="p-4 text-red-500 text-center">Error loading settings: {settingsError.message}</div>;

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Telegram Bot Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="apiToken">API Token</Label>
          <Input
            id="apiToken"
            type="text"
            {...register('apiToken')}
            defaultValue={settings?.apiToken}
            className="mt-1 block w-full"
            aria-invalid={errors.apiToken ? "true" : "false"}
            aria-describedby="apiToken-error"
          />
          {errors.apiToken && <p id="apiToken-error" className="text-red-500 text-sm mt-1">{errors.apiToken.message}</p>}
        </div>

        <div>
          <Label htmlFor="chatId">Chat ID</Label>
          <Input
            id="chatId"
            type="text"
            {...register('chatId')}
            defaultValue={settings?.chatId}
            className="mt-1 block w-full"
            aria-invalid={errors.chatId ? "true" : "false"}
            aria-describedby="chatId-error"
          />
          {errors.chatId && <p id="chatId-error" className="text-red-500 text-sm mt-1">{errors.chatId.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="notificationsEnabled"
            {...register('notificationsEnabled')}
            defaultChecked={settings?.notificationsEnabled}
            aria-checked={settings?.notificationsEnabled}
          />
          <Label htmlFor="notificationsEnabled">Enable Notifications</Label>
        </div>

        <Button type="submit" disabled={isSavingSettings}>
          {isSavingSettings ? 'Saving...' : 'Save Settings'}
        </Button>
        {saveError && <p className="text-red-500 text-sm mt-2">Error saving: {saveError.message}</p>}
      </form>
    </div>
  );
};

export default TelegramBotSettings;
