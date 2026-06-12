// AUTO-GENERATED DRAFT SCREEN: PaymentDispute
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTRPCQuery, useTRPCMutation } from '@/lib/trpc'; // Placeholder for tRPC hooks

// Zod schema for form validation
const formSchema = z.object({
  transactionId: z.string().min(1, { message: 'Transaction ID is required.' }),
  reason: z.string().min(10, { message: 'Reason must be at least 10 characters.' }),
  evidence: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface PaymentDisputeProps {
  initialTransactionId?: string;
}

const PaymentDispute: React.FC<PaymentDisputeProps> = ({ initialTransactionId }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionId: initialTransactionId || '',
      reason: '',
      evidence: '',
    },
  });

  // Placeholder for tRPC query (e.g., fetching dispute types)
  const { data: disputeOptions, isLoading: isLoadingOptions, error: optionsError } = useTRPCQuery(['dispute.getOptions']);

  // Placeholder for tRPC mutation (e.g., submitting a dispute)
  const { mutate: submitDispute, isLoading: isSubmittingDispute, error: submitError } = useTRPCMutation(['dispute.submit']);

  const onSubmit = async (data: FormData) => {
    try {
      await submitDispute(data);
      alert('Dispute submitted successfully!');
      // Optionally reset form or redirect
    } catch (error) {
      console.error('Failed to submit dispute:', error);
      alert('Failed to submit dispute. Please try again.');
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  if (isLoadingOptions) {
    return <div className="flex justify-center items-center min-h-screen">Loading dispute options...</div>;
  }

  if (optionsError) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error loading options: {optionsError.message}</div>;
  }

  return (
    <div className={`min-h-screen bg-background text-foreground flex items-center justify-center p-4 ${isDarkTheme ? 'dark' : ''}`} role="main">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center">Payment Dispute</CardTitle>
          <CardDescription className="text-center text-muted-foreground mt-2">Report an unauthorized or incorrect transaction.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-end items-center space-x-2">
              <Label htmlFor="dark-mode-switch">Dark Mode</Label>
              <Switch
                id="dark-mode-switch"
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
                aria-label="Toggle dark mode"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input
                id="transactionId"
                type="text"
                placeholder="Enter transaction ID"
                {...register('transactionId')}
                aria-invalid={errors.transactionId ? "true" : "false"}
                aria-describedby="transactionId-error"
              />
              {errors.transactionId && (
                <p id="transactionId-error" className="text-sm text-red-500">{errors.transactionId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Dispute</Label>
              <Textarea
                id="reason"
                placeholder="Describe the reason for your dispute..."
                {...register('reason')}
                rows={5}
                aria-invalid={errors.reason ? "true" : "false"}
                aria-describedby="reason-error"
              />
              {errors.reason && (
                <p id="reason-error" className="text-sm text-red-500">{errors.reason.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="evidence">Supporting Evidence (Optional)</Label>
              <Input
                id="evidence"
                type="file"
                {...register('evidence')}
                aria-describedby="evidence-hint"
              />
              <p id="evidence-hint" className="text-sm text-muted-foreground">Upload screenshots, receipts, or other relevant documents.</p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || isSubmittingDispute}
              aria-live="polite"
            >
              {(isSubmitting || isSubmittingDispute) ? 'Submitting...' : 'Submit Dispute'}
            </Button>

            {submitError && (
              <p className="text-sm text-red-500 text-center mt-4" role="alert">Submission Error: {submitError.message}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentDispute;
