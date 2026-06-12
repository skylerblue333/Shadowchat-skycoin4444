// AUTO-GENERATED DRAFT SCREEN: DataExplorer

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Skeleton } from './ui/skeleton';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface DataExplorerProps {
  // Define any props for the DataExplorer component here
}

const DataExplorer: React.FC<DataExplorerProps> = () => {
  const [selectedMetric, setSelectedMetric] = useState<string>('totalUsers');
  const [timeRange, setTimeRange] = useState<string>('7d');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // tRPC hook for fetching data
  const { data, isLoading, isError, error } = trpc.analytics.getData.useQuery({
    metric: selectedMetric,
    timeRange,
    searchTerm,
  });

  useEffect(() => {
    // Any side effects or data processing can go here
  }, [data]);

  const metrics = [
    { value: 'totalUsers', label: 'Total Users' },
    { value: 'activeUsers', label: 'Active Users' },
    { value: 'transactions', label: 'Transactions' },
    { value: 'revenue', label: 'Revenue' },
  ];

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Data Explorer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="metric">Metric</Label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger id="metric" className="w-full">
                  <SelectValue placeholder="Select a metric" />
                </SelectTrigger>
                <SelectContent>
                  {metrics.map((metric) => (
                    <SelectItem key={metric.value} value={metric.value}>
                      {metric.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timeRange">Time Range</Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger id="timeRange" className="w-full">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          )}

          {isError && (
            <div className="flex items-center space-x-2 text-red-500">
              <AlertCircle className="h-5 w-5" />
              <span>Error: {error?.message || 'Failed to fetch data.'}</span>
            </div>
          )}

          {data && !isLoading && !isError && (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>{metrics.find(m => m.value === selectedMetric)?.label}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {!data && !isLoading && !isError && (
            <div className="flex items-center space-x-2 text-gray-500">
              <CheckCircle2 className="h-5 w-5" />
              <span>No data available for the selected criteria.</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataExplorer;
