// AUTO-GENERATED DRAFT SCREEN: PaymentRetryScreen

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRetryPayment } from '@/lib/trpc/hooks'; // Assuming tRPC hooks are set up for payment retry logic
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon, CheckCircledIcon } from '@radix-ui/react-icons'; // Added CheckCircledIcon for success
import { Spinner } from '@/components/ui/spinner'; // Assuming a spinner component for loading states

// Zod schema for form validation
const formSchema = z.object({
  paymentMethodId: z.string().min(1, { message: 'Payment method ID is required.' }),
});

// Type definition for form data
type FormData = z.infer<typeof formSchema>;

// Props interface for the PaymentRetryScreen component
interface PaymentRetryScreenProps {
  invoiceId: string; // The ID of the invoice for which payment needs to be retried
  onRetrySuccess?: () => void; // Optional callback for successful payment retry
  onRetryError?: (error: Error) => void; // Optional callback for failed payment retry
}

/**
 * PaymentRetryScreen Component
 * A production-grade React 19 screen for retrying payments.
 * It includes form validation with Zod, state management with React hooks,
 * tRPC integration for backend communication, loading states, error handling,
 * dark theme support (via Tailwind CSS classes), and accessibility considerations.
 */
const PaymentRetryScreen: React.FC<PaymentRetryScreenProps> = ({
  invoiceId,
  onRetrySuccess,
  onRetryError,
}) => {
  // Initialize react-hook-form for form management and validation
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema), // Integrate Zod for schema-based validation
  });

  // tRPC hook for retrying payment. Handles mutation, loading, error, and success states.
  const { mutate: retryPayment, isLoading, isError, error, isSuccess } = useRetryPayment();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State to control success alert visibility

  // Handler for form submission
  const onSubmit = (data: FormData) => {
    setShowSuccessAlert(false); // Reset success alert on new submission
    retryPayment(
      { invoiceId, paymentMethodId: data.paymentMethodId },
      {
        onSuccess: () => {
          setShowSuccessAlert(true); // Show success alert on successful mutation
          onRetrySuccess?.(); // Invoke optional success callback
        },
        onError: (err) => {
          onRetryError?.(err); // Invoke optional error callback
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md dark:bg-gray-800 dark:text-gray-50 shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold text-gray-900 dark:text-white">Payment Retry</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
            Please enter your preferred payment method details to retry the payment for invoice <span className="font-semibold">{invoiceId}</span>.
            Ensure the details are correct to avoid further issues.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="paymentMethodId" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Payment Method ID
              </Label>
              <Input
                id="paymentMethodId"
                type="text"
                placeholder="e.g., pm_123abc456def789ghi"
                {...register('paymentMethodId')}
                className="dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-invalid={errors.paymentMethodId ? "true" : "false"}
                aria-describedby="paymentMethodId-error"
              />
              {errors.paymentMethodId && (
                <p id="paymentMethodId-error" className="text-red-500 text-sm mt-1" role="alert">
                  {errors.paymentMethodId.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200 ease-in-out"
              disabled={isLoading || isSubmitting}
            >
              {(isLoading || isSubmitting) ? (
                <span className="flex items-center justify-center">
                  <Spinner className="mr-2 h-4 w-4 animate-spin" /> Retrying...
                </span>
              ) : (
                'Retry Payment'
              )}
            </Button>
          </form>

          {/* Error Alert */}
          {isError && error && (
            <Alert variant="destructive" className="mt-6 dark:bg-red-900 dark:border-red-800 dark:text-red-100">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-300" />
              <AlertTitle className="font-bold">Payment Retry Failed</AlertTitle>
              <AlertDescription className="text-sm">
                There was an issue retrying your payment: {error.message || 'An unknown error occurred.'}
                Please check your payment method details and try again, or contact support if the problem persists.
              </AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {isSuccess && showSuccessAlert && (
            <Alert className="mt-6 dark:bg-green-900 dark:border-green-800 dark:text-green-100">
              <CheckCircledIcon className="h-5 w-5 text-green-300" />
              <AlertTitle className="font-bold">Payment Retry Successful!</AlertTitle>
              <AlertDescription className="text-sm">
                Your payment retry has been successfully initiated. You will receive a confirmation shortly.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentRetryScreen;
