// @ts-nocheck
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: GovernanceVoting

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


// Placeholder for tRPC hooks

interface Proposal {
  id: string;
  title: string;
  status: 'Active' | 'Passed' | 'Failed';
  description: string;
  timeLeft?: string;
  daysAgo?: string;
}

const mockProposals: Proposal[] = [
  {
    id: 'AGIP-42',
    title: 'Increase Staking Rewards for Validators',
    status: 'Active',
    description: 'This proposal aims to increase staking rewards by 15% to improve network security and incentivize long-term participation.',
    timeLeft: '2d 14h left',
  },
  {
    id: 'AGIP-41',
    title: 'Allocate Treasury Funds for Developer Grants',
    status: 'Active',
    description: 'Allocate 500,000 AGORA from the treasury to fund grants for developer tools, integrations, and ecosystem projects.',
    timeLeft: '4d 3h left',
  },
  {
    id: 'AGIP-40',
    title: 'Upgrade Governance Contract to v2.1',
    status: 'Passed',
    description: 'Upgrade the governance contract to v2.1 to improve gas efficiency and introduce new voting mechanisms.',
    daysAgo: '2 days ago',
  },
  {
    id: 'AGIP-39',
    title: 'Reduce Proposal Threshold Requirement',
    status: 'Failed',
    description: 'Lower the proposal threshold from 100,000 AGORA to 50,000 AGORA to encourage broader participation.',
    daysAgo: '5 days ago',
  },
];

const GovernanceVoting: React.FC = () => {
  // const { data: proposals, isLoading, error } = useStubQuery();
  const isLoading = false; // Mock loading state
  const error = null; // Mock error state
  const proposals = mockProposals; // Using mock data for now

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading proposals...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
  }

  const activeProposalsCount = proposals.filter(p => p.status === 'Active').length;
  const passedProposalsCount = proposals.filter(p => p.status === 'Passed').length;
  const failedProposalsCount = proposals.filter(p => p.status === 'Failed').length;

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Governance Voting</h1>
      <p className="text-gray-400 mb-8">Participate in shaping the future of Agora. Vote on proposals that impact the protocol.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="dark:bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Active Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeProposalsCount}</p>
            <p className="text-sm text-gray-400">Voting is live</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Passed Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{passedProposalsCount}</p>
            <p className="text-sm text-gray-400">This quarter</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Failed Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{failedProposalsCount}</p>
            <p className="text-sm text-gray-400">This quarter</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Active Voters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,234</p>
            <p className="text-sm text-gray-400">In the last 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Active Proposals</h2>
        {proposals.filter(p => p.status === 'Active').map((proposal) => (
          <Card key={proposal.id} className="mb-4 dark:bg-gray-800 border-gray-700">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h3 className="text-xl font-semibold">{proposal.title}</h3>
                <Badge className="mt-2 mr-2 bg-green-500 dark:bg-green-700">{proposal.status}</Badge>
                {proposal.timeLeft && <span className="text-sm text-gray-400">{proposal.timeLeft}</span>}
                <p className="text-gray-300 mt-2">{proposal.description}</p>
              </div>
              <Button variant="outline" className="dark:border-gray-600 dark:text-white">
                View Details <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Past Proposals</h2>
        {proposals.filter(p => p.status !== 'Active').map((proposal) => (
          <Card key={proposal.id} className="mb-4 dark:bg-gray-800 border-gray-700">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h3 className="text-xl font-semibold">{proposal.title}</h3>
                <Badge className={`mt-2 mr-2 ${proposal.status === 'Passed' ? 'bg-blue-500 dark:bg-blue-700' : 'bg-red-500 dark:bg-red-700'}`}>{proposal.status}</Badge>
                {proposal.daysAgo && <span className="text-sm text-gray-400">{proposal.daysAgo}</span>}
                <p className="text-gray-300 mt-2">{proposal.description}</p>
              </div>
              <Button variant="outline" className="dark:border-gray-600 dark:text-white">
                View Details <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="dark:bg-gray-800 border-gray-700 p-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Create New Proposal</h2>
          <p className="text-gray-400">Have an idea to improve Agora? Submit a proposal for the community to discuss and vote on.</p>
        </div>
        <Button className="dark:bg-blue-600 dark:hover:bg-blue-700">
          Create New Proposal <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
};

export default GovernanceVoting;
