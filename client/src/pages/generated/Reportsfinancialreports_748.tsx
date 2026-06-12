// AUTO-GENERATED DRAFT SCREEN: ReportsFinancialReports
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from 'next-themes';
import { ArrowUpDown } from 'lucide-react';

// Placeholder for tRPC hook - replace with actual tRPC client setup
const trpc = {
  reports: {
    getFinancialReports: {
      useQuery: () => ({
        data: [
          { id: '1', name: 'Q1 2024 Revenue', amount: 1200000, date: '2024-03-31' },
          { id: '2', name: 'Q2 2024 Expenses', amount: 800000, date: '2024-06-30' },
          { id: '3', name: 'Q3 2024 Revenue', amount: 1500000, date: '2024-09-30' },
          { id: '4', name: 'Q4 2024 Expenses', amount: 900000, date: '2024-12-31' },
          { id: '5', name: 'Q1 2025 Revenue', amount: 1300000, date: '2025-03-31' },
          { id: '6', name: 'Q2 2025 Expenses', amount: 850000, date: '2025-06-30' },
        ],
        isLoading: false,
        isError: false,
        error: null,
      }),
    },
  },
};

interface FinancialReport {
  id: string;
  name: string;
  amount: number;
  date: string;
}

const ReportsFinancialReports: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { data: reports, isLoading, isError, error } = trpc.reports.getFinancialReports.useQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'amount' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredAndSortedReports = useMemo(() => {
    if (!reports) return [];

    let filtered = reports.filter(report =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let compareValue = 0;
      if (sortBy === 'name') {
        compareValue = a.name.localeCompare(b.name);
      } else if (sortBy === 'amount') {
        compareValue = a.amount - b.amount;
      } else if (sortBy === 'date') {
        compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return filtered;
  }, [reports, searchTerm, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedReports.length / itemsPerPage);
  const currentReports = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedReports.slice(startIndex, endIndex);
  }, [filteredAndSortedReports, currentPage, itemsPerPage]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-lg">Loading financial reports...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen text-red-500 text-lg">Error: {error?.message || 'Failed to load reports'}</div>;
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Financial Reports</h1>
        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </Button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-sm dark:bg-gray-800 dark:border-gray-700"
        />
        <Select onValueChange={(value: 'name' | 'amount' | 'date') => setSortBy(value)} defaultValue={sortBy}>
          <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-700">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="amount">Amount</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="dark:bg-gray-800 dark:border-gray-700">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentReports.length > 0 ? (
          currentReports.map((report: FinancialReport) => (
            <Card key={report.id} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl">{report.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">Amount: ${report.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date: {report.date}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">No reports found matching your criteria.</p>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="dark:bg-gray-800 dark:border-gray-700"
        >
          Previous
        </Button>
        <span className="text-lg">Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="dark:bg-gray-800 dark:border-gray-700"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ReportsFinancialReports;
