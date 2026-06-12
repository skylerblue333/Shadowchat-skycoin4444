// AUTO-GENERATED DRAFT SCREEN: GovernanceProposalDiscussionScreen

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ArrowLeft, MessageCircle, ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

// Mock tRPC-like hooks for demonstration
const trpc = {
  proposal: {
    getById: (id: string) => ({ queryKey: ['proposal', id], queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (id === 'proposal-123') {
        return {
          id: 'proposal-123',
          title: 'Implement Staking Rewards v2.0',
          description: 'This proposal outlines the implementation of an upgraded staking rewards mechanism, focusing on improved fairness and sustainability. Key changes include dynamic reward rates based on network activity and a tiered bonus system for long-term stakers.',
          author: 'SKYCOIN Core Team',
          status: 'Discussion',
          votes: { up: 1250, down: 320 },
          comments: [
            { id: 'comment-1', author: 'Alice', text: 'Great initiative! How will this impact smaller stakers?' },
            { id: 'comment-2', author: 'Bob', text: 'Concerned about the complexity of dynamic rates. Needs more clarity.' },
          ],
        };
      }
      throw new Error('Proposal not found');
    }}),
    postComment: () => ({ mutationFn: async (comment: { proposalId: string; text: string }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Comment posted:', comment);
      return { success: true, newComment: { id: `comment-${Date.now()}`, author: 'You', text: comment.text } };
    }}),
    castVote: () => ({ mutationFn: async (vote: { proposalId: string; type: 'up' | 'down' }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      console.log('Vote cast:', vote);
      return { success: true };
    }}),
  },
};

type Proposal = {
  id: string;
  title: string;
  description: string;
  author: string;
  status: string;
  votes: { up: number; down: number };
  comments: { id: string; author: string; text: string }[];
};

interface GovernanceProposalDiscussionScreenProps {
  proposalId: string;
}

export const GovernanceProposalDiscussionScreen: React.FC<GovernanceProposalDiscussionScreenProps> = ({ proposalId }) => {
  const [commentText, setCommentText] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const { data: proposal, isLoading, isError, error, refetch } = useQuery<Proposal, Error>(trpc.proposal.getById(proposalId));
  const postCommentMutation = useMutation(trpc.proposal.postComment(), {
    onSuccess: () => {
      setCommentText('');
      refetch(); // Refresh comments after posting
    },
  });
  const castVoteMutation = useMutation(trpc.proposal.castVote(), {
    onSuccess: () => {
      refetch(); // Refresh votes after casting
    },
  });

  const handlePostComment = () => {
    if (commentText.trim()) {
      postCommentMutation.mutate({ proposalId, text: commentText });
    }
  };

  const handleCastVote = (type: 'up' | 'down') => {
    castVoteMutation.mutate({ proposalId, type });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
        <span className="ml-2 text-gray-700 dark:text-gray-300">Loading proposal...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 text-red-500">
        <p className="text-lg font-semibold">Error loading proposal:</p>
        <p className="text-sm">{error?.message || 'An unknown error occurred.'}</p>
        <Button onClick={() => refetch()} className="mt-4">Retry</Button>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-gray-500">
        <p className="text-lg">No proposal data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => window.history.back()} className="text-sky-600 dark:text-sky-400">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Proposals
          </Button>
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

        <Card className="mb-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-sky-700 dark:text-sky-300">{proposal.title}</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">By {proposal.author} &bull; Status: {proposal.status}</p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{proposal.description}</p>
            <div className="flex items-center space-x-4 mt-4">
              <Button
                variant="outline"
                onClick={() => handleCastVote('up')}
                disabled={castVoteMutation.isPending}
                className="flex items-center gap-1 text-green-600 dark:text-green-400 border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900"
              >
                <ThumbsUp className="h-4 w-4" />
                {proposal.votes.up}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleCastVote('down')}
                disabled={castVoteMutation.isPending}
                className="flex items-center gap-1 text-red-600 dark:text-red-400 border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900"
              >
                <ThumbsDown className="h-4 w-4" />
                {proposal.votes.down}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-sky-700 dark:text-sky-300">Discussion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              {proposal.comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-b-0 last:pb-0">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{comment.author}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{comment.text}</p>
                </div>
              ))}
              {proposal.comments.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to start a discussion!</p>
              )}
            </div>
            <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
            <div className="mt-6">
              <Label htmlFor="comment-textarea" className="sr-only">Your Comment</Label>
              <Textarea
                id="comment-textarea"
                placeholder="Join the discussion..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                className="w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 focus:ring-sky-500 focus:border-sky-500"
                aria-label="Write your comment here"
              />
              <Button
                onClick={handlePostComment}
                disabled={!commentText.trim() || postCommentMutation.isPending}
                className="mt-3 w-full sm:w-auto bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white"
              >
                {postCommentMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Post Comment
              </Button>
              {postCommentMutation.isError && (
                <p className="text-red-500 text-sm mt-2" role="alert">Error posting comment: {postCommentMutation.error?.message}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovernanceProposalDiscussionScreen;
