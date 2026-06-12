// AUTO-GENERATED DRAFT SCREEN: CurrentUsersAnalytics
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";

// Placeholder for a chart component (e.g., using recharts or chart.js)
const AnalyticsChart = () => (
  <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
    <p>Chart Placeholder (e.g., Daily Active Users Trend)</p>
  </div>
);

interface CurrentUsersAnalyticsProps {
  // Define props here if any, e.g., period: 'day' | 'week' | 'month'
}

const CurrentUsersAnalytics: React.FC<CurrentUsersAnalyticsProps> = () => {
  const { data, isLoading, isError, error, refetch } = trpc.analytics.getCurrentUsers.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900 dark:text-white" role="status" aria-live="polite">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg">Loading current users data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900 dark:text-white" role="alert" aria-live="assertive">
        <Card className="w-full max-w-md mx-auto shadow-lg dark:bg-gray-800 border-red-500">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center text-red-500">Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-red-400 mb-4">An error occurred while fetching current users data:</p>
            <p className="text-md text-red-300 mb-6">{error?.message || "Unknown error"}</p>
            <Button onClick={() => refetch()} className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentUsers = data?.currentUsers || 0;
  const newUsersToday = Math.floor(currentUsers * 0.05); // Simulated data
  const peakUsers = Math.floor(currentUsers * 1.2); // Simulated data
  const averageSessionDuration = '03:45 min'; // Simulated data
  const geoDistribution = 'Global'; // Simulated data

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-2xl mx-auto shadow-xl dark:bg-gray-800 border border-gray-700 rounded-xl">
        <CardHeader className="bg-gray-50 dark:bg-gray-700 p-6 rounded-t-xl">
          <CardTitle className="text-4xl font-extrabold text-center text-gray-900 dark:text-white">SKYCOIN4444 Analytics</CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-2">Current Users Overview</p>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="text-center">
            <p className="text-7xl font-bold text-blue-600 dark:text-blue-400 mb-2" aria-live="polite">{currentUsers.toLocaleString()}</p>
            <p className="text-xl text-gray-700 dark:text-gray-300">Users Currently Active</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">New Users (Today)</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">+{newUsersToday.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Peak Users (24h)</h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{peakUsers.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Avg. Session Duration</h3>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{averageSessionDuration}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Geographic Distribution</h3>
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{geoDistribution}</p>
            </div>
          </div>

          <AnalyticsChart />

        </CardContent>
        <CardFooter className="flex justify-center p-6 bg-gray-50 dark:bg-gray-700 rounded-b-xl">
          <Button
            onClick={() => refetch()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label="Refresh analytics data"
          >
            Refresh Data
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CurrentUsersAnalytics;
