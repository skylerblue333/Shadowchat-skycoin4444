// AUTO-GENERATED DRAFT SCREEN: RemittanceScreen
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useTRPC } from '@/utils/trpc'; // Assuming tRPC context is set up

const remittanceSchema = z.object({
  amount: z.number().min(0.01, 'Amount must be positive'),
  currency: z.string().min(1, 'Currency is required'),
  recipientAddress: z.string().min(1, 'Recipient address is required'),
  network: z.string().min(1, 'Network is required'),
});

type RemittanceFormValues = z.infer<typeof remittanceSchema>;

const RemittanceScreen: React.FC = () => {
  const { toast } = useToast();
  const { mutate: sendRemittance, isLoading, isError, error } = useTRPC().remittance.send.useMutation();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RemittanceFormValues>({
    resolver: zodResolver(remittanceSchema),
    defaultValues: {
      amount: 0,
      currency: '',
      recipientAddress: '',
      network: '',
    },
  });

  const onSubmit = (data: RemittanceFormValues) => {
    sendRemittance(data, {
      onSuccess: () => {
        toast({
          title: 'Remittance Successful',
          description: `Sent ${data.amount} ${data.currency} to ${data.recipientAddress}`,
        });
      },
      onError: (err) => {
        toast({
          title: 'Remittance Failed',
          description: err.message || 'An unknown error occurred',
          variant: 'destructive',
        });
      },
    });
  };

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6`}>
        <h1 className="text-3xl font-bold text-center mb-6">Crypto Remittance</h1>

        <div className="flex justify-end mb-4">
          <Label htmlFor="dark-mode-switch" className="mr-2">Dark Mode</Label>
          <Switch
            id="dark-mode-switch"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              {...register("amount", { valueAsNumber: true })}
              className={errors.amount ? "border-red-500" : ""}
              aria-invalid={errors.amount ? "true" : "false"}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select onValueChange={(value) => register("currency").onChange({ target: { value } })}>
              <SelectTrigger className={errors.currency ? "border-red-500" : ""}>
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                <SelectItem value="USDT">Tether (USDT)</SelectItem>
              </SelectContent>
            </Select>
            {errors.currency && <p className="text-red-500 text-sm mt-1">{errors.currency.message}</p>}
          </div>

          <div>
            <Label htmlFor="recipientAddress">Recipient Address</Label>
            <Input
              id="recipientAddress"
              type="text"
              {...register("recipientAddress")}
              className={errors.recipientAddress ? "border-red-500" : ""}
              aria-invalid={errors.recipientAddress ? "true" : "false"}
            />
            {errors.recipientAddress && <p className="text-red-500 text-sm mt-1">{errors.recipientAddress.message}</p>}
          </div>

          <div>
            <Label htmlFor="network">Network</Label>
            <Select onValueChange={(value) => register("network").onChange({ target: { value } })}>
              <SelectTrigger className={errors.network ? "border-red-500" : ""}>
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bitcoin">Bitcoin Network</SelectItem>
                <SelectItem value="Ethereum">Ethereum Network</SelectItem>
                <SelectItem value="TRC20">TRC20</SelectItem>
              </SelectContent>
            </Select>
            {errors.network && <p className="text-red-500 text-sm mt-1">{errors.network.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Remittance"}
          </Button>

          {isError && (
            <p className="text-red-500 text-center mt-4" role="alert">
              Error: {error?.message || "Failed to send remittance."}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RemittanceScreen;
