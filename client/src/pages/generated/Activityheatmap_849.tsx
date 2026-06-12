// AUTO-GENERATED DRAFT SCREEN: ActivityHeatmap
import React from 'react';
import { trpc } from '../lib/trpc';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface ActivityDay {
  date: string;
  count: number;
}

const ActivityHeatmap: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.activity.activity.useQuery();

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Activity Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 p-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-sm" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Activity Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  const getHeatmapColor = (count: number) => {
    if (count === 0) return 'bg-gray-200 dark:bg-gray-800';
    if (count < 20) return 'bg-green-100 dark:bg-green-900';
    if (count < 50) return 'bg-green-300 dark:bg-green-700';
    if (count < 80) return 'bg-green-500 dark:bg-green-500';
    return 'bg-green-700 dark:bg-green-300';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Activity Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 p-2">
          {data?.map((day: ActivityDay) => (
            <TooltipProvider key={day.date}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`h-8 w-8 rounded-sm ${getHeatmapColor(day.count)}`}
                    tabIndex={0} // Make div focusable
                    role="gridcell" // Semantic role for accessibility
                    aria-label={`Activity on ${day.date}: ${day.count} contributions`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{day.count} contributions on {day.date}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityHeatmap;
