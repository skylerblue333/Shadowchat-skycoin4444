// AUTO-GENERATED DRAFT SCREEN: GovernanceProposalExecution
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface Proposal { 
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'executed' | 'failed';
  votesFor: number;
  votesAgainst: number;
  executionDetails?: string;
}

// Mock tRPC hook for fetching proposal details
const useProposalDetails = (proposalId: string) => {
  return useQuery<Proposal, Error>(['proposal', proposalId], async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: proposalId,
          title: 'SKYCOIN4444 Governance Proposal: Upgrade Protocol v2.0',
          description: 'This proposal aims to upgrade the SKYCOIN4444 protocol to version 2.0, introducing enhanced security features and improved transaction efficiency.',
          status: 'active',
          votesFor: 1500,
          votesAgainst: 500,
        });
      }, 1000);
    });
  });
};

const GovernanceProposalExecution: React.FC = () => {
  const proposalId = 'proposal-123'; // This would typically come from a route parameter or prop
  const { data: proposal, isLoading, isError, error } = useProposalDetails(proposalId);

  const [darkMode, setDarkMode] = React.useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Progress value={33} className="w-[60%]" />
        <p className="ml-2 text-gray-700 dark:text-gray-300">Loading proposal details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load proposal: {error?.message || 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>
            Proposal not found.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const progressFor = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Governance: Proposal Execution</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{proposal.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{proposal.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Status:</p>
                <p className="capitalize">{proposal.status}</p>
              </div>
              <div>
                <p className="font-medium">Votes For:</p>
                <p>{proposal.votesFor}</p>
              </div>
              <div>
                <p className="font-medium">Votes Against:</p>
                <p>{proposal.votesAgainst}</p>
              </div>
              <div>
                <p className="font-medium">Total Votes:</p>
                <p>{totalVotes}</p>
              </div>
            </div>
            <div className="mt-6">
              <Label htmlFor="progress-for" className="mb-2 block">Votes For Progress:</Label>
              <Progress value={progressFor} id="progress-for" className="w-full" aria-label="Progress for votes in favor" />
              <p className="text-sm text-right mt-1">{progressFor.toFixed(1)}%</p>
            </div>
          </CardContent>
        </Card>

        {proposal.status === 'active' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-4">
              <Button className="bg-green-500 hover:bg-green-600 text-white" aria-label="Execute proposal">Execute Proposal</Button>
              <Button variant="outline" aria-label="Cancel proposal">Cancel Proposal</Button>
            </CardContent>
          </Card>
        )}

        {proposal.status === 'executed' && proposal.executionDetails && (
          <Card>
            <CardHeader>
              <CardTitle>Execution Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{proposal.executionDetails}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GovernanceProposalExecution;
