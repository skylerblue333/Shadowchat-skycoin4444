// AUTO-GENERATED DRAFT SCREEN: PolkadotDashboard
import React from 'react';
import { trpc } from '../utils/trpc';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

interface PolkadotDashboardProps {
  isDarkMode: boolean;
  toggleDarkMode: (checked: boolean) => void;
}

const PolkadotDashboard: React.FC<PolkadotDashboardProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { data, isLoading, isError, error } = trpc.polkadot.getDashboardData.useQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8" aria-live="polite" aria-busy="true">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
        <p className="text-xl font-semibold">Loading Polkadot Dashboard Data...</p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Please wait while we fetch the latest network statistics.</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 p-8" role="alert">
        <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <p className="text-xl font-semibold">Error Loading Dashboard</p>
        <p className="text-red-700 dark:text-red-300 mt-2">An unexpected error occurred: {error.message}</p>
        <p className="text-red-700 dark:text-red-300">Please try refreshing the page or contact support if the issue persists.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold" id="dashboard-title">Polkadot Dashboard</h1>
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={30}
          aria-label="Toggle dark mode"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" aria-labelledby="dashboard-title">
        <Card aria-labelledby="total-staked-title">
          <CardHeader>
            <CardTitle id="total-staked-title">Total Staked</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{data?.totalStaked}</p>
          </CardContent>
        </Card>

        <Card aria-labelledby="active-nominators-title">
          <CardHeader>
            <CardTitle id="active-nominators-title">Active Nominators</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{data?.activeNominators}</p>
          </CardContent>
        </Card>

        <Card aria-labelledby="validators-title">
          <CardHeader>
            <CardTitle id="validators-title">Validators</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{data?.validators}</p>
          </CardContent>
        </Card>

        <Card aria-labelledby="latest-block-title">
          <CardHeader>
            <CardTitle id="latest-block-title">Latest Block</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{data?.latestBlock}</p>
          </CardContent>
        </Card>

        <Card aria-labelledby="dot-price-title">
          <CardHeader>
            <CardTitle id="dot-price-title">DOT Price</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">${data?.price}</p>
            <p className={`text-lg ${data?.priceChange?.startsWith("+") ? "text-green-500" : "text-red-500"}`}>{data?.priceChange}</p>
          </CardContent>
        </Card>

        <Card aria-labelledby="market-cap-title">
          <CardHeader>
            <CardTitle id="market-cap-title">Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">{data?.marketCap}</p>
          </CardContent>
        </Card>

        <Card aria-labelledby="volume-title">
          <CardHeader>
            <CardTitle id="volume-title">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">{data?.volume24h}</p>
          </CardContent>
        </Card>

        <Card aria-labelledby="era-progress-title">
          <CardHeader>
            <CardTitle id="era-progress-title">Era Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{data?.eraProgress}</p>
          </CardContent>
        </Card>

        <Card aria-labelledby="next-era-title">
          <CardHeader>
            <CardTitle id="next-era-title">Next Era In</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{data?.nextEraIn}</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3" aria-labelledby="price-chart-title">
          <CardHeader>
            <CardTitle id="price-chart-title">DOT Price Chart (Placeholder)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400">
              <p>Chart integration coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PolkadotDashboard;
