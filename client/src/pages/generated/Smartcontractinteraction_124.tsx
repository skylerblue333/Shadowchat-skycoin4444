// AUTO-GENERATED DRAFT SCREEN: SmartContractInteraction
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from '@hookform/react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { toast } from 'sonner'; // For error/success notifications

// 1. Define Zod schema for form validation
const formSchema = z.object({
  contractAddress: z.string().min(42, 'Invalid address').max(42, 'Invalid address'),
  methodName: z.string().min(1, 'Method name is required'),
  value: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SmartContractInteraction: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(theme === 'dark');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractAddress: '',
      methodName: '',
      value: '',
    },
  });

  // 2. tRPC hook for contract interaction (simulated)
  const contractMutation = trpc.contract.interact.useMutation({
    onSuccess: (data) => {
      toast.success('Transaction successful!', { description: `Tx Hash: ${data.txHash}` });
    },
    onError: (error) => {
      toast.error('Transaction failed!', { description: error.message });
    },
  });

  const onSubmit = useCallback(async (data: FormValues) => {
    try {
      await contractMutation.mutateAsync(data);
    } catch (error) {
      // Error handled by onError in useMutation, but good to have a catch here too
      console.error('Submission error:', error);
    }
  }, [contractMutation]);

  useEffect(() => {
    setTheme(isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme, setTheme]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold">Crypto: Smart Contract Interaction</CardTitle>
          <CardDescription>Interact with your smart contracts securely.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="contractAddress">Contract Address</Label>
              <Input
                id="contractAddress"
                type="text"
                placeholder="0x..."
                {...register('contractAddress')}
                aria-invalid={errors.contractAddress ? "true" : "false"}
              />
              {errors.contractAddress && (
                <p className="text-red-500 text-sm" role="alert">{errors.contractAddress.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="methodName">Method Name</Label>
              <Input
                id="methodName"
                type="text"
                placeholder="transfer"
                {...register('methodName')}
                aria-invalid={errors.methodName ? "true" : "false"}
              />
              {errors.methodName && (
                <p className="text-red-500 text-sm" role="alert">{errors.methodName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Value (optional)</Label>
              <Input
                id="value"
                type="text"
                placeholder="1.0 ETH"
                {...register('value')}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
                aria-label="Toggle dark mode"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || contractMutation.isLoading}>
              {isSubmitting || contractMutation.isLoading ? 'Processing...' : 'Execute Contract'}
            </Button>

            {contractMutation.isError && (
              <p className="text-red-500 text-sm text-center" role="alert">Error: {contractMutation.error?.message}</p>
            )}
            {contractMutation.isSuccess && (
              <p className="text-green-500 text-sm text-center">Transaction successful!</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartContractInteraction;
