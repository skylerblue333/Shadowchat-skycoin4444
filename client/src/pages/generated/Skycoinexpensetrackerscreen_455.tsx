// @ts-nocheck
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: SkycoinExpenseTrackerScreen

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */

// import { Toast } from '@/components/ui/toast';
// import { Skeleton } from '@/components/ui/skeleton';


interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO date string
  category: string;
}

const SkycoinExpenseTrackerScreen: React.FC = () => {
  const { data: expenses, isLoading, isError, error, refetch } = useStubQuery();
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    description: '',
    amount: 0,
    date: '',
    category: '',
  });
  const addExpenseMutation = useStubMutation({
    onSuccess: () => {
      refetch();
      setNewExpense({ description: '', amount: 0, date: '', category: '' });
    },
  });



  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    addExpenseMutation.mutate(newExpense);
  };

  // Loading state rendering
  if (isLoading || addExpenseMutation.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        {/* <Skeleton className="h-12 w-12 rounded-full" /> */}
        <p className="text-gray-700 dark:text-gray-300">Loading expenses...</p>
      </div>
    );
  }

  // Error state rendering
  if (isError || addExpenseMutation.isError) {
    return (
      <div className="text-red-500 text-center p-4 dark:text-red-400">
        Error: {error?.message || addExpenseMutation.error?.message}
        {/* <Toast title="Error" description={error} /> */}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Expense Tracker</h1>

      {/* Expense Summary/Dashboard Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">$ {expenses ? expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2) : '0.00'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{expenses ? new Set(expenses.map(exp => exp.category)).size : 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Latest Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{expenses && expenses.length > 0 ? expenses[expenses.length - 1].description : 'N/A'}</p>
          </CardContent>
        </Card>

      </div>

      {/* Add New Expense Form */}
      <div className="mb-8">
        <Card>
          <CardHeader><CardTitle>Add New Expense</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <Input id="description" placeholder="Description" value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} required />
                {/* <Input id="description" placeholder="Description" value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} /> */}
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                <Input id="amount" type="number" placeholder="Amount" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })} required />
                {/* <Input id="amount" type="number" placeholder="Amount" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })} /> */}
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                <Input id="date" type="date" value={newExpense.date} onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} required />
                {/* Placeholder for DatePicker */}
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <Select onValueChange={(value) => setNewExpense({ ...newExpense, category: value })} value={newExpense.category}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Bills">Bills</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {/* <Select onValueChange={(value) => setNewExpense({ ...newExpense, category: value })} value={newExpense.category}> */}
                {/* ... Select options ... */}
                {/* </Select> */}
              </div>
              <Button type="submit" className="w-full">Add Expense</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Expense List/Table */}
      <div>
  
        <Card>
          <CardHeader><CardTitle>Recent Expenses</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {expenses?.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.description}</TableCell>
                    <TableCell>$ {expense.amount.toFixed(2)}</TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>
                      <Button variant="ghost" className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">Edit</Button>
                      <Button variant="ghost" className="text-red-600 hover:text-red-900 ml-2 dark:text-red-400 dark:hover:text-red-300">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Accessibility considerations (e.g., ARIA attributes) */}

    </div>
  );
};

export default SkycoinExpenseTrackerScreen;