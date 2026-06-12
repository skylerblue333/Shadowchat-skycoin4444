// AUTO-GENERATED DRAFT SCREEN: DiscordIntegrationScreen
import React, { useState, useEffect } from 'react';

interface DiscordIntegrationScreenProps {
  userId: string;
  cryptoWalletAddress: string;
}

const DiscordIntegrationScreen: React.FC<DiscordIntegrationScreenProps> = ({
  userId,
  cryptoWalletAddress,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isIntegrated, setIsIntegrated] = useState(false);

  useEffect(() => {
    const integrateDiscord = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API call for Discord integration
        const response = await new Promise<boolean>((resolve) =>
          setTimeout(() => {
            const success = Math.random() > 0.2; // 80% success rate
            resolve(success);
          }, 1500)
        );

        if (response) {
          setIsIntegrated(true);
        } else {
          setError('Failed to integrate with Discord. Please try again.');
        }
      } catch (err) {
        setError('An unexpected error occurred.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    integrateDiscord();
  }, [userId, cryptoWalletAddress]);

  const handleIntegrateClick = () => {
    // In a real application, this would trigger the integration flow again
    // For this example, we'll just reset the state to simulate a retry
    setIsIntegrated(false);
    setError(null);
    setIsLoading(true);
    // Re-run the effect to simulate integration attempt
    // This is a simplified approach for demonstration
    // In a real app, you'd likely call a specific integration function
    const integrateDiscord = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await new Promise<boolean>((resolve) =>
          setTimeout(() => {
            const success = Math.random() > 0.2; // 80% success rate
            resolve(success);
          }, 1500)
        );

        if (response) {
          setIsIntegrated(true);
        } else {
          setError('Failed to integrate with Discord. Please try again.');
        }
      } catch (err) {
        setError('An unexpected error occurred.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    integrateDiscord();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Crypto: Discord Integration
        </h1>

        {isLoading && (
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 dark:text-gray-300">Integrating with Discord...</p>
          </div>
        )}

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {!isLoading && !error && isIntegrated && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Discord integrated successfully.</span>
          </div>
        )}

        {!isLoading && !isIntegrated && !error && (
          <div className="text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Connect your Discord account to unlock exclusive features.
            </p>
            <button
              onClick={handleIntegrateClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Integrate Discord
            </button>
          </div>
        )}

        {!isLoading && (error || !isIntegrated) && (
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
            <p>User ID: {userId}</p>
            <p>Crypto Wallet: {cryptoWalletAddress}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscordIntegrationScreen;
