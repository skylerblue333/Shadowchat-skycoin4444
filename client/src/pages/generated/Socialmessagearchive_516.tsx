// AUTO-GENERATED DRAFT SCREEN: SocialMessageArchive

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { cn } from '@/lib/utils'; // Assuming shadcn/ui utility for class merging
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui Card component
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui Skeleton for loading states
import { Switch } from '@/components/ui/switch'; // shadcn/ui Switch for dark mode toggle

// Placeholder for tRPC hook - replace with actual tRPC client setup
// For example: const trpc = createTRPCReact<AppRouter>();
// Then use: const { data, isLoading, isError, error } = trpc.message.getArchive.useQuery();

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

// Mock tRPC query for demonstration purposes
const fetchMessageArchive = async (): Promise<Message[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', sender: 'Alice', content: 'Hey, how are you?', timestamp: '2023-01-01T10:00:00Z' },
        { id: '2', sender: 'Bob', content: 'I am good, thanks!', timestamp: '2023-01-01T10:05:00Z' },
        { id: '3', sender: 'Alice', content: 'Great to hear!', timestamp: '2023-01-01T10:10:00Z' },
      ]);
    }, 1500);
  });
};

const useMessageArchiveQuery = () => {
  return useQuery<Message[], Error>({
    queryKey: ['messageArchive'],
    queryFn: fetchMessageArchive,
  });
};

const SocialMessageArchive: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { data: messages, isLoading, isError, error } = useMessageArchiveQuery();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (isLoading) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <Card className="w-full max-w-2xl mx-auto dark:bg-gray-800 dark:text-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Social: Message Archive</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-3/4 mb-4 dark:bg-gray-700" />
            <Skeleton className="h-6 w-full mb-2 dark:bg-gray-700" />
            <Skeleton className="h-6 w-full mb-2 dark:bg-gray-700" />
            <Skeleton className="h-6 w-1/2 dark:bg-gray-700" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen text-red-500">
        <Card className="w-full max-w-2xl mx-auto dark:bg-gray-800 dark:text-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load messages: {error?.message || 'Unknown error'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("p-4 min-h-screen", isDarkMode ? "dark:bg-gray-900" : "bg-gray-50")}>
      <Card className={cn("w-full max-w-2xl mx-auto shadow-lg", isDarkMode ? "dark:bg-gray-800 dark:text-gray-200" : "bg-white text-gray-900")}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Social: Message Archive</CardTitle>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode-toggle"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
            <label htmlFor="dark-mode-toggle" className="text-sm">Dark Mode</label>
          </div>
        </CardHeader>
        <CardContent>
          {messages && messages.length > 0 ? (
            <ul className="space-y-4" aria-live="polite">
              {messages.map((message) => (
                <li key={message.id} className="border-b pb-2 last:border-b-0 dark:border-gray-700">
                  <p className="font-semibold text-lg">{message.sender}</p>
                  <p className="text-gray-700 dark:text-gray-300">{message.content}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(message.timestamp).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No messages found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMessageArchive;
