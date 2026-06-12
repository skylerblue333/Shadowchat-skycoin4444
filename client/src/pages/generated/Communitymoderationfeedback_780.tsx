// AUTO-GENERATED DRAFT SCREEN: CommunityModerationFeedback

import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes'; // For dark theme

interface FeedbackItem {
  id: string;
  moderatorId: string;
  userId: string;
  content: string;
  status: 'pending' | 'reviewed' | 'action_taken';
  createdAt: string;
}

const CommunityModerationFeedback: React.FC = () => {
  const [feedbackContent, setFeedbackContent] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Local state for theme switch
  const { setTheme, theme } = useTheme(); // next-themes hook

  // Sync local theme state with next-themes
  React.useEffect(() => {
    setIsDarkTheme(theme === 'dark');
  }, [theme]);

  const handleThemeChange = (checked: boolean) => {
    setIsDarkTheme(checked);
    setTheme(checked ? 'dark' : 'light');
  };

  const { data: feedbackList, isLoading, isError, error, refetch } = trpc.moderation.getFeedback.useQuery();

  const submitFeedbackMutation = trpc.moderation.submitFeedback.useMutation({
    onSuccess: () => {
      setFeedbackContent('');
      refetch();
      alert('Feedback submitted successfully!');
    },
    onError: (err) => {
      alert(`Error submitting feedback: ${err.message}`);
    },
  });

  const handleSubmit = () => {
    if (feedbackContent.trim()) {
      submitFeedbackMutation.mutate({ content: feedbackContent });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading feedback...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error?.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Community Moderation Feedback</h1>

      <div className="flex justify-end items-center space-x-2">
        <Switch
          id="dark-mode-switch"
          checked={isDarkTheme}
          onCheckedChange={handleThemeChange}
          aria-label="Toggle dark mode"
        />
        <Label htmlFor="dark-mode-switch">Dark Mode</Label>
      </div>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Submit New Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type your moderation feedback here..."
            value={feedbackContent}
            onChange={(e) => setFeedbackContent(e.target.value)}
            rows={5}
            aria-label="Moderation feedback content"
          />
          <Button
            onClick={handleSubmit}
            disabled={submitFeedbackMutation.isLoading || !feedbackContent.trim()}
            className="w-full"
          >
            {submitFeedbackMutation.isLoading ? 'Submitting...' : 'Submit Feedback'}
          </Button>
          {submitFeedbackMutation.isError && (
            <p className="text-red-500 text-sm mt-2">Error: {submitFeedbackMutation.error?.message}</p>
          )}
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedbackList?.length === 0 ? (
            <p className="text-center text-gray-500">No feedback submitted yet.</p>
          ) : (
            <ul className="space-y-3">
              {feedbackList?.map((feedback) => (
                <li key={feedback.id} className="border-b pb-3 last:border-b-0">
                  <p className="font-medium">Feedback ID: {feedback.id}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">User: {feedback.userId}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Moderator: {feedback.moderatorId}</p>
                  <p className="mt-1">{feedback.content}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Status: {feedback.status} | Created: {new Date(feedback.createdAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityModerationFeedback;
