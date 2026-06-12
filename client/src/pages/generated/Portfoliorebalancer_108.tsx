// AUTO-GENERATED DRAFT SCREEN: PortfolioRebalancer
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// Placeholder for tRPC client setup
// In a real application, this would be configured to connect to your tRPC server.
// For this example, we'll simulate data fetching.
const trpc = {
  portfolio: {
    getPortfolio: {
      useQuery: () => useQuery<PortfolioData>({ queryKey: ['portfolioData'], queryFn: fetchPortfolioData }),
    },
  },
};

interface Asset {
  id: string;
  name: string;
  amount: number;
  value: number;
}

interface PortfolioData {
  assets: Asset[];
  totalValue: number;
}

const fetchPortfolioData = async (): Promise<PortfolioData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        assets: [
          { id: 'btc', name: 'Bitcoin', amount: 0.5, value: 30000 },
          { id: 'eth', name: 'Ethereum', amount: 2, value: 2000 },
          { id: 'ada', name: 'Cardano', amount: 1000, value: 0.5 },
        ],
        totalValue: 30000 * 0.5 + 2000 * 2 + 1000 * 0.5,
      });
    }, 1500);
  });
};

const PortfolioRebalancer: React.FC = () => {
  const { data, isLoading, error } = trpc.portfolio.getPortfolio.useQuery();
  const [rebalanceAmount, setRebalanceAmount] = useState<number>(0);

  const handleRebalance = () => {
    // In a real application, this would trigger a tRPC mutation
    console.log('Initiating rebalance with amount:', rebalanceAmount);
    alert(`Rebalancing initiated with amount: ${rebalanceAmount}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white" role="status" aria-live="polite">
        <p className="text-lg">Loading portfolio data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500" role="alert" aria-live="assertive">
        <p className="text-lg">Error loading portfolio: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 font-sans dark">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-blue-400" tabIndex={0}>
        Crypto Portfolio Rebalancer
      </h1>
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-2xl p-6 space-y-6 border border-gray-700">
        <section aria-labelledby="current-portfolio-heading">
          <h2 id="current-portfolio-heading" className="text-2xl font-bold mb-4 text-gray-200">Current Portfolio</h2>
          <ul className="space-y-3">
            {data?.assets.map((asset) => (
              <li key={asset.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-inner">
                <div>
                  <h3 className="text-xl font-semibold text-white">{asset.name}</h3>
                  <p className="text-gray-300">Amount: {asset.amount}</p>
                </div>
                <p className="text-lg font-bold text-green-400">${asset.value.toLocaleString()}</p>
              </li>
            ))}
          </ul>
          <div className="text-right text-2xl font-extrabold mt-6 pt-4 border-t border-gray-700 text-blue-300">
            Total Value: ${data?.totalValue.toLocaleString()}
          </div>
        </section>

        <section aria-labelledby="rebalance-portfolio-heading" className="pt-6 border-t border-gray-700">
          <h2 id="rebalance-portfolio-heading" className="text-2xl font-bold mb-4 text-gray-200">Rebalance Portfolio</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <label htmlFor="rebalance-input" className="sr-only">Enter amount to rebalance</label>
            <input
              id="rebalance-input"
              type="number"
              value={rebalanceAmount}
              onChange={(e) => setRebalanceAmount(Number(e.target.value))}
              placeholder="Enter amount to rebalance"
              className="flex-grow p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              aria-required="true"
              min="0"
            />
            <button
              onClick={handleRebalance}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg font-bold text-white shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-label="Initiate portfolio rebalance"
            >
              Rebalance
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

const PortfolioRebalancerWrapper: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <PortfolioRebalancer />
  </QueryClientProvider>
);

export default PortfolioRebalancerWrapper;