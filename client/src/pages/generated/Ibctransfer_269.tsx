// AUTO-GENERATED DRAFT SCREEN: IbcTransfer

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useIbcTransfer } from '@/lib/trpc/hooks'; // Placeholder for tRPC hook

// Define the form schema using Zod
const ibcTransferSchema = z.object({
  sourceChain: z.string().min(1, { message: 'Source chain is required.' }),
  destinationChain: z.string().min(1, { message: 'Destination chain is required.' }),
  amount: z.number().positive({ message: 'Amount must be positive.' }),
  recipientAddress: z.string().min(1, { message: 'Recipient address is required.' }),
  memo: z.string().optional(),
});

type IbcTransferFormValues = z.infer<typeof ibcTransferSchema>;

const IbcTransfer: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IbcTransferFormValues>({
    resolver: zodResolver(ibcTransferSchema),
  });

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Placeholder for tRPC mutation hook
  const { mutate: transfer, isLoading, isError, error } = useIbcTransfer();

  const onSubmit = (data: IbcTransferFormValues) => {

    // Call tRPC mutation
    transfer(data, {
      onSuccess: () => {
        alert('IBC Transfer successful!');
        reset();
      },
      onError: (err) => {
        console.error('IBC Transfer failed:', err);
        alert(`IBC Transfer failed: ${err.message}`);
      },
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="w-full max-w-md mx-auto p-6 space-y-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crypto: IBC Transfer</CardTitle>
          <CardDescription>Transfer assets between different blockchain networks.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-theme">Dark Theme</Label>
              <Switch
                id="dark-theme"
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
                aria-label="Toggle dark theme"
              />
            </div>

            <div>
              <Label htmlFor="sourceChain">Source Chain</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select source chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cosmos">Cosmos Hub</SelectItem>
                  <SelectItem value="osmosis">Osmosis</SelectItem>
                  <SelectItem value="juno">Juno</SelectItem>
                </SelectContent>
              </Select>
              {errors.sourceChain && <p className="text-red-500 text-sm mt-1">{errors.sourceChain.message}</p>}
            </div>

            <div>
              <Label htmlFor="destinationChain">Destination Chain</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select destination chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cosmos">Cosmos Hub</SelectItem>
                  <SelectItem value="osmosis">Osmosis</SelectItem>
                  <SelectItem value="juno">Juno</SelectItem>
                </SelectContent>
              </Select>
              {errors.destinationChain && <p className="text-red-500 text-sm mt-1">{errors.destinationChain.message}</p>}
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                {...register('amount', { valueAsNumber: true })}
                aria-invalid={errors.amount ? "true" : "false"}
              />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
            </div>

            <div>
              <Label htmlFor="recipientAddress">Recipient Address</Label>
              <Input
                id="recipientAddress"
                type="text"
                placeholder="Enter recipient address"
                {...register('recipientAddress')}
                aria-invalid={errors.recipientAddress ? "true" : "false"}
              />
              {errors.recipientAddress && <p className="text-red-500 text-sm mt-1">{errors.recipientAddress.message}</p>}
            </div>

            <div>
              <Label htmlFor="memo">Memo (Optional)</Label>
              <Input
                id="memo"
                type="text"
                placeholder="Enter memo"
                {...register('memo')}
              />
            </div>

            {isLoading && <p className="text-blue-500">Transferring...</p>}
            {isError && <p className="text-red-500">Error: {error?.message || 'Unknown error'}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              Initiate IBC Transfer
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default IbcTransfer;
