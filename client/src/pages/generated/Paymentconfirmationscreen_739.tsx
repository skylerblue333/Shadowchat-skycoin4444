// AUTO-GENERATED DRAFT SCREEN: PaymentConfirmationScreen
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query

interface PaymentConfirmationScreenProps {
  paymentId: string;
}

const PaymentConfirmationScreen: React.FC<PaymentConfirmationScreenProps> = ({ paymentId }) => {
  // Simulate fetching payment status with tRPC hook (using react-query for demonstration)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['paymentStatus', paymentId],
    queryFn: async () => {
      // Replace with actual tRPC call
      return new Promise((resolve) => {
        setTimeout(() => {
          if (paymentId === 'success123') {
            resolve({ status: 'success', message: 'Your payment was successful!' });
          } else {
            resolve({ status: 'failed', message: 'Your payment could not be processed.' });
          }
        }, 1500);
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Processing Payment</CardTitle>
            <CardDescription>Please wait while we confirm your payment.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-red-500">Payment Error</CardTitle>
            <CardDescription>An error occurred: {error?.message || 'Unknown error'}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center py-8">
            <XCircleIcon className="h-16 w-16 text-red-500" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const isSuccess = data?.status === 'success';

  return (
    <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {isSuccess ? (
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          )}
          <CardTitle className={isSuccess ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
            {isSuccess ? 'Payment Confirmed!' : 'Payment Failed'}
          </CardTitle>
          <CardDescription>
            {data?.message}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Transaction ID: <span className="font-medium">{paymentId}</span>
          </p>
          {isSuccess && (
            <p className="mt-2 text-sm text-muted-foreground dark:text-gray-400">
              Thank you for your purchase.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center pt-6">
          <Button className="w-full max-w-[200px]">Go to Dashboard</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentConfirmationScreen;
