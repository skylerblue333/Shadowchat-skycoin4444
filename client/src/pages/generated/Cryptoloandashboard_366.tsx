// AUTO-GENERATED DRAFT SCREEN: CryptoLoanDashboard
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC hook
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui Card
import { Button } from '@/components/ui/button'; // shadcn/ui Button
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui Skeleton for loading states

interface LoanData {
  id: string;
  amount: number;
  currency: string;
  interestRate: number;
  status: 'active' | 'paid' | 'defaulted';
  dueDate: string;
}

interface CryptoLoanDashboardProps {
  // Define any props here if needed
}

const CryptoLoanDashboard: React.FC<CryptoLoanDashboardProps> = () => {
  // Placeholder for tRPC query
  const { data: loans, isLoading, isError, error } = useQuery<LoanData[]>(
    ['cryptoLoans'],
    async () => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: '1', amount: 10000, currency: 'BTC', interestRate: 0.05, status: 'active', dueDate: '2024-12-31' },
            { id: '2', amount: 5000, currency: 'ETH', interestRate: 0.07, status: 'paid', dueDate: '2024-11-15' },
          ]);
        }, 1000);
      });
    }
  );

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500 p-4">Error loading loans: {error?.message}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Crypto Loan Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loans?.map((loan) => (
          <Card key={loan.id} className="bg-card text-card-foreground shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Loan ID: {loan.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Amount: {loan.amount} {loan.currency}</p>
              <p>Interest Rate: {loan.interestRate * 100}%</p>
              <p>Status: <span className={`font-medium ${loan.status === 'active' ? 'text-green-500' : loan.status === 'paid' ? 'text-blue-500' : 'text-red-500'}`}>{loan.status}</span></p>
              <p>Due Date: {loan.dueDate}</p>
              <Button className="mt-4">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CryptoLoanDashboard;
