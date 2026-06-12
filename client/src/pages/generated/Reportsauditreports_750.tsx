// AUTO-GENERATED DRAFT SCREEN: ReportsAuditReports
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface AuditReport {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

// Mock data for demonstration purposes
const mockAuditReports: AuditReport[] = [
  { id: '1', action: 'Login', user: 'admin', timestamp: '2023-10-26T10:00:00Z', details: 'Successful login' },
  { id: '2', action: 'Create User', user: 'admin', timestamp: '2023-10-26T10:05:00Z', details: 'User \'john.doe\' created' },
  { id: '3', action: 'Delete Report', user: 'john.doe', timestamp: '2023-10-26T10:15:00Z', details: 'Report \'Q3 Sales\' deleted' },
  { id: '4', action: 'Update Profile', user: 'jane.smith', timestamp: '2023-10-26T10:20:00Z', details: 'Profile updated by jane.smith' },
];

const ReportsAuditReports: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  const { data, isLoading, isError } = trpc.audit.getReports.useQuery();

  const auditReports = data || mockAuditReports; // Use mock data if tRPC data is not available

  return (
    <div className="p-4 space-y-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold">Audit Reports</h1>

      <div className="flex items-center space-x-2">
        <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={handleDarkModeToggle} aria-label="Toggle dark mode" />
        <Label htmlFor="dark-mode">Dark Mode</Label>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Audit Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : isError ? (
            <p className="text-red-500">Error loading audit reports.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.action}</TableCell>
                    <TableCell>{report.user}</TableCell>
                    <TableCell>{new Date(report.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{report.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
        <p>&copy; {new Date().getFullYear()} SKYCOIN4444. All rights reserved.</p>
        <p>Data last updated: {new Date().toLocaleString()}</p>
      </footer>
    </div>
  );
};

export default ReportsAuditReports;
