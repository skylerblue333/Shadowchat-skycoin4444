// AUTO-GENERATED DRAFT SCREEN: PaymentReconciliation
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button'; // Assuming shadcn/ui button
import { Switch } from './ui/switch'; // Assuming shadcn/ui switch for dark mode
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC/react-query
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui card
import { Input } from './ui/input'; // Assuming shadcn/ui input
import { Label } from './ui/label'; // Assuming shadcn/ui label

interface PaymentReconciliationProps {
  // Define props here if needed, e.g., userId, accountId
}

// Mock data type for reconciliation items
interface ReconciliationItem {
  id: string;
  transactionId: string;
  amount: number;
  date: string;
  status: 'matched' | 'unmatched' | 'pending';
}

const PaymentReconciliation: React.FC<PaymentReconciliationProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterText, setFilterText] = useState('');

  // Simulate tRPC data fetching for reconciliation data
  const { data, isLoading, isError, error } = useQuery<{
    transactions: ReconciliationItem[];
    totalAmount: number;
  }>({ // Explicitly type the data
    queryKey: ['paymentReconciliationData'],
    queryFn: async () => {
      // Simulate API call delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.9) { // Increased chance of error for demonstration
            reject(new Error('Failed to fetch reconciliation data. Please try again.'));
          } else {
            // Mock data for demonstration
            const mockTransactions: ReconciliationItem[] = [
              { id: '1', transactionId: 'TXN001', amount: 100.50, date: '2024-06-01', status: 'matched' },
              { id: '2', transactionId: 'TXN002', amount: 250.00, date: '2024-06-02', status: 'unmatched' },
              { id: '3', transactionId: 'TXN003', amount: 75.25, date: '2024-06-03', status: 'pending' },
              { id: '4', transactionId: 'TXN004', amount: 120.00, date: '2024-06-04', status: 'matched' },
              { id: '5', transactionId: 'TXN005', amount: 300.00, date: '2024-06-05', status: 'unmatched' },
            ];
            const totalAmount = mockTransactions.reduce((sum, item) => sum + item.amount, 0);
            resolve({ transactions: mockTransactions, totalAmount });
          }
        }, 1500); // Simulate network latency
      });
    },
  });

  // Effect to toggle dark mode class on the document element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Filter transactions based on filterText
  const filteredTransactions = data?.transactions.filter(item =>
    item.transactionId.toLowerCase().includes(filterText.toLowerCase()) ||
    item.status.toLowerCase().includes(filterText.toLowerCase())
  ) || [];

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 dark:text-gray-100">
        <p className="text-lg animate-pulse">Loading payment reconciliation data...</p>
      </div>
    );
  }

  // Render error state with retry option
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 dark:text-gray-100 text-red-500">
        <p className="text-lg font-semibold">Error: {error?.message || 'An unknown error occurred.'}</p>
        <Button onClick={() => window.location.reload()} className="mt-4 bg-red-600 hover:bg-red-700 text-white">
          Retry Loading Data
        </Button>
      </div>
    );
  }

  // Main component rendering
  return (
    <div className={`min-h-screen bg-background text-foreground ${isDarkMode ? 'dark' : ''}`}>
      <header className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 mb-2 sm:mb-0">Payment Reconciliation</h1>
        <div className="flex items-center space-x-4">
          <Label htmlFor="dark-mode-toggle" className="flex items-center space-x-2 cursor-pointer">
            <Switch
              id="dark-mode-toggle"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
            <span>Dark Mode</span>
          </Label>
          <Button variant="outline" className="dark:text-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
            Export Report
          </Button>
        </div>
      </header>

      <main className="p-4 md:p-6 lg:p-8">
        <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold dark:text-gray-50">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg dark:text-gray-200">Total Transactions: {data?.transactions.length}</p>
            <p className="text-lg dark:text-gray-200">Total Amount: ${data?.totalAmount.toFixed(2)}</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Initiate New Reconciliation
              </Button>
              <Button variant="secondary" className="flex-1 dark:bg-gray-700 dark:text-gray-50 dark:hover:bg-gray-600">
                View Reconciliation History
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <Label htmlFor="filter-transactions" className="sr-only">Filter Transactions</Label>
          <Input
            id="filter-transactions"
            type="text"
            placeholder="Filter by Transaction ID or Status..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full md:w-1/2 lg:w-1/3 dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600"
          />
        </div>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold dark:text-gray-50">Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTransactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Transaction ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Status</th>
                      <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {filteredTransactions.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">{item.transactionId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">${item.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'matched' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : item.status === 'unmatched' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="link" className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">View</Button>
                          {item.status === 'unmatched' && (
                            <Button variant="link" className="ml-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">Match</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No transactions found matching your criteria.</p>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="p-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} SKYCOIN4444. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PaymentReconciliation;
