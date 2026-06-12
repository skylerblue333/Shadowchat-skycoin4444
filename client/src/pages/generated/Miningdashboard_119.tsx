// AUTO-GENERATED DRAFT SCREEN: MiningDashboard
import React from 'react';
import { trpc } from '../trpc';

// Define types for mining statistics for better type safety
interface MiningStats {
  hashRate: string;
  activeMiners: number;
  totalRevenue: string;
  lastUpdate: string;
  // Adding more mock data points for a richer dashboard
  poolEfficiency: string;
  networkDifficulty: string;
  blockReward: string;
  nextPayout: string;
}

const MiningDashboard: React.FC = () => {
  // Use tRPC hook to fetch mining statistics
  const { data, isLoading, error } = trpc.mining.getMiningStats.useQuery<MiningStats>();

  // Display a loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white" role="status" aria-live="polite">
        <div className="text-lg font-medium">Loading crypto mining data...</div>
      </div>
    );
  }

  // Display an error message if data fetching fails
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500" role="alert" aria-live="assertive">
        <div className="text-lg font-medium">Error loading data: {error.message}</div>
      </div>
    );
  }

  // Render the dashboard once data is successfully loaded
  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen font-sans antialiased" role="region" aria-label="Crypto Mining Dashboard for SKYCOIN4444">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-2">SKYCOIN4444 Mining Overview</h1>
        <p className="text-gray-400 text-lg">Real-time insights into your mining operations.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10" role="group" aria-labelledby="mining-stats-heading">
        <h2 id="mining-stats-heading" className="sr-only">Mining Statistics</h2>
        {/* Hash Rate Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300" role="listitem">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Current Hash Rate</h3>
          <p className="text-4xl font-mono text-green-400" aria-label="Current hash rate">{data?.hashRate || 'N/A'}</p>
          <p className="text-sm text-gray-500 mt-2">Average hash rate over the last 24 hours.</p>
        </div>

        {/* Active Miners Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300" role="listitem">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Active Miners</h3>
          <p className="text-4xl font-mono text-blue-400" aria-label="Number of active miners">{data?.activeMiners || 'N/A'}</p>
          <p className="text-sm text-gray-500 mt-2">Number of online mining rigs.</p>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300" role="listitem">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Total Revenue</h3>
          <p className="text-4xl font-mono text-yellow-400" aria-label="Total revenue in Bitcoin">{data?.totalRevenue || 'N/A'}</p>
          <p className="text-sm text-gray-500 mt-2">Accumulated earnings since inception.</p>
        </div>

        {/* Pool Efficiency Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300" role="listitem">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Pool Efficiency</h3>
          <p className="text-4xl font-mono text-purple-400" aria-label="Pool efficiency">{data?.poolEfficiency || 'N/A'}</p>
          <p className="text-sm text-gray-500 mt-2">Percentage of accepted shares.</p>
        </div>

        {/* Network Difficulty Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300" role="listitem">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Network Difficulty</h3>
          <p className="text-4xl font-mono text-orange-400" aria-label="Network difficulty">{data?.networkDifficulty || 'N/A'}</p>
          <p className="text-sm text-gray-500 mt-2">Current network mining difficulty.</p>
        </div>

        {/* Block Reward Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300" role="listitem">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Block Reward</h3>
          <p className="text-4xl font-mono text-cyan-400" aria-label="Block reward">{data?.blockReward || 'N/A'}</p>
          <p className="text-sm text-gray-500 mt-2">Reward for successfully mining a block.</p>
        </div>
      </section>

      {/* Placeholder for a chart or more detailed statistics */}
      <section className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-10" role="region" aria-label="Mining Performance Chart">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">Performance Over Time (Placeholder)</h2>
        <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-500">
          <p>Graph/Chart integration would go here (e.g., using Recharts or Chart.js)</p>
        </div>
      </section>

      <footer className="text-sm text-gray-500 mt-8 text-center">
        <p aria-label="Last update time">Last Updated: {data?.lastUpdate || 'N/A'}</p>
        <p className="mt-1">Data provided by SKYCOIN4444 Mining Pool. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MiningDashboard;