// AUTO-GENERATED DRAFT SCREEN: CryptoCopyTrading
import React, { useState } from 'react';
import { trpc } from '../../trpc';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { Button } from '@ui/button';
import { Switch } from '@ui/switch';
import { Label } from '@ui/label';
import { Separator } from '@ui/separator';
import { Input } from '@ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/table';

interface Trader {
  id: string;
  name: string;
  roi: string;
  aum: string;
  followers: number;
}

const mockTraders: Trader[] = [
  { id: '1', name: 'CryptoMaster', roi: '+150%', aum: '$1.2M', followers: 1200 },
  { id: '2', name: 'DeFiKing', roi: '+120%', aum: '$800K', followers: 950 },
  { id: '3', name: 'TokenGuru', roi: '+90%', aum: '$500K', followers: 700 },
  { id: '4', name: 'BlockchainPro', roi: '+75%', aum: '$300K', followers: 500 },
];

const CryptoCopyTrading: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = trpc.hello.useQuery();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const filteredTraders = mockTraders.filter(trader =>
    trader.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading copy trading data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Error</CardTitle>
            <CardDescription>Failed to load copy trading data.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{error.message}</p>
            <Button onClick={() => refetch()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Crypto: Copy Trading</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode-toggle"
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome to Copy Trading</CardTitle>
            <CardDescription>Start copying top traders and grow your portfolio.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{data?.message}</p>
            <p className="text-gray-600 dark:text-gray-400">Explore top traders and their performance.</p>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        <Card>
          <CardHeader>
            <CardTitle>Top Traders</CardTitle>
            <CardDescription>Discover and copy the best performing crypto traders.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search traders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trader</TableHead>
                  <TableHead>ROI</TableHead>
                  <TableHead>AUM</TableHead>
                  <TableHead>Followers</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTraders.map((trader) => (
                  <TableRow key={trader.id}>
                    <TableCell className="font-medium">{trader.name}</TableCell>
                    <TableCell>{trader.roi}</TableCell>
                    <TableCell>{trader.aum}</TableCell>
                    <TableCell>{trader.followers}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Copy</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredTraders.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-4">No traders found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoCopyTrading;