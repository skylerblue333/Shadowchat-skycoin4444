// AUTO-GENERATED DRAFT SCREEN: CryptoEthereumDashboard
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EthereumData {
  currentPrice: number;
  marketCap: number;
  dailyChange: number;
  transactions: { id: string; amount: number; type: 'buy' | 'sell'; timestamp: string; from: string; to: string }[];
  priceHistory: { date: string; price: number }[];
}

interface DashboardProps {
  data: EthereumData | null;
  isLoading: boolean;
  isError: boolean;
}

const CryptoEthereumDashboard: React.FC<DashboardProps> = ({ data, isLoading, isError }) => {
  // Placeholder for tRPC hooks - In a real application, you would use tRPC client here
  // Example: const { data, isLoading, isError } = trpc.ethereum.getDashboardData.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg font-semibold">Loading Ethereum data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100">
        <p className="text-lg font-semibold">Error loading Ethereum data. Please try again later.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg font-semibold">No Ethereum data available.</p>
      </div>
    );
  }

  const { currentPrice, marketCap, dailyChange, transactions, priceHistory } = data;

  const changeColorClass = dailyChange >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 md:p-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-10 border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 text-center" aria-label="Ethereum Dashboard">
          Ethereum Dashboard
        </h1>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md flex flex-col justify-between" role="region" aria-labelledby="current-price-heading">
            <h2 id="current-price-heading" className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Current Price</h2>
            <p className="text-5xl font-bold text-gray-900 dark:text-gray-100">${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md flex flex-col justify-between" role="region" aria-labelledby="market-cap-heading">
            <h2 id="market-cap-heading" className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Market Cap</h2>
            <p className="text-5xl font-bold text-gray-900 dark:text-gray-100">${marketCap.toLocaleString(undefined, { notation: 'compact', compactDisplay: 'short' })}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md flex flex-col justify-between" role="region" aria-labelledby="daily-change-heading">
            <h2 id="daily-change-heading" className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">24h Change</h2>
            <p className={`text-5xl font-bold ${changeColorClass}`}>{dailyChange.toFixed(2)}%</p>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md mb-10" role="region" aria-labelledby="price-history-heading">
          <h2 id="price-history-heading" className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-5">Price History (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceHistory} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" domain={['auto', 'auto']} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </section>

        <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md" role="region" aria-labelledby="recent-transactions-heading">
          <h2 id="recent-transactions-heading" className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-5">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount (ETH)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">From</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tx.type === 'buy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                        {tx.type === 'buy' ? 'Buy' : 'Sell'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{tx.amount.toFixed(4)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{tx.from.substring(0, 6)}...{tx.from.substring(tx.from.length - 4)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{tx.to.substring(0, 6)}...{tx.to.substring(tx.to.length - 4)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{new Date(tx.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CryptoEthereumDashboard;
