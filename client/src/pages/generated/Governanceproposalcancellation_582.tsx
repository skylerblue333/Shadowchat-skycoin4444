// AUTO-GENERATED DRAFT SCREEN: GovernanceProposalCancellation
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Button } from '@/components/ui/button'; // shadcn/ui button
import { Input } from '@/components/ui/input'; // shadcn/ui input
import { Label } from '@/components/ui/label'; // shadcn/ui label
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui card
import { Switch } from '@/components/ui/switch'; // shadcn/ui switch for dark mode toggle
import { useTheme } from 'next-themes'; // Assuming next-themes for dark mode

interface ProposalCancellationForm {
  proposalId: string;
  reason: string;
}

const GovernanceProposalCancellation: React.FC = () => {
  const [form, setForm] = useState<ProposalCancellationForm>({
    proposalId: '',
    reason: '',
  });
  const { theme, setTheme } = useTheme();

  const cancelProposalMutation = trpc.governance.cancelProposal.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await cancelProposalMutation.mutateAsync(form);
      alert('Proposal cancellation initiated successfully!');
      setForm({ proposalId: '', reason: '' });
    } catch (error) {
      console.error('Failed to cancel proposal:', error);
      alert('Failed to cancel proposal. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const isLoading = cancelProposalMutation.isLoading;
  const isError = cancelProposalMutation.isError;
  const error = cancelProposalMutation.error;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Cancel Governance Proposal</CardTitle>
          <CardDescription>Fill in the details to cancel a proposal on SKYCOIN4444.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="proposalId">Proposal ID</Label>
              <Input
                type="text"
                id="proposalId"
                placeholder="Enter Proposal ID"
                value={form.proposalId}
                onChange={handleInputChange}
                required
                aria-describedby="proposal-id-help"
              />
              <p id="proposal-id-help" className="text-sm text-muted-foreground">e.g., 0xabc123...</p>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="reason">Reason for Cancellation</Label>
              <Input
                id="reason"
                placeholder="Briefly explain why you are cancelling"
                value={form.reason}
                onChange={handleInputChange}
                required
                aria-describedby="reason-help"
              />
              <p id="reason-help" className="text-sm text-muted-foreground">This reason will be publicly visible.</p>
            </div>

            {isLoading && <p className="text-blue-500">Cancelling proposal...</p>}
            {isError && <p className="text-red-500">Error: {error?.message || 'Unknown error'}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Cancelling...' : 'Cancel Proposal'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
          <Switch
            id="dark-mode-toggle"
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            aria-label="Toggle dark mode"
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default GovernanceProposalCancellation;
