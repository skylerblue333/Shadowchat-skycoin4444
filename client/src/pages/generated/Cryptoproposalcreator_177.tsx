// AUTO-GENERATED DRAFT SCREEN: CryptoProposalCreator

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { trpc } from './utils/trpc'; // Assuming tRPC setup
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';
import { useTheme } from './context/theme-provider'; // Assuming a theme provider

const proposalSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.').max(100, 'Title cannot exceed 100 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.').max(1000, 'Description cannot exceed 1000 characters.'),
  amount: z.number().min(0.01, 'Amount must be positive.').max(1000000, 'Amount cannot exceed 1,000,000.').default(0.01),
  isPublic: z.boolean().default(true),
});

type ProposalFormValues = z.infer<typeof proposalSchema>;

export function CryptoProposalCreator() {
  const { theme } = useTheme();
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      title: '',
      description: '',
      amount: 0.01,
      isPublic: true,
    },
  });

  const createProposal = trpc.proposal.create.useMutation();

  const onSubmit = async (data: ProposalFormValues) => {
    try {
      await createProposal.mutateAsync(data);
      alert('Proposal created successfully!');
      reset();
    } catch (error) {
      console.error('Failed to create proposal:', error);
      alert('Failed to create proposal. Please try again.');
    }
  };

  if (createProposal.isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Create New Proposal</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="title">Proposal Title</Label>
            <Input
              id="title"
              type="text"
              {...register('title')}
              className="mt-1 block w-full"
              aria-invalid={errors.title ? "true" : "false"}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1" role="alert">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              className="mt-1 block w-full"
              rows={5}
              aria-invalid={errors.description ? "true" : "false"}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1" role="alert">{errors.description.message}</p>}
          </div>

          <div>
            <Label htmlFor="amount">Amount (SKY)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              {...register('amount', { valueAsNumber: true })}
              className="mt-1 block w-full"
              aria-invalid={errors.amount ? "true" : "false"}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1" role="alert">{errors.amount.message}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isPublic"
              {...register('isPublic')}
              aria-checked={watch('isPublic')}
            />
            <Label htmlFor="isPublic">Make Public</Label>
          </div>

          <Button type="submit" className="w-full" disabled={createProposal.isLoading}>
            {createProposal.isLoading ? 'Submitting...' : 'Create Proposal'}
          </Button>
        </form>
      </div>
    </div>
  );
}


export default function Cryptoproposalcreator_177() { return null; }
