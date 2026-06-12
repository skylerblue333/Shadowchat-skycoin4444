// AUTO-GENERATED DRAFT SCREEN: ProposalDetail
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // Simulating tRPC hook
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Progress } from './components/ui/progress';
import { Separator } from './components/ui/separator';
import { Badge } from './components/ui/badge';
import { Skeleton } from './components/ui/skeleton';

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'passed' | 'rejected';
  proposer: string;
  startDate: string;
  endDate: string;
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
  totalVotes: number;
}

// Simulated tRPC hook for fetching proposal details
const useProposalDetails = (proposalId: string) => {
  return useQuery<Proposal, Error>({
    queryKey: ['proposalDetails', proposalId],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (proposalId === 'prop-123') {
        return {
          id: 'prop-123',
          title: 'Implement Staking Rewards v2',
          description: 'This proposal aims to upgrade the current staking rewards mechanism to a more efficient and sustainable model, introducing dynamic reward rates based on network participation and treasury health. This will encourage long-term holding and active participation in the network.',
          status: 'active',
          proposer: '0xAbcDef1234567890AbcDef1234567890AbcDef1',
          startDate: '2026-06-01T10:00:00Z',
          endDate: '2026-06-15T10:00:00Z',
          forVotes: 1500000,
          againstVotes: 500000,
          abstainVotes: 100000,
          totalVotes: 2100000,
        };
      } else if (proposalId === 'prop-456') {
        return {
          id: 'prop-456',
          title: 'Treasury Diversification Initiative',
          description: 'A proposal to diversify the DAO treasury by allocating a portion of funds into stablecoins and other blue-chip assets to reduce volatility and ensure long-term stability.',
          status: 'passed',
          proposer: '0x1234567890AbcDef1234567890AbcDef123456',
          startDate: '2026-05-01T10:00:00Z',
          endDate: '2026-05-08T10:00:00Z',
          forVotes: 2000000,
          againstVotes: 100000,
          abstainVotes: 50000,
          totalVotes: 2150000,
        };
      } else {
        throw new Error('Proposal not found');
      }
    },
  });
};

const ProposalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const proposalId = id || 'prop-123'; // Default for demonstration
  const { data: proposal, isLoading, isError, error } = useProposalDetails(proposalId);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 text-red-500 dark:text-red-400">
        <h2 className="text-2xl font-bold mb-4">Error Loading Proposal</h2>
        <p>Error: {error?.message || 'An unknown error occurred.'}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="container mx-auto p-4 text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">Proposal Not Found</h2>
        <p>The requested proposal could not be found.</p>
      </div>
    );
  }

  const totalVotes = proposal.forVotes + proposal.againstVotes + proposal.abstainVotes;
  const forPercentage = totalVotes > 0 ? (proposal.forVotes / totalVotes) * 100 : 0;
  const againstPercentage = totalVotes > 0 ? (proposal.againstVotes / totalVotes) * 100 : 0;
  const abstainPercentage = totalVotes > 0 ? (proposal.abstainVotes / totalVotes) * 100 : 0;

  const getStatusBadge = (status: Proposal['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">Active</Badge>;
      case 'passed':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Passed</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <CardHeader className="border-b dark:border-gray-700 pb-4">
            <CardTitle className="text-3xl font-extrabold tracking-tight mb-2">
              {proposal.title}
            </CardTitle>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Proposal ID: {proposal.id}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Proposer: {proposal.proposer.substring(0, 6)}...{proposal.proposer.substring(proposal.proposer.length - 4)}</span>
              <Separator orientation="vertical" className="h-4" />
              {getStatusBadge(proposal.status)}
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {proposal.description}
              </p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Voting Period</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Start:</strong> {new Date(proposal.startDate).toLocaleString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>End:</strong> {new Date(proposal.endDate).toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Voting Results</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 dark:text-green-400">For ({forPercentage.toFixed(2)}%)</span>
                    <span>{proposal.forVotes.toLocaleString()}</span>
                  </div>
                  <Progress value={forPercentage} className="[&>*]:bg-green-500" aria-label="For votes progress" />

                  <div className="flex items-center justify-between">
                    <span className="text-red-600 dark:text-red-400">Against ({againstPercentage.toFixed(2)}%)</span>
                    <span>{proposal.againstVotes.toLocaleString()}</span>
                  </div>
                  <Progress value={againstPercentage} className="[&>*]:bg-red-500" aria-label="Against votes progress" />

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Abstain ({abstainPercentage.toFixed(2)}%)</span>
                    <span>{proposal.abstainVotes.toLocaleString()}</span>
                  </div>
                  <Progress value={abstainPercentage} className="[&>*]:bg-gray-500" aria-label="Abstain votes progress" />

                  <div className="flex items-center justify-between font-bold mt-4">
                    <span>Total Votes</span>
                    <span>{totalVotes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end space-x-4">
              <Button variant="outline" className="dark:text-gray-200 dark:border-gray-700">View on Explorer</Button>
              {proposal.status === 'active' && (
                <Button>Cast Your Vote</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProposalDetail;
