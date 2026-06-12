// AUTO-GENERATED DRAFT SCREEN: ComplianceReports
import React, { useState, useEffect } from 'react';
import { useQuery } from '@trpc/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface ComplianceReport {
  id: string;
  name: string;
  status: 'compliant' | 'non-compliant' | 'pending';
  lastUpdated: string;
  details: string;
}

const ComplianceReports: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const { data: reports, isLoading, isError, error } = trpc.getComplianceReports.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Compliance Reports</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2 dark:bg-gray-700" />
                <Skeleton className="h-4 w-1/2 dark:bg-gray-700" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2 dark:bg-gray-700" />
                <Skeleton className="h-4 w-5/6 dark:bg-gray-700" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Compliance Reports</h1>
        <Alert variant="destructive" className="dark:bg-red-900 dark:border-red-700">
          <Terminal className="h-4 w-4 dark:text-red-300" />
          <AlertTitle className="dark:text-red-300">Error</AlertTitle>
          <AlertDescription className="dark:text-red-400">
            Failed to load compliance reports: {error?.message || 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Compliance Reports</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-switch"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-switch" className="dark:text-gray-300">Dark Mode</Label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports?.map((report) => (
          <Card key={report.id} className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">{report.name}</CardTitle>
              <p className={`text-sm ${report.status === 'compliant' ? 'text-green-500' : report.status === 'non-compliant' ? 'text-red-500' : 'text-yellow-500'}`}>
                Status: {report.status.replace('-', ' ').toUpperCase()}
              </p>
            </CardHeader>
            <CardContent className="dark:text-gray-300">
              <p className="text-sm mb-2">Last Updated: {new Date(report.lastUpdated).toLocaleDateString()}</p>
              <p className="text-sm">{report.details}</p>
              <Button className="mt-4 w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComplianceReports;
