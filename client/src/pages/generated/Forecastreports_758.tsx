// AUTO-GENERATED DRAFT SCREEN: ForecastReports
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

interface ForecastData {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

const ForecastReports: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data, isLoading, isError, error } = trpc.forecast.getForecastReports.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load forecast data: {error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Forecast Reports for SKYCOIN4444</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <SunIcon className="h-[1.2rem] w-[1.2rem]" /> : <MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((report: ForecastData, index: number) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Report for {report.date}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Revenue:</strong> ${report.revenue.toLocaleString()}</p>
                <p><strong>Expenses:</strong> ${report.expenses.toLocaleString()}</p>
                <p><strong>Profit:</strong> ${report.profit.toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-card rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <p>This section would typically include charts, graphs, or further aggregated data based on the forecast reports.</p>
          <p>For example, a trend line of profit over time or a breakdown of revenue sources.</p>
        </div>
      </div>
    </div>
  );
};

export default ForecastReports;
