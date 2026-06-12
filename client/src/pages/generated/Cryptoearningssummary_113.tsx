// AUTO-GENERATED DRAFT SCREEN: CryptoEarningsSummary
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ArrowUp, ArrowDown, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EarningsSummaryProps {
  // Define props if any
}

const CryptoEarningsSummary: React.FC<EarningsSummaryProps> = () => {
  // Example tRPC hook usage (replace with actual tRPC query)
  const { data: earningsData, isLoading, isError, error } = trpc.crypto.getEarningsSummary.useQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full dark:bg-gray-900 dark:text-gray-100">
        <p className="text-lg">Loading earnings data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen w-full dark:bg-gray-900 dark:text-gray-100">
        <p className="text-lg text-red-500">Error: {error?.message}</p>
      </div>
    );
  }

  // Dummy data for demonstration if tRPC data is not available or for initial structure
  const summary = earningsData || {
    totalEarnings: 12345.67,
    dailyChange: 123.45,
    dailyChangePercentage: 1.23,
    weeklyChange: -50.00,
    weeklyChangePercentage: -0.50,
    monthlyChange: 500.00,
    monthlyChangePercentage: 4.50,
    totalInvested: 10000.00,
    profitLoss: 2345.67,
  };

  const chartData = [
    { name: 'Jan', earnings: 4000 },
    { name: 'Feb', earnings: 3000 },
    { name: 'Mar', earnings: 5000 },
    { name: 'Apr', earnings: 4500 },
    { name: 'May', earnings: 6000 },
    { name: 'Jun', earnings: 7000 },
    { name: 'Jul', earnings: 6500 },
    { name: 'Aug', earnings: 8000 },
    { name: 'Sep', earnings: 7500 },
    { name: 'Oct', earnings: 9000 },
    { name: 'Nov', earnings: 8500 },
    { name: 'Dec', earnings: 10000 },
  ];

  const isDailyPositive = summary.dailyChange >= 0;
  const isWeeklyPositive = summary.weeklyChange >= 0;
  const isMonthlyPositive = summary.monthlyChange >= 0;
  const isProfit = summary.profitLoss >= 0;

  return (
    <div className="p-4 md:p-8 space-y-6 dark:bg-gray-900 dark:text-gray-100 min-h-screen font-sans antialiased">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">
        Crypto Earnings Summary
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dark:bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Earnings</CardTitle>
            <DollarSign className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-50">${summary.totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">Your total accumulated crypto earnings</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Daily Change</CardTitle>
            {isDailyPositive ? (
              <ArrowUp className="h-5 w-5 text-green-500" />
            ) : (
              <ArrowDown className="h-5 w-5 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${isDailyPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isDailyPositive ? '+' : '-'}${Math.abs(summary.dailyChange).toFixed(2)}
            </div>
            <p className="text-xs text-gray-500 mt-1">{summary.dailyChangePercentage.toFixed(2)}% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Weekly Change</CardTitle>
            {isWeeklyPositive ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${isWeeklyPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isWeeklyPositive ? '+' : '-'}${Math.abs(summary.weeklyChange).toFixed(2)}
            </div>
            <p className="text-xs text-gray-500 mt-1">{summary.weeklyChangePercentage.toFixed(2)}% from last week</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Monthly Change</CardTitle>
            {isMonthlyPositive ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${isMonthlyPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isMonthlyPositive ? '+' : '-'}${Math.abs(summary.monthlyChange).toFixed(2)}
            </div>
            <p className="text-xs text-gray-500 mt-1">{summary.monthlyChangePercentage.toFixed(2)}% from last month</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-full lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Invested</CardTitle>
            <Wallet className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-50">${summary.totalInvested.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">Your initial investment across all assets</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-full lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Profit/Loss</CardTitle>
            {isProfit ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
              {isProfit ? '+' : '-'}${Math.abs(summary.profitLoss).toFixed(2)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Overall profit or loss since investment</p>
          </CardContent>
        </Card>
      </div>

      <Card className="dark:bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-400">Earnings Trend (Last 12 Months)</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                itemStyle={{ color: '#E5E7EB' }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Line type="monotone" dataKey="earnings" stroke="#3B82F6" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoEarningsSummary;
