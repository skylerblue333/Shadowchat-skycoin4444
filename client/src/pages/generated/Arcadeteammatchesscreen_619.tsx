// AUTO-GENERATED DRAFT SCREEN: ArcadeTeamMatchesScreen
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { trpc } from "../trpc";

interface TeamMatch {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'completed';
  players: string[];
}

const ArcadeTeamMatchesScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teamMatches, setTeamMatches] = useState<TeamMatch[]>([]);

  // Mock tRPC hook for fetching team matches
  const { data, isLoading, isError, error: trpcError } = trpc.hello.useQuery(undefined, {
    queryFn: async () => {
      return new Promise<TeamMatch[]>((resolve) => {
        setTimeout(() => {
          resolve([
            { id: '1', name: 'Match Alpha', status: 'active', players: ['Player1', 'Player2'] },
            { id: '2', name: 'Match Beta', status: 'pending', players: ['Player3', 'Player4'] },
          ]);
        }, 1000);
      });
    },
  });

  useEffect(() => {
    setLoading(isLoading);
    if (isError) {
      setError(trpcError?.message || 'Failed to fetch team matches.');
    } else if (data) {
      setTeamMatches(data);
    }
  }, [data, isLoading, isError, trpcError]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading team matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-8" tabIndex={0}>
        Arcade: Team Matches
      </h1>

      <section aria-labelledby="active-matches-heading" className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 id="active-matches-heading" className="text-2xl font-semibold mb-4">Active Matches</h2>
        {teamMatches.filter(match => match.status === 'active').length > 0 ? (
          <ul className="space-y-4">
            {teamMatches.filter(match => match.status === 'active').map((match) => (
              <li key={match.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
                <div>
                  <p className="text-lg font-medium">{match.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Players: {match.players.join(', ')}</p>
                </div>
                <Button aria-label={`Join match ${match.name}`}>Join</Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No active matches found.</p>
        )}
      </section>

      <section aria-labelledby="pending-matches-heading" className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 id="pending-matches-heading" className="text-2xl font-semibold mb-4">Pending Matches</h2>
        {teamMatches.filter(match => match.status === 'pending').length > 0 ? (
          <ul className="space-y-4">
            {teamMatches.filter(match => match.status === 'pending').map((match) => (
              <li key={match.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
                <div>
                  <p className="text-lg font-medium">{match.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Players: {match.players.join(', ')}</p>
                </div>
                <Button variant="outline" aria-label={`View details for match ${match.name}`}>View Details</Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No pending matches found.</p>
        )}
      </section>

      <section aria-labelledby="completed-matches-heading" className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 id="completed-matches-heading" className="text-2xl font-semibold mb-4">Completed Matches</h2>
        {teamMatches.filter(match => match.status === 'completed').length > 0 ? (
          <ul className="space-y-4">
            {teamMatches.filter(match => match.status === 'completed').map((match) => (
              <li key={match.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
                <div>
                  <p className="text-lg font-medium">{match.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Players: {match.players.join(', ')}</p>
                </div>
                <Button variant="ghost" aria-label={`Review match ${match.name}`}>Review</Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No completed matches found.</p>
        )}
      </section>
    </div>
  );
};

export default ArcadeTeamMatchesScreen;