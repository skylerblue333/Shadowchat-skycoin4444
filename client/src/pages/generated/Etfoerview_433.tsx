// AUTO-GENERATED DRAFT SCREEN: ETFOerview
import React from 'react';
import { trpc } from '../trpc';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

interface ETFData {
  name: string;
  symbol: string;
  aum: number;
  volume24h: number;
  topHolding: string;
  expenseRatio: number;
  news: { title: string; url: string; date: string }[];
  performance: { period: string; value: string }[];
}

const ETFOerview: React.FC = () => {
  // Mock data for demonstration. In a real app, this would come from tRPC or another API.
  const mockETFData: ETFData = {
    name: 'Skycoin Crypto ETF',
    symbol: 'SCETF',
    aum: 12.5,
    volume24h: 1.8,
    topHolding: 'Bitcoin (BTC)',
    expenseRatio: 0.75,
    news: [
      { title: 'Skycoin ETF Sees Record Inflows', url: '#', date: '2026-06-10' },
      { title: 'Analyst Upgrades Skycoin ETF Rating', url: '#', date: '2026-06-08' },
      { title: 'Skycoin ETF Adds Ethereum Exposure', url: '#', date: '2026-06-05' },
    ],
    performance: [
      { period: '1 Day', value: '+2.5%' },
      { period: '1 Week', value: '+7.1%' },
      { period: '1 Month', value: '+15.3%' },
      { period: 'YTD', value: '+45.0%' },
    ],
  };

  // Simulate fetching data with tRPC. For now, it returns the mock data.
  const { data, isLoading, error } = trpc.greeting.useQuery(
    { name: mockETFData.name },
    { 
      initialData: `Welcome to ${mockETFData.name}!`, // Provide initial data to avoid undefined during first render
      // In a real application, you would fetch actual ETF data here.
      // For this example, we're just using the greeting query and augmenting with mock data.
      select: (greetingData) => ({
        ...mockETFData,
        greeting: greetingData, // Attach the greeting from tRPC
      }),
    }
  );

  if (isLoading) {
    return (
      <div className="p-4 space-y-4" role="status" aria-label="Loading ETF data">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500" role="alert" aria-live="assertive">
        Error loading ETF data: {error.message}
      </div>
    );
  }

  const etf = data as ETFData & { greeting: string }; // Cast to include greeting

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950 text-foreground dark:text-gray-50 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-5xl mx-auto shadow-lg dark:shadow-none border dark:border-gray-800 rounded-lg">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0 p-6 border-b dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <CardTitle className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
              {etf.name} ({etf.symbol})
            </CardTitle>
            <Badge variant="secondary" className="text-sm font-medium">Crypto ETF</Badge>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: {new Date().toLocaleDateString()}
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="sr-only">Overview</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {etf.greeting} This exchange-traded fund provides investors with diversified exposure to the cryptocurrency market, focusing on key digital assets.
            </p>
          </section>

          <Separator className="dark:bg-gray-800" />

          <section aria-labelledby="key-metrics-heading">
            <h2 id="key-metrics-heading" className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Key Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard title="Total AUM" value={`$${etf.aum} Billion`} description="Assets Under Management" />
              <MetricCard title="24h Volume" value={`$${etf.volume24h} Billion`} description="Trading volume in the last 24 hours" />
              <MetricCard title="Top Holding" value={etf.topHolding} description="Largest asset in the fund" />
              <MetricCard title="Expense Ratio" value={`${etf.expenseRatio}%`} description="Annual fee for managing the fund" />
            </div>
          </section>

          <Separator className="dark:bg-gray-800" />

          <section aria-labelledby="performance-heading">
            <h2 id="performance-heading" className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Performance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {etf.performance.map((item) => (
                <div key={item.period} className="text-center p-3 border rounded-md dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.period}</p>
                  <p className={`text-lg font-semibold ${item.value.startsWith(
                    '+' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  )}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="dark:bg-gray-800" />

          <section aria-labelledby="recent-news-heading">
            <h2 id="recent-news-heading" className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Recent News</h2>
            <ScrollArea className="h-48 w-full rounded-md border dark:border-gray-800 p-4">
              <div className="space-y-4">
                {etf.news.length > 0 ? (
                  etf.news.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{item.date}:</span>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        {item.title}
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No recent news available.</p>
                )}
              </div>
            </ScrollArea>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description }) => (
  <Card className="p-4 text-center dark:bg-gray-800 border dark:border-gray-700">
    <CardHeader className="p-0 pb-2">
      <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </CardContent>
  </Card>
);

export default ETFOerview;
