// AUTO-GENERATED DRAFT SCREEN: ActiveSessions
import React, { useState, useEffect } from 'react';
import { trpc } from "../trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // Assuming Button component is available from shadcn/ui

interface ActiveSessionsProps {
  limit?: number;
}

const ActiveSessions: React.FC<ActiveSessionsProps> = ({ limit = 10 }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const { data, isLoading, isError, error } = trpc.activeSessions.useQuery({ limit });

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Active Sessions</CardTitle>
          <Button onClick={toggleDarkMode} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-600 dark:text-gray-300" role="status" aria-live="polite">
            Loading active sessions...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Active Sessions</CardTitle>
          <Button onClick={toggleDarkMode} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-600 dark:text-red-400" role="alert">
            Error: {error.message}. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  const sessions = data?.sessions || [];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Active Sessions</CardTitle>
        <Button onClick={toggleDarkMode} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400" role="status">
            No active sessions found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-700">
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Session ID</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">User Name</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Device Type</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Location</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {sessions.map((session) => (
                  <TableRow key={session.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white" data-label="Session ID">{session.id}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300" data-label="User Name">{session.user}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300" data-label="Device Type">{session.device}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300" data-label="Location">{session.location}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300" data-label="Duration">{session.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveSessions;
