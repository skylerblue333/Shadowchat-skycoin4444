// AUTO-GENERATED DRAFT SCREEN: CryptoTwapOrder
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup

const twapOrderSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required'),
  totalAmount: z.number().min(0.01, 'Amount must be positive'),
  interval: z.number().min(1, 'Interval must be at least 1 minute'),
  numOrders: z.number().min(1, 'Number of orders must be at least 1'),
  isBuy: z.boolean(),
});

type TwapOrderFormValues = z.infer<typeof twapOrderSchema>;

export function CryptoTwapOrder() {
  const { theme, setTheme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createTwapOrder = trpc.order.createTwap.useMutation();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TwapOrderFormValues>({
    resolver: zodResolver(twapOrderSchema),
    defaultValues: {
      symbol: '',
      totalAmount: 0,
      interval: 5,
      numOrders: 10,
      isBuy: true,
    },
  });

  const onSubmit = useCallback(async (data: TwapOrderFormValues) => {
    setIsSubmitting(true);
    try {
      await createTwapOrder.mutateAsync(data);
      alert('TWAP Order placed successfully!');
      reset();
    } catch (error) {
      console.error('Failed to place TWAP order:', error);
      alert('Failed to place TWAP order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [createTwapOrder, reset]);

  useEffect(() => {
    // Accessibility: Announce form errors if any
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).map(e => e?.message).join(', ');
      console.warn('Form errors:', errorMessages); // For screen readers or accessibility tools
    }
  }, [errors]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (createTwapOrder.isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">TWAP Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input id="symbol" {...register('symbol')} className={errors.symbol ? 'border-red-500' : ''} />
              {errors.symbol && <p className="text-red-500 text-sm">{errors.symbol.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalAmount">Total Amount</Label>
              <Input id="totalAmount" type="number" step="0.01" {...register('totalAmount', { valueAsNumber: true })} className={errors.totalAmount ? 'border-red-500' : ''} />
              {errors.totalAmount && <p className="text-red-500 text-sm">{errors.totalAmount.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="interval">Interval (minutes)</Label>
              <Input id="interval" type="number" {...register('interval', { valueAsNumber: true })} className={errors.interval ? 'border-red-500' : ''} />
              {errors.interval && <p className="text-red-500 text-sm">{errors.interval.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="numOrders">Number of Orders</Label>
              <Input id="numOrders" type="number" {...register('numOrders', { valueAsNumber: true })} className={errors.numOrders ? 'border-red-500' : ''} />
              {errors.numOrders && <p className="text-red-500 text-sm">{errors.numOrders.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isBuy">Buy / Sell</Label>
              <Switch id="isBuy" checked={register('isBuy').value} onCheckedChange={(checked) => register('isBuy').onChange({ target: { value: checked } })} />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Placing Order...' : 'Place TWAP Order'}
            </Button>
            <div className="flex justify-end">
              <Button variant="ghost" onClick={toggleTheme} className="text-sm">
                Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </Button>
            </div>
            {createTwapOrder.isError && (
              <p className="text-red-500 text-sm mt-2">Error: {createTwapOrder.error?.message || 'An unknown error occurred.'}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


export default function Cryptotwaporder_397() { return null; }
