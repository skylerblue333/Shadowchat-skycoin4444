// AUTO-GENERATED DRAFT SCREEN: CryptoAlertBuilder

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast'; // Assuming shadcn/ui toast component
import { useCreateAlert } from '@/lib/trpc/hooks'; // Assuming tRPC hook for creating alerts
import { useCryptoSymbols } from '@/lib/trpc/hooks'; // Assuming tRPC hook for fetching crypto symbols

// Zod schema for form validation
const alertSchema = z.object({
  cryptoSymbol: z.string().min(1, { message: 'Crypto symbol is required.' }),
  targetPrice: z.number().positive({ message: 'Target price must be positive.' }),
  notificationType: z.enum(['email', 'sms', 'both'], { message: 'Please select a notification type.' }),
  alertThreshold: z.enum(['above', 'below'], { message: 'Please select an alert threshold.' }),
});

type AlertFormValues = z.infer<typeof alertSchema>;

export function CryptoAlertBuilder() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { data: cryptoSymbols, isLoading: isLoadingSymbols, isError: isErrorSymbols } = useCryptoSymbols();
  const { mutate: createAlert, isLoading: isCreatingAlert, isSuccess, isError: isErrorCreatingAlert, error: createAlertError } = useCreateAlert();

  const { register, handleSubmit, control, setValue, formState: { errors, isSubmitting } } = useForm<AlertFormValues>({
    resolver: zodResolver(alertSchema),
    defaultValues: {
      cryptoSymbol: '',
      targetPrice: 0,
      notificationType: 'email',
      alertThreshold: 'above',
    },
  });

  // Handle theme toggle
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  // Handle successful alert creation
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Alert Created!',
        description: 'Your crypto alert has been successfully set.',
      });
    }
  }, [isSuccess]);

  // Handle error during alert creation
  useEffect(() => {
    if (isErrorCreatingAlert) {
      toast({
        title: 'Error creating alert',
        description: createAlertError?.message || 'Failed to create alert. Please try again.',
        variant: 'destructive',
      });
    }
  }, [isErrorCreatingAlert, createAlertError]);

  const onSubmit = (data: AlertFormValues) => {
    console.log('Submitting alert data:', data);
    createAlert(data);
  };

  if (isLoadingSymbols) {
    return <div className="flex justify-center items-center min-h-screen">Loading crypto symbols...</div>;
  }

  if (isErrorSymbols) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error loading crypto symbols.</div>;
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Crypto Alert Builder</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="cryptoSymbol">Crypto Symbol</Label>
            <Select onValueChange={(value) => setValue('cryptoSymbol', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a crypto symbol" />
              </SelectTrigger>
              <SelectContent>
                {cryptoSymbols?.map((symbol) => (
                  <SelectItem key={symbol} value={symbol}>
                    {symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.cryptoSymbol && <p className="text-red-500 text-sm mt-1">{errors.cryptoSymbol.message}</p>}
          </div>

          <div>
            <Label htmlFor="targetPrice">Target Price</Label>
            <Input id="targetPrice" type="number" step="0.01" {...register('targetPrice', { valueAsNumber: true })} className="mt-1" />
            {errors.targetPrice && <p className="text-red-500 text-sm mt-1">{errors.targetPrice.message}</p>}
          </div>

          <div>
            <Label htmlFor="alertThreshold">Alert When Price Is</Label>
            <Select onValueChange={(value: 'above' | 'below') => setValue('alertThreshold', value)} defaultValue="above">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select threshold" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="above">Above</SelectItem>
                <SelectItem value="below">Below</SelectItem>
              </SelectContent>
            </Select>
            {errors.alertThreshold && <p className="text-red-500 text-sm mt-1">{errors.alertThreshold.message}</p>}
          </div>

          <div>
            <Label htmlFor="notificationType">Notification Type</Label>
            <Select onValueChange={(value: 'email' | 'sms' | 'both') => setValue('notificationType', value)} defaultValue="email">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select notification type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="both">Both Email and SMS</SelectItem>
              </SelectContent>
            </Select>
            {errors.notificationType && <p className="text-red-500 text-sm mt-1">{errors.notificationType.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="darkThemeToggle">Dark Theme</Label>
            <Switch id="darkThemeToggle" checked={isDarkTheme} onCheckedChange={setIsDarkTheme} />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || isCreatingAlert}>
            {isCreatingAlert ? 'Creating Alert...' : 'Create Alert'}
          </Button>
        </form>
      </div>
    </div>
  );
}


export default function Cryptoalertbuilder_237() { return null; }
