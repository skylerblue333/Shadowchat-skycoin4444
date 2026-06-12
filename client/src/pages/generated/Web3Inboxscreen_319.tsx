// AUTO-GENERATED DRAFT SCREEN: Web3InboxScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // shadcn/ui Card
import { Button } from './ui/button'; // shadcn/ui Button
import { ScrollArea } from './ui/scroll-area'; // shadcn/ui ScrollArea
import { Alert, AlertDescription, AlertTitle } from './ui/alert'; // shadcn/ui Alert
import { Skeleton } from './ui/skeleton'; // shadcn/ui Skeleton
import { InboxIcon, Loader2 } from 'lucide-react'; // Icons

// Mock tRPC client for demonstration. In a real app, this would be imported.
const trpc = {
  web3Inbox: {
    getMessages: {
      useQuery: () => useQuery<Web3InboxMessage[], Error>({
        queryKey: ['web3InboxMessages'],
        queryFn: async () => {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          if (Math.random() < 0.1) {
            throw new Error('Failed to fetch inbox messages.');
          }
          return [
            { id: '1', sender: '0xabc...', subject: 'Welcome to Web3!', timestamp: '2023-01-01T10:00:00Z', read: false },
            { id: '2', sender: '0xdef...', subject: 'New NFT Drop Alert', timestamp: '2023-01-02T11:30:00Z', read: true },
            { id: '3', sender: '0xghi...', subject: 'DAO Proposal #123', timestamp: '2023-01-03T14:00:00Z', read: false },
            { id: '4', sender: '0xjkl...', subject: 'Your transaction confirmed', timestamp: '2023-01-04T16:45:00Z', read: true },
          ];
        },
      }),
    },
  },
};

interface Web3InboxMessage {
  id: string;
  sender: string;
  subject: string;
  timestamp: string;
  read: boolean;
}

const Web3InboxScreen: React.FC = () => {
  const { data: messages, isLoading, isError, error } = trpc.web3Inbox.getMessages.useQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3 p-4">
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="m-4">
        <InboxIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error?.message || 'Failed to load inbox messages.'}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto my-8 dark:bg-gray-900 dark:text-gray-50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold">Web3 Inbox</CardTitle>
        <Button variant="ghost" size="icon" aria-label="Refresh inbox">
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      </CardHeader>
      <CardContent>
        {messages && messages.length > 0 ? (
          <ScrollArea className="h-[300px] w-full rounded-md border p-4 dark:border-gray-700">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-center space-x-4 p-3 rounded-md transition-colors ${message.read ? 'bg-gray-100 dark:bg-gray-800 text-gray-500' : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                >
                  <InboxIcon className="h-5 w-5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">{message.subject}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{message.sender}</p>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(message.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <InboxIcon className="mx-auto h-12 w-12" />
            <p className="mt-4 text-lg">No messages in your inbox.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Web3InboxScreen;
