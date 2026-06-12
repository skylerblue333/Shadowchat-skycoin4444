// AUTO-GENERATED DRAFT SCREEN: BudgetManager
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

interface BudgetManagerProps {
  userId: string;
}

// Simulated tRPC hooks for demonstration purposes
const useGetTransactions = (userId: string) => {
  const [data, setData] = useState<Transaction[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData: Transaction[] = [
          { id: '1', description: 'Salary', amount: 5000, type: 'income' },
          { id: '2', description: 'Rent', amount: -1200, type: 'expense' },
          { id: '3', description: 'Groceries', amount: -300, type: 'expense' },
        ];
        setData(mockData);
      } catch (err) {
        setError('Failed to fetch transactions.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return { data, isLoading, error };
};

const useAddTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (newTransaction: Omit<Transaction, 'id'>) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const addedTransaction: Transaction = { ...newTransaction, id: String(Date.now()) };
      return addedTransaction;
    } catch (err) {
      setError('Failed to add transaction.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

const BudgetManager: React.FC<BudgetManagerProps> = ({ userId }) => {
  const { data: transactions, isLoading, error } = useGetTransactions(userId);
  const { mutate: addTransaction, isLoading: isAdding, error: addError } = useAddTransaction();

  const [newDescription, setNewDescription] = useState('');
  const [newAmount, setNewAmount] = useState(0);
  const [newType, setNewType] = useState<'income' | 'expense'>('expense');

  const handleAddTransaction = async () => {
    if (newDescription && newAmount !== 0) {
      try {
        await addTransaction({
          description: newDescription,
          amount: newType === 'expense' ? -Math.abs(newAmount) : Math.abs(newAmount),
          type: newType,
        });
        setNewDescription('');
        setNewAmount(0);
      } catch (err) {
        // Error handled by useAddTransaction hook
      }
    }
  };

  const totalBalance = transactions?.reduce((sum, t) => sum + t.amount, 0) || 0;

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">Loading budget data...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500 dark:bg-gray-900">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Crypto: Budget Manager</h1>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Balance: <span className={totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}>${totalBalance.toFixed(2)}</span></h2>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3">Add New Transaction</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <input
              type="text"
              placeholder="Description"
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              aria-label="Transaction Description"
            />
            <input
              type="number"
              placeholder="Amount"
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={newAmount === 0 ? '' : newAmount}
              onChange={(e) => setNewAmount(parseFloat(e.target.value))}
              aria-label="Transaction Amount"
            />
            <select
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={newType}
              onChange={(e) => setNewType(e.target.value as 'income' | 'expense')}
              aria-label="Transaction Type"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <Button onClick={handleAddTransaction} disabled={isAdding} className="col-span-full md:col-span-1">
              {isAdding ? 'Adding...' : 'Add Transaction'}
            </Button>
          </div>
          {addError && <p className="text-red-500 mt-2">Error: {addError}</p>}
        </div>

        <div>
          <h3 className="text-xl font-medium mb-3">Transaction History</h3>
          {transactions && transactions.length > 0 ? (
            <ul className="space-y-2">
              {transactions.map((transaction) => (
                <li key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <span>{transaction.description}</span>
                  <span className={transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {transaction.amount >= 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetManager;