// AUTO-GENERATED DRAFT SCREEN: IcoLaunchpadScreen
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ICOData {
  name: string;
  symbol: string;
  totalTokens: number;
  tokensSold: number;
  pricePerToken: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'ended';
}

const mockICOData: ICOData[] = [
  {
    name: 'Quantum Coin',
    symbol: 'QTC',
    totalTokens: 100000000,
    tokensSold: 45000000,
    pricePerToken: 0.05,
    startDate: '2026-07-01',
    endDate: '2026-07-31',
    status: 'active',
  },
  {
    name: 'Nebula Token',
    symbol: 'NBT',
    totalTokens: 50000000,
    tokensSold: 0,
    pricePerToken: 0.10,
    startDate: '2026-08-15',
    endDate: '2026-09-15',
    status: 'upcoming',
  },
  {
    name: 'Cosmic Cash',
    symbol: 'CSC',
    totalTokens: 200000000,
    tokensSold: 200000000,
    pricePerToken: 0.02,
    startDate: '2026-05-01',
    endDate: '2026-05-31',
    status: 'ended',
  },
];

const IcoLaunchpadScreen: React.FC = () => {
  const [icos, setIcos] = useState<ICOData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    // Simulate tRPC hook / API call
    const fetchIcos = async () => {
      try {
        setLoading(true);
        setError(null);
        // In a real application, this would be a tRPC call:
        // const response = await trpc.ico.list.useQuery();
        // setIcos(response.data);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        setIcos(mockICOData);
      } catch (err) {
        setError('Failed to fetch ICO data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIcos();
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Loading ICOs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Crypto: ICO Launchpad</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkTheme}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {icos.map((ico) => (
            <Card key={ico.symbol} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-2xl">{ico.name} ({ico.symbol})</CardTitle>
                <CardDescription>
                  {ico.status === 'upcoming' && <span className="text-blue-500">Upcoming</span>}
                  {ico.status === 'active' && <span className="text-green-500">Active</span>}
                  {ico.status === 'ended' && <span className="text-red-500">Ended</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p><strong>Price:</strong> ${ico.pricePerToken.toFixed(2)}</p>
                <p><strong>Total Tokens:</strong> {ico.totalTokens.toLocaleString()}</p>
                <p><strong>Tokens Sold:</strong> {ico.tokensSold.toLocaleString()}</p>
                <Progress value={(ico.tokensSold / ico.totalTokens) * 100} className="w-full" aria-label="Progress of tokens sold" />
                <p><strong>Start Date:</strong> {ico.startDate}</p>
                <p><strong>End Date:</strong> {ico.endDate}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={ico.status !== 'active'}>
                  {ico.status === 'active' ? 'Participate Now' : 'View Details'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IcoLaunchpadScreen;