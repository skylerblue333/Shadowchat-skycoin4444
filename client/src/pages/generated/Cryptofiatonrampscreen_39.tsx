// AUTO-GENERATED DRAFT SCREEN: CryptoFiatOnRampScreen
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup

const formSchema = z.object({
  amount: z.number().min(1, { message: 'Amount must be at least 1' }),
  currency: z.string().min(1, { message: 'Please select a currency' }),
  paymentMethod: z.string().min(1, { message: 'Please select a payment method' }),
});

type FormData = z.infer<typeof formSchema>;

const CryptoFiatOnRampScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onRampMutation = trpc.fiat.onRamp.useMutation({
    onSuccess: () => {
      toast.success('Fiat on-ramp successful!');
    },
    onError: (error) => {
      toast.error(`On-ramp failed: ${error.message}`);
    },
  });

  const onSubmit = (data: FormData) => {
    onRampMutation.mutate(data);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Crypto: Fiat On-Ramp</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              {...register('amount', { valueAsNumber: true })}
              className={errors.amount ? 'border-red-500' : ''}
              aria-invalid={errors.amount ? 'true' : 'false'}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1" role="alert">{errors.amount.message}</p>}
          </div>

          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select onValueChange={(value) => control._formState.dirtyFields.currency = true} defaultValue="USD">
              <SelectTrigger className={errors.currency ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
            {errors.currency && <p className="text-red-500 text-sm mt-1" role="alert">{errors.currency.message}</p>}
          </div>

          <div>
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select onValueChange={(value) => control._formState.dirtyFields.paymentMethod = true} defaultValue="Bank Transfer">
              <SelectTrigger className={errors.paymentMethod ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="PayPal">PayPal</SelectItem>
              </SelectContent>
            </Select>
            {errors.paymentMethod && <p className="text-red-500 text-sm mt-1" role="alert">{errors.paymentMethod.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
          </div>

          <Button type="submit" className="w-full" disabled={onRampMutation.isLoading}>
            {onRampMutation.isLoading ? 'Processing...' : 'Proceed to On-Ramp'}
          </Button>

          {onRampMutation.isError && (
            <p className="text-red-500 text-sm mt-2 text-center" role="alert">Error: {onRampMutation.error?.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CryptoFiatOnRampScreen;
