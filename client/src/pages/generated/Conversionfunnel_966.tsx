// AUTO-GENERATED DRAFT SCREEN: ConversionFunnel
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { trpc } from '@/lib/trpc';
import { Skeleton } from '@/components/ui/skeleton';

const ConversionFunnel: React.FC = () => {
  const [dateRange, setDateRange] = useState<string>('last30days');
  const { data, isLoading, isError, error } = trpc.analytics.getConversionFunnel(dateRange);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Conversion Funnel Analytics</h1>

      <div className="flex justify-end">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="last7days">Last 7 Days</SelectItem>
            <SelectItem value="last30days">Last 30 Days</SelectItem>
            <SelectItem value="last90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isError && (
        <div className="text-red-500 text-center">Error: {error?.message || 'Failed to load data'}</div>
      )}

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-2/3 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {data?.stages.map((stage, index) => (
            <Card key={stage.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stage.name}
                </CardTitle>
                {/* Icon can be added here */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stage.value.toLocaleString()}</div>
                {index > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {stage.conversionRate}% from previous stage
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Placeholder for a more detailed funnel visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Funnel Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              [Funnel Chart Placeholder]
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversionFunnel;
