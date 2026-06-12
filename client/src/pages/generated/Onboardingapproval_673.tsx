// AUTO-GENERATED DRAFT SCREEN: OnboardingApproval
import React, { useState, useEffect } from 'react';
import { useForm } from '@hookform/resolvers/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { useTRPCMutation, useTRPCQuery } from '../utils/trpc'; // Assuming tRPC setup
import { Loader2 } from 'lucide-react';

const approvalSchema = z.object({
  approverName: z.string().min(2, { message: 'Approver name must be at least 2 characters.' }),
  approvalNotes: z.string().optional(),
});

type ApprovalFormValues = z.infer<typeof approvalSchema>;

interface OnboardingApprovalProps {
  onboardingId: string;
  onApprovalSuccess?: () => void;
  onApprovalError?: (error: any) => void;
}

const OnboardingApproval: React.FC<OnboardingApprovalProps> = ({ onboardingId, onApprovalSuccess, onApprovalError }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ApprovalFormValues>({
    resolver: zodResolver(approvalSchema),
    defaultValues: {
      approverName: '',
      approvalNotes: '',
    },
  });

  // Simulate tRPC query for initial data (e.g., current status)
  const { data: onboardingStatus, isLoading: isLoadingStatus, error: statusError } = useTRPCQuery(['onboarding.getStatus', { id: onboardingId }]);

  // Simulate tRPC mutation for approval action
  const { mutate: approveOnboarding, isLoading: isApproving, error: approvalError } = useTRPCMutation(['onboarding.approve']);

  useEffect(() => {
    if (approvalError) {
      console.error('Approval failed:', approvalError);
      onApprovalError?.(approvalError);
    }
    if (statusError) {
      console.error('Failed to load status:', statusError);
    }
  }, [approvalError, statusError, onApprovalError]);

  const onSubmit = async (data: ApprovalFormValues) => {
    try {
      await approveOnboarding({ onboardingId, ...data });
      onApprovalSuccess?.();
    } catch (error) {
      console.error('Submission error:', error);
      onApprovalError?.(error);
    }
  };

  if (isLoadingStatus) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading onboarding status" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (statusError) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-red-500">
        <p role="alert">Error loading onboarding status: {statusError.message}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkTheme ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Onboarding Approval</CardTitle>
          <CardDescription>Review and approve the onboarding process for ID: {onboardingId}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="approverName">Approver Name</Label>
              <Input
                id="approverName"
                type="text"
                placeholder="John Doe"
                {...register('approverName')}
                aria-invalid={errors.approverName ? "true" : "false"}
              />
              {errors.approverName && <p className="text-red-500 text-sm" role="alert">{errors.approverName.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="approvalNotes">Approval Notes (Optional)</Label>
              <Input
                id="approvalNotes"
                type="text"
                placeholder="Add any relevant notes"
                {...register('approvalNotes')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode-switch">Dark Mode</Label>
              <Switch
                id="dark-mode-switch"
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
                aria-label="Toggle dark mode"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isApproving}>
              {isApproving ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Approving...</>
              ) : (
                'Approve Onboarding'
              )}
            </Button>
            {approvalError && <p className="text-red-500 text-sm mt-2" role="alert">Approval failed: {approvalError.message}</p>}
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ensure all details are verified before approving.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingApproval;
