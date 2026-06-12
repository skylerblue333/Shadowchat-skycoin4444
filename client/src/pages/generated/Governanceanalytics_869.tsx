// AUTO-GENERATED DRAFT SCREEN: GovernanceAnalytics
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';

// Mock tRPC client for demonstration purposes
const trpc = {
  governance: {
    getAnalytics: {
      useQuery: (params: { interval: string }) => {
        return useQuery({
          queryKey: ['governanceAnalytics', params.interval],
          queryFn: async () => {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Mock data based on interval
            const data = Array.from({ length: 7 }, (_, i) => ({
              name: `Day ${i + 1}`,
              proposals: Math.floor(Math.random() * 100) + 50,
              votes: Math.floor(Math.random() * 1000) + 500,
            }));
            return data;
          },
        });
      },
    },
  },
};

interface AnalyticsData {
  name: string;
  proposals: number;
  votes: number;
}

const GovernanceAnalytics: React.FC = () => {
  const [interval, setInterval] = useState<'week' | 'month' | 'year'>('week');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const { data, isLoading, isError, error } = trpc.governance.getAnalytics.useQuery({ interval });

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p>Loading governance analytics...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p>Error: {error?.message || 'Failed to load analytics'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Governance Analytics</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data?.reduce((sum, item) => sum + item.proposals, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Votes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data?.reduce((sum, item) => sum + item.votes, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Votes per Proposal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {((data?.reduce((sum, item) => sum + item.votes, 0) || 0) /
                (data?.reduce((sum, item) => sum + item.proposals, 0) || 1)).toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-4 mb-8">
        <Button onClick={() => setInterval('week')} variant={interval === 'week' ? 'default' : 'outline'}>Week</Button>
        <Button onClick={() => setInterval('month')} variant={interval === 'month' ? 'default' : 'outline'}>Month</Button>
        <Button onClick={() => setInterval('year')} variant={interval === 'year' ? 'default' : 'outline'}>Year</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proposals and Votes Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="proposals" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="votes" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernanceAnalytics;