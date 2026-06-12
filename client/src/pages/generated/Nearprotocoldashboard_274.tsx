// AUTO-GENERATED DRAFT SCREEN: NearProtocolDashboard
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

interface NearProtocolDashboardProps {
  // Define any props for the dashboard if needed
}

interface NearData {
  totalAccounts: number;
  totalTransactions: number;
  latestBlockHeight: number;
  nearPrice: number;
  priceChange24h: number;
}

const fetchNearData = async (): Promise<NearData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalAccounts: 12345678,
        totalTransactions: 987654321,
        latestBlockHeight: 123456789,
        nearPrice: 7.89,
        priceChange24h: 0.25,
      });
    }, 1500);
  });
};

const NearProtocolDashboard: React.FC<NearProtocolDashboardProps> = () => {
  const [data, setData] = useState<NearData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchNearData();
        setData(result);
      } catch (err) {
        setError('Failed to fetch NEAR Protocol data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">NEAR Protocol Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode-toggle"
              checked={isDarkTheme}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
          </div>
        </header>

        <Separator className="mb-8" />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{data?.totalAccounts.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{data?.totalTransactions.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Latest Block Height</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{data?.latestBlockHeight.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>NEAR Price</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">${data?.nearPrice.toFixed(2)}</p>
                <p className={`text-sm ${data && data.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {data?.priceChange24h >= 0 ? '+' : ''}{data?.priceChange24h.toFixed(2)}% (24h)
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Placeholder for tRPC hooks integration - this would typically involve a separate setup */}
        <div className="mt-8 p-6 bg-card rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Additional Data (tRPC Placeholder)</h2>
          <p className="text-muted-foreground">This section would integrate with tRPC hooks to fetch more detailed data or perform mutations. For this example, we are simulating data fetching.</p>
          <Button className="mt-4">Fetch More Data (Simulated)</Button>
        </div>
      </div>
    </div>
  );
};

export default NearProtocolDashboard;
