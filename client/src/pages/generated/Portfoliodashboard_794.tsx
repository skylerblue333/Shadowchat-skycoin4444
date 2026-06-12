// AUTO-GENERATED DRAFT SCREEN: PortfolioDashboard
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'; // shadcn/ui
import { Button } from '../../components/ui/button'; // shadcn/ui
import { Skeleton } from '../../components/ui/skeleton'; // shadcn/ui
import { Switch } from '../../components/ui/switch'; // shadcn/ui
import { Label } from '../../components/ui/label'; // shadcn/ui
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react'; // Lucide icons

// Mock tRPC hook for fetching portfolio data
const usePortfolioData = () => {
  return useQuery({
    queryKey: ['portfolioData'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (Math.random() < 0.1) {
        throw new Error('Failed to fetch portfolio data');
      }
      return {
        totalBalance: 12345.67,
        dailyChange: 5.23,
        dailyChangePercentage: 0.42,
        holdings: [
          { id: 'btc', name: 'Bitcoin', amount: 0.5, value: 15000, change24h: 2.5 },
          { id: 'eth', name: 'Ethereum', amount: 3.0, value: 9000, change24h: -1.2 },
          { id: 'ada', name: 'Cardano', amount: 1000, value: 300, change24h: 0.8 },
        ],
      };
    },
  });
};

interface PortfolioDashboardProps {}

const PortfolioDashboard: React.FC<PortfolioDashboardProps> = () => {
  const { data, isLoading, isError, error, refetch } = usePortfolioData();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
        </div>
        <Skeleton className="h-[200px]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error: {error?.message || 'Something went wrong'}</p>
        <Button onClick={() => refetch()} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Portfolio Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-switch"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-switch">Dark Mode</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data?.totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+${data?.dailyChange} ({data?.dailyChangePercentage}%) daily</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Change</CardTitle>
            {data && data.dailyChange >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${data && data.dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {data && data.dailyChange >= 0 ? '+' : '-'}${Math.abs(data?.dailyChange || 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">{data?.dailyChangePercentage}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Holdings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.holdings.length} Assets</div>
            <p className="text-xs text-muted-foreground">Across all cryptocurrencies</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2">Asset</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Value</th>
                  <th className="py-2">24h Change</th>
                </tr>
              </thead>
              <tbody>
                {data?.holdings.map((holding) => (
                  <tr key={holding.id} className="border-t border-border">
                    <td className="py-2 font-medium">{holding.name}</td>
                    <td className="py-2">{holding.amount}</td>
                    <td className="py-2">${holding.value.toLocaleString()}</td>
                    <td className={`py-2 ${holding.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {holding.change24h >= 0 ? '+' : ''}{holding.change24h}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioDashboard;
