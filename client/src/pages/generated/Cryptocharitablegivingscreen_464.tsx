// AUTO-GENERATED DRAFT SCREEN: CryptoCharitableGivingScreen
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Simulate tRPC hook
const useCharitableGiving = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeDonation = async (data: DonationFormInputs) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (Math.random() > 0.8) {
        throw new Error('Failed to process donation. Please try again.');
      }
      console.log('Donation successful:', data);
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { makeDonation, isLoading, error };
};

const donationSchema = z.object({
  cryptocurrency: z.string().min(1, { message: 'Please select a cryptocurrency.' }),
  amount: z.number().min(0.000001, { message: 'Amount must be greater than zero.' }),
  recipient: z.string().min(1, { message: 'Please enter a recipient organization.' }),
  anonymous: z.boolean().default(false),
});

type DonationFormInputs = z.infer<typeof donationSchema>;

const CryptoCharitableGivingScreen: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<DonationFormInputs>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      cryptocurrency: '',
      amount: 0,
      recipient: '',
      anonymous: false,
    },
  });

  const { makeDonation, isLoading, error } = useCharitableGiving();
  const [donationSuccess, setDonationSuccess] = useState(false);

  const onSubmit = async (data: DonationFormInputs) => {
    setDonationSuccess(false);
    const result = await makeDonation(data);
    if (result.success) {
      setDonationSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6 bg-card p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Crypto Charitable Giving</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="cryptocurrency">Cryptocurrency</Label>
            <Select {...register('cryptocurrency')} onValueChange={(value) => control._formValues.cryptocurrency = value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a cryptocurrency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                <SelectItem value="USDT">Tether (USDT)</SelectItem>
              </SelectContent>
            </Select>
            {errors.cryptocurrency && <p className="text-red-500 text-sm mt-1">{errors.cryptocurrency.message}</p>}
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="any"
              placeholder="0.00"
              {...register('amount', { valueAsNumber: true })}
              aria-invalid={errors.amount ? "true" : "false"}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <Label htmlFor="recipient">Recipient Organization</Label>
            <Input
              id="recipient"
              type="text"
              placeholder="e.g., Red Cross"
              {...register('recipient')}
              aria-invalid={errors.recipient ? "true" : "false"}
            />
            {errors.recipient && <p className="text-red-500 text-sm mt-1">{errors.recipient.message}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="anonymous" {...register('anonymous')} />
            <Label htmlFor="anonymous">Donate Anonymously</Label>
          </div>

          {error && <p className="text-red-500 text-sm text-center">Error: {error}</p>}
          {donationSuccess && <p className="text-green-500 text-sm text-center">Donation successful!</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Donate Now'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CryptoCharitableGivingScreen;
