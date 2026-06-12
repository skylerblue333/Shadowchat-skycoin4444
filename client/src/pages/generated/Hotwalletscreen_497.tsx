// AUTO-GENERATED DRAFT SCREEN: HotWalletScreen

import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';

interface WalletBalance {
  currency: string;
  amount: number;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  currency: string;
  date: string;
}

// Simulated tRPC hooks
const useWalletBalance = () => {
  const [data, setData] = useState<WalletBalance[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData([
          { currency: 'BTC', amount: 0.5 },
          { currency: 'ETH', amount: 3.0 },
          { currency: 'USDT', amount: 1500.0 },
        ]);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { data, isLoading, isError };
};

const useTransactions = () => {
  const [data, setData] = useState<Transaction[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setData([
          { id: '1', type: 'deposit', amount: 1.0, currency: 'BTC', date: '2023-01-01' },
          { id: '2', type: 'withdrawal', amount: 0.1, currency: 'ETH', date: '2023-01-02' },
          { id: '3', type: 'transfer', amount: 500.0, currency: 'USDT', date: '2023-01-03' },
        ]);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { data, isLoading, isError };
};

const HotWalletScreen: React.FC = () => {
  const { data: balances, isLoading: balancesLoading, isError: balancesError } = useWalletBalance();
  const { data: transactions, isLoading: transactionsLoading, isError: transactionsError } = useTransactions();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Crypto: Hot Wallet</h1>

        <Button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="mb-8"
          aria-label="Toggle dark mode"
        >
          Toggle Dark Mode
        </Button>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Wallet Balance</h2>
          {balancesLoading && <p>Loading balances...</p>}
          {balancesError && <p className="text-red-500">Error loading balances.</p>}
          {!balancesLoading && !balancesError && balances && (            <ul className="space-y-2">
              {balances.map((balance) => (
                <li key={balance.currency} className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-md shadow">
                  <span className="font-medium">{balance.currency}</span>
                  <span>{balance.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
          {transactionsLoading && <p>Loading transactions...</p>}
          {transactionsError && <p className="text-red-500">Error loading transactions.</p>}
          {!transactionsLoading && !transactionsError && transactions && (            <ul className="space-y-2">
              {transactions.map((transaction) => (
                <li key={transaction.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-md shadow">
                  <div>
                    <span className="font-medium">{transaction.type}</span> - <span>{transaction.currency}</span>
                  </div>
                  <span>{transaction.amount.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default HotWalletScreen;
