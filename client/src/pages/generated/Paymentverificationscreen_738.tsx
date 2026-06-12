// AUTO-GENERATED DRAFT SCREEN: PaymentVerificationScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PaymentVerificationProps {
  paymentId: string;
}

const PaymentVerificationScreen: React.FC<PaymentVerificationProps> = ({ paymentId }) => {
  const { data, isLoading, isError, error, refetch } = trpc.payment.verify.useQuery(
    { paymentId },
    { retry: false, staleTime: Infinity }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900">
        <Card className="w-[350px] dark:bg-gray-800 dark:text-gray-100">
          <CardHeader>
            <CardTitle>Verifying Payment</CardTitle>
            <CardDescription>Please wait while we confirm your payment.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading payment verification" />
            <p className="text-sm text-muted-foreground">This may take a moment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900">
        <Card className="w-[350px] dark:bg-gray-800 dark:text-gray-100">
          <CardHeader>
            <CardTitle>Payment Verification Failed</CardTitle>
            <CardDescription>There was an issue verifying your payment.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="text-red-500 text-sm">Error: {error?.message || 'Unknown error'}</p>
            <Button onClick={() => refetch()} className="w-full">Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900">
      <Card className="w-[350px] dark:bg-gray-800 dark:text-gray-100">
        <CardHeader>
          <CardTitle>{data?.isVerified ? 'Payment Verified!' : 'Payment Not Verified'}</CardTitle>
          <CardDescription>
            {data?.isVerified
              ? 'Your payment has been successfully verified.'
              : 'We could not verify your payment. Please contact support if you believe this is an error.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {data?.isVerified ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-label="Payment verified successfully"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-label="Payment not verified"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <Button onClick={() => refetch()} className="w-full">Check Status Again</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentVerificationScreen;
