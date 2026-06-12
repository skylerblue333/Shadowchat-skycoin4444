// AUTO-GENERATED DRAFT SCREEN: MessageReactions
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { Button } from '@/components/ui/button'; // shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui card
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui skeleton for loading states

interface Reaction {
  id: string;
  emoji: string;
  count: number;
  reactedByUser: boolean;
}

interface MessageReactionsProps {
  messageId: string;
}

// Mock tRPC-like hook for fetching reactions
const useMessageReactions = (messageId: string) => {
  return useQuery<Reaction[], Error>({
    queryKey: ['messageReactions', messageId],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (messageId === 'error-message') {
        throw new Error('Failed to fetch reactions');
      }
      return [
        { id: '1', emoji: '👍', count: 10, reactedByUser: false },
        { id: '2', emoji: '❤️', count: 5, reactedByUser: true },
        { id: '3', emoji: '😂', count: 2, reactedByUser: false },
      ];
    },
  });
};

const MessageReactions: React.FC<MessageReactionsProps> = ({ messageId }) => {
  const { data: reactions, isLoading, isError, error } = useMessageReactions(messageId);

  const handleReactionToggle = (reactionId: string) => {
    // Simulate optimistic update and API call
    console.log(`Toggling reaction ${reactionId} for message ${messageId}`);
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-md p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Reactions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-md p-4 bg-red-100 dark:bg-red-900 shadow-lg rounded-lg border border-red-400">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-red-800 dark:text-red-200">Error</CardTitle>
        </CardHeader>
        <CardContent className="text-red-700 dark:text-red-300">
          <p>Failed to load reactions: {error?.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Reactions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2" aria-label="Message reactions">
        {reactions?.map((reaction) => (
          <Button
            key={reaction.id}
            variant={reaction.reactedByUser ? 'default' : 'outline'}
            onClick={() => handleReactionToggle(reaction.id)}
            className={`rounded-full px-4 py-2 text-sm transition-colors
              ${reaction.reactedByUser
                ? 'bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-600'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'}
            `}
            aria-pressed={reaction.reactedByUser}
            aria-label={`${reaction.reactedByUser ? 'Unlike' : 'Like'} with ${reaction.emoji} reaction, currently ${reaction.count} reactions`}
          >
            {reaction.emoji} {reaction.count}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default MessageReactions;
