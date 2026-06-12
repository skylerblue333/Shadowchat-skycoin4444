// @ts-nocheck
import React from 'react';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: WeeklyLeaderboard

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


interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  score: number;
}

interface WeeklyLeaderboardProps {
  data: LeaderboardEntry[];
  isLoading: boolean;
  isError: boolean;
}

const WeeklyLeaderboard: React.FC<any> = ({
  data,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Loading leaderboard...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">Error loading leaderboard.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Weekly Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Rank</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Username</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{entry.rank}</td>
                <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">{entry.username}</td>
                <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyLeaderboard;
