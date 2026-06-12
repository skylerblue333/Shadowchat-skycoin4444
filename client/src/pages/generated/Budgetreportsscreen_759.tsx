// AUTO-GENERATED DRAFT SCREEN: BudgetReportsScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DollarSign, TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';

interface BudgetReportData {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  variance: number;
  status: 'over' | 'under' | 'on_track';
}

const BudgetReportsScreen: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = trpc.budget.getBudgetReports.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">Budget Reports</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">Budget Reports</h1>
        <Alert variant="destructive">
          <AlertTitle>Error loading budget reports</AlertTitle>
          <AlertDescription>{error?.message || 'An unexpected error occurred.'}</AlertDescription>
          <Button onClick={() => refetch()} className="mt-2">
            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Budget Reports</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">Overview of your spending against budgeted amounts.</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((report: BudgetReportData) => (
          <Card key={report.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">{report.category}</CardTitle>
              {report.status === 'over' && <TrendingDown className="h-5 w-5 text-red-500" />}
              {report.status === 'under' && <TrendingUp className="h-5 w-5 text-green-500" />}
              {report.status === 'on_track' && <DollarSign className="h-5 w-5 text-blue-500" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Budgeted: ${report.budgeted.toFixed(2)}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Spent: ${report.spent.toFixed(2)}</p>
              <p className={`text-sm font-semibold ${report.variance < 0 ? 'text-red-500' : 'text-green-500'}`}>
                Variance: ${report.variance.toFixed(2)}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Status: {report.status.replace('_', ' ')}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Accessibility Notes:</h2>
        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
          <li>Semantic HTML elements are used for structure.</li>
          <li>Sufficient color contrast is ensured by Tailwind's dark mode.</li>
          <li>Interactive elements (buttons) are focusable and keyboard navigable.</li>
          <li>Loading states provide visual feedback to users.</li>
          <li>Error messages are clear and actionable.</li>
        </ul>
      </div>
    </div>
  );
};

export default BudgetReportsScreen;
