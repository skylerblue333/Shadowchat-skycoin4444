// AUTO-GENERATED DRAFT SCREEN: DeFiDashboard
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC/react-query

// --- Utility Components (conceptual shadcn/ui) ---
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800 ${className}`}
  >
    {children}
  </button>
);

// --- Data Fetching (Placeholder for tRPC hooks) ---
interface DashboardData {
  totalValueLocked: string;
  currentAPY: string;
  myPortfolio: string;
  transactions: { id: string; description: string; time: string }[];
}

const fetchDashboardData = async (): Promise<DashboardData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalValueLocked: '$1.23B',
        currentAPY: '15.7%',
        myPortfolio: '$12,345',
        transactions: [
          { id: '1', description: 'Swap ETH for DAI', time: '2 hours ago' },
          { id: '2', description: 'Stake UNI', time: '1 day ago' },
          { id: '3', description: 'Provide liquidity to USDC/ETH', time: '3 days ago' },
        ],
      });
    }, 1000);
  });
};

// --- Main Component ---
interface DeFiDashboardProps {
  // No props for this example, but can be extended
}

const DeFiDashboard: React.FC<DeFiDashboardProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data, isLoading, error } = useQuery<DashboardData, Error>({
    queryKey: ['defiDashboardData'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100" role="status" aria-live="polite">
        <p>Loading DeFi Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100" role="alert" aria-live="assertive">
        <p>Error loading dashboard: {error.message}</p>
        <Button onClick={() => window.location.reload()} className="ml-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans">
      <header className="container mx-auto px-4 py-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100" id="dashboard-title">Crypto: DeFi Dashboard</h1>
        <Button onClick={() => setIsDarkMode(!isDarkMode)} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </header>
      <main className="container mx-auto px-4 py-8" aria-labelledby="dashboard-title">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">Total Value Locked</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{data?.totalValueLocked}</p>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">Current APY</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{data?.currentAPY}</p>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">My Portfolio</h2>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{data?.myPortfolio}</p>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Recent Transactions</h2>
          <Card>
            <ul className="space-y-3" aria-label="Recent Transactions">
              {data?.transactions.map((tx) => (
                <li key={tx.id} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <span className="text-gray-700 dark:text-gray-300">{tx.description}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{tx.time}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default DeFiDashboard;
