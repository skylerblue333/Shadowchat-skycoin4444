// @ts-nocheck
import React, { useState } from 'react';
import * as __ns_react_hook_form_1 from 'react-hook-form';
const { useForm } = (__ns_react_hook_form_1 as any);
import * as __ns__hookform_resolvers_zod_2 from '@hookform/resolvers/zod';
const { zodResolver } = (__ns__hookform_resolvers_zod_2 as any);
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: FiatOffRamp


/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


// 1. Define your form schema using Zod
const formSchema = z.object({
  amount: z.number().min(10, { message: 'Amount must be at least 10' }),
  currency: z.string().min(1, { message: 'Please select a currency' }),
  bankAccount: z.string().min(1, { message: 'Bank account is required' }),
  agreeTerms: z.boolean().refine(val => val === true, { message: 'You must agree to the terms' }),
});

type FormData = z.infer<typeof formSchema>;

// Mock tRPC hook for demonstration

export function FiatOffRamp() {
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isLoading, isError, isSuccess, error } = useStubMutation();

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 dark">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Crypto: Fiat Off-Ramp</CardTitle>
          <CardDescription>Withdraw your crypto to your bank account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g., 100.00"
                {...register('amount', { valueAsNumber: true })}
                className={errors.amount ? 'border-red-500' : ''}
              />
              {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Select onValueChange={(value) => control._formState.values.currency = value}>
                <SelectTrigger className={errors.currency ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
              {errors.currency && <p className="text-red-500 text-sm">{errors.currency.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bankAccount">Bank Account</Label>
              <Input
                id="bankAccount"
                type="text"
                placeholder="Your bank account number"
                {...register('bankAccount')}
                className={errors.bankAccount ? 'border-red-500' : ''}
              />
              {errors.bankAccount && <p className="text-red-500 text-sm">{errors.bankAccount.message}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="agreeTerms"
                {...register('agreeTerms')}
                className={errors.agreeTerms ? 'border-red-500' : ''}
              />
              <Label htmlFor="agreeTerms">I agree to the terms and conditions</Label>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms.message}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Initiate Off-Ramp'}
            </Button>

            {isError && (
              <Alert variant="destructive">
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error?.message || 'An unknown error occurred.'}</AlertDescription>
              </Alert>
            )}

            {isSuccess && (
              <Alert>
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>Transaction initiated successfully!</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


export default function Fiatofframp_40() { return null; }
