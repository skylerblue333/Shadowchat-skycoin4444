// AUTO-GENERATED DRAFT SCREEN: CryptoPaymentMethodsScreen
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { trpc } from '@/utils/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';

const formSchema = z.object({
  cardNumber: z.string().min(16, 'Card number must be 16 digits').max(16, 'Card number must be 16 digits'),
  cardHolder: z.string().min(1, 'Card holder name is required'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().min(3, 'CVV must be 3 or 4 digits').max(4, 'CVV must be 3 or 4 digits'),
});

type FormData = z.infer<typeof formSchema>;

const CryptoPaymentMethodsScreen: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const addPaymentMethod = trpc.payment.addMethod.useMutation({
    onMutate: () => {
      setIsLoading(true);
      setError(null);
    },
    onSuccess: () => {
      alert('Payment method added successfully!');
      setIsLoading(false);
    },
    onError: (err) => {
      setError(err.message);
      setIsLoading(false);
    },
  });

  const onSubmit = async (data: FormData) => {
    await addPaymentMethod.mutateAsync(data);
  };

  useEffect(() => {
    // Simulate dark theme toggle for accessibility
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-background p-4 dark:bg-gray-900 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" type="text" {...register('cardNumber')} className="mt-1" />
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>}
            </div>
            <div>
              <Label htmlFor="cardHolder">Card Holder Name</Label>
              <Input id="cardHolder" type="text" {...register('cardHolder')} className="mt-1" />
              {errors.cardHolder && <p className="text-red-500 text-sm mt-1">{errors.cardHolder.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
                <Input id="expiryDate" type="text" {...register('expiryDate')} className="mt-1" />
                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>}
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" type="text" {...register('cvv')} className="mt-1" />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
              <Switch
                id="dark-mode-toggle"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">Error: {error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Payment Method'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoPaymentMethodsScreen;