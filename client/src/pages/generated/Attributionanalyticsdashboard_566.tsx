// AUTO-GENERATED DRAFT SCREEN: AttributionAnalyticsDashboard
import React, { useState, useEffect } from 'react';
import { useQuery } from '@trpc/react-query';
import { api } from '~/utils/api'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'; // shadcn/ui card
import { Skeleton } from '~/components/ui/skeleton'; // shadcn/ui skeleton for loading states
import { cn } from '~/lib/utils'; // Tailwind utility for conditional classes

interface AttributionData {
  source: string;
  conversions: number;
  revenue: number;
}

interface AttributionAnalyticsDashboardProps {
  className?: string;
}

const AttributionAnalyticsDashboard: React.FC<AttributionAnalyticsDashboardProps> = ({ className }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Simulate dark theme toggle for demonstration
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkTheme(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // tRPC hook for fetching data
  const { data, isLoading, error } = api.attribution.getAnalytics.useQuery();

  if (isLoading) {
    return (
      <div className={cn('p-4', className, { 'dark': isDarkTheme })} aria-live="polite" aria-label="Loading attribution analytics data">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('p-4 text-red-500', className, { 'dark': isDarkTheme })} role="alert" aria-live="assertive">
        <Card>
          <CardHeader>
            <CardTitle>Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load attribution analytics: {error.message}</p>
            <p>Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const attributionData: AttributionData[] = data || [];

  return (
    <div className={cn('p-4', className, { 'dark': isDarkTheme })}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Attribution Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {attributionData.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No attribution data available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Source</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Conversions</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Revenue</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                  {attributionData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{item.source}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.conversions}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${item.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttributionAnalyticsDashboard;
