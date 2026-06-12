// AUTO-GENERATED DRAFT SCREEN: AnalyticsCurrentBrowsers
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { MoonIcon, SunIcon, Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Skeleton } from '@/components/ui/skeleton';

interface BrowserData {
  name: string;
  count: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF69B4', '#8A2BE2'];

const AnalyticsCurrentBrowsers: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { data, isLoading, isError, error } = trpc.analytics.getCurrentBrowsers.useQuery();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto p-4 animate-pulse">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-8">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-4xl mx-auto p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-red-600">Error Loading Data</CardTitle>
          <CardDescription className="text-red-500">An unexpected error occurred while fetching browser analytics.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-400">Details: {error.message}</p>
          <p className="text-red-400">Please try again later or contact support if the issue persists.</p>
        </CardContent>
      </Card>
    );
  }

  const browserData: BrowserData[] = data || [];

  return (
    <Card className="w-full max-w-4xl mx-auto p-4 shadow-lg rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col">
          <CardTitle className="text-3xl font-extrabold tracking-tight">Current Browsers</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">Overview of browser usage across your users.</CardDescription>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full transition-colors duration-200 ease-in-out
                     hover:bg-gray-200 dark:hover:bg-gray-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <SunIcon className="h-5 w-5 text-yellow-500" /> : <MoonIcon className="h-5 w-5 text-indigo-600" />}
        </button>
      </CardHeader>
      <CardContent className="space-y-8">
        {browserData.length > 0 ? (
          <>
            <div className="h-[300px] w-full">
              <h3 className="text-lg font-semibold mb-2">Browser Usage (Bar Chart)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={browserData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: 'hsl(var(--foreground))' }} />
                  <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
                  <Tooltip cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }} contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="h-[300px] w-full">
              <h3 className="text-lg font-semibold mb-2">Browser Distribution (Pie Chart)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={browserData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {browserData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            <p className="text-xl font-medium">No browser data available at this time.</p>
            <p className="text-sm">Please check back later or ensure your tracking is configured correctly.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCurrentBrowsers;
