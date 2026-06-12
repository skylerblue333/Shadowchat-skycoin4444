// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: MessageThreadsScreen


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


// --- Types ---
interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface Thread {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
}

// --- Mock tRPC Hooks (replace with actual tRPC setup) ---
const useGetThreads = () => {
  return useQuery<Thread[]>({ queryKey: ['threads'], queryFn: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { id: '1', name: 'Alice', lastMessage: 'Hey there!', lastMessageTime: '10:00 AM' },
      { id: '2', name: 'Bob', lastMessage: 'Got it, thanks!', lastMessageTime: 'Yesterday' },
    ];
  }});
};

const useGetMessages = (threadId: string | null) => {
  return useQuery<Message[]>({ queryKey: ['messages', threadId], queryFn: async () => {
    if (!threadId) return [];
    await new Promise(resolve => setTimeout(resolve, 500));
    return threadId === '1' ? [
      { id: 'm1', sender: 'Alice', content: 'Hi!', timestamp: '10:00 AM' },
      { id: 'm2', sender: 'You', content: 'Hello Alice!', timestamp: '10:01 AM' },
    ] : [
      { id: 'm3', sender: 'Bob', content: 'Hi!', timestamp: 'Yesterday' },
      { id: 'm4', sender: 'You', content: 'Hey Bob!', timestamp: 'Yesterday' },
    ];
  }, enabled: !!threadId });
};

export const MessageThreadsScreen: React.FC = () => {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');

  const { data: threads, isLoading: isLoadingThreads, error: threadsError } = useGetThreads();
  const { data: messages, isLoading: isLoadingMessages, error: messagesError } = useGetMessages(selectedThreadId);

  const selectedThread = useMemo(
    () => threads?.find(thread => thread.id === selectedThreadId),
    [threads, selectedThreadId]
  );

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedThreadId) {
      // In a real app, this would call a tRPC mutation
      console.log(`Sending message to ${selectedThreadId}: ${messageInput}`);
      setMessageInput('');
    }
  };

  if (isLoadingThreads) return <div className="p-4 text-center">Loading threads...</div>;
  if (threadsError) return <div className="p-4 text-center text-red-500">Error loading threads: {threadsError.message}</div>;

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Thread List */}
      <Card className="w-1/4 border-r rounded-none">
        <CardHeader>
          <CardTitle>Message Threads</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {threads?.map(thread => (
              <div
                key={thread.id}
                className={cn(
                  'flex items-center p-4 cursor-pointer hover:bg-accent',
                  selectedThreadId === thread.id && 'bg-muted'
                )}
                onClick={() => setSelectedThreadId(thread.id)}
                role="button"
                aria-label={`Select thread with ${thread.name}`}
              >
                <Avatar className="mr-3"><AvatarFallback>{thread.name.charAt(0)}</AvatarFallback></Avatar>
                <div>
                  <p className="font-medium">{thread.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{thread.lastMessage}</p>
                </div>
                <span className="ml-auto text-xs text-muted-foreground">{thread.lastMessageTime}</span>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Message Pane */}
      <div className="flex flex-col flex-1">
        {selectedThread ? (
          <Card className="flex flex-col flex-1 rounded-none">
            <CardHeader className="border-b">
              <CardTitle>{selectedThread.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-4 overflow-hidden">
              {isLoadingMessages ? (
                <div className="text-center">Loading messages...</div>
              ) : messagesError ? (
                <div className="text-center text-red-500">Error loading messages: {messagesError.message}</div>
              ) : (
                <ScrollArea className="h-full pr-4">
                  {messages?.map(message => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex mb-4',
                        message.sender === 'You' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[70%] p-3 rounded-lg',
                          message.sender === 'You'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        <p className="font-medium">{message.sender}</p>
                        <p>{message.content}</p>
                        <p className="text-xs text-right mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              )}
            </CardContent>
            <div className="flex p-4 border-t">
              <Input
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 mr-2"
                aria-label="Message input"
              />
              <Button onClick={handleSendMessage} aria-label="Send message">Send</Button>
            </div>
          </Card>
        ) : (
          <div className="flex items-center justify-center flex-1 text-muted-foreground">
            Select a thread to view messages
          </div>
        )}
      </div>
    </div>
  );
};


export default MessageThreadsScreen;
