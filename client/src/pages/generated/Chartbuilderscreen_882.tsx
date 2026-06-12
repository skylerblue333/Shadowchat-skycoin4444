// AUTO-GENERATED DRAFT SCREEN: ChartBuilderScreen
import React, { useState, useEffect, useCallback } from 'react';
import { trpc } from './trpc';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ChartDataPoint {
  name: string;
  value: number;
}

interface ChartBuilderProps {
  moduleId: string;
}

const ChartBuilderScreen: React.FC<ChartBuilderProps> = ({ moduleId }) => {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('line');
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    // Initialize from localStorage or system preference
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
             (window.matchMedia('(prefers-color-scheme: dark)').matches &&
              !localStorage.getItem('theme'));
    }
    return false;
  });

  const { data, isLoading, error, refetch } = trpc.chart.useQuery({
    moduleId,
    chartType,
    timeRange,
  });

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkTheme]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Loading chart data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 p-4">
        <p className="text-lg font-semibold">Error loading chart: {error.message}</p>
        <Button onClick={handleRefresh} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 md:p-8 transition-colors duration-200">
      <Card className="w-full max-w-6xl mx-auto shadow-lg dark:bg-gray-800">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0 pb-4 md:pb-2">
          <CardTitle className="text-xl md:text-2xl font-bold">Analytics Module: Chart Builder</CardTitle>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode-switch"
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
                aria-label="Toggle dark mode"
              />
              <Label htmlFor="dark-mode-switch">Dark Mode</Label>
            </div>
            <Button onClick={handleRefresh}>Refresh Data</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Select value={chartType} onValueChange={(value) => setChartType(value as 'line' | 'bar' | 'area')}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="area">Area Chart</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={(value) => setTimeRange(value as 'day' | 'week' | 'month' | 'year')}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-[300px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
                <XAxis dataKey="name" className="fill-gray-700 dark:fill-gray-300" />
                <YAxis className="fill-gray-700 dark:fill-gray-300" />
                <Tooltip
                  contentStyle={{ backgroundColor: isDarkTheme ? '#333' : '#fff', borderColor: isDarkTheme ? '#555' : '#ccc', color: isDarkTheme ? '#fff' : '#333' }}
                  itemStyle={{ color: isDarkTheme ? '#fff' : '#333' }}
                />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartBuilderScreen;
