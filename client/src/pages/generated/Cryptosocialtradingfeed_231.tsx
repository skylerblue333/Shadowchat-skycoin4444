// AUTO-GENERATED DRAFT SCREEN: CryptoSocialTradingFeed

import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

// Mock tRPC client for demonstration. In a real app, this would be imported.
const trpc = {
  socialTrading: {
    getFeed: {
      useQuery: () => {
        // Simulate loading, error, and success states
        const [data, setData] = React.useState<FeedItem[] | undefined>(undefined);
        const [isLoading, setIsLoading] = React.useState(true);
        const [isError, setIsError] = React.useState(false);
        const [error, setError] = React.useState<Error | null>(null);

        React.useEffect(() => {
          const fetchData = async () => {
            try {
              setIsLoading(true);
              setIsError(false);
              setError(null);
              // Simulate API call delay
              await new Promise(resolve => setTimeout(resolve, 1500));
              if (Math.random() < 0.1) { // 10% chance of error
                throw new Error('Failed to fetch social trading feed.');
              }
              setData([
                { id: '1', user: 'Alice', avatar: 'https://github.com/shadcn.png', content: 'Just bought more BTC! To the moon! #crypto', timestamp: new Date(), likes: 120, comments: 15 },
                { id: '2', user: 'Bob', avatar: 'https://github.com/shadcn.png', content: 'Thinking about diversifying into altcoins. Any suggestions?', timestamp: new Date(Date.now() - 3600000), likes: 80, comments: 10 },
                { id: '3', user: 'Charlie', avatar: 'https://github.com/shadcn.png', content: 'Market analysis: ETH looks strong for Q3. DYOR.', timestamp: new Date(Date.now() - 7200000), likes: 200, comments: 30 },
                { id: '4', user: 'David', avatar: 'https://github.com/shadcn.png', content: 'New NFT project launching soon. Keep an eye out!', timestamp: new Date(Date.now() - 10800000), likes: 50, comments: 5 },
              ]);
            } catch (err) {
              setIsError(true);
              setError(err as Error);
            } finally {
              setIsLoading(false);
            }
          };
          fetchData();
        }, []);

        return { data, isLoading, isError, error };
      },
    },
  },
};

interface FeedItem {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
}

const CryptoSocialTradingFeed: React.FC = () => {
  const { data: feed, isLoading, isError, error } = trpc.socialTrading.getFeed.useQuery();

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="m-4">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error?.message || 'Failed to load social trading feed.'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-64px)] w-full rounded-md border p-4 dark:bg-gray-900">
      <div className="space-y-4">
        {feed?.map((item) => (
          <Card key={item.id} className="dark:bg-gray-800 dark:text-gray-50">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={item.avatar} alt={`@${item.user}`} />
                <AvatarFallback>{item.user.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <CardTitle className="text-lg">{item.user}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatTimestamp(item.timestamp)}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{item.content}</p>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{item.likes} Likes</span>
                <span>{item.comments} Comments</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="ghost" size="sm" className="dark:text-gray-50">Like</Button>
                <Button variant="ghost" size="sm" className="dark:text-gray-50">Comment</Button>
                <Button variant="ghost" size="sm" className="dark:text-gray-50">Share</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CryptoSocialTradingFeed;
