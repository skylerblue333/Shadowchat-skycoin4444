// AUTO-GENERATED DRAFT SCREEN: ReferrerAnalyticsDashboard
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Progress } from '~/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC-like hook
import { AlertCircle, Loader2 } from 'lucide-react';

interface ReferrerData {
  name: string;
  visits: number;
  conversionRate: number;
}

interface ReferrerAnalyticsResponse {
  data: ReferrerData[];
  totalVisits: number;
  totalConversions: number;
}

// Placeholder for tRPC-like data fetching function
const fetchReferrerAnalytics = async (): Promise<ReferrerAnalyticsResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Simulate data
  return {
    data: [
      { name: 'Google', visits: 1500, conversionRate: 5.2 },
      { name: 'Facebook', visits: 1200, conversionRate: 3.8 },
      { name: 'Twitter', visits: 800, conversionRate: 2.5 },
      { name: 'Direct', visits: 700, conversionRate: 6.1 },
      { name: 'Referral', visits: 500, conversionRate: 4.5 },
    ],
    totalVisits: 4700,
    totalConversions: 250,
  };
};

const ReferrerAnalyticsDashboard: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<ReferrerAnalyticsResponse, Error>({
    queryKey: ['referrerAnalytics'],
    queryFn: fetchReferrerAnalytics,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading analytics...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertCircle className="h-8 w-8" />
        <span className="mt-2 text-lg">Error: {error?.message || 'Failed to load data'}</span>
      </div>
    );
  }

  const referrerData = data?.data || [];
  const totalVisits = data?.totalVisits || 0;
  const totalConversions = data?.totalConversions || 0;

  return (
    <div className="p-4 space-y-4 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold">Referrer Analytics Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
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
            <div className="text-2xl font-bold">{totalVisits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
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
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalConversions / totalVisits * 100).toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">+5.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Referrer</CardTitle>
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
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referrerData[0]?.name || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">{referrerData[0]?.visits.toLocaleString() || '0'} visits</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Referrer Traffic</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={referrerData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="visits" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Referrer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referrer</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Conversion Rate</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrerData.map((referrer) => (
                <TableRow key={referrer.name}>
                  <TableCell className="font-medium">{referrer.name}</TableCell>
                  <TableCell>{referrer.visits.toLocaleString()}</TableCell>
                  <TableCell>{referrer.conversionRate.toFixed(2)}%</TableCell>
                  <TableCell>
                    <Progress value={referrer.conversionRate * 10} className="w-[60%]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferrerAnalyticsDashboard;
