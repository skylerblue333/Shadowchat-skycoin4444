// AUTO-GENERATED DRAFT SCREEN: ProposalAmendments

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Simulate tRPC client and types
interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  amendments: string[];
}

const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Proposal A: Increase Staking Rewards',
    description: 'This proposal aims to increase staking rewards by 5% to incentivize more participation.',
    status: 'pending',
    amendments: ['Adjust reward distribution algorithm'],
  },
  {
    id: '2',
    title: 'Proposal B: Community Fund Allocation',
    description: 'Allocate 10,000 SKYCOIN to a new community development fund.',
    status: 'approved',
    amendments: [],
  },
];

const trpc = {
  proposal: {
    list: {
      useQuery: () => useQuery<Proposal[], Error>({
        queryKey: ['proposals'],
        queryFn: async () => {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (Math.random() < 0.1) {
            throw new Error('Failed to fetch proposals');
          }
          return mockProposals;
        },
      }),
    },
  },
};

export const ProposalAmendments: React.FC = () => {
  const { data: proposals, isLoading, isError, error } = trpc.proposal.list.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500 dark:text-red-400" role="alert">
        Error: {error?.message || 'Failed to load proposals.'}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Governance: Proposal Amendments</h1>
      <p className="text-gray-600 dark:text-gray-400">Review and manage proposed amendments to SKYCOIN governance proposals.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {proposals?.map((proposal) => (
          <Card key={proposal.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{proposal.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-700 dark:text-gray-300 mb-2">{proposal.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status: <span className={`font-medium ${proposal.status === 'approved' ? 'text-green-600' : proposal.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{proposal.status}</span></p>
              {proposal.amendments.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-md font-medium mb-1">Amendments:</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    {proposal.amendments.map((amendment, index) => (
                      <li key={index}>{amendment}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Button className="w-full" disabled={proposal.status !== 'pending'}>Review Amendments</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProposalAmendments;
