// AUTO-GENERATED DRAFT SCREEN: CryptoFailedTransactions
import React, { useState } from 'react';
import { trpc } from '../utils/trpc';
import { Button } from './ui/button'; // Assuming shadcn/ui button is installed

interface FailedTransaction {
  id: string;
  amount: number;
  currency: string;
  reason: string;
  date: string;
}

const mockFailedTransactions: FailedTransaction[] = [
  {
    id: 'TXN-0012345',
    amount: 1.2345,
    currency: 'ETH',
    reason: 'Insufficient Funds',
    date: '2023-10-26',
  },
  {
    id: 'TXN-0012346',
    amount: 0.5,
    currency: 'BTC',
    reason: 'Network Congestion',
    date: '2023-10-25',
  },
  {
    id: 'TXN-0012347',
    amount: 100.0,
    currency: 'USDT',
    reason: 'Invalid Address',
    date: '2023-10-24',
  },
  {
    id: 'TXN-0012348',
    amount: 50.0,
    currency: 'XRP',
    reason: 'Transaction Expired',
    date: '2023-10-23',
  },
  {
    id: 'TXN-0012349',
    amount: 2.0,
    currency: 'LTC',
    reason: 'Gas Limit Exceeded',
    date: '2023-10-22',
  },
  {
    id: 'TXN-0012350',
    amount: 0.01,
    currency: 'DOGE',
    reason: 'Minimum Amount Not Met',
    date: '2023-10-21',
  },
  {
    id: 'TXN-0012351',
    amount: 75.0,
    currency: 'ADA',
    reason: 'Wallet Not Connected',
    date: '2023-10-20',
  },
  {
    id: 'TXN-0012352',
    amount: 0.8,
    currency: 'SOL',
    reason: 'Slippage Tolerance Exceeded',
    date: '2023-10-19',
  },
  {
    id: 'TXN-0012353',
    amount: 150.0,
    currency: 'BNB',
    reason: 'Smart Contract Error',
    date: '2023-10-18',
  },
  {
    id: 'TXN-0012354',
    amount: 0.005,
    currency: 'DOT',
    reason: 'Insufficient Liquidity',
    date: '2023-10-17',
  },
];

const CryptoFailedTransactions: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.failedTransactions.useQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = data?.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading failed transactions...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500 dark:text-red-400">
        <p className="text-lg">Error: {error.message}</p>
      </div>
    );
  }

  const pageNumbers = [];
  if (data) {
    for (let i = 1; i <= Math.ceil(data.length / transactionsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Crypto: Failed Transactions</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Review and manage transactions that failed to process.
      </p>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Failed Transaction Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Currency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentTransactions?.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{transaction.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{transaction.currency}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 dark:text-red-400">{transaction.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav className="flex justify-center mt-4">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            {pageNumbers.map(number => (
              <li key={number}>
                <Button
                  onClick={() => paginate(number)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === number ? 'z-10 bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white' : ''}`}
                >
                  {number}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CryptoFailedTransactions;