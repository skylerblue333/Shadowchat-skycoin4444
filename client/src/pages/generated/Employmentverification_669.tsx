// AUTO-GENERATED DRAFT SCREEN: EmploymentVerification

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEmploymentVerification } from '@/utils/trpc'; // Assuming tRPC hook
import { Loader2 } from 'lucide-react'; // For loading state

const formSchema = z.object({
  employerName: z.string().min(2, { message: 'Employer name must be at least 2 characters.' }),
  jobTitle: z.string().min(2, { message: 'Job title must be at least 2 characters.' }),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Start date must be in YYYY-MM-DD format.' }),
  endDate: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function EmploymentVerification() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Mock tRPC mutation hook
  const { mutate: submitVerification, isLoading } = useEmploymentVerification();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      submitVerification(data, {
        onSuccess: () => {
          setSubmissionSuccess(true);
          setIsSubmitting(false);
        },
        onError: (error) => {
          setSubmissionError(error.message || 'An unexpected error occurred.');
          setIsSubmitting(false);
        },
      });
    } catch (error: any) {
      setSubmissionError(error.message || 'An unexpected error occurred.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 dark">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Employment Verification</CardTitle>
          <CardDescription>Please provide your employment details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="employerName">Employer Name</Label>
              <Input
                id="employerName"
                type="text"
                placeholder="Acme Corp"
                {...register('employerName')}
                aria-invalid={errors.employerName ? "true" : "false"}
              />
              {errors.employerName && <p className="text-red-500 text-sm">{errors.employerName.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                type="text"
                placeholder="Software Engineer"
                {...register('jobTitle')}
                aria-invalid={errors.jobTitle ? "true" : "false"}
              />
              {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                {...register('startDate')}
                aria-invalid={errors.startDate ? "true" : "false"}
              />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Input
                id="endDate"
                type="date"
                {...register('endDate')}
              />
            </div>
            {submissionError && <p className="text-red-500 text-sm text-center">Error: {submissionError}</p>}
            {submissionSuccess && <p className="text-green-500 text-sm text-center">Verification submitted successfully!</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
              {(isSubmitting || isLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Verification
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


export default function Employmentverification_669() { return null; }
