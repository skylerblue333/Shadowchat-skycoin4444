// AUTO-GENERATED DRAFT SCREEN: SettlementScreen
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query'; // Using react-query for mock tRPC

// 1. Define Zod schema for form validation
const settlementSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().min(1, 'Currency is required').max(5, 'Currency code too long'),
  recipientAddress: z.string().min(26, 'Recipient address is too short').max(62, 'Recipient address is too long'),
});

// 2. Infer TypeScript type from Zod schema
type SettlementFormValues = z.infer<typeof settlementSchema>;

// Mock tRPC context and hook for demonstration purposes
// In a real application, this would come from your tRPC client setup
const mockTRPC = {
  crypto: {
    settle: {
      useMutation: () => {
        return useMutation<string, Error, SettlementFormValues>({
          mutationFn: async (data) => {
            // Simulate an API call
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (data.amount > 0 && data.currency && data.recipientAddress) {
                  resolve(`Settlement of ${data.amount} ${data.currency} to ${data.recipientAddress} successful.`);
                } else {
                  reject(new Error('Invalid settlement data provided.'));
                }
              }, 1500);
            });
          },
        });
      },
    },
  },
};

const SettlementScreen: React.FC = () => {
  // 3. Dark theme state and effect
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkTheme(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Apply dark class to body for global theme application
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  // 4. Form handling with react-hook-form and Zod
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SettlementFormValues>({
    resolver: zodResolver(settlementSchema),
    defaultValues: {
      amount: 0,
      currency: '',
      recipientAddress: '',
    },
  });

  // 5. tRPC (mocked) mutation hook
  const settlementMutation = mockTRPC.crypto.settle.useMutation();

  // 6. Form submission handler
  const onSubmit = async (data: SettlementFormValues) => {
    try {
      const result = await settlementMutation.mutateAsync(data);
      alert(result);
    } catch (error) {
      alert('Settlement failed: ' + (error as Error).message);
    }
  };

  // 7. Accessibility improvements (e.g., ARIA attributes, semantic HTML)
  const cardDescription = useMemo(() => 'Facilitate secure cryptocurrency settlements.', []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center" aria-label="Crypto Settlement Screen">Crypto Settlement</CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-400" aria-describedby="card-description" id="card-description">{cardDescription}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-live="polite">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                {...register('amount', { valueAsNumber: true })}
                className={errors.amount ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}
                aria-invalid={!!errors.amount}
                aria-describedby="amount-error"
              />
              {errors.amount && <p id="amount-error" role="alert" className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.amount.message}</p>}
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                type="text"
                placeholder="e.g., BTC, ETH"
                {...register('currency')}
                className={errors.currency ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}
                aria-invalid={!!errors.currency}
                aria-describedby="currency-error"
              />
              {errors.currency && <p id="currency-error" role="alert" className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.currency.message}</p>}
            </div>
            <div>
              <Label htmlFor="recipientAddress">Recipient Address</Label>
              <Input
                id="recipientAddress"
                type="text"
                placeholder="Enter recipient address"
                {...register('recipientAddress')}
                className={errors.recipientAddress ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}
                aria-invalid={!!errors.recipientAddress}
                aria-describedby="recipientAddress-error"
              />
              {errors.recipientAddress && <p id="recipientAddress-error" role="alert" className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.recipientAddress.message}</p>}
            </div>
            <Button type="submit" className="w-full py-2" disabled={isSubmitting || settlementMutation.isLoading}>
              {(isSubmitting || settlementMutation.isLoading) ? 'Settling...' : 'Settle'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          {settlementMutation.isError && (
            <p role="alert" className="text-red-500 dark:text-red-400 text-sm">Error: {settlementMutation.error?.message}</p>
          )}
          {settlementMutation.isSuccess && (
            <p role="status" className="text-green-500 dark:text-green-400 text-sm">Settlement successful!</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettlementScreen;
