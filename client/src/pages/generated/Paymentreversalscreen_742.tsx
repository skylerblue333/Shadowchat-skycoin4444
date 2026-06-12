// AUTO-GENERATED DRAFT SCREEN: PaymentReversalScreen

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes'; // For dark theme integration
import { toast } from 'sonner'; // For displaying user notifications

// Define the structure for the payment reversal form data
interface PaymentReversalForm {
  transactionId: string;
  reason: string;
}

/**
 * PaymentReversalScreen Component
 * A production-grade React 19 screen for initiating payment reversals.
 * Features:
 * - Fully typed TSX
 * - Tailwind 4 for styling
 * - shadcn/ui components for a consistent UI
 * - tRPC hooks for data mutations
 * - Comprehensive error handling
 * - Loading states for user feedback
 * - Dark theme support
 * - Accessibility considerations
 */
const PaymentReversalScreen: React.FC = () => {
  // State to manage form input values
  const [formData, setFormData] = useState<PaymentReversalForm>({
    transactionId: '',
    reason: '',
  });
  // Access the current theme (light/dark) for dynamic styling
  const { theme } = useTheme();

  // tRPC mutation hook for reversing payments
  const reversalMutation = trpc.payments.reversePayment.useMutation({
    onSuccess: () => {
      // Display success notification and reset form on successful reversal
      toast.success('Payment reversal initiated successfully!');
      setFormData({ transactionId: '', reason: '' });
    },
    onError: (error) => {
      // Display error notification if reversal fails
      toast.error(`Reversal failed: ${error.message}`);
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger the tRPC mutation with current form data
    reversalMutation.mutate(formData);
  };

  // Handle input changes and update form data state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4
        ${theme === 'dark' ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}
      `}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Payment Reversal</CardTitle>
          <CardDescription>Initiate a reversal for a previously processed payment.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="transactionId" className="text-sm font-medium">Transaction ID</Label>
              <Input
                id="transactionId"
                type="text"
                placeholder="Enter transaction ID"
                value={formData.transactionId}
                onChange={handleChange}
                required
                aria-label="Transaction ID"
                disabled={reversalMutation.isLoading} // Disable input during loading
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason" className="text-sm font-medium">Reason for Reversal</Label>
              <Input
                id="reason"
                type="text"
                placeholder="e.g., Customer requested, incorrect amount"
                value={formData.reason}
                onChange={handleChange}
                required
                aria-label="Reason for Reversal"
                disabled={reversalMutation.isLoading} // Disable input during loading
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={reversalMutation.isLoading || !formData.transactionId || !formData.reason}
              aria-live="polite" // Announce loading state for screen readers
            >
              {reversalMutation.isLoading ? 'Reversing...' : 'Initiate Reversal'}
            </Button>
            {reversalMutation.isError && (
              <div className="text-red-500 text-sm mt-2" role="alert">
                <p className="font-semibold">Error:</p>
                <p>{reversalMutation.error?.message || 'An unknown error occurred during reversal.'}</p>
                {/* Optionally, add more detailed error information here */}
                {reversalMutation.error?.data?.code && (
                  <p>Error Code: {reversalMutation.error.data.code}</p>
                )}
              </div>
            )}
            {reversalMutation.isSuccess && (
              <p className="text-green-500 text-sm mt-2" role="status">
                Reversal request sent successfully. You will be notified of the final status.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentReversalScreen;
