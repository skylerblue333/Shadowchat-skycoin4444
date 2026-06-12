// AUTO-GENERATED DRAFT SCREEN: TournamentBracket
import React, { useState, useEffect, createContext, useContext } from 'react';
import { trpc } from '../trpc';
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui button is added

interface Participant {
  id: string;
  name: string;
}

interface Match {
  id: string;
  player1: Participant | null;
  player2: Participant | null;
  winner: Participant | null;
}

interface Round {
  id: string;
  matches: Match[];
}

// Theme Context
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const TournamentBracket: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { data: rounds, isLoading, isError, error, refetch } = trpc.tournament.getRounds.useQuery();
  const updateMatchWinnerMutation = trpc.tournament.updateMatchWinner.useMutation();

  const handleWinnerSelect = async (roundId: string, matchId: string, winnerId: string) => {
    try {
      await updateMatchWinnerMutation.mutateAsync({ roundId, matchId, winnerId });
      refetch(); // Re-fetch data to update the UI
    } catch (err) {
      console.error("Failed to update winner:", err);
      // Optionally, show a user-friendly error message
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen dark:bg-gray-900 dark:text-white">Loading tournament data...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center min-h-screen text-red-500 dark:bg-gray-900">Error: {error?.message || 'Failed to load tournament data.'}</div>;
  }

  return (
    <div className={`p-4 min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex justify-end mb-4">
        <Button
          onClick={toggleDarkMode}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">Tournament Bracket</h1>
      <div className="flex justify-center space-x-8">
        {rounds?.map((round, roundIndex) => (
          <div key={round.id} className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Round {roundIndex + 1}</h2>
            {round.matches.map((match) => (
              <div key={match.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 w-64">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{match.player1?.name || 'TBD'}</span>
                  <span className="text-gray-400">vs</span>
                  <span className="font-medium">{match.player2?.name || 'TBD'}</span>
                </div>
                {match.winner && (
                  <div className="text-center text-green-500 font-bold mt-2">
                    Winner: {match.winner.name}
                  </div>
                )}
                {!match.winner && match.player1 && match.player2 && (
                  <div className="flex justify-around mt-2">
                    <Button
                      onClick={() => handleWinnerSelect(round.id, match.id, match.player1!.id)}
                    >
                      {match.player1.name} Wins
                    </Button>
                    <Button
                      onClick={() => handleWinnerSelect(round.id, match.id, match.player2!.id)}
                    >
                      {match.player2.name} Wins
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;
export { ThemeProvider };
