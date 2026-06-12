// AUTO-GENERATED DRAFT SCREEN: OnboardingAppeal

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
// import { trpc } from '@/trpc'; // Uncomment when a tRPC server is available

// Mock tRPC client for demonstration purposes
const trpc = {
  onboarding: {
    appeal: {
      useMutation: () => {
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState<Error | null>(null);
        const mutate = async (data: any) => {
          setIsLoading(true);
          setError(null);
          try {
            // Simulate API call
            await new Promise((resolve, reject) => {
              setTimeout(() => {
                if (Math.random() > 0.1) { // Simulate 10% failure rate
                  resolve({ success: true, message: 'Appeal submitted successfully' });
                } else {
                  reject(new Error('Network error or server issue.'));
                }
              }, 1500);
            });
            return { success: true };
          } catch (e) {
            setError(e as Error);
            throw e;
          } finally {
            setIsLoading(false);
          }
        };
        return { mutate, isLoading, error };
      },
    },
  },
};

// Define the form schema using Zod
const formSchema = z.object({
  reason: z.string().min(10, { message: 'Reason must be at least 10 characters.' }),
  contactEmail: z.string().email({ message: 'Invalid email address.' }),
  agreeToTerms: z.boolean().refine(val => val === true, { message: 'You must agree to the terms.' }),
});

type FormData = z.infer<typeof formSchema>;

const OnboardingAppeal: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Mock tRPC mutation hook
  const { mutate, isLoading, error } = trpc.onboarding.appeal.useMutation();

  const onSubmit = async (data: FormData) => {
    try {
      await mutate(data);
      setIsSubmitted(true);
    } catch (err) {
      // Error is already set by the mock mutate function
      console.error("Submission error:", err);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Appeal Submitted!</CardTitle>
            <CardDescription>Thank you for submitting your appeal. We will review it shortly.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-green-500">Your appeal has been successfully received.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Onboarding Appeal</CardTitle>
          <CardDescription className="text-center">Please provide details for your appeal.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="reason" className="text-lg">Reason for Appeal</Label>
              <Input
                id="reason"
                placeholder="Explain why you believe your account should be reinstated..."
                {...register('reason')}
                aria-invalid={errors.reason ? "true" : "false"}
                className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              {errors.reason && <p role="alert" className="text-red-500 text-sm mt-1">{errors.reason.message}</p>}
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="contactEmail" className="text-lg">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="your@example.com"
                {...register('contactEmail')}
                aria-invalid={errors.contactEmail ? "true" : "false"}
                className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              {errors.contactEmail && <p role="alert" className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>}
            </div>
            <div className="flex items-center space-x-3">
              <Switch
                id="agreeToTerms"
                {...register('agreeToTerms')}
                aria-invalid={errors.agreeToTerms ? "true" : "false"}
                className="data-[state=checked]:bg-blue-600"
              />
              <Label htmlFor="agreeToTerms" className="text-base cursor-pointer">I agree to the terms and conditions</Label>
            </div>
            {errors.agreeToTerms && <p role="alert" className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>}
            {error && <p role="alert" className="text-red-500 text-sm text-center mt-4">{error.message}</p>}
            <Button type="submit" className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
                    disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Appeal'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingAppeal;
