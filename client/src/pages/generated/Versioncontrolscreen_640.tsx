// AUTO-GENERATED DRAFT SCREEN: VersionControlScreen
import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../trpc';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

import AddRepositoryForm from './AddRepositoryForm';
import ExistingRepositories from './ExistingRepositories';
import RepositoryActions from './RepositoryActions';

type Repository = {
  id: string;
  name: string;
  url: string;
  branch: string;
  status: 'active' | 'inactive';
};

const VersionControlScreen: React.FC = () => {
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoUrl, setNewRepoUrl] = useState('');
  const [selectedRepoId, setSelectedRepoId] = useState<string | null>(null);
  const [commitMessage, setCommitMessage] = useState('');
  const [pullRequestTitle, setPullRequestTitle] = useState('');
  const [pullRequestBranch, setPullRequestBranch] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { data: repositories, isLoading, isError, error, refetch } = trpc.getRepositories.useQuery();
  const addRepositoryMutation = trpc.addRepository.useMutation();
  const commitChangesMutation = trpc.commitChanges.useMutation();
  const createPullRequestMutation = trpc.createPullRequest.useMutation();
  const toggleRepoStatusMutation = trpc.toggleRepositoryStatus.useMutation();

  const handleAddRepository = useCallback(async () => {
    if (newRepoName && newRepoUrl) {
      await addRepositoryMutation.mutateAsync({ name: newRepoName, url: newRepoUrl });
      setNewRepoName('');
      setNewRepoUrl('');
      refetch();
    }
  }, [newRepoName, newRepoUrl, addRepositoryMutation, refetch]);

  const handleCommitChanges = useCallback(async () => {
    if (selectedRepoId && commitMessage) {
      await commitChangesMutation.mutateAsync({ repositoryId: selectedRepoId, message: commitMessage });
      setCommitMessage('');
      refetch();
    }
  }, [selectedRepoId, commitMessage, commitChangesMutation, refetch]);

  const handleCreatePullRequest = useCallback(async () => {
    if (selectedRepoId && pullRequestTitle && pullRequestBranch) {
      await createPullRequestMutation.mutateAsync({
        repositoryId: selectedRepoId,
        title: pullRequestTitle,
        branch: pullRequestBranch,
      });
      setPullRequestTitle('');
      setPullRequestBranch('');
      refetch();
    }
  }, [selectedRepoId, pullRequestTitle, pullRequestBranch, createPullRequestMutation, refetch]);

  const handleToggleRepoStatus = useCallback(async (repoId: string, currentStatus: 'active' | 'inactive') => {
    await toggleRepoStatusMutation.mutateAsync({ repositoryId: repoId, status: currentStatus === 'active' ? 'inactive' : 'active' });
    refetch();
  }, [toggleRepoStatusMutation, refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading repositories...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Error loading repositories: {error?.message}</AlertDescription>
      </Alert>
    );
  }

  const selectedRepo = repositories?.find(r => r.id === selectedRepoId);

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Version Control for SKYCOIN4444</h1>
        <p className="text-center text-lg text-muted-foreground">Manage your project repositories, commits, and pull requests.</p>

        <div className="flex items-center justify-end space-x-2">
          <Switch
            id="dark-mode"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>

        <AddRepositoryForm
          newRepoName={newRepoName}
          setNewRepoName={setNewRepoName}
          newRepoUrl={newRepoUrl}
          setNewRepoUrl={setNewRepoUrl}
          handleAddRepository={handleAddRepository}
          addRepositoryMutation={addRepositoryMutation}
        />

        <ExistingRepositories
          repositories={repositories}
          handleToggleRepoStatus={handleToggleRepoStatus}
          setSelectedRepoId={setSelectedRepoId}
        />

        <RepositoryActions
          selectedRepoId={selectedRepoId}
          selectedRepoName={selectedRepo?.name}
          commitMessage={commitMessage}
          setCommitMessage={setCommitMessage}
          handleCommitChanges={handleCommitChanges}
          commitChangesMutation={commitChangesMutation}
          pullRequestTitle={pullRequestTitle}
          setPullRequestTitle={setPullRequestTitle}
          pullRequestBranch={pullRequestBranch}
          setPullRequestBranch={setPullRequestBranch}
          handleCreatePullRequest={handleCreatePullRequest}
          createPullRequestMutation={createPullRequestMutation}
        />
      </div>
    </div>
  );
};

export default VersionControlScreen;