// AUTO-GENERATED DRAFT SCREEN: TradingCompetition
import React, { useState, useEffect } from 'react';

// Mock tRPC-like hooks for data fetching
const useTradingCompetitionData = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData = {
          title: "Daily Crypto Trading Challenge",
          status: "Live",
          participants: 12345,
          prizePool: "10,000 USDT",
          leaderboard: [
            { rank: 1, user: "CryptoKing", volume: "1,234,567 USDT", pnl: "+25.3%" },
            { rank: 2, user: "CoinMaster", volume: "987,654 USDT", pnl: "+20.1%" },
            { rank: 3, user: "TokenTrader", volume: "765,432 USDT", pnl: "+18.7%" },
            { rank: 4, user: "BlockchainBoss", volume: "543,210 USDT", pnl: "+15.2%" },
            { rank: 5, user: "HODLGuru", volume: "321,098 USDT", pnl: "+10.5%" },
          ],
          rules: "Trade any crypto pair. Top 10 by trading volume win prizes.",
          endTime: "2026-06-15T23:59:59Z",
        };
        setData(mockData);
      } catch (err) {
        console.error("Error fetching trading competition data:", err);
        setError("Failed to load competition data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, error };
};

interface TradingCompetitionProps {}

const TradingCompetition: React.FC<TradingCompetitionProps> = () => {
  const { data, isLoading, error } = useTradingCompetitionData();

  const formatTimeRemaining = (endTime: string) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8" role="region" aria-label="Trading Competition">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10" aria-live="polite" aria-atomic="true">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-gray-900 dark:text-white text-xl">Loading competition data...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-10" role="alert">
            <p className="text-red-500 text-xl font-semibold">Error: {error}</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Please refresh the page or try again later.</p>
          </div>
        ) : !data ? (
          <div className="flex flex-col items-center justify-center py-10" role="status">
            <p className="text-gray-900 dark:text-white text-xl">No competition data available.</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center" tabIndex={0}>
              {data.title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" role="group" aria-labelledby="competition-summary">
              <h2 id="competition-summary" className="sr-only">Competition Summary</h2>
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Status:</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400" tabIndex={0}>{data.status}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Participants:</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white" tabIndex={0}>{data.participants}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Prize Pool:</p>
                <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400" tabIndex={0}>{data.prizePool}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Time Remaining:</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white" tabIndex={0}>
                  {formatTimeRemaining(data.endTime)}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-4" tabIndex={0}>Leaderboard</h2>
            <div className="overflow-x-auto" role="table" aria-label="Trading Competition Leaderboard">
              <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
                <thead className="sr-only"><tr><th>Rank</th><th>User</th><th>Volume</th><th>Profit and Loss</th></tr></thead>
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
                    <th scope="col" className="py-3 px-6 text-left">Rank</th>
                    <th scope="col" className="py-3 px-6 text-left">User</th>
                    <th scope="col" className="py-3 px-6 text-left">Volume</th>
                    <th scope="col" className="py-3 px-6 text-left">P&L</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-300 text-sm font-light">
                  {data.leaderboard.map((entry: any) => (
                    <tr key={entry.rank} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600">
                      <td className="py-3 px-6 text-left whitespace-nowrap" tabIndex={0}>{entry.rank}</td>
                      <td className="py-3 px-6 text-left" tabIndex={0}>{entry.user}</td>
                      <td className="py-3 px-6 text-left" tabIndex={0}>{entry.volume}</td>
                      <td className={`py-3 px-6 text-left ${entry.pnl.startsWith("+") ? "text-green-500" : "text-red-500"}`} tabIndex={0}>{entry.pnl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-4" tabIndex={0}>Rules</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed" tabIndex={0}>
              {data.rules}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default TradingCompetition;
