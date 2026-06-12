// AUTO-GENERATED DRAFT SCREEN: TaxReportsScreen
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface TaxReport {
  id: string;
  year: number;
  status: 'pending' | 'generated' | 'failed';
  downloadUrl?: string;
  error?: string;
}

const TaxReportsScreen: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const { data: reports, isLoading, isError, error } = trpc.tax.getReports.useQuery();

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
    return (
      <div className="p-4 text-red-500" role="alert">
        <h2 className="text-lg font-semibold">Error loading tax reports:</h2>
        <p>{error?.message || 'An unknown error occurred.'}</p>
        <Button onClick={() => trpc.tax.getReports.invalidate()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 bg-background text-foreground min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Crypto Tax Reports</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-switch"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-switch">Dark Mode</Label>
        </div>
      </div>

      {reports?.length === 0 ? (
        <p className="text-center text-muted-foreground">No tax reports found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports?.map((report) => (
            <Card key={report.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>Tax Report {report.year}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div>
                  <p>Status: <span className={`font-medium ${report.status === 'generated' ? 'text-green-500' : report.status === 'failed' ? 'text-red-500' : 'text-yellow-500'}`}>{report.status}</span></p>
                  {report.error && <p className="text-red-500 text-sm mt-1">Error: {report.error}</p>}
                </div>
                {report.downloadUrl && (
                  <Button asChild className="mt-4">
                    <a href={report.downloadUrl} target="_blank" rel="noopener noreferrer" aria-label={`Download tax report for ${report.year}`}>
                      Download Report
                    </a>
                  </Button>
                )}
                {!report.downloadUrl && report.status === 'pending' && (
                  <Button className="mt-4" disabled>
                    Generating...
                  </Button>
                )}
                {!report.downloadUrl && report.status === 'failed' && (
                  <Button className="mt-4" onClick={() => console.log(`Retrying report ${report.id}`)}>
                    Retry Generation
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaxReportsScreen;
