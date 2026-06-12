// AUTO-GENERATED DRAFT SCREEN: UserAnalytics
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../trpc/appRouter';
import { cn } from '../lib/utils';

// Placeholder for shadcn/ui components if they are not fully initialized
// In a real scenario, these would be imported from '@/components/ui'
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm p-6", className)}>{children}</div>
);
const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex flex-col space-y-1.5 p-0", className)}>{children}</div>
);
const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>{children}</h3>
);
const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("p-0 pt-6", className)}>{children}</div>
);

const trpc = createTRPCReact<AppRouter>();

const UserAnalytics: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.userAnalytics.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading user analytics...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p className="text-lg">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">User Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">{data?.totalUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-extrabold text-green-600 dark:text-green-400">{data?.activeUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Users Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-extrabold text-purple-600 dark:text-purple-400">{data?.newUsersToday}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Users by Country</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data?.usersByCountry.map((item, index) => (
              <li key={index} className="flex justify-between items-center text-lg">
                <span className="font-medium">{item.country}</span>
                <span className="text-xl font-bold">{item.count}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <p className="text-center text-gray-500 dark:text-gray-400 mt-10">Data last updated: {new Date().toLocaleDateString()}</p>
    </div>
  );
};

export default UserAnalytics;
