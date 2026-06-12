// AUTO-GENERATED DRAFT SCREEN: SnapshotIntegration
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Simulating tRPC hook with react-query
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

// Define types for Snapshot data (example)
interface Proposal {
  id: string;
  title: string;
  state: 'pending' | 'active' | 'closed';
  choices: string[];
  scores: number[];
  link: string;
}

interface SnapshotData {
  proposals: Proposal[];
  space: string;
}

// Simulate fetching data from a tRPC-like endpoint
const fetchSnapshotData = async (): Promise<SnapshotData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        proposals: [
          {
            id: '1',
            title: 'Proposal 1: Implement new fee structure',
            state: 'active',
            choices: ['For', 'Against', 'Abstain'],
            scores: [120, 30, 10],
            link: 'https://snapshot.org/#/skycoin4444.eth/proposal/0x1',
          },
          {
            id: '2',
            title: 'Proposal 2: Community grant for project X',
            state: 'pending',
            choices: ['Yes', 'No'],
            scores: [0, 0],
            link: 'https://snapshot.org/#/skycoin4444.eth/proposal/0x2',
          },
          {
            id: '3',
            title: 'Proposal 3: Upgrade smart contract A',
            state: 'closed',
            choices: ['Approve', 'Reject'],
            scores: [500, 50],
            link: 'https://snapshot.org/#/skycoin4444.eth/proposal/0x3',
          },
        ],
        space: 'skycoin4444.eth',
      });
    }, 1500);
  });
};

const SnapshotIntegration: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  // Simulate dark theme toggle
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  // Simulate tRPC hook with react-query for data fetching, including loading and error states
  const { data, isLoading, isError, error } = useQuery<SnapshotData, Error>({
    queryKey: ['snapshotData'],
    queryFn: fetchSnapshotData,
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 dark:bg-gray-900 min-h-screen">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <Alert variant="destructive" className="w-full max-w-4xl mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load Snapshot data: {error?.message || 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">Governance Module: Snapshot Integration</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode-toggle"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.proposals.map((proposal) => (
            <Card key={proposal.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{proposal.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Status: <span className={`font-medium ${proposal.state === 'active' ? 'text-green-500' : proposal.state === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>{proposal.state.charAt(0).toUpperCase() + proposal.state.slice(1)}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Space: <span className="font-medium">{data.space}</span>
                  </p>
                  {proposal.state === 'closed' && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Results:
                      <ul className="list-disc list-inside ml-4">
                        {proposal.choices.map((choice, index) => (
                          <li key={choice}>{choice}: {proposal.scores[index]}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <Button asChild className="w-full mt-auto">
                  <a href={proposal.link} target="_blank" rel="noopener noreferrer" aria-label={`View details for ${proposal.title} on Snapshot`}>
                    View Proposal
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <footer className="text-center text-sm text-gray-500 dark:text-gray-400 pt-8">
          <p>&copy; {new Date().getFullYear()} SKYCOIN4444. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default SnapshotIntegration;
