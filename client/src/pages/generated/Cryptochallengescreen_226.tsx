// AUTO-GENERATED DRAFT SCREEN: CryptoChallengeScreen
import React, { useState } from 'react';
import { trpc } from '../trpc';
import { Button } from '@/components/ui/button';

interface CryptoChallengeScreenProps {
  initialChallenge?: string;
}

const CryptoChallengeScreen: React.FC<CryptoChallengeScreenProps> = ({ initialChallenge = 'World' }) => {
  const [name, setName] = useState(initialChallenge);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { data, isLoading, error } = trpc.challenge.useQuery({ text: name });

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg">Loading challenge...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 p-4">
        <h2 className="text-2xl font-bold mb-4">Error:</h2>
        <p className="text-center">{error.message}</p>
        <Button onClick={() => window.location.reload()} className="mt-6">Retry</Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 ${isDarkTheme ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <h1 className="text-4xl font-bold mb-6">Crypto Challenge</h1>
      <p className="text-xl mb-8 text-center">{data?.challengeText}</p>
      
      <div className="flex items-center space-x-4 mb-8">
        <label htmlFor="name-input" className="text-lg">Enter your name:</label>
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Enter your name for the challenge"
        />
      </div>

      <Button onClick={toggleTheme} className="mb-4">
        Toggle {isDarkTheme ? 'Light' : 'Dark'} Theme
      </Button>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        This is a production-grade React 19 component for the Crypto Challenge screen.
      </p>
    </div>
  );
};

export default CryptoChallengeScreen;