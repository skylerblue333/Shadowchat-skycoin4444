// AUTO-GENERATED DRAFT SCREEN: VestingSchedule
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VestingScheduleEntry {
  date: string;
  amount: number;
  released: boolean;
}

interface VestingScheduleProps {
  coinName: string;
  totalAmount: number;
  startDate: string;
  endDate: string;
  schedule: VestingScheduleEntry[];
  isLoading?: boolean;
  error?: string;
}

// Simulate tRPC hook for data fetching
const useVestingSchedule = (coinName: string) => {
  const [data, setData] = useState<VestingScheduleProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData: VestingScheduleProps = {
          coinName: coinName,
          totalAmount: 100000,
          startDate: '2023-01-01',
          endDate: '2025-12-31',
          schedule: [
            { date: '2023-01-01', amount: 10000, released: true },
            { date: '2023-07-01', amount: 15000, released: true },
            { date: '2024-01-01', amount: 20000, released: true },
            { date: '2024-07-01', amount: 25000, released: false },
            { date: '2025-01-01', amount: 15000, released: false },
            { date: '2025-07-01', amount: 10000, released: false },
            { date: '2025-12-31', amount: 5000, released: false },
          ],
        };
        setData(mockData);
      } catch (err) {
        setError('Failed to fetch vesting schedule.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [coinName]);

  return { data, isLoading, error };
};

const VestingSchedule: React.FC = () => {
  const { data, isLoading, error } = useVestingSchedule('SKYCOIN4444');
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Progress value={50} className="w-[60%]" />
        <p className="ml-2 text-gray-700 dark:text-gray-300">Loading vesting schedule...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <p>No vesting schedule data available.</p>
      </div>
    );
  }

  const totalReleased = data.schedule.filter(entry => entry.released).reduce((sum, entry) => sum + entry.amount, 0);
  const progressValue = (totalReleased / data.totalAmount) * 100;

  const filteredSchedule = data.schedule.filter(entry =>
    entry.date.includes(searchTerm) ||
    entry.amount.toString().includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="border-b dark:border-gray-700">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {data.coinName} Vesting Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <Label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Schedule
            </Label>
            <Input
              id="search"
              type="text"
              placeholder="Filter by date or amount..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Vesting Progress</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Progress value={progressValue} className="w-full h-3" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{progressValue.toFixed(2)}% Released</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {totalReleased.toLocaleString()} of {data.totalAmount.toLocaleString()} {data.coinName} released.
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="dark:border-gray-700">
                  <TableHead className="w-[150px] text-gray-600 dark:text-gray-400">Date</TableHead>
                  <TableHead className="text-right text-gray-600 dark:text-gray-400">Amount</TableHead>
                  <TableHead className="text-center text-gray-600 dark:text-gray-400">Status</TableHead>
                  <TableHead className="text-center text-gray-600 dark:text-gray-400">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedule.map((entry, index) => (
                  <TableRow key={index} className="dark:border-gray-800">
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">{entry.date}</TableCell>
                    <TableCell className="text-right text-gray-800 dark:text-gray-200">{entry.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${entry.released ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                        {entry.released ? 'Released' : 'Pending'}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={entry.released}
                        className="dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
                      >
                        {entry.released ? 'Claimed' : 'Claim'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSchedule.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 dark:text-gray-400">
                      No matching entries found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VestingSchedule;
