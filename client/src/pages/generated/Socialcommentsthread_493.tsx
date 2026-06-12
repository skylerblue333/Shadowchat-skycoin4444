// AUTO-GENERATED DRAFT SCREEN: SocialCommentsThread
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query'; // Placeholder for tRPC hooks
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  author: { name: string; avatarUrl: string };
  content: string;
  timestamp: string;
}

interface NewComment {
  content: string;
}

// Mock API functions for demonstration
const fetchComments = async (): Promise<Comment[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: '1',
      author: { name: 'Alice', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Alice' },
      content: 'This is a great discussion!',
      timestamp: new Date(Date.now() - 60 * 1000).toISOString(),
    },
    {
      id: '2',
      author: { name: 'Bob', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Bob' },
      content: 'I learned a lot from this thread.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
  ];
};

const addComment = async (newComment: NewComment): Promise<Comment> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: String(Math.random()),
    author: { name: 'You', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=You' },
    content: newComment.content,
    timestamp: new Date().toISOString(),
  };
};

export const SocialCommentsThread: React.FC = () => {
  const [commentContent, setCommentContent] = useState('');

  const { data: comments, isLoading, isError, error, refetch } = useQuery<Comment[], Error>({ queryKey: ['comments'], queryFn: fetchComments });

  const addCommentMutation = useMutation<Comment, Error, NewComment>({
    mutationFn: addComment,
    onSuccess: () => {
      setCommentContent('');
      refetch(); // Re-fetch comments after adding a new one
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim()) {
      addCommentMutation.mutate({ content: commentContent });
    }
  };

  if (isLoading) return <div className="p-4 text-center">Loading comments...</div>;
  if (isError) return <div className="p-4 text-red-500 text-center">Error: {error?.message}</div>;

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Comments Thread</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          {comments?.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-3">
              <Avatar>
                <AvatarImage src={comment.author.avatarUrl} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{comment.author.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                  </p>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
              </div>
            </div>
          ))}
          {comments?.length === 0 && <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            rows={3}
            className="w-full"
          />
          <Button type="submit" className="w-full" disabled={addCommentMutation.isLoading || !commentContent.trim()}>
            {addCommentMutation.isLoading ? 'Posting...' : 'Post Comment'}
          </Button>
          {addCommentMutation.isError && (
            <p className="text-red-500 text-sm">Error posting comment: {addCommentMutation.error?.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SocialCommentsThread;
