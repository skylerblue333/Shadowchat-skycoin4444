// AUTO-GENERATED DRAFT SCREEN: CryptoUndercollateralizedLoanScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface LoanData {
  id: string;
  asset: string;
  collateralRequired: number;
  collateralProvided: number;
  loanAmount: number;
  interestRate: number;
  status: 'active' | 'defaulted' | 'paid';
}

const fetchUndercollateralizedLoans = async (): Promise<LoanData[]> => {
  // Simulate API call with tRPC
  // In a real application, this would be: const data = await trpc.loan.getUndercollateralized.query();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'loan-123',
          asset: 'ETH',
          collateralRequired: 10000,
          collateralProvided: 8000,
          loanAmount: 5000,
          interestRate: 0.05,
          status: 'active',
        },
        {
          id: 'loan-456',
          asset: 'BTC',
          collateralRequired: 50000,
          collateralProvided: 45000,
          loanAmount: 25000,
          interestRate: 0.07,
          status: 'active',
        },
      ]);
    }, 1000);
  });
};

const CryptoUndercollateralizedLoanScreen: React.FC = () => {
  const { data: loans, isLoading, isError, error } = useQuery<LoanData[], Error>(
    ['undercollateralizedLoans'],
    fetchUndercollateralizedLoans
  );

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4" aria-live="polite" aria-atomic="true">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <Alert variant="destructive" role="alert">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load under-collateralized loans: {error?.message || 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${isDarkTheme ? 'dark' : ''}`}>
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Under-Collateralized Loans</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode-switch"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-switch">Dark Mode</Label>
          </div>
        </header>

        <section aria-labelledby="loan-list-heading">
          <h2 id="loan-list-heading" className="sr-only">List of Under-Collateralized Loans</h2>
          {loans && loans.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loans.map((loan) => (
                <Card key={loan.id} className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Loan ID: {loan.id}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Asset:</strong> {loan.asset}</p>
                    <p><strong>Required Collateral:</strong> {loan.collateralRequired}</p>
                    <p><strong>Provided Collateral:</strong> {loan.collateralProvided}</p>
                    <p><strong>Loan Amount:</strong> {loan.loanAmount}</p>
                    <p><strong>Interest Rate:</strong> {loan.interestRate * 100}%</p>
                    <p><strong>Status:</strong> <span className={`font-medium ${loan.status === 'active' ? 'text-yellow-500' : ''}`}>{loan.status}</span></p>
                    <Button className="w-full mt-4">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No under-collateralized loans found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default CryptoUndercollateralizedLoanScreen;
