// AUTO-GENERATED DRAFT SCREEN: LearningAnalyticsScreen
import React, { useState, useEffect } from 'react';
import { useQuery } from '@trpc/react-query';
import { api } from '@/utils/api'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface LearningAnalyticsData {
  totalCourses: number;
  completedCourses: number;
  averageScore: number;
  activeStudents: number;
}

const LearningAnalyticsScreen: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<LearningAnalyticsData>(
    ['learningAnalytics.getAnalytics'], // tRPC procedure name
    { retry: false } // Disable retry for immediate error display
  );

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Learning Analytics</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-6 w-3/4 dark:bg-gray-700" />
                <Skeleton className="h-6 w-6 rounded-full dark:bg-gray-700" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-1/2 dark:bg-gray-700" />
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
        <Alert variant="destructive" className="dark:bg-red-900 dark:border-red-800 dark:text-red-100">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load learning analytics data: {error?.message || 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen" role="region" aria-label="Learning Analytics Dashboard">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100" tabIndex={0}>Learning Analytics</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Courses</CardTitle>
            <Terminal className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data?.totalCourses}</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed Courses</CardTitle>
            <Terminal className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data?.completedCourses}</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Score</CardTitle>
            <Terminal className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data?.averageScore}%</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Students</CardTitle>
            <Terminal className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data?.activeStudents}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearningAnalyticsScreen;
