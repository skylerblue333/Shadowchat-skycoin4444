// @ts-nocheck
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: ActivityHeatmap

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


interface ActivityDay {
  date: string;
  count: number;
}

const ActivityHeatmap: React.FC = () => {
  const { data, isLoading, isError, error } = useStubQuery();

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
