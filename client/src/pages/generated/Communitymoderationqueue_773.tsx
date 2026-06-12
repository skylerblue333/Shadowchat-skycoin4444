// AUTO-GENERATED DRAFT SCREEN: CommunityModerationQueue
import React, { useState, useEffect } from 'react';
import { z } from 'zod';

// --- shadcn/ui components (simulated with Tailwind CSS) ---
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <header className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</header>
);
const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);
const CardDescription = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);
const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
const Button = ({ children, onClick, className = '', variant = 'default' }: { children: React.ReactNode; onClick?: () => void; className?: string; variant?: 'default' | 'destructive' | 'outline' }) => {
  const baseStyle = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2';
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
const Badge = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

// --- tRPC types and hooks (simulated) ---
const moderationItemSchema = z.object({
  id: z.string(),
  content: z.string(),
  author: z.string(),
  status: z.enum(['pending', 'approved', 'rejected']),
  timestamp: z.string(),
});

type ModerationItem = z.infer<typeof moderationItemSchema>;

interface UseModerationQueueResult {
  data: ModerationItem[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

// Simulate tRPC hook
const useModerationQueue = (): UseModerationQueueResult => {
  const [data, setData] = useState<ModerationItem[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    try {
      // Simulate API call
      const response = await new Promise<ModerationItem[]>((resolve) =>
        setTimeout(() => {
          resolve([
            { id: '1', content: 'Spam message 1', author: 'user1', status: 'pending', timestamp: '2023-01-01T10:00:00Z' },
            { id: '2', content: 'Hate speech content', author: 'user2', status: 'pending', timestamp: '2023-01-01T10:05:00Z' },
            { id: '3', content: 'Legitimate comment', author: 'user3', status: 'approved', timestamp: '2023-01-01T10:10:00Z' },
            { id: '4', content: 'Another spam attempt', author: 'user4', status: 'pending', timestamp: '2023-01-01T10:15:00Z' },
          ]);
        }, 1500)
      );
      setData(response);
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, isError, error, refetch: fetchData };
};

// Simulate tRPC mutation hook
const useModerateItem = () => {
  const [isMutating, setIsMutating] = useState(false);
  const [mutationError, setMutationError] = useState<Error | null>(null);

  const mutate = async (itemId: string, newStatus: 'approved' | 'rejected') => {
    setIsMutating(true);
    setMutationError(null);
    try {
      // Simulate API call for moderation action
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
      console.log(`Item ${itemId} ${newStatus}`);
      // In a real app, you'd invalidate queries or update local state here
    } catch (err) {
      setMutationError(err instanceof Error ? err : new Error('Failed to moderate item'));
    } finally {
      setIsMutating(false);
    }
  };

  return { mutate, isMutating, mutationError };
};

// --- Main Component ---
const CommunityModerationQueue: React.FC = () => {
  const { data: moderationItems, isLoading, isError, error, refetch } = useModerationQueue();
  const { mutate: moderateItem, isMutating } = useModerateItem();

  const handleApprove = async (id: string) => {
    await moderateItem(id, 'approved');
    refetch(); // Re-fetch to update the list
  };

  const handleReject = async (id: string) => {
    await moderateItem(id, 'rejected');
    refetch(); // Re-fetch to update the list
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8 dark">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center lg:text-left" tabIndex={0}>Community Moderation Queue</h1>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-muted-foreground">Loading moderation items...</p>
          </div>
        )}

        {isError && (
          <div role="alert" className="bg-destructive/20 text-destructive-foreground border border-destructive rounded-md p-4 mb-6">
            <p className="font-bold">Error loading moderation queue:</p>
            <p>{error?.message || 'An unexpected error occurred.'}</p>
            <Button onClick={refetch} className="mt-3" variant="destructive">Retry</Button>
          </div>
        )}

        {!isLoading && !isError && (!moderationItems || moderationItems.length === 0) && (
          <div className="text-center p-10 border border-dashed rounded-md text-muted-foreground">
            <p className="text-xl font-semibold">No moderation items to display.</p>
            <p className="mt-2">The queue is currently clear. Great job!</p>
            <Button onClick={refetch} className="mt-4" variant="outline">Refresh Queue</Button>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {moderationItems?.filter(item => item.status === 'pending').map((item) => (
            <Card key={item.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Content by {item.author}</CardTitle>
                <CardDescription className="sr-only">Moderation item ID: {item.id}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-lg mb-4 line-clamp-3" aria-label="Content to moderate">{item.content}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500">Pending</Badge>
                  <time dateTime={item.timestamp}>{new Date(item.timestamp).toLocaleString()}</time>
                </div>
              </CardContent>
              <CardContent className="flex justify-end gap-2 pt-4">
                <Button onClick={() => handleApprove(item.id)} disabled={isMutating} aria-label={`Approve content by ${item.author}`}>
                  Approve
                </Button>
                <Button onClick={() => handleReject(item.id)} variant="destructive" disabled={isMutating} aria-label={`Reject content by ${item.author}`}>
                  Reject
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityModerationQueue;
