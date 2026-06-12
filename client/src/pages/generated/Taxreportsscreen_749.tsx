// AUTO-GENERATED DRAFT SCREEN: TaxReportsScreen
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Skeleton } from './components/ui/skeleton';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Terminal } from 'lucide-react';

interface TaxReport {
  id: string;
  year: number;
  status: 'generated' | 'pending' | 'failed';
  downloadUrl: string;
}

const TaxReportsScreen: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Simulate fetching tax reports with tRPC
  const { data: taxReports, isLoading, isError, error } = trpc.tax.getReports.useQuery();

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Tax Reports</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark theme"
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </div>

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        )}

        {isError && (
          <Alert variant="destructive" className="mb-6">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load tax reports: {error?.message || 'Unknown error'}
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !isError && (!taxReports || taxReports.length === 0) && (
          <Alert className="mb-6">
            <AlertTitle>No Reports</AlertTitle>
            <AlertDescription>
              No tax reports available at this time.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {taxReports?.map((report) => (
            <Card key={report.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>Tax Report {report.year}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Status: {report.status}</p>
                {report.status === 'generated' && (
                  <Button onClick={() => handleDownload(report.downloadUrl)} className="w-full">
                    Download
                  </Button>
                )}
                {report.status === 'pending' && (
                  <Button disabled className="w-full">
                    Generating...
                  </Button>
                )}
                {report.status === 'failed' && (
                  <Button variant="destructive" disabled className="w-full">
                    Failed
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaxReportsScreen;
