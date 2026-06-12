// AUTO-GENERATED DRAFT SCREEN: TournamentBrackets
import React, { useState, useEffect } from 'react';

interface TournamentBracketProps {
  tournamentId: string;
}

interface Match {
  id: string;
  player1: string;
  player2: string;
  winner: string | null;
  score1: number | null;
  score2: number | null;
  status: 'upcoming' | 'in_progress' | 'completed';
}

interface BracketData {
  name: string;
  matches: Match[];
}

// Mock tRPC-like hook for fetching data
const useTournamentBrackets = (tournamentId: string) => {
  const [data, setData] = useState<BracketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrackets = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData: BracketData = {
          name: `Tournament ${tournamentId} Brackets`,
          matches: [
            { id: 'm1', player1: 'Alice', player2: 'Bob', winner: null, score1: null, score2: null, status: 'upcoming' },
            { id: 'm2', player1: 'Charlie', player2: 'David', winner: null, score1: null, score2: null, status: 'upcoming' },
            { id: 'm3', player1: 'Eve', player2: 'Frank', winner: 'Eve', score1: 2, score2: 1, status: 'completed' },
            { id: 'm4', player1: 'Grace', player2: 'Heidi', winner: null, score1: null, score2: null, status: 'in_progress' },
          ],
        };
        setData(mockData);
      } catch (err) {
        setError('Failed to fetch tournament data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBrackets();
  }, [tournamentId]);

  return { data, isLoading, error };
};

const TournamentBrackets: React.FC<TournamentBracketProps> = ({ tournamentId }) => {
  const { data, isLoading, error } = useTournamentBrackets(tournamentId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100" aria-live="polite" aria-busy="true">
        <p className="text-lg">Loading tournament brackets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100" role="alert">
        <p className="text-lg">Error: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg">No tournament data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 font-sans" role="main">
      <h1 className="text-4xl font-bold mb-8 text-center" tabIndex={0}>{data.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.matches.map((match) => (
          <div key={match.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-105" tabIndex={0} aria-labelledby={`match-title-${match.id}`}>
            <h2 id={`match-title-${match.id}`} className="text-2xl font-semibold mb-4">Match {match.id}</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium">{match.player1}</span>
              <span className="text-xl font-bold">{match.score1 !== null ? match.score1 : '-'}></span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">{match.player2}</span>
              <span className="text-xl font-bold">{match.score2 !== null ? match.score2 : '-'}></span>
            </div>
            <p className={`text-sm font-bold ${match.status === 'completed' ? 'text-green-600 dark:text-green-400' : match.status === 'in_progress' ? 'text-yellow-600 dark:text-yellow-400' : 'text-blue-600 dark:text-blue-400'}`}>
              Status: {match.status.replace(/_/g, ' ')}
            </p>
            {match.winner && (
              <p className="text-md mt-2 font-semibold">Winner: {match.winner}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBrackets;
