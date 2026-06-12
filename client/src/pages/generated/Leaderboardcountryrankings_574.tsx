// AUTO-GENERATED DRAFT SCREEN: LeaderboardCountryRankings

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CountryRanking {
  id: string;
  country: string;
  score: number;
}

interface LeaderboardCountryRankingsProps {
  className?: string;
}

const fetchCountryRankings = async (): Promise<CountryRanking[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', country: 'USA', score: 1500 },
        { id: '2', country: 'China', score: 1450 },
        { id: '3', country: 'India', score: 1400 },
        { id: '4', country: 'Germany', score: 1350 },
        { id: '5', country: 'Japan', score: 1300 },
      ]);
    }, 1000);
  });
};

const LeaderboardCountryRankings: React.FC<LeaderboardCountryRankingsProps> = ({ className }) => {
  const [rankings, setRankings] = useState<CountryRanking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRankings = async () => {
      try {
        setLoading(true);
        const data = await fetchCountryRankings();
        setRankings(data);
      } catch (err) {
        setError('Failed to load rankings.');
      } finally {
        setLoading(false);
      }
    };
    loadRankings();
  }, []);

  if (loading) {
    return (
      <div className={cn('p-4 text-center text-gray-500 dark:text-gray-400', className)} aria-live="polite" aria-busy="true">
        Loading country rankings...
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('p-4 text-center text-red-500 dark:text-red-400', className)} role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className={cn('container mx-auto p-4', className)}>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Country Rankings</h1>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rank</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Country</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {rankings.map((ranking, index) => (
              <tr key={ranking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{ranking.country}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{ranking.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardCountryRankings;
