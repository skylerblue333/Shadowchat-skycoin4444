// AUTO-GENERATED DRAFT SCREEN: CryptoPriceCharts
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui card component
import { Skeleton } from './ui/skeleton'; // Assuming shadcn/ui skeleton component
import { Alert, AlertDescription, AlertTitle } from './ui/alert'; // Assuming shadcn/ui alert component
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'; // Assuming radix icons for error

// Mock tRPC hook for fetching data
const trpc = {
  crypto: {
    getPriceChart: (currency: string) => useQuery<any[], Error>({ queryKey: ['priceChart', currency], queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (Math.random() < 0.1) {
        throw new Error('Failed to fetch price data');
      }
      return Array.from({ length: 30 }, (_, i) => ({
        date: `Day ${i + 1}`,
        price: Math.random() * 1000 + 500,
      }));
    }})
  }
};

interface CryptoPriceChartsProps {
  currency: string;
}

const CryptoPriceCharts: React.FC<CryptoPriceChartsProps> = ({ currency }) => {
  const { data, isLoading, isError, error } = trpc.crypto.getPriceChart(currency);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Simulate dark mode toggle based on system preference or user setting
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (isLoading) {
    return (
      <Card className={`w-full max-w-4xl mx-auto ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{currency} Price Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className={`w-full max-w-4xl mx-auto ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{currency} Price Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load price chart for {currency}: {error?.message}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-4xl mx-auto ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{currency} Price Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#4B5563' : '#E5E7EB'} />
              <XAxis dataKey="date" stroke={isDarkMode ? '#D1D5DB' : '#6B7280'} />
              <YAxis stroke={isDarkMode ? '#D1D5DB' : '#6B7280'} />
              <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', borderColor: isDarkMode ? '#4B5563' : '#E5E7EB', color: isDarkMode ? '#FFFFFF' : '#1F2937' }} />
              <Line type="monotone" dataKey="price" stroke={isDarkMode ? '#60A5FA' : '#3B82F6'} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Data for {currency} over the last 30 days.</p>
      </CardContent>
    </Card>
  );
};

export default CryptoPriceCharts;
