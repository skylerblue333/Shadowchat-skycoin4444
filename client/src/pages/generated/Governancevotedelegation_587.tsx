// AUTO-GENERATED DRAFT SCREEN: GovernanceVoteDelegation
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup

const formSchema = z.object({
  delegateAddress: z.string().min(42, 'Invalid address').max(42, 'Invalid address'),
  amount: z.number().min(0.000001, 'Amount must be greater than zero'),
  autoRenew: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

export function GovernanceVoteDelegation() {
  const { toast } = useToast();
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Example for dark theme toggle

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      delegateAddress: '',
      amount: 0,
      autoRenew: false,
    },
  });

  // Example tRPC mutation hook
  const delegateVoteMutation = trpc.governance.delegateVote.useMutation({
    onSuccess: () => {
      toast({
        title: 'Delegation Successful',
        description: 'Your vote has been successfully delegated.',
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: 'Delegation Failed',
        description: `Error: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await delegateVoteMutation.mutateAsync(data);
    } catch (error) {
      // Error handled by onError in useMutation
    }
  };

  const isLoading = delegateVoteMutation.isLoading;

  return (
    <div className={`container mx-auto p-4 ${isDarkTheme ? 'dark' : ''}`}>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Delegate Your Vote</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="delegateAddress" className="text-gray-700 dark:text-gray-300">Delegate Address</Label>
            <Input
              id="delegateAddress"
              type="text"
              placeholder="0x..."
              {...register('delegateAddress')}
              className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              aria-invalid={errors.delegateAddress ? "true" : "false"}
            />
            {errors.delegateAddress && (
              <p className="text-red-500 text-sm mt-1" role="alert">{errors.delegateAddress.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="amount" className="text-gray-700 dark:text-gray-300">Amount to Delegate</Label>
            <Input
              id="amount"
              type="number"
              step="any"
              placeholder="0.00"
              {...register('amount', { valueAsNumber: true })}
              className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              aria-invalid={errors.amount ? "true" : "false"}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1" role="alert">{errors.amount.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="autoRenew" className="text-gray-700 dark:text-gray-300">Auto-Renew Delegation</Label>
            <Switch
              id="autoRenew"
              checked={isDarkTheme} // Using isDarkTheme as a placeholder for autoRenew state
              onCheckedChange={setIsDarkTheme} // Placeholder for autoRenew state change
              aria-label="Toggle auto-renew delegation"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm dark:bg-blue-500 dark:hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Delegating...' : 'Delegate Vote'}
          </Button>
        </form>

        {/* Dark theme toggle for demonstration */}
        <div className="mt-6 flex items-center justify-center">
          <Label htmlFor="dark-mode-toggle" className="mr-2 text-gray-700 dark:text-gray-300">Dark Mode</Label>
          <Switch
            id="dark-mode-toggle"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
        </div>
      </div>
    </div>
  );
}


export default function Governancevotedelegation_587() { return null; }
