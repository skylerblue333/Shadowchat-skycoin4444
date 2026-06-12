// @ts-nocheck
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: ActivityFeed

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


const ActivityFeed: React.FC = () => {
  const { data, isLoading, error } = trpc.activity.query({ limit: 20 });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4" role="status" aria-live="polite">
        <h1 className="text-2xl font-bold mb-4">Activity Feed</h1>
        <p>Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-bold mb-4">Activity Feed</h1>
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4" aria-label="Activity Feed">
      <h1 className="text-2xl font-bold mb-4">Activity Feed</h1>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((activity) => (
          <Card key={activity.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{activity.user} {activity.action}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(activity.timestamp)}</p>
              {activity.details && <p className="mt-2 text-base">{activity.details}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
