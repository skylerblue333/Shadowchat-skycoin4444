// AUTO-GENERATED DRAFT SCREEN: RevenueOverview
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

interface RevenueOverviewProps {
  // Define props here if any
}

const RevenueOverview: React.FC<RevenueOverviewProps> = () => {
  const { data, isLoading, error } = trpc.getRevenueOverview.useQuery();

  if (isLoading) {
    return (
      <div className={cn("p-4 md:p-6 lg:p-8 bg-background text-foreground min-h-screen")}>
        <h1 className="text-3xl font-bold mb-6">Revenue Overview</h1>
        <p>Loading revenue data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("p-4 md:p-6 lg:p-8 bg-background text-foreground min-h-screen")}>
        <h1 className="text-3xl font-bold mb-6">Revenue Overview</h1>
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={cn("p-4 md:p-6 lg:p-8 bg-background text-foreground min-h-screen")}>
      <h1 className="text-3xl font-bold mb-6">Revenue Overview</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data?.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +{data?.revenueChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87m-3-1.13a4 4 0 0 1 0-7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{data?.subscriptions}</div>
            <p className="text-xs text-muted-foreground">
              +{data?.subscriptionsChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{data?.sales}</div>
            <p className="text-xs text-muted-foreground">
              +{data?.salesChange}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{data?.activeNow}</div>
            <p className="text-xs text-muted-foreground">
              +{data?.activeNowChange} since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Button>View Detailed Report</Button>
      </div>
    </div>
  );
};

export default RevenueOverview;
