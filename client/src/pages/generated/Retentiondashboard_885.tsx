// AUTO-GENERATED DRAFT SCREEN: RetentionDashboard

import React, { useState } from 'react';
import { trpc } from './trpc';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Simulate tRPC hooks for data fetching
const useRetentionData = (timeframe: string) => {
  const { data, isLoading, isError } = trpc.retention.useQuery({ timeframe });
  return { data, isLoading, isError: !!isError };
};
  

const RetentionDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('7_days');
  const { data, isLoading, isError } = useRetentionData(timeframe);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-8">Retention Dashboard</h1>

      <div className="flex justify-end mb-6">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7_days">Last 7 Days</SelectItem>
            <SelectItem value="30_days">Last 30 Days</SelectItem>
            <SelectItem value="90_days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading retention data...</p>
        </div>
      )}

      {isError && (
        <div className="flex justify-center items-center h-64 text-destructive">
          <p className="text-lg">Error loading data. Please try again.</p>
          <Button onClick={() => window.location.reload()} className="ml-4">Retry</Button>
        </div>
      )}

      {!isLoading && !isError && data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total New Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data.reduce((sum, item) => sum + item['New Users'], 0)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Retained Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data.reduce((sum, item) => sum + item['Retained Users'], 0)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Retention Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {((data.reduce((sum, item) => sum + item['Retained Users'], 0) /
                  data.reduce((sum, item) => sum + item['New Users'], 0)) * 100).toFixed(2)}%
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {!isLoading && !isError && data && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>User Retention Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="New Users" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Retained Users" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RetentionDashboard;
