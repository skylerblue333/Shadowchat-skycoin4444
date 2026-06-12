// AUTO-GENERATED DRAFT SCREEN: GovernanceModuleProposalList
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

interface Proposal {
  id: string;
  title: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Executed';
  proposer: string;
  votesFor: number;
  votesAgainst: number;
  createdAt: string;
}

const GovernanceModuleProposalList: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate tRPC hook for fetching proposals
  const { data: proposals, isLoading, isError, error } = trpc.governance.getProposals.useQuery();

  const filteredProposals = proposals?.filter(proposal =>
    proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposal.proposer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen dark:bg-gray-900 dark:text-gray-100">Loading proposals...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen text-red-500 dark:bg-gray-900 dark:text-red-400">Error: {error?.message}</div>;
  }

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8`}>
      <div className="container mx-auto">
        <Card className="w-full shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">Governance Module: Proposal List</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">View and manage all active and past governance proposals.</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <SunIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                aria-label="Toggle dark mode"
              />
              <MoonIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <Input
                type="text"
                placeholder="Search proposals by title or proposer..."
                className="max-w-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">Create New Proposal</Button>
            </div>

            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="dark:bg-gray-700">
                    <TableHead className="w-[100px] text-gray-600 dark:text-gray-300">ID</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">Title</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">Proposer</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">Votes For</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">Votes Against</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-300">Created At</TableHead>
                    <TableHead className="text-right text-gray-600 dark:text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProposals && filteredProposals.length > 0 ? (
                    filteredProposals.map((proposal) => (
                      <TableRow key={proposal.id} className="dark:hover:bg-gray-700/50">
                        <TableCell className="font-medium">{proposal.id}</TableCell>
                        <TableCell>{proposal.title}</TableCell>
                        <TableCell>
                          <Badge
                            variant={proposal.status === 'Approved' ? 'default' : proposal.status === 'Rejected' ? 'destructive' : 'outline'}
                            className={{
                              'bg-green-500 text-white': proposal.status === 'Approved',
                              'bg-red-500 text-white': proposal.status === 'Rejected',
                              'bg-yellow-500 text-white': proposal.status === 'Pending',
                              'bg-blue-500 text-white': proposal.status === 'Executed',
                            }[proposal.status]}
                          >
                            {proposal.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{proposal.proposer}</TableCell>
                        <TableCell>{proposal.votesFor}</TableCell>
                        <TableCell>{proposal.votesAgainst}</TableCell>
                        <TableCell>{new Date(proposal.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="dark:text-blue-400 dark:hover:bg-gray-700">View</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No proposals found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovernanceModuleProposalList;
