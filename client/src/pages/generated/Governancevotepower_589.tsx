// AUTO-GENERATED DRAFT SCREEN: GovernanceVotePower
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC/react-query
import { Button } from '@/components/ui/button'; // shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui card
import { Switch } from '@/components/ui/switch'; // shadcn/ui switch for dark mode toggle
import { Label } from '@/components/ui/label';

interface VotePowerData {
  totalPower: number;
  delegatedPower: number;
  availablePower: number;
}

// Placeholder for tRPC hook - replace with actual tRPC client setup
const useGetVotePower = () => {
  return useQuery<VotePowerData, Error>({
    queryKey: ['votePower'],
    queryFn: async () => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            totalPower: 10000,
            delegatedPower: 2500,
            availablePower: 7500,
          });
        }, 1000);
      });
    },
  });
};

const GovernanceVotePower: React.FC = () => {
  const { data, isLoading, isError, error } = useGetVotePower();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading vote power...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <p className="text-lg text-red-500">Error: {error?.message || 'Failed to load vote power'}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Governance: Vote Power</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode-toggle"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
          </div>
        </header>

        <Card className="w-full mb-6">
          <CardHeader>
            <CardTitle>Your Vote Power Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-semibold">Total Power</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{data?.totalPower || 0}</p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-semibold">Delegated Power</h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{data?.delegatedPower || 0}</p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-semibold">Available Power</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{data?.availablePower || 0}</p>
            </div>
          </CardContent>
        </Card>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Delegation & Voting</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Manage your delegated vote power and participate in governance proposals.
          </p>
          <Button className="mt-4">Delegate Power</Button>
          <Button variant="outline" className="mt-4 ml-4">View Proposals</Button>
        </section>
      </div>
    </div>
  );
};

export default GovernanceVotePower;
