// AUTO-GENERATED DRAFT SCREEN: GovernanceProposalsList
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { trpc } from '@/trpc';

interface Proposal {
  id: string;
  title: string;
  status: 'active' | 'passed' | 'failed';
  description: string;
  votesFor: number;
  votesAgainst: number;
}

const GovernanceProposalsList: React.FC = () => {
  const { data: proposals, isLoading, isError, error } = trpc.proposals.useQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Governance Proposals</h1>
          <Button>Create New Proposal</Button>
        </div>
        <Separator className="mb-6" />
        <div className="text-center text-gray-500 dark:text-gray-400">Loading proposals...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Governance Proposals</h1>
          <Button>Create New Proposal</Button>
        </div>
        <Separator className="mb-6" />
        <div className="text-center text-red-500 dark:text-red-400">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Governance Proposals</h1>
        <Button>Create New Proposal</Button>
      </div>
      <Separator className="mb-6" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {proposals?.map((proposal) => (
          <Card key={proposal.id}>
            <CardHeader>
              <CardTitle>{proposal.title}</CardTitle>
              <CardDescription>
                <Badge
                  className={`
                    ${proposal.status === 'active' && 'bg-blue-500 hover:bg-blue-600'}
                    ${proposal.status === 'passed' && 'bg-green-500 hover:bg-green-600'}
                    ${proposal.status === 'failed' && 'bg-red-500 hover:bg-red-600'}
                  `}
                >
                  {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{proposal.description}</p>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>For: {proposal.votesFor}</span>
                <span>Against: {proposal.votesAgainst}</span>
              </div>
              <Button variant="outline" className="mt-4 w-full">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GovernanceProposalsList;
