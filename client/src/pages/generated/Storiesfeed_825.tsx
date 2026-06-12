// AUTO-GENERATED DRAFT SCREEN: StoriesFeed

import React from 'react';
import { useQuery } from '@trpc/react-query';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui card component
import { Skeleton } from './ui/skeleton'; // Assuming shadcn/ui skeleton component
import { Alert, AlertDescription, AlertTitle } from './ui/alert'; // Assuming shadcn/ui alert component
import { Terminal } from 'lucide-react'; // Assuming lucide-react for icons

// Define the type for a single story
interface Story {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  imageUrl?: string;
}

// Define the tRPC query type (placeholder)
// In a real application, this would be generated from your tRPC setup
interface AppRouter {
  stories: {
    getStories: {
      input: undefined;
      output: Story[];
    };
  };
}

// Placeholder for tRPC client. In a real app, this would be imported from your tRPC setup.
const trpc = {
  stories: {
    getStories: {
      useQuery: (options?: any) => {
        // Mock data for demonstration
        const mockData: Story[] = [
          { id: '1', author: 'Alice', content: 'Enjoying a sunny day!', timestamp: '2 hours ago', imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Story+1' },
          { id: '2', author: 'Bob', content: 'New project launch!', timestamp: '4 hours ago', imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Story+2' },
          { id: '3', author: 'Charlie', content: 'Weekend vibes!', timestamp: '1 day ago' },
        ];
        return { data: mockData, isLoading: false, isError: false, error: null };
      },
    },
  },
};

const StoryCard: React.FC<{ story: Story }> = ({ story }) => (
  <Card className="w-full max-w-sm mx-auto bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden">
    {story.imageUrl && (
      <img src={story.imageUrl} alt="Story visual" className="w-full h-32 object-cover" />
    )}
    <CardHeader>
      <CardTitle className="text-lg font-semibold">{story.author}</CardTitle>
      <p className="text-sm text-muted-foreground">{story.timestamp}</p>
    </CardHeader>
    <CardContent>
      <p className="text-base">{story.content}</p>
    </CardContent>
  </Card>
);

const StoriesFeed: React.FC = () => {
  const { data: stories, isLoading, isError, error } = trpc.stories.getStories.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4" aria-live="polite" aria-atomic="true" aria-label="Loading stories">
        <Skeleton className="w-full h-40 rounded-lg" />
        <Skeleton className="w-full h-40 rounded-lg" />
        <Skeleton className="w-full h-40 rounded-lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4" role="alert">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load stories. {error?.message || 'Please try again later.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6 bg-background text-foreground min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Stories Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories?.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default StoriesFeed;
