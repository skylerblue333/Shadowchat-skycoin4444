// AUTO-GENERATED DRAFT SCREEN: CryptoPaymentConfirmation
import React, { useState } from 'react';
import { trpc } from '../trpc';
import { Button } from './ui/button'; // Assuming shadcn/ui button component
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui card components
import { Loader2 } from 'lucide-react'; // Assuming lucide-react for loading spinner

interface CryptoPaymentConfirmationProps {
  transactionId?: string;
}

const CryptoPaymentConfirmation: React.FC<CryptoPaymentConfirmationProps> = ({ transactionId: propTransactionId }) => {
  const [transactionId, setTransactionId] = useState(propTransactionId || 'mock_success_id'); // Default to success for demonstration

  const { data, isLoading, isError, error, refetch } = trpc.payment.query(
    { transactionId },
    { 
      enabled: !!transactionId, // Only fetch if transactionId is available
      retry: 1, // Retry once on failure
    }
  );

  const handleRetry = () => {
    setTransactionId('mock_success_id'); // Reset to a known good ID for retry example
    refetch();
  };

  const handleNewPayment = () => {
    setTransactionId(''); // Clear transaction ID to simulate new payment flow
    // In a real application, this would navigate to a new payment initiation screen
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Payment Confirmation</CardTitle>
          <CardDescription className="text-center">
            {isLoading && "Verifying your payment..."}
            {isError && "There was an issue with your payment."}
            {!isLoading && !isError && data?.status === 'success' && "Your payment has been successfully processed!"}
            {!isLoading && !isError && data?.status === 'pending' && "Your payment is pending. Please check back later."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {isLoading && (
            <div className="flex justify-center items-center h-24" role="status" aria-live="polite">
              <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
              <span className="sr-only">Loading...</span>
            </div>
          )}

          {isError && (
            <div className="text-center text-destructive" role="alert">
              <p className="font-medium">Error: {error?.message || 'Unknown error'}</p>
              <p className="text-sm text-muted-foreground">Please try again or contact support.</p>
            </div>
          )}

          {!isLoading && !isError && data && (
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">Status: <span className="capitalize">{data.status}</span></p>
              <p className="text-muted-foreground">{data.message}</p>
              {data.status === 'success' && (
                <p className="text-sm text-green-500 mt-2">Transaction ID: {transactionId}</p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          {isError && (
            <Button onClick={handleRetry} aria-label="Retry payment confirmation">
              Retry
            </Button>
          )}
          {!isLoading && (
            <Button onClick={handleNewPayment} variant="outline" aria-label="Start a new payment">
              New Payment
            </Button>
          )}
          {!isLoading && data?.status === 'success' && (
            <Button aria-label="Go to dashboard">
              Go to Dashboard
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CryptoPaymentConfirmation;
