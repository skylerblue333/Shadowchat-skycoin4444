// AUTO-GENERATED DRAFT SCREEN: CryptoErrorPage
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface CryptoErrorPageProps {
  statusCode?: number;
  message?: string;
  onRetry?: () => void;
}

const CryptoErrorPage: React.FC<CryptoErrorPageProps> = ({
  statusCode = 500,
  message = 'An unexpected error occurred. Please try again later.',
  onRetry,
}) => {
  // Placeholder for tRPC hooks, error handling, and loading states
  // In a real application, tRPC hooks would be used to fetch data or trigger actions
  // and handle their loading and error states.

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Default retry action, e.g., refresh the page
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 dark:bg-gray-900">
      <Card className="w-full max-w-md text-center shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-primary dark:text-blue-400">Error {statusCode}</CardTitle>
          <CardDescription className="text-muted-foreground dark:text-gray-400">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-foreground dark:text-gray-200">
            We're sorry, but something went wrong. Please check your internet connection
            or try again.
          </p>
          {onRetry && (
            <Button onClick={handleRetry} className="w-full">
              Retry
            </Button>
          )}
          <Button variant="outline" onClick={() => window.history.back()} className="w-full">
            Go Back
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-500 dark:text-gray-600">
          <p>&copy; {new Date().getFullYear()} SKYCOIN4444. All rights reserved.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CryptoErrorPage;
