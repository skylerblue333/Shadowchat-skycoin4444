// AUTO-GENERATED DRAFT SCREEN: MessagingInterface
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useTheme } from 'next-themes'; // For dark theme support
import { cn } from '../lib/utils'; // Utility for conditional class names

interface Message {
  id: string;
  sender: { id: string; name: string; avatarUrl?: string };
  content: string;
  timestamp: string;
}

interface ChatProps {
  chatId: string;
  currentUserId: string;
}

const MessagingInterface: React.FC<ChatProps> = ({ chatId, currentUserId }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Fetch messages using tRPC query
  const { data: messages, isLoading, isError, error } = trpc.chat.getMessages.useQuery(
    { chatId },
    { 
      refetchInterval: 5000, // Poll for new messages every 5 seconds
      onError: (err) => console.error('Failed to fetch messages:', err),
    }
  );

  // Send message using tRPC mutation
  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      setNewMessage('');
      // Invalidate messages query to refetch latest messages
      trpc.useContext().chat.getMessages.invalidate({ chatId });
    },
    onError: (err) => console.error('Failed to send message:', err),
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && !sendMessageMutation.isLoading) {
      sendMessageMutation.mutate({ chatId, senderId: currentUserId, content: newMessage });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading messages...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        <p>Error: {error?.message || 'Failed to load messages.'}</p>
      </div>
    );
  }

  return (
    <Card className={cn("flex flex-col h-full", theme === 'dark' ? 'dark' : '')}>
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-bold">Chat with {chatId}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {messages?.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-3",
                  message.sender.id === currentUserId ? 'justify-end' : 'justify-start'
                )}
              >
                {message.sender.id !== currentUserId && (
                  <Avatar>
                    <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} />
                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg p-3 max-w-[70%]",
                    message.sender.id === currentUserId
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <p className="text-sm font-medium">{message.sender.name}</p>
                  <p className="text-base">{message.content}</p>
                  <p className="text-xs text-muted-foreground text-right mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                {message.sender.id === currentUserId && (
                  <Avatar>
                    <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} />
                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <form onSubmit={handleSubmit} className="flex items-center p-4 border-t">
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 mr-2"
          aria-label="New message input"
        />
        <Button type="submit" disabled={!newMessage.trim() || sendMessageMutation.isLoading}>
          {sendMessageMutation.isLoading ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </Card>
  );
};

export default MessagingInterface;
