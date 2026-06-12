// AUTO-GENERATED DRAFT SCREEN: FriendRankings
import React from 'react';

interface FriendRanking {
  id: string;
  name: string;
  rank: number;
  score: number;
}

// Placeholder for tRPC hooks - would typically fetch data here
// For example: const { data, isLoading, isError, error } = trpc.leaderboards.getFriendRankings.useQuery();
const useFriendRankings = () => {
  // Simulate loading and data for demonstration
  const isLoading = false;
  const isError = false;
  const error = null;
  const data: FriendRanking[] = [
    { id: '1', name: 'Alice', rank: 1, score: 1500 },
    { id: '2', name: 'Bob', rank: 2, score: 1450 },
    { id: '3', name: 'Charlie', rank: 3, score: 1400 },
    { id: '4', name: 'David', rank: 4, score: 1350 },
    { id: '5', name: 'Eve', rank: 5, score: 1300 },
  ];
  return { data, isLoading, isError, error };
};

const FriendRankings: React.FC = () => {
  const { data: rankings, isLoading, isError, error } = useFriendRankings();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-900 rounded-lg p-4" aria-live="polite" aria-atomic="true">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading friend rankings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg p-4" role="alert">
        <p className="text-lg">Error: {error?.message || 'Failed to load rankings.'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl" role="region" aria-labelledby="friend-rankings-title">
      <h2 id="friend-rankings-title" className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Friend Rankings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rank</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {rankings?.map((friend) => (
              <tr key={friend.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{friend.rank}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{friend.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{friend.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FriendRankings;
