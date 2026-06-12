// AUTO-GENERATED DRAFT SCREEN: SARReport
import React, { useState, useEffect } from 'react';
import { trpc } from './trpc';
import { Button } from './components/ui/button';

// Define the interface for a single SAR report item
interface SARReportItem {
  transactionId: string;
  amount: number;
  currency: string;
  date: string;
  status: string;
  description: string;
}

// Main SARReport component definition
const SARReport: React.FC = () => {
  // State to manage dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to apply or remove dark mode class to the document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Fetch SAR report data using tRPC hook
  const { data, isLoading, error } = trpc.sarReport.useQuery({ id: '123' });

  // Display loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-900 dark:text-gray-100" role="status" aria-live="polite">Loading SAR Report...</p>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-red-500" role="alert">Error: {error.message}</p>
      </div>
    );
  }

  // Extract report items or default to an empty array
  const reportItems: SARReportItem[] = data?.items || [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 flex flex-col">
      {/* Header section with dark mode toggle */}
      <header className="flex justify-end mb-4">
        <Button onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Toggle dark mode">
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </Button>
      </header>

      {/* Main content area */}
      <main className="flex-grow">
        <h1 className="text-4xl font-bold mb-8" aria-label="Crypto SAR Report Title">{data?.title}</h1>
        <p className="text-lg mb-4" aria-live="polite">{data?.summary}</p>
        
        {/* Report summary details */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <p>Status: <span className="font-semibold">{data?.status}</span></p>
          <p>Date: <span className="font-semibold">{data?.date ? new Date(data.date).toLocaleDateString() : 'N/A'}</span></p>
        </div>

        {/* Report details table */}
        <h2 className="text-2xl font-bold mb-4">Report Details</h2>
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Transaction ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Currency</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {reportItems.map((item) => (
                <tr key={item.transactionId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{item.transactionId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.currency}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer section */}
      <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} SKYCOIN4444. All rights reserved.</p>
        <p>Data provided for informational purposes only.</p>
      </footer>
    </div>
  );
};

export default SARReport;