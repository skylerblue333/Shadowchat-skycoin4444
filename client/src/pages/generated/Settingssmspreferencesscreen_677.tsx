// AUTO-GENERATED DRAFT SCREEN: SettingsSmsPreferencesScreen
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup

const smsPreferencesSchema = z.object({
  receiveSmsNotifications: z.boolean().default(true),
  smsNumber: z.string().optional(),
  marketingSms: z.boolean().default(false),
});

type SmsPreferencesFormValues = z.infer<typeof smsPreferencesSchema>;

const SettingsSmsPreferencesScreen: React.FC = () => {
  const { toast } = useToast();
  const { data, isLoading, error } = trpc.user.getSmsPreferences.useQuery(); // Example tRPC hook
  const updateSmsPreferences = trpc.user.updateSmsPreferences.useMutation(); // Example tRPC mutation

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<SmsPreferencesFormValues>({
    resolver: zodResolver(smsPreferencesSchema),
    defaultValues: data || { receiveSmsNotifications: true, marketingSms: false },
  });

  const receiveSmsNotifications = watch('receiveSmsNotifications');

  React.useEffect(() => {
    if (data) {
      setValue('receiveSmsNotifications', data.receiveSmsNotifications);
      setValue('smsNumber', data.smsNumber);
      setValue('marketingSms', data.marketingSms);
    }
  }, [data, setValue]);

  const onSubmit = async (values: SmsPreferencesFormValues) => {
    try {
      await updateSmsPreferences.mutateAsync(values);
      toast({
        title: 'Success',
        description: 'SMS preferences updated successfully.',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update SMS preferences.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading SMS preferences...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">SMS Preferences</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="receiveSmsNotifications" className="text-lg">Receive SMS Notifications</Label>
          <Switch
            id="receiveSmsNotifications"
            checked={receiveSmsNotifications}
            onCheckedChange={(checked) => setValue('receiveSmsNotifications', checked)}
            {...register('receiveSmsNotifications')}
          />
        </div>
        {receiveSmsNotifications && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="smsNumber" className="text-lg">SMS Number</Label>
              <Input
                id="smsNumber"
                type="tel"
                placeholder="Enter your SMS number"
                {...register('smsNumber')}
                className="mt-1"
              />
              {errors.smsNumber && <p className="text-red-500 text-sm mt-1">{errors.smsNumber.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="marketingSms" className="text-lg">Receive Marketing SMS</Label>
              <Switch
                id="marketingSms"
                checked={watch('marketingSms')}
                onCheckedChange={(checked) => setValue('marketingSms', checked)}
                {...register('marketingSms')}
              />
            </div>
          </div>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Saving...' : 'Save Preferences'}
        </Button>
      </form>
    </div>
  );
};

export default SettingsSmsPreferencesScreen;