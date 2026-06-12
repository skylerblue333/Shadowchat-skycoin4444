// AUTO-GENERATED DRAFT SCREEN: CryptoBugReportScreen

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { Checkbox } from './components/ui/checkbox';
import { useTRPCMutation } from './utils/trpc'; // Placeholder for tRPC hook

const bugReportSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  reproducible: z.boolean().default(false),
  stepsToReproduce: z.string().optional(),
  expectedBehavior: z.string().optional(),
  actualBehavior: z.string().optional(),
});

type BugReportFormValues = z.infer<typeof bugReportSchema>;

const CryptoBugReportScreen: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<BugReportFormValues>({
    resolver: zodResolver(bugReportSchema),
  });

  const { mutate, isLoading, isError, error } = useTRPCMutation('reportBug'); // Placeholder tRPC mutation

  const onSubmit = (data: BugReportFormValues) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-card text-card-foreground p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Crypto: Bug Report</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="title">Bug Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Brief summary of the bug"
              {...register('title')}
              aria-invalid={errors.title ? "true" : "false"}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the bug"
              {...register('description')}
              aria-invalid={errors.description ? "true" : "false"}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="reproducible"
              {...register('reproducible')}
            />
            <Label htmlFor="reproducible">Is this bug consistently reproducible?</Label>
          </div>

          <div>
            <Label htmlFor="stepsToReproduce">Steps to Reproduce (Optional)</Label>
            <Textarea
              id="stepsToReproduce"
              placeholder="1. ...\n2. ..."
              {...register('stepsToReproduce')}
            />
          </div>

          <div>
            <Label htmlFor="expectedBehavior">Expected Behavior (Optional)</Label>
            <Textarea
              id="expectedBehavior"
              placeholder="What should have happened?"
              {...register('expectedBehavior')}
            />
          </div>

          <div>
            <Label htmlFor="actualBehavior">Actual Behavior (Optional)</Label>
            <Textarea
              id="actualBehavior"
              placeholder="What actually happened?"
              {...register('actualBehavior')}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Bug Report'}
          </Button>

          {isError && <p className="text-red-500 text-sm mt-4 text-center">Error: {error?.message || 'Something went wrong.'}</p>}
        </form>
      </div>
    </div>
  );
};

export default CryptoBugReportScreen;
