// @ts-nocheck
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: UserRankCard

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


interface UserRankCardProps {
  userId: string;
}

const UserRankCard: React.FC<any> = ({ userId }) => {
  const { data: userRank, isLoading, isError, error } = useUserRank(userId);

  if (isLoading) {
    return (
      <Card className="w-full max-w-sm mx-auto md:w-[300px]" aria-live="polite" aria-atomic="true">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-sm mx-auto md:w-[300px] border-red-500" aria-live="assertive" aria-atomic="true">
        <CardHeader>
          <CardTitle className="text-red-500">Error Loading Rank</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-400">Failed to load user rank: {error?.message || 'Unknown error'}</p>
        </CardContent>
      </Card>
    );
  }

  if (!userRank) {
    return (
      <Card className="w-full max-w-sm mx-auto md:w-[300px]" aria-live="polite" aria-atomic="true">
        <CardHeader>
          <CardTitle>No Rank Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No user rank data available for this user.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm mx-auto md:w-[300px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">{userRank.username}'s Rank</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">Rank:</p>
          <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">#{userRank.rank}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">Score:</p>
          <span className="text-lg font-semibold text-green-600 dark:text-green-400">{userRank.score}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">Tier:</p>
          <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">{userRank.tier}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRankCard;
